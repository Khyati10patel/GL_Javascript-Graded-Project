document.addEventListener('DOMContentLoaded', function () {
    const applicantDetailsContainer = document.getElementById('applicant-details');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');
    const searchError = document.getElementById('search-error');
    
    let applicants = [];
    let filteredApplicants = [];
    let currentIndex = 0;
    console.log(applicants)

    // Fetch data from JSON file
        fetch('./applicants.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                applicants=response.json();
                console.log(applicants)
                return applicants;
                
            })
            .then(response => {
                console.log(response.resume)
                applicants = response.resume; // Assuming JSON structure has an "applicants" array
                console.log(applicants)
                showApplicantDetails(currentIndex);
                return applicants
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    
    function showApplicantDetails(index) {
        const applicant = filteredApplicants[index];
        if (applicant) {
            const applicantHTML = `
                <div>
                    <h2>Name: ${applicant.basics.name}</h2>
                    <p>Applied For: ${applicant.basics.AppliedFor}</p>
                    <p>Email: ${applicant.basics.email}</p>
                    <!-- Add more details here as needed -->
                </div>
            `;
            applicantDetailsContainer.innerHTML = applicantHTML;
        }
        updatePaginationButtons();
    }

    function updatePaginationButtons() {
        prevButton.style.display = currentIndex === 0 || filteredApplicants.length === 1 ? 'none' : 'block';
        nextButton.style.display = currentIndex === filteredApplicants.length - 1 || filteredApplicants.length === 1 ? 'none' : 'block';
    }

    prevButton.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            showApplicantDetails(currentIndex);
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentIndex < filteredApplicants.length - 1) {
            currentIndex++;
            showApplicantDetails(currentIndex);
        }
    });

    searchButton.addEventListener('click', async function () {
        console.log(applicants)
        console.log(typeof applicants)
        const searchTerm = searchInput.value.trim().toLowerCase();
        console.log(searchTerm)
        if (searchTerm === '') {
            // If search term is empty, reset filtered applicants and show the first applicant
            filteredApplicants = [...applicants];
            currentIndex = 0;
            showApplicantDetails(currentIndex);
            updatePaginationButtons();
            searchError.textContent = '';
        } else {
            const filtered = applicants.filter(applicant => applicant.basics.AppliedFor.toLowerCase() === searchTerm);
            console.log(applicants[0].basics.AppliedFor)
            console.log(filtered)
            if (filtered.length === 0) {
                // If no applications are found for the searched job opening, display an error message
                searchError.textContent = 'Invalid search or No applications for this job';
                applicantDetailsContainer.innerHTML = '';
                prevButton.style.display = 'none';
                nextButton.style.display  = 'none';
            } else {
                // Display the filtered applicants for the searched job opening
                filteredApplicants = [...filtered];
                console.log(filteredApplicants)
                currentIndex = 0;
                showApplicantDetails(currentIndex);
                updatePaginationButtons();
                searchError.textContent = '';
            }
        }
    });
});
