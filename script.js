document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    body.classList.add('theme-dark');
    localStorage.setItem('theme', 'theme-dark');
    updateThemeToggleIcon('theme-dark');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.remove('theme-light', 'theme-dark');
        body.classList.add(savedTheme);
        updateThemeToggleIcon(savedTheme);
    } else {
        updateThemeToggleIcon('theme-dark');
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('theme-dark')) {
            body.classList.remove('theme-dark');
            body.classList.add('theme-light');
            localStorage.setItem('theme', 'theme-light');
            updateThemeToggleIcon('theme-light');
        } else {
            body.classList.remove('theme-light');
            body.classList.add('theme-dark');
            localStorage.setItem('theme', 'theme-dark');
            updateThemeToggleIcon('theme-dark');
        }
    });

    function updateThemeToggleIcon(currentTheme) {
        const icon = themeToggle.querySelector('i');
        if (currentTheme === 'theme-dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    fetch('content.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('logo-text').textContent = data.profile.logo_text;
            document.getElementById('hero-greeting').textContent = data.general_text.greeting;
            document.getElementById('hero-name').innerHTML = `<span>${data.profile.first_name}</span> ${data.profile.last_name}`;
            document.getElementById('hero-title').textContent = data.profile.title;
            document.getElementById('profile-pic').src = data.profile.profile_picture;
            document.getElementById('about-image-src').src = data.about.about_image;
            document.getElementById('about-description-paragraph1').textContent = data.about.description_p1;
            document.getElementById('about-description-paragraph2').textContent = data.about.description_p2;

            document.getElementById('about-section-title').textContent = data.sections_titles.about;
            document.getElementById('experience-education-section-title').textContent = data.sections_titles.experience_education;
            document.getElementById('skills-section-title').textContent = data.sections_titles.skills;
            document.getElementById('projects-section-title').textContent = data.sections_titles.projects;
            document.getElementById('contact-call-to-action-title').textContent = data.sections_titles.contact_call_to_action_title;

            // FIX tab button text
            document.getElementById('experience-tab-button').textContent = data.sections_titles.experience_tab || "Experience";
            document.getElementById('education-tab-button').textContent = data.sections_titles.education_tab || "Education";

            document.getElementById('contact-call-to-action-paragraph').textContent = data.general_text.contact_call_to_action_paragraph;
            document.getElementById('email-label').textContent = data.general_text.email_label;
            document.getElementById('phone-label').textContent = data.general_text.phone_label;
            document.getElementById('location-label').textContent = data.general_text.location_label;
            document.getElementById('connect-label').textContent = data.general_text.connect_label;

            document.getElementById('contact-email').textContent = data.contact.email;
            document.getElementById('contact-phone').textContent = data.contact.phone;
            document.getElementById('contact-location').textContent = data.contact.location;

            document.getElementById('footer-name').textContent = data.profile.name;
            document.getElementById('copyright-text').textContent = data.general_text.copyright_text;
            document.getElementById('current-year').textContent = new Date().getFullYear();

            document.getElementById('my-projects-button').textContent = data.general_text.my_projects_button;
            document.getElementById('lets-connect-button').textContent = data.general_text.lets_connect_button;

            // Experience & Education Tabs
            const experiencePane = document.getElementById('experience-pane');
            const educationPane = document.getElementById('education-pane');
            experiencePane.innerHTML = '';
            educationPane.innerHTML = '';

            data.experience.forEach(exp => {
                if (exp.position || exp.company || exp.years || exp.description) {
                    const div = document.createElement('div');
                    div.classList.add('exp-edu-item');
                    div.innerHTML = `
                        <h3>${exp.position || ''}</h3>
                        <p class="company-name">${exp.company || ''}</p>
                        <p class="duration">${exp.years || ''}</p>
                        ${exp.description ? `<ul class="exp-edu-description"><li>${exp.description}</li></ul>` : ''}
                    `;
                    experiencePane.appendChild(div);
                }
            });

            data.education.forEach(edu => {
                if (edu.degree || edu.institution || edu.years || edu.description) {
                    const div = document.createElement('div');
                    div.classList.add('exp-edu-item');
                    div.innerHTML = `
                        <h3>${edu.degree || ''}</h3>
                        <p class="institution-name">${edu.institution || ''}</p>
                        <p class="duration">${edu.years || ''}</p>
                        ${edu.description ? `<ul class="exp-edu-description"><li>${edu.description}</li></ul>` : ''}
                    `;
                    educationPane.appendChild(div);
                }
            });

            const tabButtons = document.querySelectorAll('.tab-btn');
            const tabPanes = document.querySelectorAll('.tab-pane');

            tabButtons.forEach((btn, idx) => {
                btn.addEventListener('click', () => {
                    tabButtons.forEach(b => b.classList.remove('active'));
                    tabPanes.forEach(p => p.classList.remove('active'));

                    btn.classList.add('active');
                    tabPanes[idx].classList.add('active');
                });
            });

            // Default active tab if not set
            const activeBtn = document.querySelector('.tab-btn.active') || tabButtons[0];
            const activePane = document.querySelector('.tab-pane.active') || tabPanes[0];
            if (activeBtn && activePane) {
                activeBtn.classList.add('active');
                activePane.classList.add('active');
            }

            // About Details
            const aboutDetailsWrapper = document.getElementById('about-details-blocks');
            aboutDetailsWrapper.innerHTML = '';
            data.about_details_sections.forEach(section => {
                const block = document.createElement('div');
                block.classList.add('about-detail-block');
                block.innerHTML = `<h4>${section.title}</h4><ul>${section.items.map(item => `<li>${item}</li>`).join('')}</ul>`;
                aboutDetailsWrapper.appendChild(block);
            });

            // Skills
            const skillsGrid = document.getElementById('skills-grid');
            skillsGrid.innerHTML = '';
            data.skills.forEach(skill => {
                const div = document.createElement('div');
                div.classList.add('skill-item');
                div.innerHTML = `
                    <h4>${skill.name}</h4>
                    <p>${skill.description}</p>
                    <div class="skill-level-bar">
                        <div class="skill-level-fill" style="width: ${skill.level}%"></div>
                    </div>
                    <div class="skill-level-indicator">${skill.level}%</div>
                `;
                skillsGrid.appendChild(div);
            });

            // Projects
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
                    </div>
                `;
                projectsGrid.appendChild(card);
            });

            // Social Links
            const socialSelectors = ['hero-social-links', 'social-links-contact', 'footer-social-links'];
            socialSelectors.forEach(id => {
                const container = document.getElementById(id);
                container.innerHTML = '';
                data.social_links.forEach(link => {
                    const a = document.createElement('a');
                    a.href = link.url;
                    a.target = '_blank';
                    a.setAttribute('aria-label', link.platform);
                    a.innerHTML = `<i class="${link.icon}"></i>`;
                    container.appendChild(a);
                });
            });
        });
});
