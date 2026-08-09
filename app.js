// عنوان خادم الربط
const API_URL = 'https://timeout-appeals.discloud.app/api/status'

// دالة إرسال الطلبات للخادم
async function apiRequest(endpoint, method = 'GET', body = null) {
    try {
        const options = {
            method,
            headers: { 'Content-Type': 'application/json' }
        };
        if (body) options.body = JSON.stringify(body);

        const res = await fetch(`${API_URL}${endpoint}`, options);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error('❌ خطأ في الاتصال:', err);
        alert('تعذر الاتصال بالخادم! تحقق من تشغيل خادم الربط.');
        return null;
    }
}
