import axios from 'axios';
import create from 'zustand';

type State = {
  fetch: (url: any) => void;
  finish: {
    name: '';
    main: {
      temp: '';
      feels_like: '';
      humidity: '';
    };
    weather: [
      {
        id: '';
        description: '';
      }
    ];
    wind: {
      speed: '';
    };
  };
};

export const useStore = create<State>((set) => ({
  finish: {
    name: '',
    main: {
      temp: '',
      feels_like: '',
      humidity: '',
    },
    weather: [
      {
        id: '',
        description: '',
      },
    ],
    wind: {
      speed: '',
    },
  },
  fetch: async (url) => {
    const res = await axios.get(url);
    set({ finish: await res.data });
  },
}));
