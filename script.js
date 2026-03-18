document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  if (!form) {
    console.warn('contactForm not found on page');
    return;
  }

  const emailInput = form.querySelector('input[name="email"]');
  if (!emailInput) {
    console.warn('Email input not found in contactForm');
    return;
  }

  function validateEmail(email) {
    const regex = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    let isFormValid = true;

    const emailValue = emailInput.value.trim();
    if (!validateEmail(emailValue)) {
      emailInput.classList.add('is-invalid');
      isFormValid = false;
    } else {
      emailInput.classList.remove('is-invalid');
    }

    // Nếu cần check thêm các field khác, thêm tại đây.

    if (isFormValid) {
      // xoá class lỗi của các input nữa (nếu có) trước khi thông báo
      const invalidFields = form.querySelectorAll('.is-invalid');
      invalidFields.forEach((field) => field.classList.remove('is-invalid'));

      // Lấy dữ liệu từ form
      const nameInput = form.querySelector('input[name="name"]');
      const messageInput = form.querySelector('textarea[name="message"]');

      const nameValue = nameInput ? nameInput.value.trim() : '';
      const messageValue = messageInput ? messageInput.value.trim() : '';

      // Tạo object dữ liệu
      const submissionData = {
        name: nameValue,
        email: emailValue,
        message: messageValue,
        timestamp: new Date().toISOString()
      };

      // Chuyển thành JSON và lưu vào LocalStorage
      localStorage.setItem('contactSubmission', JSON.stringify(submissionData));

      alert('Gửi thông tin thành công!');
      // hoặc dùng modal Bootstrap (đã có sẵn phía HTML):
      // const successModal = new bootstrap.Modal(document.getElementById('successModal'));
      // successModal.show();

      form.reset();
    }
  });
});