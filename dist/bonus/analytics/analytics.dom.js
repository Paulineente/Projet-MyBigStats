export function renderAnalyticsDashboard(data, topPerformers) {
    const container = document.createElement("section");
    container.className = "analytics-dashboard";
    // ===== Titre =====
    const title = document.createElement("h2");
    title.textContent = "📊 MyBigStats Analytics";
    // ===== Résumé =====
    const summary = document.createElement("section");
    summary.className = "analytics-summary";
    summary.innerHTML = `
        <article>
            <h3>👥 Athlètes</h3>
            <p>${data.athletesCount}</p>
        </article>

        <article>
            <h3>🏆 Sports</h3>
            <p>${data.sportsCount}</p>
        </article>

        <article>
            <h3>🛡️ Équipes</h3>
            <p>${data.equipesCount}</p>
        </article>

        <article>
            <h3>🔥 Rencontres</h3>
            <p>${data.rencontresCount}</p>
        </article>
    `;
    // ===== Répartition =====
    const distribution = document.createElement("section");
    distribution.className = "analytics-distribution";
    const distributionTitle = document.createElement("h3");
    distributionTitle.textContent = "📈 Répartition des athlètes";
    distribution.appendChild(distributionTitle);
    const maxAthletes = Math.max(...data.athletesBySport.map(sport => sport.athletesCount), 1);
    data.athletesBySport.forEach((sport) => {
        const wrapper = document.createElement("article");
        wrapper.className = "distribution-item";
        const label = document.createElement("p");
        label.textContent =
            `${sport.sportName} : ${sport.athletesCount} athlètes`;
        const barContainer = document.createElement("div");
        barContainer.style.width = "100%";
        barContainer.style.height = "20px";
        barContainer.style.background = "#ddd";
        barContainer.style.borderRadius = "10px";
        barContainer.style.overflow = "hidden";
        const bar = document.createElement("div");
        const percentage = (sport.athletesCount / maxAthletes) * 100;
        bar.style.width =
            `${percentage}%`;
        bar.style.height = "100%";
        bar.style.background = "#4CAF50";
        bar.style.borderRadius = "10px";
        barContainer.appendChild(bar);
        wrapper.append(label, barContainer);
        distribution.appendChild(wrapper);
    });
    // ===== Sport dominant =====
    const dominantSport = document.createElement("h3");
    if (data.mostRepresentedSport) {
        dominantSport.textContent =
            `🏆 Sport dominant : ${data.mostRepresentedSport.sportName}`;
    }
    else {
        dominantSport.textContent =
            "Aucune donnée disponible";
    }
    // ===== Top Performers =====
    const performersSection = document.createElement("section");
    const performersTitle = document.createElement("h3");
    performersTitle.textContent = "⭐ Top Performers";
    performersSection.appendChild(performersTitle);
    topPerformers.forEach((performer) => {
        const card = document.createElement("article");
        card.className = "analytics-card";
        const sport = document.createElement("h4");
        sport.textContent = performer.sport;
        const athlete = document.createElement("p");
        athlete.textContent = performer.athleteName;
        const stat = document.createElement("strong");
        stat.textContent =
            `${performer.label} : ${performer.value}`;
        card.append(sport, athlete, stat);
        performersSection.appendChild(card);
    });
    // ===== Construction =====
    container.append(title, summary, distribution, dominantSport, performersSection);
    return container;
}
