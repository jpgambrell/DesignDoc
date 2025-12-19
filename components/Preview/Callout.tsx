"use client";

import { Info, AlertTriangle, AlertCircle, Lightbulb } from "lucide-react";

interface CalloutProps {
  type: "info" | "warning" | "error" | "tip";
  children: React.ReactNode;
}

export function Callout({ type, children }: CalloutProps) {
  const configs = {
    info: {
      icon: Info,
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-800 dark:text-blue-200",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      border: "border-yellow-200 dark:border-yellow-800",
      text: "text-yellow-800 dark:text-yellow-200",
      iconColor: "text-yellow-600 dark:text-yellow-400",
    },
    error: {
      icon: AlertCircle,
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      text: "text-red-800 dark:text-red-200",
      iconColor: "text-red-600 dark:text-red-400",
    },
    tip: {
      icon: Lightbulb,
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      text: "text-green-800 dark:text-green-200",
      iconColor: "text-green-600 dark:text-green-400",
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div
      className={`my-4 p-4 rounded-lg border ${config.bg} ${config.border} ${config.text}`}
    >
      <div className="flex gap-3">
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.iconColor}`} />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

