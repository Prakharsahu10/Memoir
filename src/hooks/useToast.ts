import { toast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  const showToast = ({
    title,
    description,
    variant = "default",
  }: ToastProps) => {
    if (variant === "destructive") {
      toast.error(title || "Error", {
        description,
      });
    } else {
      toast.success(title || "Success", {
        description,
      });
    }
  };

  return {
    toast: showToast,
  };
}
