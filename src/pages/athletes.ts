import { fetchAthletes } from "../api/athletes.js";
import { fetchSports } from "../api/sports.js";
import type { Athlete, Sport } from "../utils/types.js";

type AthleteFilter = {
	query: string;
	sportId: string;
	category: string;
};

export async function renderAthletesPage(main: HTMLElement): Promise<void> {
	main.innerHTML = "";

	const title = document.createElement("h1");
	title.textContent = "Athlètes";

	const description = document.createElement("p");
	description.textContent = "Recherche et filtres sur tous les athlètes.";

	const controls = document.createElement("section");
	controls.id = "athletes-controls";

	const searchInput = document.createElement("input");
	searchInput.type = "search";
	searchInput.placeholder = "Rechercher un athlète...";

	const sportSelect = document.createElement("select");
	sportSelect.id = "athlete-sport-filter";

	const categorySelect = document.createElement("select");
	categorySelect.id = "athlete-category-filter";

	const list = document.createElement("section");
	list.id = "athletes-list";

	controls.append(searchInput, sportSelect, categorySelect);
	main.append(title, description, controls, list);

	const [athletes, sports] = await Promise.all([fetchAthletes(), fetchSports()]);

	const filters: AthleteFilter = {
		query: "",
		sportId: "all",
		category: "all",
	};

	populateSportOptions(sportSelect, sports);
	populateCategoryOptions(categorySelect, athletes, filters.sportId);

	const render = () => {
		const visibleAthletes = applyFilters(athletes, filters);
		renderAthleteCards(list, visibleAthletes);

		populateCategoryOptions(categorySelect, athletes, filters.sportId);
	};

	searchInput.addEventListener("input", () => {
		filters.query = searchInput.value.trim().toLowerCase();
		render();
	});

	sportSelect.addEventListener("change", () => {
		filters.sportId = sportSelect.value;
		filters.category = "all";
		categorySelect.value = "all";
		render();
	});

	categorySelect.addEventListener("change", () => {
		filters.category = categorySelect.value;
		render();
	});

	render();
}

function populateSportOptions(select: HTMLSelectElement, sports: Sport[]): void {
	select.innerHTML = "";

	const allOption = document.createElement("option");
	allOption.value = "all";
	allOption.textContent = "Tous les sports";
	select.appendChild(allOption);

	sports.forEach(sport => {
		const option = document.createElement("option");
		option.value = String(sport.id);
		option.textContent = sport.name;
		select.appendChild(option);
	});
}

function populateCategoryOptions(
	select: HTMLSelectElement,
	athletes: Athlete[],
	sportId: string
): void {
	const categories = new Set<string>();

	athletes
		.filter(athlete => sportId === "all" || athlete.sport_id === Number(sportId))
		.forEach(athlete => {
			categories.add(getAthleteCategory(athlete));
		});

	select.innerHTML = "";

	const allOption = document.createElement("option");
	allOption.value = "all";
	allOption.textContent = "Toutes les positions";
	select.appendChild(allOption);

	Array.from(categories)
		.sort((left, right) => left.localeCompare(right))
		.forEach(category => {
			const option = document.createElement("option");
			option.value = category;
			option.textContent = category;
			select.appendChild(option);
		});
}

function applyFilters(athletes: Athlete[], filters: AthleteFilter): Athlete[] {
	return athletes.filter(athlete => {
		const matchesQuery =
			filters.query.length === 0 ||
			getAthleteSearchText(athlete).includes(filters.query);

		const matchesSport = filters.sportId === "all" || athlete.sport_id === Number(filters.sportId);

		const matchesCategory =
			filters.category === "all" || getAthleteCategory(athlete) === filters.category;

		return matchesQuery && matchesSport && matchesCategory;
	});
}

function renderAthleteCards(
	container: HTMLElement,
	athletes: Athlete[]
): void {
	container.innerHTML = "";

	if (athletes.length === 0) {
		const empty = document.createElement("p");
		empty.textContent = "Aucun athlète ne correspond aux filtres.";
		container.appendChild(empty);
		return;
	}

	athletes.forEach(athlete => {
		const card = document.createElement("article");
		card.className = "athlete-card";

		const title = document.createElement("h3");
		title.textContent = getAthleteLabel(athlete);

		const meta = document.createElement("p");
		meta.textContent = `${getSportLabel(athlete.sport_id)} • ${getAthleteCategory(athlete)}`;

		const stats = document.createElement("p");
		stats.textContent = formatPrimaryStats(athlete);

		card.append(title, meta, stats);
		container.appendChild(card);
	});
}

function getAthleteLabel(athlete: Athlete): string {
	return "nickname" in athlete && athlete.nickname
		? `${athlete.first_name} ${athlete.last_name} (${athlete.nickname})`
		: `${athlete.first_name} ${athlete.last_name}`;
}

function getAthleteSearchText(athlete: Athlete): string {
	return [
		athlete.first_name,
		athlete.last_name,
		"nickname" in athlete ? athlete.nickname ?? "" : "",
		getAthleteCategory(athlete),
		getSportLabel(athlete.sport_id),
	]
		.join(" ")
		.toLowerCase();
}

function getAthleteCategory(athlete: Athlete): string {
	if (athlete.sport_id === 3) {
		return athlete.weight_class;
	}

	return athlete.position;
}

function getSportLabel(sportId: Athlete["sport_id"]): string {
	if (sportId === 1) return "Football";
	if (sportId === 2) return "Basketball";
	return "MMA";
}

function formatPrimaryStats(athlete: Athlete): string {
	if (athlete.sport_id === 1) {
		return `${athlete.stats.goals} buts, ${athlete.stats.assists} passes, ${athlete.stats.matches_played} matchs`;
	}

	if (athlete.sport_id === 2) {
		return `${athlete.stats.points_per_game} pts/match, ${athlete.stats.rebounds_per_game} rebonds/match`;
	}

	return `${athlete.stats.wins} victoires, ${athlete.stats.losses} défaites`;
}
