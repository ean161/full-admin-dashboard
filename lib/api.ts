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
                toast.success(res.message);
            } else if (res?.status == "error") {
                toast.error(res.message);
            }
        }

        return res;
    } catch (err: any) {
        if (!data.isSilent) {
            toast.error(err?.message ?? "Lỗi không xác định");
        }
    }
}
