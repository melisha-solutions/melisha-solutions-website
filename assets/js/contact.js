document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".php-email-form");
  const loading = form.querySelector(".loading");
  const errorMessage = form.querySelector(".error-message");
  const sentMessage = form.querySelector(".sent-message");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    loading.style.display = "block";
    errorMessage.style.display = "none";
    sentMessage.style.display = "none";

    const formData = new FormData(form);
    formData.append("access_key", "c8b17e95-0d08-425a-b6aa-df1290f8e778");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      loading.style.display = "none";

      if (response.ok && result.success) {
        sentMessage.style.display = "block";
        form.reset(); // Clear form fields
      } else {
        errorMessage.innerHTML = result.message || "Something went wrong.";
        errorMessage.style.display = "block";
      }
    } catch (error) {
      loading.style.display = "none";
      errorMessage.innerHTML = "Failed to send message. Please try again.";
      errorMessage.style.display = "block";
    }
  });
});