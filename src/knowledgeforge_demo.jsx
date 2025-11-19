import React, { useState, useEffect } from 'react';
import { Search, Download, CheckCircle, XCircle, Eye, Filter, TrendingUp, Database, Mail, Settings, BarChart3, Network, Zap, AlertCircle, Clock, Star, Code } from 'lucide-react';

// Simulated Data
const generateSimulatedData = () => {
  const categories = ['Product Support', 'Billing', 'Technical', 'Sales', 'Policy', 'HR'];
  const knowledgeItems = [
    {
      id: 1,
      question: 'What is our refund policy for enterprise customers?',
      answer: 'Enterprise customers have a 60-day money-back guarantee. Refunds are processed within 5-7 business days of approval. Contact accounts@company.com to initiate.',
      category: 'Policy',
      confidence_score: 0.94,
      quality_tier: 'gold',
      status: 'approved',
      specificity_score: 0.91,
      vagueness_score: 0.12,
      context_score: 0.88,
      created_at: '2025-01-15T10:30:00',
      reviewed_by: 'sarah@company.com',
      email_id: 'msg_1a2b3c'
    },
    {
      id: 2,
      question: 'How do I troubleshoot database connection timeouts?',
      answer: 'Check: 1) Firewall rules allow port 5432, 2) Connection pool max size (default: 20), 3) Network latency <100ms. Increase timeout to 30s if needed: SET statement_timeout = 30000;',
      category: 'Technical',
      confidence_score: 0.89,
      quality_tier: 'gold',
      status: 'approved',
      specificity_score: 0.87,
      vagueness_score: 0.18,
      context_score: 0.92,
      created_at: '2025-01-14T15:20:00',
      reviewed_by: 'michael@company.com',
      email_id: 'msg_2b3c4d'
    },
    {
      id: 3,
      question: 'What payment methods do we accept for international orders?',
      answer: 'We accept Visa, Mastercard, American Express, and PayPal for all international orders. Wire transfers are available for orders over $10,000.',
      category: 'Billing',
      confidence_score: 0.86,
      quality_tier: 'silver',
      status: 'approved',
      specificity_score: 0.84,
      vagueness_score: 0.22,
      context_score: 0.80,
      created_at: '2025-01-14T09:15:00',
      reviewed_by: 'sarah@company.com',
      email_id: 'msg_3c4d5e'
    },
    {
      id: 4,
      question: 'How to handle customer escalations?',
      answer: 'Escalate to tier-2 support if resolution time exceeds 24 hours or if customer explicitly requests management involvement.',
      category: 'Product Support',
      confidence_score: 0.78,
      quality_tier: 'silver',
      status: 'draft',
      specificity_score: 0.75,
      vagueness_score: 0.35,
      context_score: 0.72,
      created_at: '2025-01-13T16:45:00',
      reviewed_by: null,
      email_id: 'msg_4d5e6f'
    },
    {
      id: 5,
      question: 'API rate limits for free tier?',
      answer: 'Free tier includes 1000 requests per hour. Upgrade to Pro ($49/mo) for 10,000 req/hr or Enterprise (unlimited).',
      category: 'Technical',
      confidence_score: 0.92,
      quality_tier: 'gold',
      status: 'approved',
      specificity_score: 0.90,
      vagueness_score: 0.15,
      context_score: 0.86,
      created_at: '2025-01-12T11:30:00',
      reviewed_by: 'michael@company.com',
      email_id: 'msg_5e6f7g'
    },
    {
      id: 6,
      question: 'When is open enrollment for benefits?',
      answer: 'Annual open enrollment runs November 1-30. Changes take effect January 1. Contact hr@company.com with questions.',
      category: 'HR',
      confidence_score: 0.88,
      quality_tier: 'gold',
      status: 'approved',
      specificity_score: 0.85,
      vagueness_score: 0.20,
      context_score: 0.82,
      created_at: '2025-01-11T14:20:00',
      reviewed_by: 'lisa@company.com',
      email_id: 'msg_6f7g8h'
    },
    {
      id: 7,
      question: 'How to configure SSO with Okta?',
      answer: 'In Settings > Authentication, enable SAML 2.0, upload Okta metadata XML, set ACS URL to https://app.company.com/saml/acs',
      category: 'Technical',
      confidence_score: 0.91,
      quality_tier: 'gold',
      status: 'approved',
      specificity_score: 0.89,
      vagueness_score: 0.16,
      context_score: 0.88,
      created_at: '2025-01-10T10:15:00',
      reviewed_by: 'michael@company.com',
      email_id: 'msg_7g8h9i'
    },
    {
      id: 8,
      question: 'Lead qualification criteria?',
      answer: 'Qualified leads: decision-making authority, budget >$5k, timeline <3 months, current pain point identified.',
      category: 'Sales',
      confidence_score: 0.84,
      quality_tier: 'silver',
      status: 'draft',
      specificity_score: 0.81,
      vagueness_score: 0.28,
      context_score: 0.76,
      created_at: '2025-01-09T13:40:00',
      reviewed_by: null,
      email_id: 'msg_8h9i0j'
    },
    {
      id: 9,
      question: 'Can customers downgrade mid-cycle?',
      answer: 'Yes, downgrades take effect at next billing cycle. Prorated refunds not available. Data export required before downgrade.',
      category: 'Billing',
      confidence_score: 0.76,
      quality_tier: 'bronze',
      status: 'draft',
      specificity_score: 0.72,
      vagueness_score: 0.42,
      context_score: 0.68,
      created_at: '2025-01-08T16:25:00',
      reviewed_by: null,
      email_id: 'msg_9i0j1k'
    },
    {
      id: 10,
      question: 'Performance optimization tips?',
      answer: 'Enable caching, minimize API calls, use CDN for assets, implement lazy loading, compress images.',
      category: 'Technical',
      confidence_score: 0.65,
      quality_tier: 'bronze',
      status: 'draft',
      specificity_score: 0.60,
      vagueness_score: 0.55,
      context_score: 0.58,
      created_at: '2025-01-07T09:50:00',
      reviewed_by: null,
      email_id: 'msg_0j1k2l'
    }
  ];

  return { knowledgeItems, categories };
};

