var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchAthletes } from "../api/athletes.js";
import { fetchSports } from "../api/sports.js";
import { notifyError } from "../utils/errors.js";
export function renderAthletesPage(main) {
    return __awaiter(this, void 0, void 0, function* () {
        main.innerHTML = "";
        const title = document.createElement("h1");
        title.textContent = "Athlètes";
        const description = document.createElement("p");
        description.textContent = "Recherche et filtres sur tous les athlètes.";
        const page = document.createElement("section");
        page.className = "athletes-page";
        const leftColumn = document.createElement("section");
        leftColumn.className = "athletes-column athletes-column-left";
        const rightColumn = document.createElement("aside");
        rightColumn.className = "athletes-column athletes-column-right";
        rightColumn.setAttribute("aria-label", "Comparer deux athlètes");
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
        const compareTitle = document.createElement("h2");
        compareTitle.textContent = "Comparer deux athlètes";
        const compareDescription = document.createElement("p");
        compareDescription.textContent = "Choisis un joueur ou un combattant dans chaque champ pour les comparer.";
        const compareFieldset = document.createElement("div");
        compareFieldset.className = "comparison-fields";
        const playerOneField = createAthletePickerField("Joueur 1", "player-1", "player-1-list");
        const playerTwoField = createAthletePickerField("Joueur 2", "player-2", "player-2-list");
        const compareButton = document.createElement("button");
        compareButton.type = "button";
        compareButton.textContent = "Comparer";
        compareButton.className = "compare-button";
        const compareResult = document.createElement("div");
        compareResult.id = "compare-result";
        compareResult.className = "compare-result";
        compareFieldset.append(playerOneField.wrapper, playerTwoField.wrapper, compareButton);
        rightColumn.append(compareTitle, compareDescription, compareFieldset, compareResult);
        leftColumn.append(title, description, controls, list);
        page.append(leftColumn, rightColumn);
        main.appendChild(page);
        controls.append(searchInput, sportSelect, categorySelect);
        const [athletes, sports] = yield Promise.all([fetchAthletes(), fetchSports()]);
        const filters = {
            query: "",
            sportId: "all",
            category: "all",
        };
        populateSportOptions(sportSelect, sports);
        populateCategoryOptions(categorySelect, athletes, filters.sportId);
        populateAthleteSuggestions(playerOneField.list, athletes);
        populateAthleteSuggestions(playerTwoField.list, athletes);
        const render = () => {
            const visibleAthletes = applyFilters(athletes, filters);
            renderAthleteCards(list, visibleAthletes);
            populateCategoryOptions(categorySelect, athletes, filters.sportId);
            categorySelect.value = filters.category;
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
        compareButton.addEventListener("click", () => {
            const leftAthlete = resolveAthleteSelection(playerOneField.input.value, athletes);
            const rightAthlete = resolveAthleteSelection(playerTwoField.input.value, athletes);
            if (!leftAthlete || !rightAthlete) {
                notifyError(new Error("Sélectionne deux athlètes valides avant de comparer"));
                renderComparisonNotice(compareResult, "Sélectionne deux athlètes valides avant de comparer");
                return;
            }
            if (leftAthlete.sport_id !== rightAthlete.sport_id) {
                const message = "Veuillez sélectionner deux joueurs pratiquant le même sport";
                notifyError(new Error(message));
                renderComparisonNotice(compareResult, message);
                return;
            }
            if (leftAthlete.id === rightAthlete.id) {
                const message = "Veuillez sélectionner deux athlètes différents pour la comparaison";
                notifyError(new Error(message));
                renderComparisonNotice(compareResult, message);
                return;
            }
            renderComparisonResult(compareResult, leftAthlete, rightAthlete);
        });
        render();
    });
}
function createAthletePickerField(labelText, inputId, listId) {
    const wrapper = document.createElement("label");
    wrapper.className = "comparison-field";
    const label = document.createElement("span");
    label.textContent = labelText;
    const input = document.createElement("input");
    input.id = inputId;
    input.type = "text";
    input.placeholder = "Tape un nom ou choisis dans la liste";
    input.setAttribute("list", listId);
    const list = document.createElement("datalist");
    list.id = listId;
    wrapper.append(label, input, list);
    return { wrapper, input, list };
}
function populateAthleteSuggestions(list, athletes) {
    list.innerHTML = "";
    athletes.forEach(athlete => {
        const option = document.createElement("option");
        option.value = getAthleteSuggestionLabel(athlete);
        list.appendChild(option);
    });
}
function resolveAthleteSelection(value, athletes) {
    var _a;
    const normalized = normalizeSearch(value);
    if (normalized.length === 0) {
        return null;
    }
    const exactMatch = athletes.find(athlete => normalizeSearch(getAthleteSuggestionLabel(athlete)) === normalized);
    if (exactMatch) {
        return exactMatch;
    }
    return (_a = athletes.find(athlete => normalizeSearch(getAthleteSuggestionLabel(athlete)).includes(normalized))) !== null && _a !== void 0 ? _a : null;
}
function populateSportOptions(select, sports) {
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
function populateCategoryOptions(select, athletes, sportId) {
    const categories = new Set();
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
function applyFilters(athletes, filters) {
    return athletes.filter(athlete => {
        const matchesQuery = filters.query.length === 0 ||
            getAthleteSearchText(athlete).includes(filters.query);
        const matchesSport = filters.sportId === "all" || athlete.sport_id === Number(filters.sportId);
        const matchesCategory = filters.category === "all" || getAthleteCategory(athlete) === filters.category;
        return matchesQuery && matchesSport && matchesCategory;
    });
}
function renderAthleteCards(container, athletes) {
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
function renderComparisonResult(container, left, right) {
    container.innerHTML = "";
    if (!left || !right) {
        const empty = document.createElement("p");
        empty.textContent = "Choisis deux athlètes pour afficher la comparaison.";
        container.appendChild(empty);
        return;
    }
    const title = document.createElement("h3");
    title.textContent = `${getAthleteLabel(left)} vs ${getAthleteLabel(right)}`;
    const summary = document.createElement("div");
    summary.className = "comparison-summary";
    const lines = getComparisonLines(left, right);
    lines.forEach(line => {
        const paragraph = document.createElement("p");
        paragraph.textContent = line;
        summary.appendChild(paragraph);
    });
    container.append(title, summary);
}
function renderComparisonNotice(container, message) {
    container.innerHTML = "";
    const paragraph = document.createElement("p");
    paragraph.textContent = message;
    container.appendChild(paragraph);
}
function getAthleteLabel(athlete) {
    return "nickname" in athlete && athlete.nickname
        ? `${athlete.first_name} ${athlete.last_name} (${athlete.nickname})`
        : `${athlete.first_name} ${athlete.last_name}`;
}
function getAthleteSuggestionLabel(athlete) {
    return `${getAthleteLabel(athlete)} - ${getSportLabel(athlete.sport_id)} - ${getAthleteCategory(athlete)}`;
}
function getAthleteSearchText(athlete) {
    var _a;
    return [
        athlete.first_name,
        athlete.last_name,
        "nickname" in athlete ? (_a = athlete.nickname) !== null && _a !== void 0 ? _a : "" : "",
        getAthleteCategory(athlete),
        getSportLabel(athlete.sport_id),
    ]
        .join(" ")
        .toLowerCase();
}
function getAthleteCategory(athlete) {
    if (athlete.sport_id === 3) {
        return athlete.weight_class;
    }
    return athlete.position;
}
function getSportLabel(sportId) {
    if (sportId === 1)
        return "Football";
    if (sportId === 2)
        return "Basketball";
    if (sportId === 3)
        return "MMA";
    return "Autre";
}
function getComparisonLines(left, right) {
    if (left.sport_id === 1 && right.sport_id === 1) {
        const leftStats = left.stats;
        const rightStats = right.stats;
        return [
            `Matchs joués : ${leftStats.matches_played} vs ${rightStats.matches_played}`,
            `Buts : ${leftStats.goals} vs ${rightStats.goals}`,
            `Passes décisives : ${leftStats.assists} vs ${rightStats.assists}`,
            `Cartons jaunes : ${leftStats.yellow_cards} vs ${rightStats.yellow_cards}`,
            `Cartons rouges : ${leftStats.red_cards} vs ${rightStats.red_cards}`,
            `Minutes jouées : ${leftStats.minutes_played} vs ${rightStats.minutes_played}`,
        ];
    }
    if (left.sport_id === 2 && right.sport_id === 2) {
        const leftStats = left.stats;
        const rightStats = right.stats;
        return [
            `Matchs joués : ${leftStats.games_played} vs ${rightStats.games_played}`,
            `Points par match : ${leftStats.points_per_game} vs ${rightStats.points_per_game}`,
            `Rebonds par match : ${leftStats.rebounds_per_game} vs ${rightStats.rebounds_per_game}`,
            `Passes par match : ${leftStats.assists_per_game} vs ${rightStats.assists_per_game}`,
            `Interceptions : ${leftStats.steals_per_game} vs ${rightStats.steals_per_game}`,
            `Contres : ${leftStats.blocks_per_game} vs ${rightStats.blocks_per_game}`,
            `Temps de jeu : ${leftStats.minutes_per_game} vs ${rightStats.minutes_per_game}`,
        ];
    }
    const leftMma = left;
    const rightMma = right;
    const leftStats = leftMma.stats;
    const rightStats = rightMma.stats;
    return [
        `Victoires : ${leftStats.wins} vs ${rightStats.wins}`,
        `Défaites : ${leftStats.losses} vs ${rightStats.losses}`,
        `Nuls : ${leftStats.draws} vs ${rightStats.draws}`,
        `No contest : ${leftStats.no_contests} vs ${rightStats.no_contests}`,
        `Victoires par KO : ${leftStats.wins_by_ko} vs ${rightStats.wins_by_ko}`,
        `Victoires par soumission : ${leftStats.wins_by_submission} vs ${rightStats.wins_by_submission}`,
        `Victoires par décision : ${leftStats.wins_by_decision} vs ${rightStats.wins_by_decision}`,
        `Défenses de titre : ${leftStats.title_defenses} vs ${rightStats.title_defenses}`,
    ];
}
function normalizeSearch(value) {
    return value.trim().toLowerCase().replace(/\s+/g, " ");
}
function formatPrimaryStats(athlete) {
    if (athlete.sport_id === 1) {
        return `${athlete.stats.goals} buts, ${athlete.stats.assists} passes, ${athlete.stats.matches_played} matchs`;
    }
    if (athlete.sport_id === 2) {
        return `${athlete.stats.points_per_game} pts/match, ${athlete.stats.rebounds_per_game} rebonds/match`;
    }
    return `${athlete.stats.wins} victoires, ${athlete.stats.losses} défaites`;
}
