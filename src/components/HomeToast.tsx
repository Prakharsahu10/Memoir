"use client";

import { useToast } from "@/hooks/useToast";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

type ToastVariant = "default" | "destructive";

type ToastConfig = {
  title: string;
  description: string;
  variant: ToastVariant;
};

const TOAST_CONFIG: Record<string, ToastConfig> = {
  login: {
    title: "Logged in",
    description: "You have been successfully logged in",
    variant: "default",
  },
  signUp: {
    title: "Signed up",
    description: "Check your email for a confirmation link",
    variant: "default",
  },
  newNote: {
    title: "New Note",
    description: "You have successfully created a new note",
    variant: "default",
  },
  logOut: {
    title: "Logged out",
    description: "You have been successfully logged out",
    variant: "default",
  },
};

type ToastType = keyof typeof TOAST_CONFIG;

function isToastType(value: string | null): value is ToastType {
  return value !== null && value in TOAST_CONFIG;
}

function HomeToast() {
  const toastType = useSearchParams().get("toastType");
  const { toast } = useToast();

  const removeUrlParam = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("toastType");
    const newUrl = `${window.location.pathname}${searchParams.toString() ? `?${searchParams}` : ""}`;
    window.history.replaceState({}, "", newUrl);
  };

  useEffect(() => {
    if (isToastType(toastType)) {
      toast({
        ...TOAST_CONFIG[toastType],
      });

      removeUrlParam();
    }
  }, [toastType, toast]);

  return null;
}

export default HomeToast;
