
/* ========================================
   GUNAWAN BROTHERS - PRICING ORDER
======================================== */

// Ganti dengan nomor WhatsApp bisnis Coach.
// Gunakan kode negara tanpa tanda +, spasi, atau tanda -.
// Contoh format Indonesia: 6281234567890
const WHATSAPP_NUMBER = "62811378356";

const orderForm = document.getElementById("orderForm");
const packageSelect = document.getElementById("websitePackage");

// Pilih paket dari tombol kartu harga
document.querySelectorAll("[data-package]").forEach((button) => {
    button.addEventListener("click", () => {
        packageSelect.value = button.dataset.package;
    });
});

// Kirim detail pesanan melalui WhatsApp
orderForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (
        !WHATSAPP_NUMBER ||
        WHATSAPP_NUMBER === "61811378356"
    ) {
        alert("Coach perlu mengisi nomor WhatsApp bisnis di pricing.js.");
        return;
    }

    const name = document.getElementById("customerName").value.trim();
    const email = document.getElementById("customerEmail").value.trim();
    const selectedPackage = packageSelect.value;
    const details = document.getElementById("projectDetails").value.trim();

    const message = [
        "Hello Gunawan Brothers!",
        "",
        "I would like to order a website.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Package: ${selectedPackage}`,
        `Project Details: ${details}`,
        "",
        "Please contact me to discuss the project. Thank you."
    ].join("\n");

    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
});
