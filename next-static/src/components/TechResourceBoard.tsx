interface TechSite {
    name: string;
    url: string;
    description: string;
    category: string;
  }
  
  const techSites: TechSite[] = [
    {
      category: "技術ブログ",
      name: "Classmethod DevelopersIO",
      url: "https://dev.classmethod.jp/",
      description: "AWSに特化した技術情報や、最新のクラウドテクノロジーに関する記事が豊富"
    },
    {
      category: "技術ブログ",
      name: "Zenn",
      url: "https://zenn.dev/",
      description: "エンジニアによる技術記事とテックブックのプラットフォーム"
    },
    {
      category: "技術ブログ",
      name: "Qiita",
      url: "https://qiita.com/",
      description: "プログラマのための技術情報共有サービス"
    },
    {
      category: "AWS情報",
      name: "AWS News Blog",
      url: "https://aws.amazon.com/jp/blogs/news/",
      description: "AWSの最新アップデートや新機能に関する公式ブログ"
    }
  ];
  
  export default function TechResourceBoard() {
    const categories = Array.from(new Set(techSites.map(site => site.category)));
  
    return (
      <div className="max-w-4xl mx-auto p-6 mt-16 md:mt-16 mt-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#0F0] text-shadow-glow">ITトレンド情報サイト</h1>
        
        <div className="bg-black/80 border-2 border-[#0F0] rounded-lg shadow-[0_0_15px_rgba(0,255,0,0.3)] p-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
          {categories.map(category => (
            <div key={category} className="mb-8 last:mb-0">
              <h2 className="text-2xl font-semibold mb-4 text-[#0F0] border-b border-[#0F0] pb-2">
                {category}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {techSites
                  .filter(site => site.category === category)
                  .map(site => (
                    <div 
                      key={site.name}
                      className="border border-[#0F0] rounded-lg p-4 hover:bg-[#0F0]/10 transition-all duration-300"
                    >
                      <a 
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <h3 className="text-xl font-medium text-[#0F0] hover:text-[#0F0]/80">
                          {site.name}
                        </h3>
                        <p className="text-[#0F0]/70 mt-2">{site.description}</p>
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } 