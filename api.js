require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// ✅ السماح الكامل من أي مكان لحل مشكلة CORS
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// ✅ مسار فحص حالة البوت
app.get('/api/status', (req, res) => {
    res.json({ 
        online: true, 
        timestamp: new Date().toISOString(),
        message: '✅ البوت شغال ويتصل بنجاح!'
    });
});

// ✅ مسار التحقق من الصلاحيات
app.get('/api/auth-check', (req, res) => {
    const key = req.headers['x-api-key'];
    
    // تحقق من كلمة السر
    if (key !== process.env.API_SECRET) {
        return res.json({ 
            success: false, 
            message: '❌ كلمة السر غير متطابقة' 
        });
    }

    // ✅ الدخول ناجح — صلاحيات المدير
    res.json({ 
        success: true, 
        isStaff: true,
        isAdmin: true,
        message: '✅ تم التحقق بنجاح — أهلاً بك يا مدير!'
    });
});

// ✅ تشغيل الخادم على المنفذ الصحيح لـ Discloud
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🌐 خادم الربط شغال على المنفذ ${PORT}`);
    console.log(`✅ النظام جاهز لاستقبال الطلبات!`);
});