const KnowledgeForgeDemo = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedKnowledge, setSelectedKnowledge] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTier, setFilterTier] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [syncProgress, setSyncProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [queryInput, setQueryInput] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  const [apiEndpoint, setApiEndpoint] = useState('/api/v1/search');
  const [apiMethod, setApiMethod] = useState('GET');
  const [apiResponse, setApiResponse] = useState(null);
  const [exportFormat, setExportFormat] = useState('jsonl');
  const [confidenceThreshold, setConfidenceThreshold] = useState(80);
  const [showTutorial, setShowTutorial] = useState(true);
  const [tutorialStep, setTutorialStep] = useState(0);


  const { knowledgeItems, categories } = generateSimulatedData();

  // Calculate stats - Midsize Business Scale
  const stats = {
    totalEmails: 28547,
    processedEmails: 24312,
    totalKnowledge: 4856,
    approvedKnowledge: 3672,
    pendingReview: 892,
    goldTier: 1842,
    silverTier: 1638,
    bronzeTier: 1376,
    avgConfidence: 0.847,
    extractionRate: 0.17, // 17% of emails yield knowledge
  };

  // Filter knowledge
  const filteredKnowledge = knowledgeItems.filter(item => {
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (filterTier !== 'all' && item.quality_tier !== filterTier) return false;
    if (searchQuery && !item.question.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.answer.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Toast notification
  const showToastMessage = (message, type = 'success') => {
    setShowToast({ message, type });
    setTimeout(() => setShowToast(null), 3000);
  };

  // Simulate email sync
  const handleSyncEmails = () => {
    setIsProcessing(true);
    setSyncProgress(0);
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          showToastMessage(`Successfully synced ${stats.totalEmails.toLocaleString()} emails!`);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // Simulate processing
  const handleProcessEmails = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      showToastMessage(`Extracted ${stats.totalKnowledge.toLocaleString()} knowledge items!`);
    }, 3000);
  };

  // Handle bulk approve
  const handleBulkApprove = () => {
    showToastMessage(`Approved ${selectedKnowledge.length} items`);
    setSelectedKnowledge([]);
  };

  // Handle bulk approve by confidence threshold
  const handleBulkApproveByThreshold = () => {
    const thresholdDecimal = confidenceThreshold / 100;
    const itemsToApprove = knowledgeItems.filter(k => 
      k.status === 'draft' && k.confidence_score >= thresholdDecimal
    );
    showToastMessage(`Approved ${itemsToApprove.length} items with ≥${confidenceThreshold}% confidence`);
    setSelectedKnowledge([]);
  };

  // Tutorial configuration
  const tutorialSteps = [
    { tab: 'dashboard', title: 'Welcome to KnowledgeForge', text: 'KnowledgeForge automatically mines your company\'s email communications to extract institutional knowledge - the questions employees ask and the expert answers they receive. Use it to train AI chatbots and support systems, create searchable knowledge bases for employees, accelerate new hire onboarding, reduce repeated questions to experts, preserve knowledge before employees leave, and identify documentation gaps. Instead of starting from scratch, you leverage the expertise already documented in thousands of email conversations.' },
    { tab: 'dashboard', title: 'Knowledge Stats', text: 'From 28,547 emails, we extracted 4,856 knowledge items. This is institutional intelligence hidden in inboxes.' },
    { tab: 'dashboard', title: 'Business Impact', text: '83% faster support, $45K onboarding savings, $180K knowledge loss protection. Real ROI from documented knowledge.' },
    { tab: 'knowledge', title: 'Knowledge Base', text: 'Browse categorized Q&As with confidence scores and quality tiers. Your searchable institutional memory.' },
    { tab: 'review', title: 'Review Queue', text: 'Bulk approve items by confidence threshold. Slide to 85% and approve high-quality extractions instantly.' },
    { tab: 'training', title: 'Export Data', text: 'JSONL for OpenAI, CSV for analysis, JSON for integrations, PDF for docs. Includes metadata and PII (Personally Identifiable Information) redaction.' },
    { tab: 'analytics', title: 'Analytics', text: 'See distribution across categories, quality tiers, and confidence levels. Track extraction accuracy.' },
    { tab: 'graph', title: 'Knowledge Graph', text: 'Visualize connections. Dense clusters = strong documentation. Isolated nodes = knowledge gaps.' },
    { tab: 'dashboard', title: 'Ready to Explore', text: 'Click the ? button anytime to restart. Your institutional knowledge is working for you.' }
  ];

  const nextTutorial = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      const next = tutorialStep + 1;
      setTutorialStep(next);
      setActiveTab(tutorialSteps[next].tab);
    } else {
      setShowTutorial(false);
    }
  };

  const prevTutorial = () => {
    if (tutorialStep > 0) {
      const prev = tutorialStep - 1;
      setTutorialStep(prev);
      setActiveTab(tutorialSteps[prev].tab);
    }
  };

  // Handle single item actions
  const handleApprove = (id) => {
    showToastMessage('Knowledge item approved');
  };

  const handleReject = (id) => {
    showToastMessage('Knowledge item rejected', 'warning');
  };

  // View details modal
  const viewDetails = (item) => {
    setModalContent(item);
    setShowModal(true);
  };

  // Handle knowledge query
  const handleKnowledgeQuery = () => {
    if (!queryInput.trim()) {
      showToastMessage('Please enter a question', 'warning');
      return;
    }

    // Simulate AI search through knowledge base
    setIsProcessing(true);
    setTimeout(() => {
      const relevantItems = knowledgeItems.filter(item => 
        item.question.toLowerCase().includes(queryInput.toLowerCase()) ||
        item.answer.toLowerCase().includes(queryInput.toLowerCase()) ||
        item.category.toLowerCase().includes(queryInput.toLowerCase())
      );

      if (relevantItems.length > 0) {
        const bestMatch = relevantItems[0];
        setQueryResult({
          answer: bestMatch.answer,
          confidence: bestMatch.confidence_score,
          source: bestMatch.question,
          category: bestMatch.category,
          email_id: bestMatch.email_id
        });
      } else {
        setQueryResult({
          answer: "I couldn't find a specific answer in the knowledge base. This might be a knowledge gap worth documenting.",
          confidence: 0,
          source: null,
          category: null,
          email_id: null
        });
      }
      setIsProcessing(false);
    }, 1500);
  };

  // Handle API playground request
  const handleApiRequest = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const mockResponse = {
        status: 200,
        timestamp: new Date().toISOString(),
        data: apiEndpoint.includes('search') ? {
          results: knowledgeItems.slice(0, 3).map(k => ({
            id: k.id,
            question: k.question,
            answer: k.answer.substring(0, 150) + '...',
            category: k.category,
            confidence_score: k.confidence_score
          })),
          count: 3,
          query: 'sample query'
        } : apiEndpoint.includes('knowledge') ? {
          knowledge: knowledgeItems.slice(0, 5).map(k => ({
            id: k.id,
            question: k.question,
            category: k.category,
            confidence_score: k.confidence_score
          })),
          total: stats.totalKnowledge
        } : {
          message: 'Success'
        },
        response_time_ms: 142
      };
      setApiResponse(mockResponse);
      setIsProcessing(false);
      showToastMessage('API request successful');
    }, 1000);
  };

  // Handle export
  const handleExport = (format) => {
    showToastMessage(`Preparing ${format.toUpperCase()} export...`);
    setTimeout(() => {
      showToastMessage(`${stats.approvedKnowledge.toLocaleString()} items exported successfully!`);
    }, 2000);
  };

  const getTierBadgeColor = (tier) => {
    switch(tier) {
      case 'gold': return 'bg-yellow-400 text-yellow-900';
      case 'silver': return 'bg-gray-400 text-gray-900';
      case 'bronze': return 'bg-orange-400 text-orange-900';
      default: return 'bg-gray-300 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-700">
      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-2xl animate-slide-in ${
          showToast.type === 'success' ? 'bg-green-500' : 
          showToast.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
        } text-white font-medium`}>
          {showToast.message}
        </div>
      )}

      {/* Modal */}
      {showModal && modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Knowledge Details</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Question</label>
                <p className="mt-2 text-lg font-medium text-gray-900">{modalContent.question}</p>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Answer</label>
                <p className="mt-2 text-gray-700 leading-relaxed">{modalContent.answer}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Category</label>
                  <p className="mt-2 text-gray-900">{modalContent.category}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Quality Tier</label>
                  <p className="mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getTierBadgeColor(modalContent.quality_tier)}`}>
                      {modalContent.quality_tier.toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <h3 className="font-semibold text-gray-900 mb-3">Quality Metrics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Confidence Score</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600" style={{width: `${modalContent.confidence_score * 100}%`}}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{(modalContent.confidence_score * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Specificity</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{width: `${modalContent.specificity_score * 100}%`}}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{(modalContent.specificity_score * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Context Score</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{width: `${modalContent.context_score * 100}%`}}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{(modalContent.context_score * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button onClick={() => { handleApprove(modalContent.id); setShowModal(false); }} 
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2">
                  <CheckCircle size={20} /> Approve
                </button>
                <button onClick={() => { handleReject(modalContent.id); setShowModal(false); }} 
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2">
                  <XCircle size={20} /> Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Database className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              KnowledgeForge Interactive Demo
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">daniel@company.com</span>
            <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'knowledge', label: 'Knowledge Base', icon: Database },
              { id: 'review', label: 'Review Queue', icon: CheckCircle },
              { id: 'applications', label: 'Applications', icon: Zap },
              // { id: 'api', label: 'API Playground', icon: Settings }, // COMMENTED OUT
              { id: 'training', label: 'Training Data', icon: Download },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'graph', label: 'Knowledge Graph', icon: Network }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Quick Actions - Moved to top for better UX */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Actions</h2>
                <p className="text-gray-600">Manage your knowledge extraction workflow</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Step 1: Sync Emails */}
                <div className="space-y-4">
                  <button 
                    onClick={handleSyncEmails}
                    disabled={isProcessing}
                    className="w-full flex items-center gap-3 p-6 border-2 border-indigo-200 hover:border-indigo-400 rounded-xl transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Mail className="text-indigo-600" size={32} />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Sync Emails</div>
                      <div className="text-sm text-gray-600">Import from Gmail</div>
                    </div>
                  </button>
                  
                  {/* Related Stats */}
                  <div className="bg-indigo-50 rounded-xl p-4 border-2 border-indigo-100">
                    <div className="flex items-center justify-between mb-1">
                      <Mail className="text-indigo-600" size={20} />
                      <span className="text-xs font-semibold text-indigo-600 uppercase">Total Emails</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stats.totalEmails.toLocaleString()}</div>
                    <div className="text-xs text-gray-600 mt-1">Synced from Gmail</div>
                  </div>
                </div>

                {/* Step 2: Process Emails */}
                <div className="space-y-4">
                  <button 
                    onClick={handleProcessEmails}
                    disabled={isProcessing}
                    className="w-full flex items-center gap-3 p-6 border-2 border-purple-200 hover:border-purple-400 rounded-xl transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Zap className="text-purple-600" size={32} />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Process Emails</div>
                      <div className="text-sm text-gray-600">Extract knowledge</div>
                    </div>
                  </button>
                  
                  {/* Related Stats - 3 cards stacked */}
                  <div className="space-y-2">
                    <div className="bg-purple-50 rounded-lg p-3 border-2 border-purple-100">
                      <div className="flex items-center justify-between mb-1">
                        <Zap className="text-purple-600" size={18} />
                        <span className="text-xs font-semibold text-purple-600 uppercase">Processed</span>
                      </div>
                      <div className="text-xl font-bold text-gray-900">{stats.processedEmails.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">AI extraction complete</div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-3 border-2 border-blue-100">
                      <div className="flex items-center justify-between mb-1">
                        <Database className="text-blue-600" size={18} />
                        <span className="text-xs font-semibold text-blue-600 uppercase">Knowledge</span>
                      </div>
                      <div className="text-xl font-bold text-gray-900">{stats.totalKnowledge.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Total extractions</div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-3 border-2 border-green-100">
                      <div className="flex items-center justify-between mb-1">
                        <CheckCircle className="text-green-600" size={18} />
                        <span className="text-xs font-semibold text-green-600 uppercase">Approved</span>
                      </div>
                      <div className="text-xl font-bold text-gray-900">{stats.approvedKnowledge.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Ready for use</div>
                    </div>
                  </div>
                </div>

                {/* Step 3: Review Queue */}
                <div className="space-y-4">
                  <button 
                    onClick={() => setActiveTab('review')}
                    className="w-full flex items-center gap-3 p-6 border-2 border-orange-200 hover:border-orange-400 rounded-xl transition-all hover:shadow-md"
                  >
                    <Clock className="text-orange-600" size={32} />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Review Queue</div>
                      <div className="text-sm text-gray-600">Action required</div>
                    </div>
                  </button>
                  
                  {/* Related Stats */}
                  <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-100">
                    <div className="flex items-center justify-between mb-1">
                      <AlertCircle className="text-orange-600" size={20} />
                      <span className="text-xs font-semibold text-orange-600 uppercase">Pending Review</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stats.pendingReview.toLocaleString()}</div>
                    <div className="text-xs text-gray-600 mt-1">Awaiting approval</div>
                  </div>
                </div>
              </div>

              {isProcessing && syncProgress > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Syncing emails...</span>
                    <span className="text-sm font-medium text-indigo-600">{syncProgress}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
                      style={{width: `${syncProgress}%`}}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Quality Distribution */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Quality Distribution</h2>
              <p className="text-gray-600 mb-6">Each extracted Q&A is automatically scored for confidence and assigned a quality tier. Higher tiers indicate more reliable information that's ready for AI training or immediate use.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                  <Star className="text-yellow-600 mx-auto mb-3" size={32} />
                  <div className="text-3xl font-bold text-yellow-900 mb-1">{stats.goldTier.toLocaleString()}</div>
                  <div className="text-sm font-semibold text-yellow-700 uppercase">Gold Tier</div>
                  <div className="text-xs text-yellow-600 mt-2">90-100% confidence</div>
                  <div className="text-xs text-yellow-700 mt-2 font-medium">Verified answers from clear, authoritative email exchanges. Production-ready for AI systems.</div>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-xl border-2 border-gray-300">
                  <Star className="text-gray-600 mx-auto mb-3" size={32} />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stats.silverTier.toLocaleString()}</div>
                  <div className="text-sm font-semibold text-gray-700 uppercase">Silver Tier</div>
                  <div className="text-xs text-gray-600 mt-2">75-89% confidence</div>
                  <div className="text-xs text-gray-700 mt-2 font-medium">Good quality answers that may need minor review before deployment.</div>
                </div>

                <div className="text-center p-6 bg-orange-50 rounded-xl border-2 border-orange-200">
                  <Star className="text-orange-600 mx-auto mb-3" size={32} />
                  <div className="text-3xl font-bold text-orange-900 mb-1">{stats.bronzeTier.toLocaleString()}</div>
                  <div className="text-sm font-semibold text-orange-700 uppercase">Bronze Tier</div>
                  <div className="text-xs text-orange-600 mt-2">60-74% confidence</div>
                  <div className="text-xs text-orange-700 mt-2 font-medium">Extracted knowledge that requires validation before use in critical systems.</div>
                </div>
              </div>
            </div>

            {/* Insights & Analysis Snapshot - Added to Dashboard */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg border-2 border-indigo-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Insights & Analysis</h3>
                    <p className="text-gray-600 text-sm">Strategic intelligence from your organizational knowledge</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-sm flex items-center gap-2"
                >
                  View Analytics
                  <BarChart3 size={16} />
                </button>
              </div>

              {/* Key Findings */}
              <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Eye size={16} className="text-blue-600" />
                  </div>
                  Key Findings from Your Email Extractions
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <div className="font-semibold text-gray-900 mb-2">💼 Strong Technical Documentation</div>
                    <div className="text-sm text-gray-700">
                      Your engineering teams have built a comprehensive knowledge repository with highly interconnected solutions. This documentation culture reduces onboarding time and accelerates problem resolution.
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                    <div className="font-semibold text-gray-900 mb-2">🔄 Cross-Department Alignment</div>
                    <div className="text-sm text-gray-700">
                      Company policies effectively bridge multiple departments, ensuring consistent processes and compliance. This organizational coherence minimizes miscommunication and streamlines operations.
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <div className="font-semibold text-gray-900 mb-2">✅ High-Confidence Information</div>
                    <div className="text-sm text-gray-700">
                      Over one-third of your knowledge base consists of verified, high-accuracy information. This reliable foundation ensures AI systems and team members receive trustworthy guidance.
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                    <div className="font-semibold text-gray-900 mb-2">📈 Growth Opportunities</div>
                    <div className="text-sm text-gray-700">
                      Sales and HR knowledge exists in silos with limited cross-referencing. Connecting these areas could reveal patterns in customer success, employee satisfaction, and revenue optimization.
                    </div>
                  </div>
                </div>
              </div>

              {/* Why This Matters - Expanded Version */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Star size={16} className="text-indigo-600" />
                  </div>
                  Business Impact
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Zap className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 mb-1">Reduce Support Response Time</div>
                      <div className="text-sm text-gray-700">
                        Your technical team has already documented solutions to the most common customer issues. With 1,847 support-related Q&As extracted, new support agents can resolve tickets 83% faster by searching this knowledge base instead of escalating to senior staff.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Database className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 mb-1">Accelerate Employee Onboarding</div>
                      <div className="text-sm text-gray-700">
                        New hires currently spend weeks asking colleagues the same questions. Your emails reveal that 67% of internal questions have been answered multiple times. Creating an internal knowledge hub could reduce onboarding time from 8 weeks to 5 weeks, saving approximately $45K annually in lost productivity.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Network className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 mb-1">Identify Revenue Opportunities</div>
                      <div className="text-sm text-gray-700">
                        Analysis shows Sales and Support teams independently discovered workarounds for the same customer pain points. Cross-referencing these insights reveals 3 potential product features that could address enterprise customer requests worth $2.4M in pipeline value.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <AlertCircle className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 mb-1">Mitigate Knowledge Loss Risk</div>
                      <div className="text-sm text-gray-700">
                        12 critical processes are documented only in emails from 3 senior employees. If any of these individuals leave without proper knowledge transfer, your company faces 6-8 weeks of operational disruption. Estimated risk exposure: $180K in productivity loss and potential customer churn.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <TrendingUp className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 mb-1">Improve Compliance & Consistency</div>
                      <div className="text-sm text-gray-700">
                        Your policy team has clarified GDPR procedures 43 times via email. Inconsistent answers create compliance risk. Centralizing these verified responses ensures every team member references the same authoritative guidance, reducing audit risk and preventing costly violations.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Removed duplicate Stats Grid - now integrated above */}

            {/* Business Impact Metrics */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 shadow-lg text-white">
              <h2 className="text-xl font-bold mb-6">Business Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">{(stats.extractionRate * 100).toFixed(1)}%</div>
                  <div className="text-sm text-indigo-100">Extraction Rate</div>
                  <div className="text-xs text-indigo-200 mt-1">Per email processed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">{(stats.avgConfidence * 100).toFixed(1)}%</div>
                  <div className="text-sm text-indigo-100">Avg Confidence</div>
                  <div className="text-xs text-indigo-200 mt-1">Across all extractions</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">2,840</div>
                  <div className="text-sm text-indigo-100">Hours Saved</div>
                  <div className="text-xs text-indigo-200 mt-1">Manual documentation</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">$285K</div>
                  <div className="text-sm text-indigo-100">Cost Avoidance</div>
                  <div className="text-xs text-indigo-200 mt-1">Knowledge management</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Applications */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            {/* Live Q&A Interface */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Search className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Live Knowledge Search</h2>
                  <p className="text-gray-600">Ask questions and get instant answers from your knowledge base</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
                <div className="flex gap-3 mb-4">
                  <input
                    type="text"
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleKnowledgeQuery()}
                    placeholder="Ask anything... e.g., 'What's our refund policy for enterprise customers?'"
                    className="flex-1 px-6 py-4 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 focus:outline-none text-lg"
                    disabled={isProcessing}
                  />
                  <button
                    onClick={handleKnowledgeQuery}
                    disabled={isProcessing}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Clock className="animate-spin" size={20} />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search size={20} />
                        Search
                      </>
                    )}
                  </button>
                </div>

                {/* Sample queries */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-gray-600 mr-2">Try:</span>
                  {[
                    'refund policy',
                    'database connection timeout',
                    'API rate limits',
                    'payment methods'
                  ].map(sample => (
                    <button
                      key={sample}
                      onClick={() => { setQueryInput(sample); handleKnowledgeQuery(); }}
                      className="px-3 py-1 bg-white hover:bg-indigo-100 text-gray-700 rounded-lg text-xs font-medium border border-indigo-200 transition-colors"
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>

              {/* Query Result */}
              {queryResult && (
                <div className="border-2 border-indigo-200 rounded-xl p-6 bg-white">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${queryResult.confidence > 0.8 ? 'bg-green-500' : queryResult.confidence > 0.6 ? 'bg-yellow-500' : 'bg-orange-500'}`}></div>
                      <span className="text-sm font-semibold text-gray-600 uppercase">
                        {queryResult.confidence > 0 ? `${(queryResult.confidence * 100).toFixed(0)}% Confidence` : 'No Match Found'}
                      </span>
                    </div>
                    {queryResult.category && (
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                        {queryResult.category}
                      </span>
                    )}
                  </div>

                  <div className="prose max-w-none">
                    <p className="text-gray-900 text-lg leading-relaxed mb-4">{queryResult.answer}</p>
                  </div>

                  {queryResult.source && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-xs text-gray-500 mb-2">SOURCE</div>
                      <div className="text-sm text-gray-700 font-medium mb-2">{queryResult.source}</div>
                      <div className="text-xs text-gray-500">
                        Email ID: {queryResult.email_id} â€¢ Extracted from company communications
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Use Cases Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Chatbot Integration */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="text-indigo-600" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">AI Chatbot Integration</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Power your support chatbot with {stats.approvedKnowledge.toLocaleString()} verified answers from real company communications.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Real-time knowledge lookup</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Confidence-scored responses</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Source attribution</span>
                  </div>
                </div>
                <button className="mt-4 w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-sm">
                  View Integration Docs
                </button>
              </div>

              {/* Decision Support */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-purple-300 transition-colors">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="text-purple-600" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Decision Intelligence</h3>
                <p className="text-gray-600 text-sm mb-4">
                  AI-powered recommendations based on patterns from {stats.processedEmails.toLocaleString()} past decisions.
                </p>
                <div className="bg-purple-50 rounded-lg p-3 mb-4">
                  <div className="text-xs text-purple-600 font-semibold mb-2">EXAMPLE PATTERN</div>
                  <div className="text-sm text-gray-700">
                    <strong>If:</strong> Customer requests refund AND &lt; 60 days<br/>
                    <strong>Then:</strong> Approve (confidence: 94%)
                  </div>
                  <div className="text-xs text-gray-500 mt-2">Based on 127 cases</div>
                </div>
                <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium text-sm">
                  View Decision Trees
                </button>
              </div>

              {/* Knowledge Gaps */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-orange-300 transition-colors">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <AlertCircle className="text-orange-600" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Knowledge Gaps</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Identify frequently asked questions without documented answers.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="bg-orange-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Pricing questions</span>
                      <span className="text-xs font-bold text-orange-600">47 gaps</span>
                    </div>
                    <div className="text-xs text-gray-600">Last 30 days</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">API documentation</span>
                      <span className="text-xs font-bold text-orange-600">32 gaps</span>
                    </div>
                    <div className="text-xs text-gray-600">Last 30 days</div>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium text-sm">
                  View All Gaps
                </button>
              </div>
            </div>

            {/* ROI Calculator */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 shadow-lg text-white">
              <h2 className="text-2xl font-bold mb-2">Estimated ROI Impact</h2>
              <p className="text-green-100 mb-6">Based on your {stats.totalKnowledge.toLocaleString()} knowledge items</p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur">
                  <div className="text-3xl font-bold mb-1">2,840h</div>
                  <div className="text-sm text-green-100">Documentation time saved</div>
                  <div className="text-xs text-green-200 mt-1">vs. manual creation</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur">
                  <div className="text-3xl font-bold mb-1">68%</div>
                  <div className="text-sm text-green-100">Faster response time</div>
                  <div className="text-xs text-green-200 mt-1">Support tickets</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur">
                  <div className="text-3xl font-bold mb-1">$285K</div>
                  <div className="text-sm text-green-100">Annual cost avoidance</div>
                  <div className="text-xs text-green-200 mt-1">Knowledge management</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur">
                  <div className="text-3xl font-bold mb-1">94%</div>
                  <div className="text-sm text-green-100">Answer accuracy</div>
                  <div className="text-xs text-green-200 mt-1">Confidence-weighted</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Knowledge Base */}
        {activeTab === 'knowledge' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Knowledge Base</h2>
              
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search knowledge..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="approved">Approved</option>
                  <option value="draft">Draft</option>
                  <option value="rejected">Rejected</option>
                </select>

                <select
                  value={filterTier}
                  onChange={(e) => setFilterTier(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                >
                  <option value="all">All Tiers</option>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                  <option value="bronze">Bronze</option>
                </select>
              </div>

              {/* Results count */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  Showing {filteredKnowledge.length} of {stats.totalKnowledge.toLocaleString()} knowledge items (sample view)
                </p>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium">
                  <Download size={16} />
                  Export
                </button>
              </div>

              {/* Knowledge list */}
              <div className="space-y-4">
                {filteredKnowledge.map(item => (
                  <div key={item.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.answer}</p>
                      </div>
                      <button
                        onClick={() => viewDetails(item)}
                        className="ml-4 p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <Eye size={20} className="text-gray-600" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {item.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getTierBadgeColor(item.quality_tier)}`}>
                        {item.quality_tier.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(item.status)}`}>
                        {item.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        Confidence: {(item.confidence_score * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* API Playground - DISABLED */}
        {false && activeTab === 'api' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">API Playground</h2>
                  <p className="text-gray-600">Test your KnowledgeForge API endpoints in real-time</p>
                </div>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold text-sm">
                  âœ“ API Active
                </div>
              </div>

              {/* API Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Endpoint</label>
                  <select
                    value={apiEndpoint}
                    onChange={(e) => setApiEndpoint(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="/api/v1/search">GET /api/v1/search - Search knowledge</option>
                    <option value="/api/v1/knowledge">GET /api/v1/knowledge - List knowledge items</option>
                    <option value="/api/v1/knowledge/:id">GET /api/v1/knowledge/:id - Get specific item</option>
                    <option value="/api/v1/categories">GET /api/v1/categories - List categories</option>
                    <option value="/api/v1/export">POST /api/v1/export - Export data</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">API Key</label>
                  <div className="relative">
                    <input
                      type="text"
                      value="kf_live_4a8b2c9d1e3f5g6h7i8j9k0l"
                      readOnly
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 font-mono text-sm"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              {/* Request Builder */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Request Configuration</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Query Parameters</label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="q=refund policy"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
                      />
                      <input
                        type="text"
                        placeholder="category=Billing"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
                      />
                      <input
                        type="text"
                        placeholder="limit=10"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
                      />
                      <input
                        type="text"
                        placeholder="min_confidence=0.8"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleApiRequest}
                      disabled={isProcessing}
                      className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? 'Sending Request...' : 'Send Request'}
                    </button>
                    <div className="text-sm text-gray-600">
                      Rate limit: <span className="font-semibold">1000/hour</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* API Response */}
              {apiResponse && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">Response</h3>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        apiResponse.status === 200 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {apiResponse.status} OK
                      </span>
                      <span className="text-sm text-gray-600">{apiResponse.response_time_ms}ms</span>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm font-mono">
                      {JSON.stringify(apiResponse, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Integration Examples */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Python Example */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Code size={18} className="text-blue-600" />
                  </div>
                  Python Integration
                </h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-xs font-mono">{`import requests

api_key = "kf_live_4a8b2c9d1e3f5g6h7i8j9k0l"
base_url = "https://api.knowledgeforge.ai"

# Search knowledge
response = requests.get(
    f"{base_url}/api/v1/search",
    headers={"X-API-Key": api_key},
    params={"q": "refund policy", "limit": 10}
)

results = response.json()
print(f"Found {results['count']} results")

for item in results['results']:
    print(f"{item['question']}")
    print(f"Confidence: {item['confidence_score']}")
`}</pre>
                </div>
              </div>

              {/* JavaScript Example */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Code size={18} className="text-yellow-600" />
                  </div>
                  JavaScript Integration
                </h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-xs font-mono">{`const apiKey = "kf_live_4a8b2c9d1e3f5g6h7i8j9k0l";
const baseUrl = "https://api.knowledgeforge.ai";

// Search knowledge
const response = await fetch(
    \`\${baseUrl}/api/v1/search?q=refund+policy\`,
    {
        headers: {
            "X-API-Key": apiKey
        }
    }
);

const data = await response.json();
console.log(\`Found \${data.count} results\`);

data.results.forEach(item => {
    console.log(item.question);
    console.log(\`Confidence: \${item.confidence_score}\`);
});
`}</pre>
                </div>
              </div>
            </div>

            {/* API Features */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">API Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">High Performance</h4>
                    <p className="text-sm text-gray-600">Average response time &lt;150ms with global CDN</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">99.9% Uptime</h4>
                    <p className="text-sm text-gray-600">Enterprise-grade reliability with SLA guarantees</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Database className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Real-time Updates</h4>
                    <p className="text-sm text-gray-600">Knowledge base syncs automatically as emails are processed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Review Queue */}
        {activeTab === 'review' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Review Queue</h2>
                  <p className="text-gray-600 mt-1">{stats.pendingReview.toLocaleString()} items pending review</p>
                </div>
                {selectedKnowledge.length > 0 && (
                  <div className="flex gap-3">
                    <button
                      onClick={handleBulkApprove}
                      className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold"
                    >
                      <CheckCircle size={20} />
                      Approve {selectedKnowledge.length}
                    </button>
                    <button
                      onClick={() => setSelectedKnowledge([])}
                      className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              {/* Bulk Approve by Confidence Threshold */}
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Star className="text-indigo-600" size={24} />
                      <h3 className="font-bold text-gray-900">Bulk Approve by Confidence</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Automatically approve all items that meet or exceed the confidence threshold
                    </p>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Minimum Confidence: {confidenceThreshold}%
                        </label>
                        <input
                          type="range"
                          min="60"
                          max="95"
                          step="5"
                          value={confidenceThreshold}
                          onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
                          className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <div className="relative mt-1 h-4">
                          <span className="absolute text-xs text-gray-500" style={{left: '0%'}}>60%</span>
                          <span className="absolute text-xs text-gray-500" style={{left: 'calc(28.57% - 12px)'}}>70%</span>
                          <span className="absolute text-xs text-gray-500" style={{left: 'calc(57.14% - 12px)'}}>80%</span>
                          <span className="absolute text-xs text-gray-500" style={{left: 'calc(85.71% - 12px)'}}>90%</span>
                          <span className="absolute text-xs text-gray-500" style={{left: 'calc(100% - 24px)'}}>95%</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleBulkApproveByThreshold}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold whitespace-nowrap"
                      >
                        <CheckCircle size={20} />
                        Approve {knowledgeItems.filter(k => k.status === 'draft' && k.confidence_score >= confidenceThreshold / 100).length} Items
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {knowledgeItems.filter(k => k.status === 'draft').map(item => (
                  <div key={item.id} className="border-2 border-gray-200 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={selectedKnowledge.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedKnowledge([...selectedKnowledge, item.id]);
                          } else {
                            setSelectedKnowledge(selectedKnowledge.filter(id => id !== item.id));
                          }
                        }}
                        className="mt-1 w-5 h-5 text-indigo-600 rounded cursor-pointer"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
                            <p className="text-gray-600 text-sm mb-3">{item.answer}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            {item.category}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getTierBadgeColor(item.quality_tier)}`}>
                            {item.quality_tier.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500">
                            Confidence: {(item.confidence_score * 100).toFixed(0)}%
                          </span>
                          <span className="text-xs text-gray-500">
                            Specificity: {(item.specificity_score * 100).toFixed(0)}%
                          </span>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => handleApprove(item.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium text-sm"
                          >
                            <CheckCircle size={16} />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium text-sm"
                          >
                            <XCircle size={16} />
                            Reject
                          </button>
                          <button
                            onClick={() => viewDetails(item)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium text-sm"
                          >
                            <Eye size={16} />
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Training Data */}
        {activeTab === 'training' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Download className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">AI Training Data Export</h2>
                  <p className="text-gray-600">Export your knowledge base in formats optimized for AI model training</p>
                </div>
              </div>

              {/* Export Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
                  <div className="text-sm text-green-600 font-semibold mb-1">APPROVED & READY</div>
                  <div className="text-3xl font-bold text-green-900">{stats.approvedKnowledge.toLocaleString()}</div>
                  <div className="text-xs text-green-600 mt-1">Gold + Silver tier items</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4">
                  <div className="text-sm text-blue-600 font-semibold mb-1">AVG CONFIDENCE</div>
                  <div className="text-3xl font-bold text-blue-900">{(stats.avgConfidence * 100).toFixed(1)}%</div>
                  <div className="text-xs text-blue-600 mt-1">Across all items</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
                  <div className="text-sm text-purple-600 font-semibold mb-1">CATEGORIES</div>
                  <div className="text-3xl font-bold text-purple-900">6</div>
                  <div className="text-xs text-purple-600 mt-1">Diverse knowledge types</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-4">
                  <div className="text-sm text-orange-600 font-semibold mb-1">ESTIMATED SIZE</div>
                  <div className="text-3xl font-bold text-orange-900">12.4MB</div>
                  <div className="text-xs text-orange-600 mt-1">JSONL format</div>
                </div>
              </div>

              {/* Export Formats */}
              <h3 className="text-lg font-bold text-gray-900 mb-4">Select Export Format</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  {
                    format: 'jsonl',
                    name: 'JSONL (OpenAI)',
                    description: 'Optimized for OpenAI fine-tuning',
                    Icon: Code,
                    use: 'GPT-4, GPT-3.5 fine-tuning',
                    size: '12.4 MB'
                  },
                  {
                    format: 'csv',
                    name: 'CSV (Universal)',
                    description: 'Compatible with spreadsheets',
                    Icon: BarChart3,
                    use: 'Excel, Google Sheets, analysis',
                    size: '8.2 MB'
                  },
                  {
                    format: 'json',
                    name: 'JSON (Structured)',
                    description: 'Full metadata included',
                    Icon: Database,
                    use: 'Custom integrations, APIs',
                    size: '15.7 MB'
                  },
                  {
                    format: 'pdf',
                    name: 'FAQ PDF',
                    description: 'Professional FAQ document',
                    Icon: Download,
                    use: 'Employee handbook, public docs',
                    size: '4.8 MB'
                  }
                ].map(format => (
                  <div
                    key={format.format}
                    onClick={() => setExportFormat(format.format)}
                    className={`cursor-pointer border-2 rounded-xl p-6 transition-all ${
                      exportFormat === format.format
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="mb-3">
                      <format.Icon size={32} className="text-indigo-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{format.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{format.description}</p>
                    <div className="text-xs text-gray-500 mb-2">
                      <strong>Best for:</strong> {format.use}
                    </div>
                    <div className="text-xs font-semibold text-indigo-600">
                      {format.size}
                    </div>
                  </div>
                ))}
              </div>

              {/* Export Options */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h4 className="font-bold text-gray-900 mb-4">Export Options</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer flex-1">
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 rounded flex-shrink-0" />
                      <span className="text-sm text-gray-700">Include metadata (confidence scores, categories, dates)</span>
                    </label>
                    <div className="relative group flex-shrink-0">
                      <div className="w-4 h-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold cursor-help transition-colors">
                        ?
                      </div>
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 w-72 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl pointer-events-none">
                        <div className="font-semibold mb-1">Metadata Fields</div>
                        Adds additional context like confidence scores (0-100%), category labels, extraction dates, and quality tiers. Essential for filtering and quality analysis.
                        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-1px] border-4 border-transparent border-r-gray-900"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer flex-1">
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 rounded flex-shrink-0" />
                      <span className="text-sm text-gray-700">Apply PII (Personally Identifiable Information) redaction to exported data</span>
                    </label>
                    <div className="relative group flex-shrink-0">
                      <div className="w-4 h-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold cursor-help transition-colors">
                        ?
                      </div>
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 w-72 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl pointer-events-none">
                        <div className="font-semibold mb-1">PII (Personally Identifiable Information) Redaction</div>
                        Automatically removes personally identifiable information (emails, phone numbers, SSNs, addresses) and replaces with [REDACTED]. Critical for GDPR/CCPA compliance.
                        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-1px] border-4 border-transparent border-r-gray-900"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer flex-1">
                      <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded flex-shrink-0" />
                      <span className="text-sm text-gray-700">Include only Gold tier items (highest quality)</span>
                    </label>
                    <div className="relative group flex-shrink-0">
                      <div className="w-4 h-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold cursor-help transition-colors">
                        ?
                      </div>
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 w-72 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl pointer-events-none">
                        <div className="font-semibold mb-1">Gold Tier Filtering</div>
                        Exports only items with 90-100% confidence scores ({stats.goldTier.toLocaleString()} items). Best for production AI training where accuracy is critical. Reduces dataset size but maximizes quality.
                        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-1px] border-4 border-transparent border-r-gray-900"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer flex-1">
                      <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded flex-shrink-0" />
                      <span className="text-sm text-gray-700">Split into train/validation sets (80/20)</span>
                    </label>
                    <div className="relative group flex-shrink-0">
                      <div className="w-4 h-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold cursor-help transition-colors">
                        ?
                      </div>
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 w-72 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl pointer-events-none">
                        <div className="font-semibold mb-1">Train/Validation Split</div>
                        Automatically splits data into two files: 80% for training ({Math.round(stats.approvedKnowledge * 0.8).toLocaleString()} items) and 20% for validation ({Math.round(stats.approvedKnowledge * 0.2).toLocaleString()} items). Essential for measuring model performance during fine-tuning.
                        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-1px] border-4 border-transparent border-r-gray-900"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* PDF-specific options */}
                  {exportFormat === 'pdf' && (
                    <div className="mt-4 pt-4 border-t border-gray-300">
                      <div className="text-sm font-semibold text-gray-900 mb-3">PDF Format Options</div>
                      <div className="space-y-3 pl-4">
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-2 cursor-pointer flex-1">
                            <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 rounded flex-shrink-0" />
                            <span className="text-sm text-gray-700">Group by category (separate sections)</span>
                          </label>
                          <div className="relative group flex-shrink-0">
                            <div className="w-4 h-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold cursor-help transition-colors">
                              ?
                            </div>
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 w-72 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl pointer-events-none">
                              <div className="font-semibold mb-1">Category Organization</div>
                              Groups Q&As by category (Technical, Billing, HR, etc.) with section headers and dividers. Makes navigation easier for readers browsing specific topics.
                              <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-1px] border-4 border-transparent border-r-gray-900"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-2 cursor-pointer flex-1">
                            <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 rounded flex-shrink-0" />
                            <span className="text-sm text-gray-700">Include table of contents with page numbers</span>
                          </label>
                          <div className="relative group flex-shrink-0">
                            <div className="w-4 h-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold cursor-help transition-colors">
                              ?
                            </div>
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 w-72 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl pointer-events-none">
                              <div className="font-semibold mb-1">Table of Contents</div>
                              Adds clickable TOC at the beginning with category sections and page numbers. Essential for PDFs over 10 pages for quick navigation.
                              <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-1px] border-4 border-transparent border-r-gray-900"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-2 cursor-pointer flex-1">
                            <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 rounded flex-shrink-0" />
                            <span className="text-sm text-gray-700">Add company logo and branding</span>
                          </label>
                          <div className="relative group flex-shrink-0">
                            <div className="w-4 h-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold cursor-help transition-colors">
                              ?
                            </div>
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 w-72 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl pointer-events-none">
                              <div className="font-semibold mb-1">Company Branding</div>
                              Adds your company logo to header/footer and applies brand colors from your account settings. Professional look for external distribution.
                              <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-1px] border-4 border-transparent border-r-gray-900"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-2 cursor-pointer flex-1">
                            <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded flex-shrink-0" />
                            <span className="text-sm text-gray-700">Include confidence scores in footer</span>
                          </label>
                          <div className="relative group flex-shrink-0">
                            <div className="w-4 h-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold cursor-help transition-colors">
                              ?
                            </div>
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 w-72 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl pointer-events-none">
                              <div className="font-semibold mb-1">Confidence Scores</div>
                              Shows AI confidence rating (0-100%) in small footer text for each answer. Useful for internal docs where users should know answer reliability. Not recommended for customer-facing FAQs.
                              <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-1px] border-4 border-transparent border-r-gray-900"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-2 cursor-pointer flex-1">
                            <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded flex-shrink-0" />
                            <span className="text-sm text-gray-700">Add "Last Updated" timestamp to each answer</span>
                          </label>
                          <div className="relative group flex-shrink-0">
                            <div className="w-4 h-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold cursor-help transition-colors">
                              ?
                            </div>
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 w-72 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl pointer-events-none">
                              <div className="font-semibold mb-1">Last Updated Timestamps</div>
                              Displays when each Q&A was last extracted or updated (e.g., "Updated: Nov 15, 2025"). Helps readers assess information freshness, especially for time-sensitive policies.
                              <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-1px] border-4 border-transparent border-r-gray-900"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleExport(exportFormat)}
                className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3"
              >
                <Download size={24} />
                Export {stats.approvedKnowledge.toLocaleString()} Items as {exportFormat.toUpperCase()}
              </button>
            </div>

            {/* Fine-tuning Workflow */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Fine-tuning Workflow</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  {
                    step: '1',
                    title: 'Export Data',
                    description: 'Download JSONL format',
                    status: 'complete'
                  },
                  {
                    step: '2',
                    title: 'Upload to OpenAI',
                    description: 'Create training file',
                    status: 'current'
                  },
                  {
                    step: '3',
                    title: 'Start Fine-tune',
                    description: 'Select base model',
                    status: 'pending'
                  },
                  {
                    step: '4',
                    title: 'Deploy Model',
                    description: 'Production ready',
                    status: 'pending'
                  }
                ].map(item => (
                  <div key={item.step} className="relative">
                    <div className={`rounded-xl p-6 border-2 ${
                      item.status === 'complete' ? 'border-green-500 bg-green-50' :
                      item.status === 'current' ? 'border-indigo-500 bg-indigo-50' :
                      'border-gray-200 bg-gray-50'
                    }`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-3 ${
                        item.status === 'complete' ? 'bg-green-500 text-white' :
                        item.status === 'current' ? 'bg-indigo-600 text-white' :
                        'bg-gray-300 text-gray-600'
                      }`}>
                        {item.step}
                      </div>
                      <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    {item.step !== '4' && (
                      <div className="hidden md:block absolute top-1/2 left-full ml-2 transform -translate-y-1/2 text-2xl text-gray-400">
                        →
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Training Data */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {exportFormat === 'pdf' ? 'FAQ PDF Preview' : 'Sample Training Data (JSONL Format)'}
              </h3>
              <p className="text-gray-600 mb-4">
                {exportFormat === 'pdf' 
                  ? 'Preview of your professional FAQ document format:' 
                  : 'Preview of what your exported training data looks like:'}
              </p>
              
              {exportFormat === 'pdf' ? (
                // PDF Preview
                <div className="border-2 border-gray-300 rounded-xl overflow-hidden">
                  {/* PDF Header */}
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl font-bold">Company Knowledge Base</div>
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                        <Database className="text-indigo-600" size={32} />
                      </div>
                    </div>
                    <div className="text-indigo-100 text-sm">
                      Frequently Asked Questions â€¢ Generated: November 17, 2025 â€¢ Version 1.0
                    </div>
                  </div>
                  
                  {/* PDF Content Sample */}
                  <div className="bg-white p-8">
                    {/* Table of Contents */}
                    <div className="mb-8 pb-8 border-b-2 border-gray-200">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Table of Contents</h2>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-700">1. Technical Support ......................</span>
                          <span className="text-gray-500">Page 3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">2. Product Support ......................</span>
                          <span className="text-gray-500">Page 8</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">3. Billing & Payments ................</span>
                          <span className="text-gray-500">Page 12</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">4. HR & Benefits ...........................</span>
                          <span className="text-gray-500">Page 15</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">5. Sales & Lead Management .....</span>
                          <span className="text-gray-500">Page 18</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">6. Company Policies ...................</span>
                          <span className="text-gray-500">Page 21</span>
                        </div>
                      </div>
                    </div>

                    {/* Sample FAQ Section */}
                    <div className="mb-6">
                      <div className="bg-indigo-50 px-4 py-2 rounded-t-lg border-b-2 border-indigo-600">
                        <h3 className="text-lg font-bold text-indigo-900">1. Technical Support</h3>
                      </div>
                      <div className="p-6 border-2 border-gray-200 rounded-b-lg">
                        {/* Q&A 1 */}
                        <div className="mb-6">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                              Q
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-lg">How do I troubleshoot database connection timeouts?</h4>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 ml-11">
                            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                              A
                            </div>
                            <div className="text-gray-700 leading-relaxed">
                              Check the following: 1) Ensure firewall rules allow port 5432, 2) Verify connection pool max size (default: 20 connections), 3) Confirm network latency is under 100ms. If issues persist, increase timeout to 30 seconds using: <code className="bg-gray-100 px-2 py-1 rounded text-sm">SET statement_timeout = 30000;</code>
                            </div>
                          </div>
                        </div>

                        {/* Q&A 2 */}
                        <div className="mb-6">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                              Q
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-lg">What are the API rate limits for our free tier?</h4>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 ml-11">
                            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                              A
                            </div>
                            <div className="text-gray-700 leading-relaxed">
                              The free tier includes 1,000 requests per hour. For higher limits, upgrade to Pro ($49/month) for 10,000 requests per hour or Enterprise for unlimited requests with dedicated support.
                            </div>
                          </div>
                        </div>

                        {/* Q&A 3 */}
                        <div>
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                              Q
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-lg">How do I configure SSO with Okta?</h4>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 ml-11">
                            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                              A
                            </div>
                            <div className="text-gray-700 leading-relaxed">
                              Navigate to Settings â†’ Authentication, enable SAML 2.0, upload your Okta metadata XML file, and set the ACS URL to: <code className="bg-gray-100 px-2 py-1 rounded text-sm">https://app.company.com/saml/acs</code>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* PDF Footer */}
                    <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-200">
                      Page 3 of 24 â€¢ Generated from 3,672 verified knowledge items â€¢ Confidence-scored and reviewed
                    </div>
                  </div>
                </div>
              ) : (
                // JSONL Preview (existing code)
                <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
                  <pre className="text-green-400 text-xs font-mono">{`{"messages": [{"role": "system", "content": "You are a helpful customer support assistant with deep knowledge of company policies."}, {"role": "user", "content": "What is our refund policy for enterprise customers?"}, {"role": "assistant", "content": "Enterprise customers have a 60-day money-back guarantee. Refunds are processed within 5-7 business days of approval. Contact accounts@company.com to initiate."}], "metadata": {"category": "Policy", "confidence": 0.94, "source_email_id": "msg_1a2b3c"}}
{"messages": [{"role": "system", "content": "You are a helpful customer support assistant with deep knowledge of company policies."}, {"role": "user", "content": "How do I troubleshoot database connection timeouts?"}, {"role": "assistant", "content": "Check: 1) Firewall rules allow port 5432, 2) Connection pool max size (default: 20), 3) Network latency <100ms. Increase timeout to 30s if needed: SET statement_timeout = 30000;"}], "metadata": {"category": "Technical", "confidence": 0.89, "source_email_id": "msg_2b3c4d"}}
{"messages": [{"role": "system", "content": "You are a helpful customer support assistant with deep knowledge of company policies."}, {"role": "user", "content": "What payment methods do we accept for international orders?"}, {"role": "assistant", "content": "We accept Visa, Mastercard, American Express, and PayPal for all international orders. Wire transfers are available for orders over $10,000."}], "metadata": {"category": "Billing", "confidence": 0.86, "source_email_id": "msg_3c4d5e"}}`}</pre>
                </div>
              )}

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {exportFormat === 'pdf' ? (
                  <>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-sm text-blue-600 font-semibold mb-1">PROFESSIONAL LAYOUT</div>
                      <div className="text-sm text-gray-700">Clean, branded design with table of contents, page numbers, and section dividers</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-sm text-green-600 font-semibold mb-1">ORGANIZED BY CATEGORY</div>
                      <div className="text-sm text-gray-700">Questions grouped logically for easy navigation and reference</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-sm text-purple-600 font-semibold mb-1">MULTIPLE USE CASES</div>
                      <div className="text-sm text-gray-700">Employee onboarding, public documentation, customer self-service portal</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-sm text-blue-600 font-semibold mb-1">FORMAT</div>
                      <div className="text-sm text-gray-700">One JSON object per line, OpenAI Chat format with system/user/assistant roles</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-sm text-green-600 font-semibold mb-1">METADATA</div>
                      <div className="text-sm text-gray-700">Category, confidence score, and source tracking for quality analysis</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-sm text-purple-600 font-semibold mb-1">USAGE</div>
                      <div className="text-sm text-gray-700">Ready for OpenAI fine-tuning API or custom model training pipelines</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Distribution */}
                <div className="border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Knowledge by Category</h3>
                  <div className="space-y-3">
                    {[
                      { category: 'Technical', count: 1165, percentage: 24 },
                      { category: 'Product Support', count: 950, percentage: 20 },
                      { category: 'HR', count: 748, percentage: 15 },
                      { category: 'Billing', count: 730, percentage: 15 },
                      { category: 'Sales', count: 680, percentage: 14 },
                      { category: 'Policy', count: 583, percentage: 12 }
                    ].map(item => (
                      <div key={item.category}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-700 font-medium">{item.category}</span>
                          <span className="text-sm text-gray-600">{item.count.toLocaleString()} ({item.percentage}%)</span>
                        </div>
                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                            style={{width: `${item.percentage}%`}}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500 text-center">
                    Total: {stats.totalKnowledge.toLocaleString()} knowledge items
                  </div>
                </div>

                {/* Confidence Distribution */}
                <div className="border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Confidence Distribution</h3>
                  <div className="space-y-4">
                    {[
                      { range: '90-100%', count: 1842, color: 'bg-green-500', percentage: 38 },
                      { range: '80-89%', count: 1456, color: 'bg-blue-500', percentage: 30 },
                      { range: '70-79%', count: 1072, color: 'bg-yellow-500', percentage: 22 },
                      { range: 'Below 70%', count: 486, color: 'bg-orange-500', percentage: 10 },
                    ].map(item => (
                      <div key={item.range} className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded ${item.color} flex-shrink-0`}></div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">{item.range}</span>
                            <span className="text-sm text-gray-600">{item.count.toLocaleString()} items ({item.percentage}%)</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${item.color}`}
                              style={{width: `${item.percentage}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500 text-center">
                    Average confidence: {(stats.avgConfidence * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Recent Activity Timeline */}
              <div className="mt-8 border-2 border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900">Recent Activity</h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Last 24 hours â€¢ {stats.totalKnowledge.toLocaleString()} total items
                  </span>
                </div>
                <div className="space-y-4">
                  {knowledgeItems.slice(0, 5).map(item => (
                    <div key={item.id} className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-medium text-gray-900">{item.question}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.category} â€¢ {new Date(item.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Knowledge Graph */}
        {activeTab === 'graph' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Knowledge Graph</h2>
                  <p className="text-gray-600">Visual representation of knowledge relationships and semantic clusters</p>
                  <p className="text-sm text-indigo-600 mt-1">Showing ~100 representative nodes from {stats.totalKnowledge.toLocaleString()} total knowledge items</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-sm">
                    Reset View
                  </button>
                  <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium text-sm">
                    Export Image
                  </button>
                </div>
              </div>

              {/* Graph Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4">
                  <div className="text-sm text-indigo-600 font-semibold mb-1">KNOWLEDGE NODES</div>
                  <div className="text-3xl font-bold text-indigo-900">{stats.totalKnowledge.toLocaleString()}</div>
                  <div className="text-xs text-indigo-600 mt-1">One per extracted item</div>
                </div>
                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                  <div className="text-sm text-purple-600 font-semibold mb-1">CATEGORY CLUSTERS</div>
                  <div className="text-3xl font-bold text-purple-900">6</div>
                  <div className="text-xs text-purple-600 mt-1">Major topic groups</div>
                </div>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <div className="text-sm text-blue-600 font-semibold mb-1">RELATIONSHIPS</div>
                  <div className="text-3xl font-bold text-blue-900">8,254</div>
                  <div className="text-xs text-blue-600 mt-1">Semantic connections</div>
                </div>
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <div className="text-sm text-green-600 font-semibold mb-1">AVG CONNECTIONS</div>
                  <div className="text-3xl font-bold text-green-900">1.7</div>
                  <div className="text-xs text-green-600 mt-1">Links per node</div>
                </div>
              </div>

              {/* Interactive Graph Visualization */}
              <div className="border-2 border-gray-300 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden" style={{height: '600px'}}>
                <svg id="knowledgeGraph" width="100%" height="100%">
                  {/* Define gradients and patterns */}
                  <defs>
                    <radialGradient id="nodeGradientGold">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </radialGradient>
                    <radialGradient id="nodeGradientSilver">
                      <stop offset="0%" stopColor="#d1d5db" />
                      <stop offset="100%" stopColor="#9ca3af" />
                    </radialGradient>
                    <radialGradient id="nodeGradientBronze">
                      <stop offset="0%" stopColor="#fb923c" />
                      <stop offset="100%" stopColor="#f97316" />
                    </radialGradient>
                  </defs>

                  {/* Category clusters (background circles) */}
                  <g id="clusters">
                    {/* Technical cluster */}
                    <circle cx="200" cy="200" r="80" fill="#dbeafe" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="r" values="80;85;80" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <text x="200" y="120" textAnchor="middle" fill="#1e40af" fontSize="14" fontWeight="bold">Technical</text>

                    {/* Product Support cluster */}
                    <circle cx="500" cy="180" r="70" fill="#fef3c7" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="r" values="70;75;70" dur="3.5s" repeatCount="indefinite" />
                    </circle>
                    <text x="500" y="100" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="bold">Product Support</text>

                    {/* Billing cluster */}
                    <circle cx="750" cy="250" r="65" fill="#dcfce7" fillOpacity="0.3" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="r" values="65;70;65" dur="4s" repeatCount="indefinite" />
                    </circle>
                    <text x="750" y="170" textAnchor="middle" fill="#15803d" fontSize="14" fontWeight="bold">Billing</text>

                    {/* HR cluster */}
                    <circle cx="300" cy="450" r="60" fill="#fce7f3" fillOpacity="0.3" stroke="#ec4899" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="r" values="60;65;60" dur="3.2s" repeatCount="indefinite" />
                    </circle>
                    <text x="300" y="375" textAnchor="middle" fill="#9f1239" fontSize="14" fontWeight="bold">HR</text>

                    {/* Sales cluster */}
                    <circle cx="600" cy="450" r="65" fill="#e0e7ff" fillOpacity="0.3" stroke="#6366f1" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="r" values="65;70;65" dur="3.8s" repeatCount="indefinite" />
                    </circle>
                    <text x="600" y="370" textAnchor="middle" fill="#3730a3" fontSize="14" fontWeight="bold">Sales</text>

                    {/* Policy cluster */}
                    <circle cx="450" cy="320" r="55" fill="#fef2f2" fillOpacity="0.3" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="r" values="55;60;55" dur="4.2s" repeatCount="indefinite" />
                    </circle>
                    <text x="450" y="255" textAnchor="middle" fill="#991b1b" fontSize="14" fontWeight="bold">Policy</text>
                  </g>

                  {/* Connection lines */}
                  <g id="connections" opacity="0.3">
                    {/* Technical connections - dense interconnections */}
                    <line x1="200" y1="200" x2="500" y2="180" stroke="#3b82f6" strokeWidth="1.5" />
                    <line x1="200" y1="200" x2="450" y2="320" stroke="#3b82f6" strokeWidth="1.5" />
                    <line x1="200" y1="200" x2="300" y2="450" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="180" y1="210" x2="220" y2="190" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="220" y1="190" x2="195" y2="235" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="180" y1="210" x2="165" y2="185" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="210" y1="220" x2="185" y2="195" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="230" y1="205" x2="175" y2="225" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="205" y1="180" x2="240" y2="195" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="170" y1="245" x2="225" y2="235" stroke="#3b82f6" strokeWidth="0.8" />
                    <line x1="190" y1="255" x2="155" y2="200" stroke="#3b82f6" strokeWidth="0.8" />
                    <line x1="245" y1="220" x2="160" y2="215" stroke="#3b82f6" strokeWidth="0.8" />
                    <line x1="235" y1="180" x2="200" y2="265" stroke="#3b82f6" strokeWidth="0.8" />
                    <line x1="215" y1="250" x2="150" y2="230" stroke="#3b82f6" strokeWidth="0.8" />
                    
                    {/* Product Support connections - moderate density */}
                    <line x1="500" y1="180" x2="750" y2="250" stroke="#f59e0b" strokeWidth="1.5" />
                    <line x1="500" y1="180" x2="600" y2="450" stroke="#f59e0b" strokeWidth="1" />
                    <line x1="500" y1="180" x2="450" y2="320" stroke="#f59e0b" strokeWidth="1.5" />
                    <line x1="480" y1="170" x2="520" y2="195" stroke="#f59e0b" strokeWidth="1" />
                    <line x1="520" y1="195" x2="490" y2="155" stroke="#f59e0b" strokeWidth="1" />
                    <line x1="510" y1="180" x2="470" y2="190" stroke="#f59e0b" strokeWidth="1" />
                    <line x1="530" y1="170" x2="500" y2="210" stroke="#f59e0b" strokeWidth="1" />
                    <line x1="465" y1="175" x2="535" y2="185" stroke="#f59e0b" strokeWidth="0.8" />
                    <line x1="485" y1="145" x2="515" y2="165" stroke="#f59e0b" strokeWidth="0.8" />
                    <line x1="475" y1="160" x2="540" y2="200" stroke="#f59e0b" strokeWidth="0.8" />
                    <line x1="495" y1="200" x2="525" y2="150" stroke="#f59e0b" strokeWidth="0.8" />
                    <line x1="460" y1="185" x2="515" y2="165" stroke="#f59e0b" strokeWidth="0.8" />
                    
                    {/* Billing connections - moderate density */}
                    <line x1="750" y1="250" x2="600" y2="450" stroke="#22c55e" strokeWidth="1.5" />
                    <line x1="750" y1="250" x2="450" y2="320" stroke="#22c55e" strokeWidth="1" />
                    <line x1="740" y1="240" x2="765" y2="265" stroke="#22c55e" strokeWidth="1" />
                    <line x1="765" y1="265" x2="725" y2="255" stroke="#22c55e" strokeWidth="1" />
                    <line x1="755" y1="235" x2="770" y2="250" stroke="#22c55e" strokeWidth="1" />
                    <line x1="735" y1="270" x2="720" y2="240" stroke="#22c55e" strokeWidth="1" />
                    <line x1="775" y1="225" x2="750" y2="275" stroke="#22c55e" strokeWidth="0.8" />
                    <line x1="730" y1="225" x2="780" y2="260" stroke="#22c55e" strokeWidth="0.8" />
                    <line x1="745" y1="220" x2="760" y2="280" stroke="#22c55e" strokeWidth="0.8" />
                    <line x1="715" y1="245" x2="785" y2="245" stroke="#22c55e" strokeWidth="0.8" />
                    
                    {/* HR connections - lower density */}
                    <line x1="290" y1="460" x2="315" y2="445" stroke="#ec4899" strokeWidth="1" />
                    <line x1="275" y1="450" x2="305" y2="470" stroke="#ec4899" strokeWidth="1" />
                    <line x1="280" y1="435" x2="320" y2="455" stroke="#ec4899" strokeWidth="0.8" />
                    <line x1="295" y1="480" x2="270" y2="465" stroke="#ec4899" strokeWidth="0.8" />
                    <line x1="310" y1="435" x2="325" y2="465" stroke="#ec4899" strokeWidth="0.8" />
                    <line x1="285" y1="445" x2="300" y2="425" stroke="#ec4899" strokeWidth="0.8" />
                    
                    {/* Sales connections - moderate density */}
                    <line x1="590" y1="440" x2="615" y2="465" stroke="#6366f1" strokeWidth="1" />
                    <line x1="575" y1="455" x2="605" y2="425" stroke="#6366f1" strokeWidth="1" />
                    <line x1="620" y1="445" x2="585" y2="470" stroke="#6366f1" strokeWidth="1" />
                    <line x1="600" y1="480" x2="570" y2="435" stroke="#6366f1" strokeWidth="0.8" />
                    <line x1="625" y1="430" x2="595" y2="415" stroke="#6366f1" strokeWidth="0.8" />
                    <line x1="610" y1="475" x2="580" y2="420" stroke="#6366f1" strokeWidth="0.8" />
                    <line x1="630" y1="455" x2="565" y2="465" stroke="#6366f1" strokeWidth="0.8" />
                    <line x1="615" y1="410" x2="585" y2="470" stroke="#6366f1" strokeWidth="0.8" />
                    
                    {/* Policy connections - hub node with many connections */}
                    <line x1="440" y1="310" x2="465" y2="335" stroke="#ef4444" strokeWidth="1" />
                    <line x1="425" y1="325" x2="455" y2="295" stroke="#ef4444" strokeWidth="1" />
                    <line x1="475" y1="315" x2="430" y2="340" stroke="#ef4444" strokeWidth="1" />
                    <line x1="470" y1="330" x2="445" y2="350" stroke="#ef4444" strokeWidth="0.8" />
                    <line x1="415" y1="310" x2="485" y2="325" stroke="#ef4444" strokeWidth="0.8" />
                    <line x1="435" y1="290" x2="460" y2="345" stroke="#ef4444" strokeWidth="0.8" />
                    <line x1="420" y1="355" x2="465" y2="335" stroke="#ef4444" strokeWidth="0.8" />
                    
                    {/* Cross-category connections - many more dashed lines */}
                    <line x1="300" y1="450" x2="600" y2="450" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="450" y1="320" x2="600" y2="450" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="200" y1="200" x2="740" y2="240" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3,3" />
                    <line x1="500" y1="180" x2="290" y2="460" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3,3" />
                    <line x1="450" y1="320" x2="750" y2="250" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3,3" />
                    <line x1="300" y1="450" x2="500" y2="180" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3,3" />
                    <line x1="600" y1="450" x2="200" y2="200" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3,3" />
                    <line x1="450" y1="320" x2="200" y2="200" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3,3" />
                    <line x1="290" y1="460" x2="740" y2="240" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3,3" />
                    <line x1="600" y1="450" x2="450" y2="320" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3,3" />
                    <line x1="500" y1="180" x2="600" y2="450" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3,3" />
                    <line x1="220" y1="190" x2="480" y2="170" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="3,3" />
                    <line x1="195" y1="235" x2="520" y2="195" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="3,3" />
                    <line x1="765" y1="265" x2="615" y2="465" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="3,3" />
                    <line x1="465" y1="335" x2="590" y2="440" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="3,3" />
                    <line x1="440" y1="310" x2="290" y2="460" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="3,3" />
                    <line x1="740" y1="240" x2="500" y2="180" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="3,3" />
                  </g>

                  {/* Knowledge nodes */}
                  <g id="nodes">
                    {/* Technical nodes (Gold tier) - ~25 nodes */}
                    <g className="node-group cursor-pointer" transform="translate(180, 210)">
                      <circle r="8" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2">
                        <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <title>Database timeout troubleshooting (Gold - 89%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(220, 190)">
                      <circle r="7" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>API rate limits configuration (Gold - 92%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(195, 235)">
                      <circle r="7" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>SSO setup with Okta (Gold - 91%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(165, 185)">
                      <circle r="6" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>Docker deployment guide (Gold - 88%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(210, 220)">
                      <circle r="6" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Cache configuration (Silver - 85%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(185, 195)">
                      <circle r="6" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>Kubernetes setup (Gold - 90%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(230, 205)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Load balancer config (Silver - 82%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(175, 225)">
                      <circle r="6" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>API versioning strategy (Gold - 91%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(205, 180)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Webhook configuration (Silver - 81%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(240, 195)">
                      <circle r="5" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>Performance tips (Bronze - 72%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(170, 245)">
                      <circle r="6" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>Database migration (Gold - 89%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(225, 235)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Logging best practices (Silver - 79%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(190, 255)">
                      <circle r="5" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>Debug tools (Bronze - 68%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(155, 200)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>CI/CD pipeline (Silver - 84%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(245, 220)">
                      <circle r="4" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>Testing strategies (Bronze - 70%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(160, 215)">
                      <circle r="6" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>Security headers (Gold - 87%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(235, 180)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Rate limiting setup (Silver - 80%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(200, 265)">
                      <circle r="4" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>Code review tips (Bronze - 65%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(215, 250)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Monitoring setup (Silver - 83%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(150, 230)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Backup procedures (Silver - 86%)</title>
                    </g>

                    {/* Product Support nodes (Silver tier) - ~20 nodes */}
                    <g className="node-group cursor-pointer" transform="translate(480, 170)">
                      <circle r="7" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2">
                        <animate attributeName="r" values="7;9;7" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                      <title>Customer escalation process (Silver - 78%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(520, 195)">
                      <circle r="6" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Feature request workflow (Silver - 81%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(490, 155)">
                      <circle r="6" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Bug reporting guidelines (Silver - 76%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(510, 180)">
                      <circle r="6" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>Priority support SLA (Gold - 88%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(470, 190)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Ticket assignment rules (Silver - 79%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(530, 170)">
                      <circle r="5" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>Response templates (Bronze - 71%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(500, 210)">
                      <circle r="6" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Customer onboarding (Silver - 82%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(465, 175)">
                      <circle r="5" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>FAQ updates (Bronze - 69%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(535, 185)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Feedback collection (Silver - 77%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(485, 145)">
                      <circle r="4" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>Common issues (Bronze - 68%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(515, 165)">
                      <circle r="6" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>Account recovery (Gold - 87%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(475, 160)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Access permissions (Silver - 80%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(540, 200)">
                      <circle r="4" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>Tips and tricks (Bronze - 66%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(495, 200)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Product updates (Silver - 83%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(525, 150)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Integration support (Silver - 81%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(460, 185)">
                      <circle r="4" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>Troubleshooting basics (Bronze - 70%)</title>
                    </g>

                    {/* Billing nodes (Gold tier) - ~18 nodes */}
                    <g className="node-group cursor-pointer" transform="translate(740, 240)">
                      <circle r="8" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2">
                        <animate attributeName="r" values="8;10;8" dur="2.2s" repeatCount="indefinite" />
                      </circle>
                      <title>Payment methods international (Gold - 86%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(765, 265)">
                      <circle r="7" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>Refund policy enterprise (Gold - 94%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(725, 255)">
                      <circle r="6" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>Invoice generation (Gold - 89%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(755, 235)">
                      <circle r="6" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Subscription management (Silver - 85%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(770, 250)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Payment retry logic (Silver - 80%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(735, 270)">
                      <circle r="6" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>Tax calculation rules (Gold - 91%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(720, 240)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Proration handling (Silver - 78%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(775, 225)">
                      <circle r="5" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>Billing FAQs (Bronze - 72%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(750, 275)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Credit card validation (Silver - 83%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(730, 225)">
                      <circle r="4" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>Payment troubleshooting (Bronze - 69%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(780, 260)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Dunning management (Silver - 81%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(745, 220)">
                      <circle r="6" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>Enterprise contracts (Gold - 88%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(760, 280)">
                      <circle r="4" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>Billing terminology (Bronze - 67%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(715, 245)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>ACH payments (Silver - 79%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(785, 245)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Upgrade flow (Silver - 84%)</title>
                    </g>

                    {/* HR nodes (Silver/Bronze) - ~15 nodes */}
                    <g className="node-group cursor-pointer" transform="translate(290, 460)">
                      <circle r="7" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2">
                        <animate attributeName="r" values="7;9;7" dur="2.8s" repeatCount="indefinite" />
                      </circle>
                      <title>Benefits open enrollment (Silver - 88%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(315, 445)">
                      <circle r="5" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>PTO request process (Bronze - 72%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(275, 450)">
                      <circle r="6" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>401k matching policy (Gold - 87%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(305, 470)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Performance review process (Silver - 80%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(280, 435)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Health insurance options (Silver - 83%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(320, 455)">
                      <circle r="4" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>Employee handbook (Bronze - 70%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(295, 480)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Parental leave policy (Silver - 85%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(270, 465)">
                      <circle r="4" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>Office policies (Bronze - 68%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(310, 435)">
                      <circle r="6" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>Compensation structure (Gold - 89%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(325, 465)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Remote work policy (Silver - 81%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(285, 445)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Training programs (Silver - 77%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(300, 425)">
                      <circle r="4" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>Dress code (Bronze - 65%)</title>
                    </g>

                    {/* Sales nodes (Silver tier) - ~18 nodes */}
                    <g className="node-group cursor-pointer" transform="translate(590, 440)">
                      <circle r="6" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2">
                        <animate attributeName="r" values="6;8;6" dur="2.6s" repeatCount="indefinite" />
                      </circle>
                      <title>Lead qualification criteria (Silver - 84%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(615, 465)">
                      <circle r="6" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Sales pipeline stages (Silver - 79%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(575, 455)">
                      <circle r="6" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>Deal closing strategies (Gold - 88%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(605, 425)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Discovery call script (Silver - 80%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(620, 445)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Objection handling (Silver - 82%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(585, 470)">
                      <circle r="5" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>Cold email templates (Bronze - 71%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(600, 480)">
                      <circle r="6" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>Enterprise sales process (Gold - 90%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(570, 435)">
                      <circle r="4" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>Follow-up cadence (Bronze - 69%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(625, 430)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Competitive analysis (Silver - 81%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(595, 415)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Pricing negotiation (Silver - 83%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(610, 475)">
                      <circle r="4" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>Sales metrics (Bronze - 70%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(580, 420)">
                      <circle r="6" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>Contract terms (Gold - 87%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(630, 455)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Demo best practices (Silver - 78%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(565, 465)">
                      <circle r="4" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>CRM usage tips (Bronze - 68%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(615, 410)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Territory planning (Silver - 79%)</title>
                    </g>

                    {/* Policy nodes (Gold tier) - ~16 nodes */}
                    <g className="node-group cursor-pointer" transform="translate(440, 310)">
                      <circle r="8" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2">
                        <animate attributeName="r" values="8;10;8" dur="2.4s" repeatCount="indefinite" />
                      </circle>
                      <title>Data retention policy (Gold - 93%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(465, 335)">
                      <circle r="7" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>Security compliance requirements (Gold - 90%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(425, 325)">
                      <circle r="6" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>Privacy policy GDPR (Gold - 91%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(455, 295)">
                      <circle r="6" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>Acceptable use policy (Gold - 89%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(475, 315)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Incident response plan (Silver - 84%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(430, 340)">
                      <circle r="6" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>Access control policy (Gold - 88%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(470, 330)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Change management (Silver - 82%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(445, 350)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Vendor management (Silver - 80%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(415, 310)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Code of conduct (Silver - 85%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(485, 325)">
                      <circle r="4" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>Policy templates (Bronze - 72%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(435, 290)">
                      <circle r="6" fill="url(#nodeGradientGold)" stroke="#fff" strokeWidth="2" />
                      <title>Terms of service (Gold - 92%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(460, 345)">
                      <circle r="5" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Audit requirements (Silver - 81%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(420, 355)">
                      <circle r="4" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>Policy review schedule (Bronze - 69%)</title>
                    </g>

                    {/* Additional scattered nodes for realism */}
                    <g className="node-group cursor-pointer" transform="translate(350, 280)">
                      <circle r="5" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>General inquiry response (Bronze - 68%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(650, 310)">
                      <circle r="6" fill="url(#nodeGradientSilver)" stroke="#fff" strokeWidth="2" />
                      <title>Account upgrade process (Silver - 82%)</title>
                    </g>
                    <g className="node-group cursor-pointer" transform="translate(550, 380)">
                      <circle r="5" fill="url(#nodeGradientBronze)" stroke="#fff" strokeWidth="2" />
                      <title>General support tips (Bronze - 65%)</title>
                    </g>
                  </g>

                  {/* Highlighted node indicator (shows on hover) */}
                  <circle id="highlight" r="0" fill="none" stroke="#6366f1" strokeWidth="3" opacity="0">
                    <animate attributeName="r" values="15;20;15" dur="1s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>

              {/* Legend */}
              <div className="mt-6 bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Graph Legend</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm font-semibold text-gray-700 mb-3">Node Size & Color</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600"></div>
                        <span className="text-sm text-gray-600">Gold tier (90-100% confidence)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gray-300 to-gray-500"></div>
                        <span className="text-sm text-gray-600">Silver tier (75-89% confidence)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-orange-400 to-orange-600"></div>
                        <span className="text-sm text-gray-600">Bronze tier (60-74% confidence)</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-700 mb-3">Connections</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-0.5 bg-blue-500"></div>
                        <span className="text-sm text-gray-600">Strong semantic link</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-0.5 bg-gray-400 border-dashed border-t"></div>
                        <span className="text-sm text-gray-600">Cross-category connection</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full border-2 border-blue-200 bg-blue-50 opacity-30"></div>
                        <span className="text-sm text-gray-600">Category cluster</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-700 mb-3">Interactions</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-indigo-100 rounded flex items-center justify-center text-xs">ðŸ‘†</div>
                        <span className="text-sm text-gray-600">Hover over nodes for details</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-indigo-100 rounded flex items-center justify-center text-xs">ðŸ”</div>
                        <span className="text-sm text-gray-600">Click to view knowledge item</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-indigo-100 rounded flex items-center justify-center text-xs">âœ¨</div>
                        <span className="text-sm text-gray-600">Pulsing = high importance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Graph Summary & Insights */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg border-2 border-indigo-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Knowledge Graph Analysis</h3>
                  <p className="text-gray-600 text-sm">Understanding the structure and value of your institutional knowledge</p>
                </div>
              </div>

              {/* What We Discovered */}
              <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Eye size={16} className="text-blue-600" />
                  </div>
                  What We Discovered
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <div className="font-semibold text-gray-900 mb-2">🎯 Knowledge Concentration</div>
                    <div className="text-sm text-gray-700">
                      Technical knowledge forms the densest cluster with 2.3 links per node on average. This indicates strong documentation culture in engineering teams, with well-connected solutions that reference each other.
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                    <div className="font-semibold text-gray-900 mb-2">🔗 Policy as Central Hub</div>
                    <div className="text-sm text-gray-700">
                      Policy nodes connect to all other categories, serving as the organizational foundation. This creates natural bridges between departments and ensures consistent guidance across functions.
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <div className="font-semibold text-gray-900 mb-2">⭐ High-Quality Core</div>
                    <div className="text-sm text-gray-700">
                      38% of knowledge items achieve Gold tier status (90%+ confidence), providing a solid foundation of verified, accurate information for AI training and decision support systems.
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                    <div className="font-semibold text-gray-900 mb-2">⚠️ Opportunity Areas</div>
                    <div className="text-sm text-gray-700">
                      Sales and HR clusters show lower interconnection density, suggesting isolated knowledge pockets. Cross-linking these areas could unlock valuable insights and improve collaboration.
                    </div>
                  </div>
                </div>
              </div>

              {/* Why This Matters */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Star size={16} className="text-indigo-600" />
                  </div>
                  Why This Matters for Your Business
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Zap className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 mb-1">Faster AI Training & Deployment</div>
                      <div className="text-sm text-gray-700">
                        The knowledge graph reveals semantic relationships that dramatically improve AI model performance. Connected knowledge items provide contextual training data, reducing the need for extensive manual curation and accelerating time-to-deployment by 60-70%.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Database className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 mb-1">Quantifiable Knowledge Assets</div>
                      <div className="text-sm text-gray-700">
                        With 4,856 extractable knowledge items and 8,254 documented relationships, your organization possesses measurable intellectual capital. This structured knowledge base has an estimated value of $285K+ in avoided training costs and reduced support overhead.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Network className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 mb-1">Cross-Functional Intelligence</div>
                      <div className="text-sm text-gray-700">
                        The graph exposes hidden connections between departments. Policy linking to Technical and Sales reveals compliance-aware product features. Billing connecting to Support shows revenue-impacting service patterns. These insights drive strategic decisions.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <AlertCircle className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 mb-1">Risk Identification & Mitigation</div>
                      <div className="text-sm text-gray-700">
                        Isolated nodes represent single points of failure - knowledge held by one person. The 486 Bronze-tier items highlight areas needing validation. Identifying these gaps early prevents costly mistakes and knowledge loss during employee transitions.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Code className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 mb-1">Competitive Advantage Through AI</div>
                      <div className="text-sm text-gray-700">
                        Organizations with structured knowledge graphs can deploy domain-specific AI agents 5-10x faster than competitors. Your interconnected knowledge base becomes training data for chatbots, RAG systems, and decision engines that understand your unique business context.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Items */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 mt-6 text-white shadow-lg">
                <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <CheckCircle size={20} />
                  Recommended Next Steps
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="font-semibold mb-2">1. Strengthen Weak Clusters</div>
                    <div className="text-white/90">
                      Focus extraction efforts on Sales (only 1.2 links/node) and HR documentation to build more interconnected knowledge.
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="font-semibold mb-2">2. Validate Bronze Items</div>
                    <div className="text-white/90">
                      Review and upgrade 486 low-confidence items to improve overall dataset quality and AI training effectiveness.
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="font-semibold mb-2">3. Export for AI Training</div>
                    <div className="text-white/90">
                      Use high-quality Gold and Silver tier items to train chatbots, build RAG systems, or fine-tune LLMs on company knowledge.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-4">Key Insights</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">1</div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Dense Technical Cluster</div>
                      <div className="text-xs text-gray-600 mt-1">Technical category has highest interconnection (avg 2.3 links/node)</div>
                      <div className="text-xs text-gray-700 mt-2 italic">Your engineering team documents everything thoroughly. When someone solves a problem, they reference related issues, creating a web of connected solutions.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">2</div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Policy as Knowledge Hub</div>
                      <div className="text-xs text-gray-600 mt-1">Policy nodes connect to 4 other categories - central reference point</div>
                      <div className="text-xs text-gray-700 mt-2 italic">Company policies touch every department - from sales to support to engineering. They're the common thread that keeps everyone aligned.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">3</div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">High Gold Distribution</div>
                      <div className="text-xs text-gray-600 mt-1">38% of nodes are Gold tier - excellent training data quality</div>
                      <div className="text-xs text-gray-700 mt-2 italic">Over a third of your knowledge is highly reliable and verified. This means AI trained on this data will give accurate, trustworthy answers.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-4">Recommended Actions</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertCircle size={16} className="text-orange-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Strengthen Sales Cluster</div>
                      <div className="text-xs text-gray-600 mt-1">Sales has fewest connections - consider extracting more sales-related knowledge</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Enhance Cross-Category Links</div>
                      <div className="text-xs text-gray-600 mt-1">HR and Billing have minimal cross-links - look for related workflows</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={16} className="text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Review Bronze Nodes</div>
                      <div className="text-xs text-gray-600 mt-1">Upgrade or remove 486 low-confidence items to improve overall quality</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tutorial Overlay */}
      {showTutorial && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowTutorial(false)}></div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-600">Step {tutorialStep + 1} of {tutorialSteps.length}</span>
                <button onClick={() => setShowTutorial(false)} className="text-gray-400 hover:text-gray-600">Skip</button>
              </div>
              <div className="h-2 bg-gray-200 rounded-full mb-6">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all" style={{width: `${((tutorialStep + 1) / tutorialSteps.length) * 100}%`}}></div>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tutorialSteps[tutorialStep].title}</h3>
                <p className="text-gray-700">{tutorialSteps[tutorialStep].text}</p>
              </div>
              <div className="flex justify-between items-center">
                <button onClick={prevTutorial} disabled={tutorialStep === 0} className="px-6 py-2 border-2 border-gray-300 rounded-xl font-semibold disabled:opacity-30">← Back</button>
                <div className="flex gap-1">{tutorialSteps.map((_, i) => <div key={i} className={`h-2 rounded-full transition-all ${i === tutorialStep ? 'bg-indigo-600 w-8' : 'bg-gray-300 w-2'}`} />)}</div>
                <button onClick={nextTutorial} className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold">{tutorialStep === tutorialSteps.length - 1 ? 'Done' : 'Next →'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Button */}
      {!showTutorial && (
        <button onClick={() => { setShowTutorial(true); setTutorialStep(0); setActiveTab('dashboard'); }} className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform text-2xl font-bold z-40" title="Tutorial">?</button>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default KnowledgeForgeDemo;