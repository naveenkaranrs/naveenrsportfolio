/**
 * Project Data and Functionality
 * Handles rendering, filtering, search, and modal interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Project Data ---
    const projectsData = [
        {
            id: 'smith-chart',
            title: 'Data-Driven Interactive Smith Chart Visualization',
            role: 'Technical Developer',
            duration: 'Jan 2026',
            categories: ['software', 'uiux'],
            tags: ['HTML', 'CSS', 'JavaScript', 'RF Concepts', 'Data Visualization'],
            image: 'assets/images/projects/project1.png',
            shortDesc: 'Interactive web-based Smith Chart tool for Transmission Lines analysis.',
            details: `
                <div class="modal__section">
                    <h3 class="modal__section-title">Overview</h3>
                    <p>An interactive, data-driven web visualization of the Smith Chart for analyzing transmission lines, aimed at simplifying complex RF (Radio Frequency) concepts for engineering students.</p>
                </div>
                <div class="modal__section">
                    <h3 class="modal__section-title">Challenge & Approach</h3>
                    <p>Traditional Smith Charts are static and difficult to interpret. This tool digitizes the experience, allowing real-time plotting of impedance and VSWR. Built entirely with HTML, CSS, and vanilla JavaScript using custom canvas drawing algorithms.</p>
                </div>
                <div class="modal__section">
                    <h3 class="modal__section-title">Impact</h3>
                    <p>Improved conceptual understanding for students by providing immediate visual feedback on complex RF calculations.</p>
                </div>
            `
        },
        {
            id: 'pharmatrust',
            title: 'IoT Monitoring & Digital Ledger for Pharma Supply Chain',
            role: 'Front-End Hardware Developer',
            duration: 'Nov/Dec 2025',
            categories: ['iot', 'hardware'],
            tags: ['ESP32', 'DHT11', 'MQ-2', 'ThingSpeak', 'C++'],
            image: 'assets/images/projects/project2.png',
            shortDesc: 'IoT-based environment monitoring system for pharmaceutical logistics (PharmaTrust).',
            details: `
                <div class="modal__section">
                    <h3 class="modal__section-title">Overview</h3>
                    <p>An IoT monitoring solution to ensure the integrity of pharmaceutical supply chains by tracking temperature, humidity, and gas levels in transit.</p>
                </div>
                <div class="modal__section">
                    <h3 class="modal__section-title">Technical Implementation</h3>
                    <ul>
                        <li>Interfaced ESP32 with DHT11 (temp/humidity), MQ-2 (gas), and pressure sensors.</li>
                        <li>Implemented robust data logging to ThingSpeak Cloud.</li>
                        <li>Developed a web dashboard for real-time visualization of sensor data.</li>
                    </ul>
                </div>
            `
        },
        {
            id: 'robotic-teleoperation',
            title: 'Real-Time Teleoperation Platform for Robotic Manipulator',
            role: 'Embedded Systems & Hardware Developer',
            duration: 'Nov/Dec 2025',
            categories: ['hardware', 'iot'],
            tags: ['ESP8266', 'STM32', 'Servo Motors', 'Wi-Fi', 'C++'],
            image: 'assets/images/projects/project3.jpg',
            shortDesc: 'Wi-Fi enabled teleoperation system for a robotic arm.',
            details: `
                <div class="modal__section">
                    <h3 class="modal__section-title">Overview</h3>
                    <p>Developed a low-latency teleoperation platform allowing remote control of a robotic manipulator via Wi-Fi.</p>
                </div>
                <div class="modal__section">
                    <h3 class="modal__section-title">Technical Implementation</h3>
                    <p>Utilized an STM32 Nucleo Board combined with an ESP8266 Wi-Fi module to control servo motors through a PWM driver. Built a custom web interface (HTML/CSS/JS) to send real-time control signals to the hardware.</p>
                </div>
            `
        },
        {
            id: 'accent-conversion',
            title: 'UI/UX for Accent Conversion of Speaker in Audio',
            role: 'UI/UX Designer and Developer',
            duration: 'July - Nov 2024',
            categories: ['uiux', 'software'],
            tags: ['Python', 'Pydub', 'Audio Processing', 'UI Design'],
            image: 'assets/images/projects/project4.jpeg',
            shortDesc: 'User interface for an AI-powered audio accent conversion tool.',
            details: `
                <div class="modal__section">
                    <h3 class="modal__section-title">Overview</h3>
                    <p>Designed and developed an intuitive interface for a complex audio processing backend that converts speaker accents in audio files.</p>
                </div>
                <div class="modal__section">
                    <h3 class="modal__section-title">Role & Impact</h3>
                    <p>Bridged the gap between complex Python audio processing scripts (Pydub, MP3/WAV manipulation) and end-users by creating a clean, accessible frontend.</p>
                </div>
            `
        },
        {
            id: 'attendance-system',
            title: 'IoT-Based Attendance Monitoring System',
            role: 'System Developer and Designer',
            duration: 'July - Nov 2024',
            categories: ['iot', 'hardware'],
            tags: ['ESP32-S3', 'R307S Fingerprint', 'ThingSpeak', 'MATLAB'],
            image: 'assets/images/projects/project5.jpg',
            shortDesc: 'Biometric attendance system using ESP32-S3 and cloud integration.',
            details: `
                <div class="modal__section">
                    <h3 class="modal__section-title">Overview</h3>
                    <p>A smart, contactless (or biometric) attendance logging system built for educational or corporate environments.</p>
                </div>
                <div class="modal__section">
                    <h3 class="modal__section-title">Technical Implementation</h3>
                    <ul>
                        <li>Interfaced R307S Fingerprint module with ESP32-S3 LilyGO.</li>
                        <li>Pushed attendance logs securely to ThingSpeak.</li>
                        <li>Used MATLAB for backend data processing and report generation.</li>
                    </ul>
                </div>
            `
        },
        {
            id: 'glucose-monitor',
            title: 'Advanced Glucose Monitoring System GUI',
            role: 'Lead Developer & UI Designer',
            duration: 'Dec 2024 - Apr 2025',
            categories: ['software', 'uiux'],
            tags: ['Python', 'PyQt6', 'Matplotlib', 'ThingSpeak'],
            image: 'assets/images/projects/project6.png',
            shortDesc: 'Desktop GUI for an advanced continuous glucose monitoring system.',
            details: `
                <div class="modal__section">
                    <h3 class="modal__section-title">Overview</h3>
                    <p>Developed a comprehensive desktop application using Python and PyQt6 to visualize continuous glucose monitoring data.</p>
                </div>
                <div class="modal__section">
                    <h3 class="modal__section-title">Features</h3>
                    <p>Integrated Matplotlib for real-time charting of glucose levels and connected to ThingSpeak for cloud data synchronization. Focused heavily on a clean, medical-grade UI/UX.</p>
                </div>
            `
        },
        {
            id: 'robotic-arm',
            title: 'Autonomous Robotic Arm for Material Handling',
            role: 'Embedded Systems Developer',
            duration: 'Dec 2024 - Apr 2025',
            categories: ['hardware', 'iot'],
            tags: ['STM32', 'SG90 Servos', 'ESP8266', 'Kinematics'],
            image: 'assets/images/projects/project7.jpg',
            shortDesc: '3-DOF robotic arm for automated industrial material handling.',
            details: `
                <div class="modal__section">
                    <h3 class="modal__section-title">Overview</h3>
                    <p>Designed and programmed a 3-Degree-Of-Freedom (3-DOF) robotic arm to automate material handling tasks in industrial settings.</p>
                </div>
                <div class="modal__section">
                    <h3 class="modal__section-title">Technical Implementation</h3>
                    <ul>
                        <li>Controlled SG90 servo motors using an STM32 Nucleo-F103RB.</li>
                        <li>Implemented manual control via potentiometers and autonomous control via ESP8266 Wi-Fi commands.</li>
                        <li>Designed dual 5V/3.3V power supply units for stable operation.</li>
                    </ul>
                </div>
            `
        },
        {
            id: 'sanitary-disposal',
            title: 'Sanitary Napkin Disposal Machine',
            role: 'Project Designer and Tester',
            duration: 'Dec 2023 - Apr 2024',
            categories: ['hardware'],
            tags: ['Sensors', 'Automated Control', 'Embedded Systems'],
            image: 'assets/images/projects/project8.jpg',
            shortDesc: 'Automated disposal machine aligned with Sustainable Development Goals (SDG).',
            details: `
                <div class="modal__section">
                    <h3 class="modal__section-title">Overview</h3>
                    <p>An eco-friendly, automated sanitary napkin disposal unit designed to align with UN Sustainable Development Goals for health and sanitation.</p>
                </div>
                <div class="modal__section">
                    <h3 class="modal__section-title">Implementation</h3>
                    <p>Integrated various sensors and an automated control system using embedded microcontrollers to ensure safe, touchless operation and efficient incineration/disposal.</p>
                </div>
            `
        }
    ];

    // --- DOM Elements ---
    const projectsGrid = document.getElementById('projects-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('project-search');

    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const modalCloseBtn = document.querySelector('.modal__close');

    // --- Render Projects ---
    function renderProjects(projects) {
        if (!projectsGrid) return;

        projectsGrid.innerHTML = '';

        if (projects.length === 0) {
            projectsGrid.innerHTML = '<div class="projects__empty">No projects found matching your criteria.</div>';
            return;
        }

        projects.forEach((project, index) => {
            const delay = index * 0.1;

            const card = document.createElement('div');
            card.className = 'project-card';
            card.style.animationDelay = `${delay}s`;

            // Generate tags HTML
            const tagsHtml = project.tags.slice(0, 3).map(tag => `<span class="badge">${tag}</span>`).join('');
            const extraTagHtml = project.tags.length > 3 ? `<span class="badge badge--purple">+${project.tags.length - 3}</span>` : '';

            card.innerHTML = `
                <div class="project-card__image-wrapper">
                    <img src="${project.image}" alt="${project.title}" class="project-card__img" style="width:100%; height:200px; object-fit:cover; border-bottom:var(--border-thin);">
                    <div class="project-card__overlay">
                        <button class="btn btn--primary btn--sm view-project-btn" data-id="${project.id}">View Details</button>
                    </div>
                </div>
                <div class="project-card__body">
                    <div class="project-card__tags">
                        ${tagsHtml}${extraTagHtml}
                    </div>
                    <h3 class="project-card__title">${project.title}</h3>
                    <div class="project-card__role">${project.role}</div>
                    <p class="project-card__desc">${project.shortDesc}</p>
                </div>
            `;

            projectsGrid.appendChild(card);
        });

        // Add event listeners to new buttons
        document.querySelectorAll('.view-project-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                openModal(id);
            });
        });
    }

    // Initial render
    renderProjects(projectsData);

    // --- Filtering ---
    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('is-active'));
                // Add to clicked
                btn.classList.add('is-active');

                const filterValue = btn.getAttribute('data-filter');
                filterAndSearchProjects(filterValue, searchInput ? searchInput.value : '');
            });
        });
    }

    // --- Searching ---
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const activeFilter = document.querySelector('.filter-btn.is-active').getAttribute('data-filter');
            filterAndSearchProjects(activeFilter, e.target.value);
        });
    }

    function filterAndSearchProjects(filter, searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();

        const filtered = projectsData.filter(project => {
            // Check category
            const matchCategory = filter === 'all' || project.categories.includes(filter);

            // Check search term
            const matchSearch = project.title.toLowerCase().includes(lowerSearch) ||
                project.tags.some(tag => tag.toLowerCase().includes(lowerSearch));

            return matchCategory && matchSearch;
        });

        renderProjects(filtered);
    }

    // --- Modal Functionality ---
    function openModal(projectId) {
        const project = projectsData.find(p => p.id === projectId);
        if (!project) return;

        const tagsHtml = project.tags.map(tag => `<span class="badge">${tag}</span>`).join('');

        modalContent.innerHTML = `
            <div class="modal__header">
                <h2 class="modal__title gradient-text">${project.title}</h2>
                <div class="modal__meta">
                    <span class="modal__meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        ${project.role}
                    </span>
                    <span class="modal__meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        ${project.duration}
                    </span>
                </div>
                <div class="modal__tech-tags">
                    ${tagsHtml}
                </div>
            </div>
            <div class="modal__body modal__body--grid">
                <div class="modal__text-content">
                    ${project.details}
                    
                    <div style="margin-top: var(--space-8); display: flex; gap: var(--space-4);">
                        <button class="btn btn--secondary" onclick="document.querySelector('.modal__close').click()">Back to Projects</button>
                    </div>
                </div>
                <div class="modal__image-content">
                    <img src="${project.image}" alt="${project.title}" style="width: 100%; border-radius: var(--radius-md); border: var(--border-thin); box-shadow: var(--shadow-lg);">
                </div>
            </div>
        `;

        modal.classList.add('is-active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        modal.classList.remove('is-active');
        document.body.style.overflow = '';
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('is-active')) {
            closeModal();
        }
    });
});
