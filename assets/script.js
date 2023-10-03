let projects = [];

const portfolio = document.getElementById('Portfolio');

// Fonction pour créer la galerie à partir des données dans le fichier JSON
function createGallery(projects) {
    const galleryContainer = document.getElementById('gallery');

    // Effacez la galerie existante
    galleryContainer.innerHTML = '';

    // Vérifiez s'il y a des projets à afficher
    if (projects.length === 0) {
        galleryContainer.innerHTML = '<p>Aucun projet disponible.</p>';
        return;
    }

    // Créez un élément de galerie pour chaque projet
    projects.forEach(project => {

        const projectItem = document.createElement('div');
        projectItem.classList.add('gallery-item'); // Ajoutez des classes CSS ou des styles au besoin

        // Créez une image pour le projet
        const projectImage = document.createElement('img');
        projectImage.src = project.imageUrl; // Utilisez la propriété imageUrl de votre objet de projet
        projectImage.alt = project.imageAlt;

        // Créez un titre pour le projet
        const projectTitle = document.createElement('h2');
        projectTitle.textContent = project.title; // Utilisez la propriété title de votre objet de projet

        // Ajoutez l'image et le titre au projet
        projectItem.appendChild(projectImage);
        projectItem.appendChild(projectTitle);

        // Ajoutez un gestionnaire d'événements de clic au projet
        projectItem.addEventListener('click', () => {
            // Remplissez la modale avec les informations du projet
            const modal = document.getElementById('modal');
            const modalImage = document.getElementById('modal-image');
            const modalTitle = document.getElementById('modal-title');
            const modalDescription = document.getElementById('modal-description');
            const modalTechnologies = document.getElementById('modal-technologies');
            const modalGithublink = document.getElementById('modal-githublink');


            modalImage.src = project.imageUrl;
            modalImage.alt = project.imageAlt;;
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            modalTechnologies.innerHTML = '';
            project.technologies_used.forEach(technology => {
                const techElement = document.createElement('p');
                techElement.textContent = technology;
                modalTechnologies.appendChild(techElement);

            });


            const githubButton = document.createElement('button');
            githubButton.textContent = 'Voir sur GitHub';
            githubButton.addEventListener('click', () => {
                window.open(project.github_link, '_blank'); // Ouvre le lien dans un nouvel onglet
            });
            modalGithublink.innerHTML = ''; // Efface le contenu précédent dans modalGithublink
            modalGithublink.appendChild(githubButton);

            // Ouvrir la modale
            openModal();
        });


        // Ajoutez le projet à la galerie
        galleryContainer.appendChild(projectItem);
    });
}



// Gestionnaire d'événement pour fermer la modale
const closeButton = document.getElementById('closeBtn');
closeButton.addEventListener('click', closeModal);

// Utilisez fetch pour charger le fichier JSON et appeler createGallery lorsque les données sont prêtes
function updateProjects() {
    fetch('./assets/data.json')
        .then(response => response.json())
        .then(data => {
            createGallery(data.project); // Utilisez data.project car votre tableau de projets est dans une propriété "project"
            setupFilterButtons(data.project); // Appellez la fonction pour configurer les boutons de filtrage
        })
        .catch(error => console.error(error));
}

// Fonction pour configurer les boutons de filtrage
function setupFilterButtons(projects) {
    const filterButtonsContainer = document.getElementById('filters'); // Conteneur des boutons de filtrage

    // Créez le bouton "Tous les projets"
    const allProjectsButton = document.createElement('button');
    allProjectsButton.textContent = 'Tous les projets';
    allProjectsButton.classList.add('active');
    allProjectsButton.addEventListener('click', () => {
        // Affichez tous les projets sans filtre
        createGallery(projects);
        // Ajoutez la classe active au bouton "Tous les projets" et supprimez-la des autres boutons
        allProjectsButton.classList.add('active');
        filterButtonsContainer.querySelectorAll('button:not(:first-child)').forEach(button => {
            button.classList.remove('active');
        });
    });

    // Ajoutez le bouton "Tous les projets" au début des boutons de filtrage
    filterButtonsContainer.appendChild(allProjectsButton);

    // Collectez tous les types de projets uniques
    const uniqueTypes = [...new Set(projects.flatMap(project => project.type.map(t => t.typeName)))];

    // Créez des boutons pour chaque type de projet unique
    uniqueTypes.forEach(type => {
        const button = document.createElement('button');
        button.textContent = type; // Utilisez la propriété typeName pour le texte du bouton

        // Ajoutez un gestionnaire d'événements pour filtrer les projets
        button.addEventListener('click', () => {
            const selectedType = button.textContent;

            // Filtrer les projets en fonction du type sélectionné
            const filteredProjects = projects.filter(project =>
                project.type.some(t => t.typeName === selectedType)
            );

            // Mettre à jour la galerie avec les projets filtrés
            createGallery(filteredProjects);
            button.classList.add('active');
            filterButtonsContainer.querySelector('button:first-child').classList.remove('active');
            filterButtonsContainer.querySelectorAll('button:not(:first-child)').forEach(otherButton => {
                if (otherButton !== button) {
                    otherButton.classList.remove('active');
                }
            });
        });

        // Ajoutez le bouton au conteneur
        filterButtonsContainer.appendChild(button);
    });
}

// Appelez la fonction updateProjects pour charger les données et créer la galerie initiale
updateProjects();

// Fonction pour ouvrir la modale
function openModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
}


// Fonction pour fermer la modale et réactiver le défilement de la page
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}

// Gestionnaire d'événement pour fermer la modale lorsque l'utilisateur clique à l'extérieur de celle-ci
window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
});

// Gestionnaire d'événement pour fermer la modale lorsque l'utilisateur appuie sur la touche "Échap"
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});