import { espeon, sylveon, umbreon } from "../icon";

function formatName(inputName) {
    const parts = inputName.split('-');
  
    if (parts.length > 1) {
        const formattedParts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());
        return formattedParts.join(' ');
    } else {
        return inputName.charAt(0).toUpperCase() + inputName.slice(1).toLowerCase();
    }
}

const getTypeClass = (typeId) => {
    const typeClassMapping = {
        1: 'normal',  2: 'fhgt',  3: 'flying',  4: 'poison',  5: 'ground',
        6: 'rock',  7: 'bug',  8: 'ghost',  9: 'steel',  10: 'fire',
        11: 'water',  12: 'grass',  13: 'elect',  14: 'psychic',  15: 'ice',
        16: 'dragon',  17: 'dark', 18: 'fairy',
    };

    return typeClassMapping[typeId] || 'verde';
};

const getTypeNames = (typeIds) => {
    const typeNameMapping = {
        1: 'Normal',  2: 'Fighting',  3: 'Flying',  4: 'Poison',  5: 'Ground',
        6: 'Rock',  7: 'Bug',  8: 'Ghost',  9: 'Steel',  10: 'Fire',
        11: 'Water',  12: 'Grass',  13: 'Electric',  14: 'Psychic',  15: 'Ice',
        16: 'Dragon',  17: 'Dark', 18: 'Fairy',
    };

    return typeIds.map(typeId => typeNameMapping[typeId] || 'Unknown');
};

const getTypeStyle = (typeName) => {
    const typeStyles = {
        bug: 'bug', flying: 'flying', dark: 'dark', dragon: 'dragon',
        electric: 'electric', fighting: 'fighting', fire: 'fire', ghost: 'ghost',
        grass: 'grass', ground: 'ground', ice: 'ice', normal: 'normal',
        poison: 'poison', psychic: 'psychic', rock: 'rock', steel: 'steel',
        water: 'water', fairy: 'fairy'
    };

    return typeStyles[typeName.toLowerCase()] || '';
};

const formatType = (typeName) => {
    const typeNames = {
        normal: 'Normal', fire: 'Fire', water: 'Water', grass: 'Grass',
        flying: 'Flying', fighting: 'Fighting', poison: 'Poison', electric: 'Electric',
        ground: 'Ground', rock: 'Rock', psychic: 'Psychic', ice: 'Ice',
        bug: 'Bug', ghost: 'Ghost', steel: 'Steel', dragon: 'Dragon', dark: 'Dark', fairy: 'Fairy'
    };
    return typeNames[typeName.toLowerCase()] || typeName;
};

export function getImageAndAltForEvolution(evolutionName) {
    switch (evolutionName) {
      case 'espeon':
        return {
          image: espeon,
          alt: 'Level Up with Happiness Value at 160 During the Day'
        };
      case 'sylveon':
        return {
          image: sylveon,
          alt: 'Level Up with Friendship and Know a Fairy-Type Move'
        };
      case 'umbreon':
        return {
          image: umbreon,
          alt: 'Level Up with Happiness Value at 160 During the Night'
        };
      default:
        return {
          image: '',
          alt: 'Unknown Evolution'
        };
    }
  }


export { formatName, getTypeClass, getTypeNames, getTypeStyle, formatType};
