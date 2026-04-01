# Pokemon App 📱

A modern, senior-level React Native application built with Expo and TypeScript, featuring comprehensive Pokemon data management with mock API support. This project demonstrates enterprise-grade code quality, proper architecture, and maintainable development practices.

## 🚀 Features

- **Modern React Native**: Built with React Native 0.83.4 and Expo ~55.0.9
- **TypeScript First**: Comprehensive type safety with custom interfaces and error handling
- **Mock API Support**: Configurable mock data for development and testing
- **Caching System**: LRU cache implementation for performance optimization
- **Error Handling**: Robust error management with custom error classes
- **Responsive Design**: NativeWind (Tailwind CSS) for consistent styling
- **File-based Routing**: Expo Router for seamless navigation
- **Component Architecture**: Reusable, well-structured components

## 🏗️ Architecture

### Project Structure

```
src/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout with SafeAreaProvider
│   ├── index.tsx          # Home screen with Pokemon list
│   └── pokemon/
│       └── [id].tsx       # Dynamic Pokemon detail page
├── components/            # Reusable UI components
│   ├── PokemonCard/       # Pokemon list item component
│   ├── Statbar/          # Pokemon stat visualization
│   └── TypeBadge/        # Pokemon type indicator
├── config/               # Configuration management
│   ├── api.ts           # API configuration constants
│   └── index.ts         # Config exports
├── constants/           # App constants
│   └── typeColors.ts    # Pokemon type color mappings
├── services/            # API services
│   └── pokeApi.ts       # Pokemon API service with mock support
├── types/               # TypeScript type definitions
│   └── index.ts         # Comprehensive Pokemon interfaces
└── utils/               # Utility functions
    ├── cache.ts         # Caching implementation
    ├── error.ts         # Error handling utilities
    ├── formatters.ts    # Data formatting functions
    └── index.ts         # Utility exports
```

### Key Architectural Decisions

- **Service Layer**: Centralized API management with configurable mock/real data
- **Type Safety**: Comprehensive TypeScript interfaces for all data structures
- **Error Boundaries**: Custom error handling with user-friendly fallbacks
- **Caching Strategy**: LRU cache for API responses to improve performance
- **Configuration Management**: Centralized config for easy environment switching
- **Utility Functions**: Reusable helpers for data transformation and formatting

## 🛠️ Technology Stack

### Core Dependencies

- **React Native 0.83.4**: Mobile framework
- **Expo ~55.0.9**: Development platform
- **TypeScript ~5.9.2**: Type safety
- **Expo Router ~55.0.8**: File-based routing
- **NativeWind 4.2.3**: Tailwind CSS for React Native
- **Axios 1.14.0**: HTTP client with interceptors

### Development Tools

- **React Native Paper 5.15.0**: Material Design components
- **Expo Image ~55.0.6**: Optimized image loading
- **Babel**: JavaScript transpilation
- **Metro**: React Native bundler

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (macOS) or Android Emulator

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd pokemon-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Run on device/emulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device

## 📱 Usage

### Navigation

- **Home Screen**: Browse Pokemon list with pagination
- **Pokemon Details**: Tap any Pokemon card to view detailed stats, types, and abilities
- **Search**: Filter Pokemon by name or type

### Features

- **Offline Support**: Mock data works without internet connection
- **Error Recovery**: Graceful error handling with retry mechanisms
- **Performance**: Cached API responses for faster loading
- **Responsive**: Optimized for various screen sizes

## 🔧 Configuration

### API Configuration

The app supports both mock and real API modes. Configure in `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: "https://pokeapi.co/api/v2",
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

export const POKEMON_CONFIG = {
  DEFAULT_LIMIT: 30,
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
} as const;
```

### Mock Data Mode

Toggle mock mode in the API service:

```typescript
const pokemonApi = new PokemonApiService(true); // true for mock, false for real API
```

## 🧪 Testing

### Running Tests

```bash
npm test
```

### Test Coverage

- Unit tests for utility functions
- Component tests for UI elements
- Integration tests for API services
- Mock data validation tests

## 📊 Performance

### Optimization Features

- **LRU Caching**: Reduces API calls and improves response times
- **Image Optimization**: Expo Image for efficient image loading
- **Lazy Loading**: Components load data on demand
- **Error Boundaries**: Prevent crashes and provide fallbacks

### Cache Statistics

Monitor cache performance:

```typescript
const stats = pokemonApi.getCacheStats();
// Returns: { pokemonCache: number, pokemonListCache: number }
```

## 🛡️ Error Handling

### Error Types

- **NetworkError**: Connection issues
- **TimeoutError**: Request timeouts
- **ValidationError**: Invalid data
- **PokemonApiError**: API-specific errors

### Error Recovery

- Automatic retry with exponential backoff
- Fallback to mock data on API failures
- User-friendly error messages
- Error logging for debugging

## 🎨 Styling

### Design System

- **NativeWind**: Tailwind CSS utilities
- **Type Colors**: Consistent color scheme for Pokemon types
- **Responsive**: Mobile-first design approach
- **Dark Mode**: Theme support with system preference detection

### Color Palette

Pokemon types use a consistent color scheme defined in `src/constants/typeColors.ts`.

## 🔒 Security

### Best Practices

- No sensitive data in client-side code
- Secure API key management (when using real APIs)
- Input validation and sanitization
- HTTPS-only communications

## 📚 API Reference

### PokemonApiService

```typescript
class PokemonApiService {
  fetchPokemonList(limit?: number): Promise<PokemonListItem[]>;
  fetchPokemonDetails(identifier: string | number): Promise<Pokemon>;
  clearCache(): void;
  getCacheStats(): { pokemonCache: number; pokemonListCache: number };
  setMockMode(enabled: boolean): void;
}
```

### Utility Functions

```typescript
// Error handling
createApiError(error: any): ApiError
logError(error: ApiError, context: string): void

// Data formatting
formatPokemonName(name: string): string
getPokemonStats(pokemon: Pokemon): PokemonStat[]
formatHeight(height: number): string
formatWeight(weight: number): string

// Caching
const pokemonCache = new Cache<Pokemon>(POKEMON_CONFIG.CACHE_TTL)
const pokemonListCache = new Cache<PokemonListItem[]>(POKEMON_CONFIG.CACHE_TTL)
```

### Code Standards

- TypeScript strict mode enabled
- ESLint configuration for code quality
- Prettier for consistent formatting
- Comprehensive error handling
- Unit test coverage for utilities

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [PokeAPI](https://pokeapi.co/) for Pokemon data
- [Expo](https://expo.dev/) for the development platform
- [React Native](https://reactnative.dev/) community
