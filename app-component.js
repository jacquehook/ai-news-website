import React, { useState, useEffect } from 'react';
import { Search, Heart, Clock, Globe, Filter, Bookmark, RefreshCw } from 'lucide-react';

function App() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFavorites, setShowFavorites] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // 模拟新闻数据
  const mockNews = [
    {
      id: 1,
      title: "OpenAI发布GPT-5预览版，性能大幅提升",
      summary: "OpenAI今日发布了GPT-5的预览版本，在推理能力和多模态理解方面实现重大突破，为人工智能发展带来新的里程碑...",
      source: "TechCrunch",
      category: "AI",
      url: "#",
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Meta推出新一代VR头显Quest 4",
      summary: "Meta宣布Quest 4将于明年发布，配备更先进的眼球追踪技术和超高分辨率显示屏，将为用户带来更加沉浸的虚拟现实体验...",
      source: "The Verge",
      category: "VR/AR",
      url: "#",
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      imageUrl: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      title: "谷歌云宣布新的AI基础设施投资计划",
      summary: "谷歌云计划在未来三年投资100亿美元扩建AI数据中心，以满足日益增长的AI计算需求，推动人工智能技术的普及应用...",
      source: "Google Blog",
      category: "云计算",
      url: "#",
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop"
    },
    {
      id: 4,
      title: "微软Copilot集成新功能，支持实时代码生成",
      summary: "微软宣布Copilot将支持实时代码生成和调试功能，大幅提升开发者编程效率，标志着AI辅助编程进入新阶段...",
      source: "Microsoft News",
      category: "开发工具",
      url: "#",
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      imageUrl: "https://images.unsplash.com/phone-1555949963-aa79dcee981c?w=400&h=200&fit=crop"
    },
    {
      id: 5,
      title: "英伟达发布新一代AI芯片H200",
      summary: "英伟达正式发布H200 GPU，专为大规模语言模型训练优化，性能比前代提升40%，将进一步推动AI算力的发展...",
      source: "NVIDIA Blog",
      category: "硬件",
      url: "#",
      publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop"
    },
    {
      id: 6,
      title: "亚马逊AWS推出新的机器学习服务",
      summary: "AWS发布了SageMaker Studio 3.0，为开发者提供更简单的机器学习模型部署方案，降低了AI应用开发的门槛...",
      source: "AWS News",
      category: "云服务",
      url: "#",
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop"
    },
    {
      id: 7,
      title: "苹果发布Vision Pro 2，支持更多AI功能",
      summary: "苹果公司发布第二代Vision Pro，集成了更强大的AI处理能力，支持实时场景理解和智能交互，重新定义混合现实体验...",
      source: "Apple Newsroom",
      category: "AR/VR",
      url: "#",
      publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000),
      imageUrl: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=400&h=200&fit=crop"
    },
    {
      id: 8,
      title: "字节跳动推出新一代AI视频生成工具",
      summary: "字节跳动发布了基于Sora技术的视频生成工具，能够根据文本描述生成高质量视频内容，为内容创作带来革命性变化...",
      source: "TechNode",
      category: "AI",
      url: "#",
      publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000),
      imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=200&fit=crop"
    }
  ];

  useEffect(() => {
    // 模拟数据加载
    setNews(mockNews);
    setFilteredNews(mockNews);
  }, []);

  useEffect(() => {
    filterNews();
  }, [searchTerm, selectedSource, selectedCategory, news, showFavorites]);

  const filterNews = () => {
    let filtered = showFavorites ? 
      news.filter(item => favorites.includes(item.id)) : 
      news;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSource !== 'all') {
      filtered = filtered.filter(item => item.source === selectedSource);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredNews(filtered);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const refreshNews = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 0) return `${hours}小时前`;
    if (minutes > 0) return `${minutes}分钟前`;
    return '刚刚';
  };

  const sources = [...new Set(news.map(item => item.source))];
  const categories = [...new Set(news.map(item => item.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI资讯聚合</h1>
                <p className="text-sm text-gray-600">全球AI与互联网最新动态</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                最后更新: {lastUpdated.toLocaleTimeString('zh-CN')}
              </div>
              <button
                onClick={refreshNews}
                disabled={isLoading}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                刷新
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索资讯..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                筛选器
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">来源</label>
                  <select
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">全部来源</option>
                    {sources.map(source => (
                      <option key={source} value={source}>{source}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">分类</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">全部分类</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Favorites Toggle */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className={`w-full flex items-center justify-center px-4 py-3 rounded-lg transition-colors ${
                  showFavorites 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Bookmark className="w-5 h-5 mr-2" />
                {showFavorites ? '显示全部' : `我的收藏 (${favorites.length})`}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {showFavorites ? '我的收藏' : '最新资讯'} 
                <span className="text-gray-500 text-base ml-2">
                  ({filteredNews.length} 条)
                </span>
              </h2>
            </div>

            <div className="space-y-6">
              {filteredNews.map((item) => (
                <article key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-shrink-0">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="w-full md:w-48 h-48 md:h-32 object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                              {item.category}
                            </span>
                            <span className="text-sm text-gray-500">{item.source}</span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-500">{formatTime(item.publishedAt)}</span>
                          </div>
                          
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                            {item.title}
                          </h3>
                          
                          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                            {item.summary}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <a 
                              href={item.url}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              阅读全文 →
                            </a>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => toggleFavorite(item.id)}
                          className={`ml-4 p-2 rounded-full transition-colors ${
                            favorites.includes(item.id)
                              ? 'bg-red-50 text-red-500 hover:bg-red-100'
                              : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${favorites.includes(item.id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredNews.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">暂无结果</h3>
                <p className="text-gray-500">尝试调整搜索条件或筛选器</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;