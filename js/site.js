/* ============================================================
   SITE SETTINGS — fill these in, nothing else needs editing.
   Leave a setting as "" to keep its default behavior.
   ============================================================ */
const SITE = {
  bookingUrl: "book.html", // The booking page. Set to "" to send "Book a Lesson" to Contact instead.
  calendlyUrl: "",   // Or a Calendly link. If neither is set, "Book a Lesson" goes to the Contact page.
  email: "",         // Business email, shown in the footer and on Contact.
  instagram: "",     // Full Instagram URL
  facebook: ""       // Full Facebook URL
};

/* Mobile menu */
const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("site-nav");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && nav.classList.contains("open")) { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); menuBtn.focus(); }
  });
}

/* Booking links */
if (SITE.bookingUrl) {
  document.querySelectorAll("[data-book]").forEach(a => { a.href = SITE.bookingUrl; });
} else if (SITE.calendlyUrl) {
  document.querySelectorAll("[data-book]").forEach(a => { a.href = SITE.calendlyUrl; a.target = "_blank"; a.rel = "noopener"; });
}

/* Email and social links: shown only once filled in above */
document.querySelectorAll("[data-email]").forEach(a => {
  if (SITE.email) { a.href = "mailto:" + SITE.email; a.textContent = SITE.email; a.hidden = false; }
});
["instagram", "facebook"].forEach(k => {
  document.querySelectorAll('[data-social="' + k + '"]').forEach(a => {
    if (SITE[k]) { a.href = SITE[k]; a.hidden = false; }
  });
});

/* Forms: not connected to anything yet, so say so plainly */
document.querySelectorAll("form[data-form]").forEach(f => {
  f.addEventListener("submit", e => {
    e.preventDefault();
    const msg = f.querySelector(".form-msg");
    const name = f.querySelector("[name=name]"), email = f.querySelector("[name=email]");
    if ((name && !name.value.trim()) || (email && !/^\S+@\S+\.\S+$/.test(email.value))) {
      msg.textContent = "Please add your name and a valid email so we can reply.";
    } else {
      msg.textContent = "Thank you! This form isn't connected yet, so nothing was sent.";
    }
    msg.classList.add("show");
  });
});

/* Footer year */
document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
