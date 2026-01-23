export const parseError = (data: any) => {
    try {
        const zodErr = JSON.parse(data.message)[0].message;
        if (zodErr) {
            return zodErr;
        }
    } catch (err: any) { }

    const msg = String(data?.message);
    if (msg.startsWith("Failed query:") || msg.includes('"')) {
        return "Hệ thống đang quá tải, vui lòng thử lại sau";
    }

    return msg;
}