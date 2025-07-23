document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Theme logic
  const savedTheme = localStorage.getItem('theme') || 'theme-dark';
  body.classList.add(savedTheme);
  updateThemeToggleIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('theme-dark');
    body.classList.toggle('theme-dark', !isDark);
    body.classList.toggle('theme-light', isDark);
    const newTheme = isDark ? 'theme-light' : 'theme-dark';
    localStorage.setItem('theme', newTheme);
    updateThemeToggleIcon(newTheme);
  });

  function updateThemeToggleIcon(currentTheme) {
    const icon = themeToggle.querySelector('i');
    icon.className = currentTheme === 'theme-dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  fetch('content.json')
    .then(response => response.json())
    .then(data => {
      document.getElementById('logo-text').textContent = data.profile.logo_text;
      document.getElementById('footer-name').textContent = data.profile.name;
      document.getElementById('current-year').textContent = new Date().getFullYear();
      document.getElementById('copyright-text').textContent = data.general_text.copyright_text;

      document.getElementById('about-section-title').textContent = data.sections_titles.about;
      document.getElementById('experience-education-section-title').textContent = data.sections_titles.experience_education;
      document.getElementById('skills-section-title').textContent = data.sections_titles.skills;
      document.getElementById('projects-section-title').textContent = data.sections_titles.projects;
      document.getElementById('contact-call-to-action-title').textContent = data.sections_titles.contact_call_to_action_title;
      document.getElementById('experience-tab-button').textContent = data.sections_titles.experience_tab;
      document.getElementById('education-tab-button').textContent = data.sections_titles.education_tab;

      document.getElementById('hero-greeting').textContent = data.general_text.greeting;
      document.getElementById('hero-name').innerHTML = `<span>${data.profile.first_name}</span> ${data.profile.last_name}`;
      document.getElementById('hero-title').textContent = data.profile.title;
      document.getElementById('profile-pic').src = data.profile.profile_picture;
      document.getElementById('profile-pic').alt = `Profile Picture of ${data.profile.name}`;
      document.getElementById('my-projects-button').textContent = data.general_text.my_projects_button;
      document.getElementById('lets-connect-button').textContent = data.general_text.lets_connect_button;

      const heroSocialLinks = document.getElementById('hero-social-links');
      heroSocialLinks.innerHTML = '';
      data.social_links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        a.setAttribute('aria-label', link.platform);
        a.innerHTML = `<i class="${link.icon}"></i>`;
        heroSocialLinks.appendChild(a);
      });

      document.getElementById('about-description-paragraph1').textContent = data.about.description_p1;
      document.getElementById('about-description-paragraph2').textContent = data.about.description_p2;
      document.getElementById('about-image-src').src = data.about.about_image;
      document.getElementById('about-image-src').alt = `About ${data.profile.name}`;

      const aboutDetails = document.getElementById('about-details-blocks');
      aboutDetails.innerHTML = '';
      data.about_details_sections.forEach(section => {
        const block = document.createElement('div');
        block.classList.add('about-detail-block');
        block.innerHTML = `<h4>${section.title}</h4><ul>${section.items.map(i => `<li>${i}</li>`).join('')}</ul>`;
        aboutDetails.appendChild(block);
      });

      const expPane = document.getElementById('experience-pane');
      expPane.innerHTML = '';
      data.experience.forEach(exp => {
        const item = document.createElement('div');
        item.classList.add('exp-edu-item');
        item.innerHTML = `
          <h3>${exp.position}</h3>
          <p class="company-name">${exp.company}</p>
          <p class="duration">${exp.years}</p>
          ${exp.description ? `<ul class="exp-edu-description"><li>${exp.description}</li></ul>` : ''}`;
        expPane.appendChild(item);
      });

      const eduPane = document.getElementById('education-pane');
      eduPane.innerHTML = '';
      data.education.forEach(edu => {
        const item = document.createElement('div');
        item.classList.add('exp-edu-item');
        item.innerHTML = `
          <h3>${edu.degree}</h3>
          <p class="institution-name">${edu.institution}</p>
          <p class="duration">${edu.years}</p>`;
        eduPane.appendChild(item);
      });

      const skillsGrid = document.getElementById('skills-grid');
      skillsGrid.innerHTML = '';
      data.skills.forEach(skill => {
        const item = document.createElement('div');
        item.classList.add('skill-item');
        item.innerHTML = `
          <h4>${skill.name}</h4>
          <p>${skill.description}</p>
          <div class="skill-level-bar">
            <div class="skill-level-fill" style="width: ${skill.level}%;"></div>
          </div>
          <div class="skill-level-indicator">${skill.level}%</div>`;
        skillsGrid.appendChild(item);
      });

      const projectsGrid = document.getElementById('projects-grid');
      projectsGrid.innerHTML = '';
      data.projects.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        card.innerHTML = `
          <img src="${project.image}" alt="${project.title}">
          <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank" class="btn btn-primary">View Project</a>
          </div>`;
        projectsGrid.appendChild(card);
      });

      document.getElementById('contact-call-to-action-paragraph').textContent = data.general_text.contact_call_to_action_paragraph;
      document.getElementById('email-label').textContent = data.general_text.email_label;
      document.getElementById('phone-label').textContent = data.general_text.phone_label;
      document.getElementById('location-label').textContent = data.general_text.location_label;
      document.getElementById('connect-label').textContent = data.general_text.connect_label;
      document.getElementById('contact-email').textContent = data.contact.email;
      document.getElementById('contact-phone').textContent = data.contact.phone;
      document.getElementById('contact-location').textContent = data.contact.location;

      const contactLinks = document.getElementById('social-links-contact');
      contactLinks.innerHTML = '';
      data.social_links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        a.setAttribute('aria-label', link.platform);
        a.innerHTML = `<i class="${link.icon}"></i>`;
        contactLinks.appendChild(a);
      });

      const footerLinks = document.getElementById('footer-social-links');
      footerLinks.innerHTML = '';
      data.social_links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        a.setAttribute('aria-label', link.platform);
        a.innerHTML = `<i class="${link.icon}"></i>`;
        footerLinks.appendChild(a);
      });
    })
    .catch(error => {
      console.error('Error loading content.json:', error);
      document.body.innerHTML = `<div style="padding: 2rem; text-align: center; font-family: sans-serif; color: red;">Failed to load content. Please make sure 'content.json' is available and hosted correctly.</div>`;
    });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
