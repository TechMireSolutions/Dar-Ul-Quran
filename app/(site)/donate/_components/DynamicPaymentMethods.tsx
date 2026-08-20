"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Copy, Landmark } from "lucide-react";
import type { PaymentMethodDoc } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

interface DynamicPaymentMethodsProps {
    methods: PaymentMethodDoc[];
}

function CopyButton({ textToCopy }: { textToCopy: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            aria-label="کاپی کریں"
            className="flex size-8 shrink-0 items-center justify-center rounded-md bg-white border border-gray-200 text-gray-500 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-700 focus-visible:outline-2 focus-visible:outline-brand-600 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-600"
        >
            {copied ? (
                <Check className="size-4 text-emerald-500" />
            ) : (
                <Copy className="size-4" />
            )}
        </button>
    );
}

export default function DynamicPaymentMethods({
    methods,
}: DynamicPaymentMethodsProps) {
    if (!methods.length) {
        return (
            <p className="text-center text-sm text-slate-500 dark:text-slate-400" dir="rtl">
                اس وقت کوئی ادائیگی کا طریقہ درج نہیں ہے۔ براہ کرم بعد میں دوبارہ چیک کریں۔
            </p>
        );
    }

    return (
        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" dir="rtl">
            {methods.map((method) => (
                <div
                    key={method._id}
                    className="bg-white dark:bg-slate-800/80 rounded-2xl border border-gray-100 dark:border-slate-700 p-5 shadow-sm"
                >
                    {/* Header Row */}
                    <div className="flex items-center gap-3.5 mb-5">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 p-1.5 dark:border-slate-700 dark:bg-slate-800">
                            {method.icon ? (
                                <Image
                                    src={urlFor(method.icon).width(80).height(80).url()}
                                    alt={`${method.title} logo`}
                                    width={40}
                                    height={40}
                                    className="h-auto w-full object-contain drop-shadow-sm"
                                />
                            ) : (
                                <Landmark className="size-6 text-gray-400 dark:text-slate-500" strokeWidth={1.5} />
                            )}
                        </div>
                        <div>
                            <h3 className="text-[16px] font-bold text-slate-900 dark:text-white leading-tight">
                                {method.title}
                            </h3>
                            {method.bankName && (
                                <p className="text-[13px] text-gray-500 dark:text-slate-400 mt-0.5">
                                    {method.bankName}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Account Details */}
                    <div className="space-y-4 border-t border-gray-100 dark:border-slate-700/80 pt-4">
                        {/* Account Title */}
                        <div className="flex flex-col gap-1.5">
                            <span className="text-xs font-medium text-gray-500 dark:text-slate-400 pr-1">
                                اکاؤنٹ کا نام
                            </span>
                            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-1 pl-1.5 dark:border-slate-600 dark:bg-slate-900/50">
                                <span 
                                    className="font-mono text-[13.5px] font-semibold tracking-tight text-slate-800 dark:text-slate-200 truncate flex-1 block pr-3"
                                    dir="ltr" 
                                    style={{ textAlign: 'right' }}
                                >
                                    {method.accountTitle}
                                </span>
                                <CopyButton textToCopy={method.accountTitle} />
                            </div>
                        </div>

                        {/* Account Number / IBAN */}
                        <div className="flex flex-col gap-1.5">
                            <span className="text-xs font-medium text-gray-500 dark:text-slate-400 pr-1">
                                اکاؤنٹ / آئی بی اے این (IBAN) نمبر
                            </span>
                            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-1 pl-1.5 dark:border-slate-600 dark:bg-slate-900/50">
                                <span 
                                    className="font-mono text-[13.5px] font-semibold tracking-tight text-slate-800 dark:text-slate-200 truncate flex-1 block pr-3"
                                    dir="ltr" 
                                    style={{ textAlign: 'right' }}
                                >
                                    {method.accountNumber}
                                </span>
                                <CopyButton textToCopy={method.accountNumber} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
