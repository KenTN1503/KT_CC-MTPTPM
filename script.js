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

  const nameInput = form.querySelector('input[name="name"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  const formAlert = document.getElementById('formAlert');

  function showAlert(message, type) {
    formAlert.textContent = message;
    formAlert.className = 'alert alert-' + type;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    let isFormValid = true;

    // Validate Họ tên
    const nameValue = nameInput ? nameInput.value.trim() : '';
    if (nameInput) {
      if (!nameValue) {
        nameInput.classList.add('is-invalid');
        isFormValid = false;
      } else {
        nameInput.classList.remove('is-invalid');
      }
    }

    // Validate Email (Regex)
    const emailValue = emailInput.value.trim();
    if (!validateEmail(emailValue)) {
      emailInput.classList.add('is-invalid');
      isFormValid = false;
    } else {
      emailInput.classList.remove('is-invalid');
    }

    // Validate Lời nhắn
    const messageValue = messageInput ? messageInput.value.trim() : '';
    if (messageInput) {
      if (!messageValue) {
        messageInput.classList.add('is-invalid');
        isFormValid = false;
      } else {
        messageInput.classList.remove('is-invalid');
      }
    }

    if (!isFormValid) {
      // Hiển thị thông báo lỗi màu đỏ
      showAlert('Vui lòng kiểm tra lại thông tin đã nhập.', 'danger');
      return;
    }

    // Xoá tất cả class lỗi
    form.querySelectorAll('.is-invalid').forEach((f) => f.classList.remove('is-invalid'));

    // Lưu dữ liệu vào LocalStorage
    const submissionData = {
      name: nameValue,
      email: emailValue,
      message: messageValue,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('contactSubmission', JSON.stringify(submissionData));

    // Hiển thị thông báo thành công màu xanh
    showAlert('Gửi thông tin thành công!', 'success');
    form.reset();
  });
});