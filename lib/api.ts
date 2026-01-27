import { toast } from "sonner";

type ApiProps = {
    isSilent?: boolean;
    url: string;
    method?: string;
    body?: any;
};

export async function api(data: ApiProps) {
    try {
        const req = await fetch(data.url, {
            method: data.method ?? "GET",
            body: data.body ?? null,
        });

        const res = await req.json();
        if (!data.isSilent && res?.message) {
            if (res?.status == "success") {
                toast.success(res.message, {
                    style: {
                        "--normal-bg":
                            "light-dark(var(--color-green-600), var(--color-green-400))",
                        "--normal-text": "var(--color-white)",
                        "--normal-border":
                            "light-dark(var(--color-green-600), var(--color-green-400))",
                    } as React.CSSProperties,
                });
            } else if (res?.status == "error") {
                toast.error(res.message, {
                    style: {
                        "--normal-bg":
                            "light-dark(var(--destructive), color-mix(in oklab, var(--destructive) 60%, var(--background)))",
                        "--normal-text": "var(--color-white)",
                        "--normal-border": "transparent",
                    } as React.CSSProperties,
                });
            }
        }

        return res;
    } catch (err: any) {
        if (!data.isSilent) {
            toast.error(err?.message ?? "Lỗi không xác định");
        }
    }
}
