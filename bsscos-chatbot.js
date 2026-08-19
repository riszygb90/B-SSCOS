(function () {
    "use strict";

    if (document.getElementById("bsscosChatbot")) return;

    const content = {
        ms: {
            subtitle: "Pembantu maya koperasi",
            greeting: "Hai! Saya BukhariBot. Tanya saya tentang pesanan, harga, stok, pembayaran, pembatalan, lokasi atau akaun.",
            placeholder: "Taip soalan anda...",
            quick: [
                ["Cara pesan", "Bagaimana cara membuat pesanan?"],
                ["Harga barang", "Berapakah harga barang?"],
                ["Semak stok", "Bagaimana semak stok?"],
                ["Pembatalan", "Bagaimana hendak membatalkan pesanan?"],
                ["Waktu operasi", "Apakah waktu operasi koperasi?"],
                ["Lokasi", "Di manakah lokasi koperasi?"],
                ["Pembayaran", "Apakah kaedah pembayaran?"],
                ["Masalah login", "Saya menghadapi masalah login"]
            ]
        },
        en: {
            subtitle: "Cooperative virtual assistant",
            greeting: "Hi! I am BukhariBot. Ask me about orders, prices, stock, payments, cancellations, location or accounts.",
            placeholder: "Type your question...",
            quick: [
                ["How to order", "How do I make an order?"],
                ["Item prices", "What are the item prices?"],
                ["Check stock", "How do I check stock?"],
                ["Cancellation", "How do I cancel an order?"],
                ["Operating hours", "What are the cooperative operating hours?"],
                ["Location", "Where is the cooperative located?"],
                ["Payment", "What payment methods are available?"],
                ["Login problem", "I have a login problem"]
            ]
        }
    };

    function getLanguage() {
        return window.BSSCOSLanguage && window.BSSCOSLanguage.get() === "en" ? "en" : "ms";
    }

    const wrapper = document.createElement("div");
    wrapper.id = "bsscosChatbot";
    wrapper.innerHTML = `
        <button class="bsscos-chatbot-toggle" type="button" aria-label="Buka BukhariBot" aria-expanded="false">
            <i class="bi bi-chat-dots-fill"></i>
        </button>
        <section class="bsscos-chatbot-panel" role="dialog" aria-label="BukhariBot" aria-hidden="true">
            <header class="bsscos-chatbot-header">
                <div class="bsscos-chatbot-title">
                    <i class="bi bi-robot"></i>
                    <span><strong>BukhariBot</strong><small data-bot-subtitle></small></span>
                </div>
                <button class="bsscos-chatbot-close" type="button" aria-label="Tutup chatbot"><i class="bi bi-x-lg"></i></button>
            </header>
            <div class="bsscos-chatbot-messages" aria-live="polite">
                <div class="bsscos-chat-message bot" data-bot-greeting></div>
                <div class="bsscos-chatbot-quick" data-bot-quick></div>
            </div>
            <form class="bsscos-chatbot-form">
                <input type="text" maxlength="180" aria-label="Soalan chatbot" required>
                <button type="submit" aria-label="Hantar soalan"><i class="bi bi-send-fill"></i></button>
            </form>
        </section>`;
    document.body.appendChild(wrapper);

    const toggle = wrapper.querySelector(".bsscos-chatbot-toggle");
    const panel = wrapper.querySelector(".bsscos-chatbot-panel");
    const closeButton = wrapper.querySelector(".bsscos-chatbot-close");
    const form = wrapper.querySelector(".bsscos-chatbot-form");
    const input = form.querySelector("input");
    const messages = wrapper.querySelector(".bsscos-chatbot-messages");
    const subtitle = wrapper.querySelector("[data-bot-subtitle]");
    const greeting = wrapper.querySelector("[data-bot-greeting]");
    const quick = wrapper.querySelector("[data-bot-quick]");

    function renderLanguage() {
        const language = getLanguage();
        const copy = content[language];
        subtitle.textContent = copy.subtitle;
        greeting.textContent = copy.greeting;
        input.placeholder = copy.placeholder;
        quick.innerHTML = copy.quick.map(function (item) {
            return '<button type="button" data-question="' + escapeAttribute(item[1]) + '">' + item[0] + '</button>';
        }).join("");
    }

    function escapeAttribute(value) {
        return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    }

    function setOpen(open) {
        panel.classList.toggle("is-open", open);
        panel.setAttribute("aria-hidden", String(!open));
        toggle.setAttribute("aria-expanded", String(open));
        toggle.innerHTML = open ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-chat-dots-fill"></i>';
        if (open) input.focus();
    }

    function answerMalay(text) {
        if (/(tak cukup|tidak cukup|habis|kehabisan|tukar|ubah).*(saiz|size|barang|stok)|(saiz|size).*(tukar|ubah|tak cukup|tidak cukup)/.test(text)) {
            return "Jika barang tidak mencukupi, stok habis atau anda mahu menukar saiz, sila hubungi guru koperasi melalui WhatsApp untuk bantuan.";
        }
        if (/(harga|price|berapa rm|berapa ringgit|kos)/.test(text)) {
            return "Harga setiap item dipaparkan pada halaman Pesanan. Pilih tingkatan untuk melihat harga seunit, kuantiti dan jumlah automatik.";
        }
        if (/(batal|pembatalan|cancel)/.test(text)) {
            return "Untuk pembatalan pesanan dalam versi frontend ini, sila hubungi guru koperasi dan berikan ID atau ringkasan pesanan anda.";
        }
        if (/(waktu|masa operasi|operating|buka|tutup|jam berapa)/.test(text)) {
            return "Waktu operasi koperasi ialah Isnin hingga Jumaat, 8:00 pagi hingga 4:00 petang.";
        }
        if (/(lokasi|alamat|location|di mana|kat mana|arah|map|peta)/.test(text)) {
            return "Koperasi berada di SMK Syed Mohamed Al-Bukhary. Buka bahagian Lokasi Kami pada Laman Utama untuk peta dan arah perjalanan.";
        }
        if (/(kaedah pembayaran|cara bayar|bayar|payment|duitnow|qr)/.test(text)) {
            return "Kaedah pembayaran yang dipaparkan ialah QR DuitNow. Semak jumlah, imbas QR dan simpan bukti pembayaran sementara.";
        }
        if (/(tak boleh login|tidak boleh login|masalah login|gagal login|lupa password|lupa kata laluan|akaun tak dapat|account problem)/.test(text)) {
            return "Pastikan e-mel dan kata laluan betul. Jika terlupa, gunakan Lupa kata laluan pada halaman Login. Akaun frontend hanya disimpan pada pelayar yang sama.";
        }
        if (/(password|kata laluan|daftar|akaun|login|log masuk)/.test(text)) {
            return "Kata laluan mesti mempunyai minimum 6 aksara, sekurang-kurangnya satu huruf besar, satu huruf kecil dan satu simbol.";
        }
        if (/(stok|stock|ada barang|ketersediaan|tersedia)/.test(text)) {
            return "Buka halaman Stok untuk melihat T-Shirt PJ, Seluar PJ, T-Shirt Rasmi, T-Shirt Rumah Sukan dan item lain. Hubungi guru koperasi untuk pengesahan terkini.";
        }
        if (/(pesan|order|tempah|beli)/.test(text)) {
            return "Buka halaman Pesanan, pilih tingkatan, pilih item atau saiz, kemudian semak Ringkasan Pesanan. Draf pesanan disimpan automatik pada peranti ini.";
        }
        if (/(cetak|print|download|muat turun|ringkasan)/.test(text)) {
            return "Ringkasan pesanan boleh disemak terus pada halaman Pesanan sebelum pembayaran dilengkapkan.";
        }
        if (/(siap|ambil|collection|kutip|berapa hari)/.test(text)) {
            return "Pesanan biasanya disediakan dalam tempoh 2 hari bekerja. Simpan ringkasan dan ID pesanan jika tersedia.";
        }
        if (/(resit|receipt|bukti)/.test(text)) {
            return "Simpan bukti pembayaran dan ringkasan pesanan. Ringkasan yang dimuat turun ialah bukti sementara, bukan resit rasmi.";
        }
        if (/(hubungi|contact|telefon|whatsapp|guru)/.test(text)) {
            return "Gunakan butang WhatsApp atau maklumat hubungan pada bahagian bawah halaman untuk menghubungi guru koperasi.";
        }
        return "Maaf, saya belum pasti tentang soalan itu. Cuba tanya tentang pesanan, harga, stok, pembatalan, waktu operasi, lokasi, pembayaran atau login.";
    }

    function answerEnglish(text) {
        if (/(not enough|out of stock|change|exchange).*(size|item|stock)|(size).*(change|exchange|not enough)/.test(text)) return "For insufficient items, out-of-stock products or size changes, please contact the cooperative teacher via WhatsApp.";
        if (/(price|cost|how much)/.test(text)) return "Every item price is shown on the Order page. Select a form to view unit prices, quantities and the automatic total.";
        if (/(cancel|cancellation)/.test(text)) return "For cancellation in this frontend version, contact the cooperative teacher and provide your order ID or summary.";
        if (/(hours|opening|open|close|time)/.test(text)) return "The cooperative operates Monday to Friday, from 8:00 AM to 4:00 PM.";
        if (/(location|address|where|direction|map)/.test(text)) return "The cooperative is at SMK Syed Mohamed Al-Bukhary. Open Our Location on the Home page for the map and directions.";
        if (/(payment|pay|duitnow|qr)/.test(text)) return "The displayed payment method is DuitNow QR. Check the total, scan the QR code and keep your temporary payment proof.";
        if (/(cannot login|login problem|forgot password|account problem)/.test(text)) return "Check your email and password. Use Forgot password on the Login page if needed. Frontend accounts are stored only in the same browser.";
        if (/(password|register|account|login|sign in)/.test(text)) return "A password needs at least 6 characters, one uppercase letter, one lowercase letter and one symbol.";
        if (/(stock|available|availability)/.test(text)) return "Open the Stock page to check T-Shirt PJ, Seluar PJ, Official T-Shirt, Sports House T-Shirt and other items. Contact the cooperative teacher for confirmation.";
        if (/(order|buy)/.test(text)) return "Open the Order page, select a form, items and sizes, then review the Order Summary. Your unfinished order is saved automatically on this device.";
        if (/(print|download|summary)/.test(text)) return "You can review the order summary directly on the Order page before completing payment.";
        if (/(ready|collect|collection|how many days)/.test(text)) return "Orders are normally prepared within 2 working days. Keep your order summary and ID when available.";
        if (/(receipt|proof)/.test(text)) return "Keep your payment proof and order summary. The downloaded summary is temporary and is not an official receipt.";
        if (/(contact|phone|whatsapp|teacher)/.test(text)) return "Use the WhatsApp button or the contact information in the footer to reach the cooperative teacher.";
        return "I am not sure about that yet. Try asking about orders, prices, stock, cancellation, operating hours, location, payment or login.";
    }

    function answer(question) {
        const text = question.toLowerCase();
        return getLanguage() === "en" ? answerEnglish(text) : answerMalay(text);
    }

    function addMessage(text, type) {
        const message = document.createElement("div");
        message.className = "bsscos-chat-message " + type;
        message.textContent = text;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }

    function submitQuestion(question) {
        const clean = question.trim();
        if (!clean) return;
        addMessage(clean, "user");
        window.setTimeout(function () { addMessage(answer(clean), "bot"); }, 160);
    }

    toggle.addEventListener("click", function () { setOpen(!panel.classList.contains("is-open")); });
    closeButton.addEventListener("click", function () { setOpen(false); });
    form.addEventListener("submit", function (event) { event.preventDefault(); submitQuestion(input.value); input.value = ""; });
    quick.addEventListener("click", function (event) {
        const button = event.target.closest("[data-question]");
        if (button) submitQuestion(button.dataset.question || "");
    });
    document.addEventListener("bsscos-language-change", renderLanguage);
    document.addEventListener("keydown", function (event) { if (event.key === "Escape" && panel.classList.contains("is-open")) setOpen(false); });

    renderLanguage();
})();
