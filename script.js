document.addEventListener('DOMContentLoaded', function() {
  // Функция для создания волнового эффекта
  function createWaveEffect(event, element) {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const wave = document.createElement('span');
    wave.className = 'wave';
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;
    
    element.appendChild(wave);
    
    setTimeout(() => {
      wave.remove();
    }, 600);
  }

  // Добавляем обработчики для всех кликабельных элементов
  function setupWaveEffects() {
    // Фото профиля
    document.getElementById('photoUpload').addEventListener('click', function(e) {
      createWaveEffect(e, this);
    });

    // Секции
    document.querySelectorAll('.resume-section').forEach(section => {
      section.addEventListener('click', function(e) {
        createWaveEffect(e, this);
      });
    });

    // Элементы опыта и образования
    document.querySelectorAll('.timeline-item, .education-item').forEach(item => {
      item.addEventListener('click', function(e) {
        createWaveEffect(e, this);
      });
    });

    // Навыки и языки
    document.querySelectorAll('.skill-tag, .language-item, .hobby-tag').forEach(item => {
      item.addEventListener('click', function(e) {
        createWaveEffect(e, this);
      });
    });

    // Кнопки
    document.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', function(e) {
        createWaveEffect(e, this);
      });
    });
  }

  // Загрузка фото профиля
  const photoUpload = document.getElementById('photoUpload');
  const photoInput = document.getElementById('photoInput');
  const profileImage = document.getElementById('profileImage');

  photoUpload.addEventListener('click', function() {
    photoInput.click();
  });

  photoInput.addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = function(event) {
        profileImage.src = event.target.result;
        localStorage.setItem('profilePhoto', event.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  });

  // Загружаем сохраненное фото при загрузке страницы
  if (localStorage.getItem('profilePhoto')) {
    profileImage.src = localStorage.getItem('profilePhoto');
  }

  // Сохранение изменений в LocalStorage
  const editableElements = document.querySelectorAll('[contenteditable="true"]');
  
  editableElements.forEach(element => {
    const key = 'resume-' + Array.from(element.parentNode.children).indexOf(element);
    
    if (localStorage.getItem(key)) {
      element.innerHTML = localStorage.getItem(key);
    }
    
    element.addEventListener('input', function() {
      localStorage.setItem(key, this.innerHTML);
    });
  });

  // Функции для добавления новых элементов
  function addLanguage() {
    const container = document.getElementById('languagesContainer');
    const newItem = document.createElement('div');
    newItem.className = 'language-item';
    newItem.setAttribute('contenteditable', 'true');
    newItem.innerHTML = `
      <span class="language-name">Новый язык</span>
      <span class="language-level">Уровень</span>
    `;
    container.appendChild(newItem);
    newItem.focus();
  }

  function addSkill() {
    const container = document.querySelector('.skills-list');
    const newItem = document.createElement('span');
    newItem.className = 'skill-tag';
    newItem.setAttribute('contenteditable', 'true');
    newItem.textContent = 'Новый навык';
    container.appendChild(newItem);
    newItem.focus();
  }

  function addHobby() {
    const container = document.getElementById('hobbiesContainer');
    const newItem = document.createElement('span');
    newItem.className = 'hobby-tag';
    newItem.setAttribute('contenteditable', 'true');
    newItem.innerHTML = '<i class="fas fa-plus"></i> Новое увлечение';
    container.appendChild(newItem);
    newItem.focus();
  }

  function addEducation() {
    const container = document.getElementById('educationContainer');
    const newItem = document.createElement('div');
    newItem.className = 'education-item';
    newItem.setAttribute('contenteditable', 'true');
    newItem.innerHTML = `
      <h4>Новое образование</h4>
      <div class="education-meta">
        <span class="education-place">Учебное заведение</span>
        <span class="education-date">Годы</span>
      </div>
      <div class="education-description">Описание</div>
    `;
    container.appendChild(newItem);
    newItem.focus();
  }

  function addExperience() {
    const container = document.getElementById('experienceContainer');
    const newItem = document.createElement('div');
    newItem.className = 'timeline-item';
    newItem.setAttribute('contenteditable', 'true');
    newItem.innerHTML = `
      <div class="timeline-header">
        <h4>Новая должность</h4>
        <span class="timeline-date">Годы</span>
      </div>
      <div class="timeline-company">Компания</div>
      <div class="timeline-description">
        - Обязанности<br>
        - Достижения
      </div>
    `;
    container.appendChild(newItem);
    newItem.focus();
  }

  // Назначение обработчиков кнопок
  document.getElementById('addLanguage').addEventListener('click', addLanguage);
  document.getElementById('addSkill').addEventListener('click', addSkill);
  document.getElementById('addHobby').addEventListener('click', addHobby);
  document.getElementById('addEducation').addEventListener('click', addEducation);
  document.getElementById('addExperience').addEventListener('click', addExperience);

  // Обработка кнопки сохранения в PDF
  document.getElementById('downloadBtn').addEventListener('click', function() {
    const element = document.getElementById('resumeContent');
    const opt = {
      margin: 10,
      filename: 'Мое_резюме.pdf',
      image: { 
        type: 'jpeg', 
        quality: 1.0
      },
      html2canvas: { 
        scale: 3,
        logging: false,
        useCORS: true,
        letterRendering: true,
        dpi: 300
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' 
      }
    };

    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.style.visibility = 'hidden';
    });

    html2pdf().set(opt).from(element).save().then(() => {
      buttons.forEach(btn => {
        btn.style.visibility = 'visible';
      });
    });
  });

  // Инициализация эффектов волны
  setupWaveEffects();
});