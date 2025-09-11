# FutureFlow - AI & Blockchain Discovery Platform

A comprehensive platform that helps businesses discover, design, and implement AI and Blockchain solutions tailored to their specific needs. Built with Next.js, TypeScript, and modern web technologies.

## 🚀 Features

### Core Functionality
- **Smart Solution Wizard**: AI-powered guided process for creating personalized business solutions
- **Solution Management**: Create, track, and manage AI/Blockchain implementation projects
- **Conversation History**: Persistent chat history with AI assistant for both anonymous and registered users
- **Expert Consultation**: Book consultations and professional services
- **Payment Integration**: Stripe-powered payment processing for services
- **User Authentication**: Secure login/signup with conversation migration

### AI & Blockchain Solutions
- **AI Solutions**: Customer support bots, process automation, analytics platforms
- **Blockchain Solutions**: Supply chain tracking, financial verification, smart contracts
- **Hybrid Solutions**: Combined AI-Blockchain implementations

### Business Intelligence
- **Progress Tracking**: Monitor solution implementation progress
- **Analytics Dashboard**: Track ROI, time saved, and automation levels
- **Resource Library**: Documentation, tutorials, and best practices
- **Template System**: Pre-built solution templates for quick deployment

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Backend & AI
- **LangChain** - AI conversation management
- **OpenAI GPT-4** - Language model for AI responses
- **Stripe** - Payment processing
- **Node.js** - Server-side runtime

### Database & Storage
- **In-memory Database** - Mock database for development (easily replaceable)
- **Local Storage** - Client-side data persistence
- **Cookies** - Session management

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key
- Stripe API keys (for payment features)

### Setup

1. **Clone the repository**
\`\`\`bash
git clone <repository-url>
cd futureflow-platform
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. **Environment Variables**
Create a `.env.local` file in the root directory:

\`\`\`env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Application Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Database Configuration (if using external database)
DATABASE_URL=your_database_url_here
\`\`\`

4. **Run the development server**
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

\`\`\`
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── conversation/         # Chat API endpoints
│   │   └── payments/             # Stripe payment endpoints
│   ├── dashboard/                # Dashboard pages
│   └── page.tsx                  # Main landing page
├── components/                   # React components
│   ├── auth/                     # Authentication components
│   ├── conversation/             # Chat interface components
│   ├── dashboard/                # Dashboard components
│   ├── marketplace/              # Marketplace components
│   ├── payments/                 # Payment components
│   ├── pro/                      # Pro features components
│   └── ui/                       # shadcn/ui components
├── contexts/                     # React contexts
│   └── auth-context.tsx          # Authentication context
├── lib/                          # Utility libraries
│   ├── services/                 # Business logic services
│   ├── types/                    # TypeScript type definitions
│   └── utils/                    # Utility functions
├── public/                       # Static assets
└── styles/                       # Global styles
\`\`\`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for AI conversations | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes (for payments) |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes (for payments) |
| `NEXTAUTH_SECRET` | NextAuth secret for session encryption | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `DATABASE_URL` | Database connection string | No (uses mock DB) |

### Customization

#### Branding
Update the branding in:
- `app/page.tsx` - Main landing page
- `components/dashboard/header.tsx` - Dashboard header
- `public/` - Add your logo and favicon

#### AI Prompts
Customize AI behavior in:
- `lib/services/langchain-service.ts` - System prompts and AI configuration

#### Payment Configuration
Configure payment options in:
- `components/payments/payment-modal.tsx` - Payment options and pricing
- `components/dashboard/service-booking/` - Service booking flow

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Add environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Other Platforms

1. **Build the application**
\`\`\`bash
npm run build
\`\`\`

2. **Start the production server**
\`\`\`bash
npm start
\`\`\`

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/login`
Login user with email and password.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
\`\`\`

#### POST `/api/auth/register`
Register new user account.

**Request Body:**
\`\`\`json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

### Conversation Endpoints

#### POST `/api/conversation/message`
Send message to AI assistant.

**Request Body:**
\`\`\`json
{
  "conversationId": "optional_conversation_id",
  "content": "User message",
  "role": "user",
  "metadata": {}
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "conversationId": "conversation_id",
  "userMessage": { /* Message object */ },
  "aiResponse": { /* AI response message */ }
}
\`\`\`

#### GET `/api/conversation/history`
Get user's conversation history.

**Response:**
\`\`\`json
{
  "success": true,
  "conversations": [
    {
      "id": "conversation_id",
      "title": "Conversation Title",
      "messages": [ /* Array of messages */ ],
      "messageCount": 5,
      "createdAt": "2024-01-01T00:00:00Z",
      "lastMessageAt": "2024-01-01T00:00:00Z"
    }
  ]
}
\`\`\`

### Payment Endpoints

#### POST `/api/payments/create-payment-intent`
Create Stripe payment intent.

**Request Body:**
\`\`\`json
{
  "amount": 5000,
  "currency": "usd",
  "serviceId": "service_id",
  "customerInfo": {
    "name": "Customer Name",
    "email": "customer@example.com"
  }
}
\`\`\`

## 🧪 Testing

### Running Tests
\`\`\`bash
npm test
# or
yarn test
\`\`\`

### Test Coverage
\`\`\`bash
npm run test:coverage
# or
yarn test:coverage
\`\`\`

## 🔒 Security

### Authentication
- Secure password hashing
- JWT token-based authentication
- Session management with HTTP-only cookies

### Data Protection
- Input validation and sanitization
- CORS configuration
- Environment variable protection

### Payment Security
- Stripe secure payment processing
- PCI compliance through Stripe
- No sensitive payment data stored locally

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
\`\`\`bash
git checkout -b feature/your-feature-name
\`\`\`

3. **Make your changes**
4. **Run tests and linting**
\`\`\`bash
npm run lint
npm run type-check
npm test
\`\`\`

5. **Commit your changes**
\`\`\`bash
git commit -m "feat: add your feature description"
\`\`\`

6. **Push to your fork**
\`\`\`bash
git push origin feature/your-feature-name
\`\`\`

7. **Create a Pull Request**

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages

### Component Guidelines
- Use functional components with hooks
- Implement proper TypeScript types
- Follow shadcn/ui patterns for UI components
- Include proper error handling

## 📈 Performance

### Optimization Features
- Next.js App Router for optimal performance
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Efficient state management

### Monitoring
- Built-in Next.js analytics
- Error boundary implementation
- Performance monitoring hooks

## 🐛 Troubleshooting

### Common Issues

#### OpenAI API Errors
- Verify your API key is correct
- Check API usage limits
- Ensure proper environment variable setup

#### Stripe Payment Issues
- Verify Stripe keys are correct
- Check webhook configuration
- Test with Stripe test cards

#### Build Errors
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

### Debug Mode
Enable debug logging by setting:
\`\`\`env
DEBUG=true
NODE_ENV=development
\`\`\`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [LangChain](https://langchain.com/) - AI framework
- [Stripe](https://stripe.com/) - Payment processing
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: support@futureflow.com
- Documentation: [docs.futureflow.com](https://docs.futureflow.com)

## 🗺 Roadmap

### Upcoming Features
- [ ] Real-time collaboration
- [ ] Advanced analytics dashboard
- [ ] Mobile app
- [ ] API marketplace
- [ ] Enterprise features
- [ ] Multi-language support

### Version History
- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added LangChain integration
- **v1.2.0** - Enhanced payment system
- **v1.3.0** - Improved conversation management

---

Built with ❤️ by the FutureFlow team
\`\`\`

Now let's also create a comprehensive package.json file:
