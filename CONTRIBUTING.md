# Contributing to Studio Guide Craft

First off, thank you for considering contributing to Studio Guide Craft! 🎉

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Guidelines](#coding-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow:

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**When filing a bug report, include:**
- Clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots (if applicable)
- Your environment (OS, Node version, browser)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues.

**When suggesting an enhancement:**
- Use a clear, descriptive title
- Provide detailed description of the proposed feature
- Explain why this enhancement would be useful
- Include mockups or examples if applicable

### Your First Code Contribution

Unsure where to start? Look for issues labeled:
- `good first issue` - Simple issues for beginners
- `help wanted` - Issues that need attention
- `documentation` - Improvements to docs

## Development Setup

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Git

### Setup Steps

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/studio-guide-craft.git
   cd studio-guide-craft
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:5173
   ```

### Running Tests

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Pull Request Process

### Before Submitting

1. ✅ Ensure your code builds without errors
2. ✅ Test your changes thoroughly
3. ✅ Update documentation if needed
4. ✅ Follow the coding guidelines
5. ✅ Write meaningful commit messages

### Creating a Pull Request

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, documented code
   - Follow existing patterns
   - Keep changes focused

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: feature description"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Fill in the PR template
   - Link related issues

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed my own code
- [ ] Commented complex code sections
- [ ] Updated documentation
- [ ] No new warnings generated
- [ ] Tested on multiple browsers
```

## Coding Guidelines

### TypeScript

```typescript
// ✅ Good: Type your props
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

// ❌ Bad: No types
function Button(props) {
  // ...
}
```

### React Components

```typescript
// ✅ Good: Functional component with hooks
export const MyComponent: React.FC<Props> = ({ title }) => {
  const [count, setCount] = useState(0);
  
  return <div>{title}: {count}</div>;
};

// ❌ Bad: Class component (avoid if possible)
class MyComponent extends React.Component {
  // ...
}
```

### Styling

```typescript
// ✅ Good: Use Tailwind classes
<div className="flex items-center gap-4 p-6 rounded-lg">

// ❌ Bad: Inline styles (avoid)
<div style={{ display: 'flex', padding: '24px' }}>
```

### File Organization

```
src/
├── components/     # Reusable UI components
│   ├── ui/        # shadcn/ui components
│   └── MyComponent.tsx
├── pages/         # Route pages
├── api/           # API services
├── hooks/         # Custom hooks
└── lib/           # Utility functions
```

### Naming Conventions

- **Components**: PascalCase (`MyComponent.tsx`)
- **Files**: camelCase (`myUtils.ts`)
- **Functions**: camelCase (`handleClick`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Interfaces**: PascalCase with 'I' prefix optional (`UserProfile` or `IUserProfile`)

## Commit Message Guidelines

### Format

```
Type: Brief description (50 chars max)

Detailed explanation of what and why
(wrap at 72 characters)

Fixes #123
```

### Types

- `Add:` New feature
- `Fix:` Bug fix
- `Update:` Improvements to existing feature
- `Refactor:` Code restructuring
- `Style:` Formatting, missing semicolons, etc.
- `Docs:` Documentation only changes
- `Test:` Adding or updating tests
- `Chore:` Maintenance tasks

### Examples

```bash
# Good commits
Add: mentor search functionality
Fix: CORS error in production build
Update: improve dashboard loading speed
Docs: add API integration guide

# Bad commits
fix stuff
update
changes
asdf
```

## Style Guide

### JavaScript/TypeScript

```typescript
// ✅ Use const/let, not var
const API_URL = 'https://api.example.com';
let count = 0;

// ✅ Use template literals
const message = `Hello, ${name}!`;

// ✅ Use async/await
const data = await fetchUser(id);

// ✅ Destructure objects
const { name, email } = user;

// ✅ Use arrow functions
const handleClick = () => {
  console.log('Clicked');
};
```

### React Best Practices

```typescript
// ✅ Extract reusable logic to custom hooks
const useAuth = () => {
  const [user, setUser] = useState(null);
  // ... logic
  return { user, login, logout };
};

// ✅ Memoize expensive computations
const expensiveValue = useMemo(() => 
  computeExpensiveValue(a, b), 
  [a, b]
);

// ✅ Use proper dependencies in useEffect
useEffect(() => {
  fetchData();
}, [userId]); // Include all dependencies
```

### Error Handling

```typescript
// ✅ Good: Proper error handling
try {
  const data = await api.fetchData();
  setData(data);
} catch (error) {
  console.error('Failed to fetch data:', error);
  setError(error.message);
}

// ❌ Bad: Silent failures
api.fetchData().then(setData);
```

## Documentation

- Comment complex logic
- Update README for new features
- Add JSDoc comments for functions
- Keep documentation up to date

### Example JSDoc

```typescript
/**
 * Fetches user profile from the API
 * @param userId - The ID of the user
 * @returns Promise resolving to user profile
 * @throws Error if user not found
 */
async function getUserProfile(userId: string): Promise<UserProfile> {
  // ...
}
```

## Questions?

- Open an issue with the `question` label
- Join our discussions on GitHub
- Check existing documentation

## Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Given credit for their work

Thank you for contributing to Studio Guide Craft! 🚀

