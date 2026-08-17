import 'package:flutter/material.dart';
import 'package:device_apps/device_apps.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import '../../core/constants.dart';

class GalleryScreen extends StatelessWidget {
  const GalleryScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final setups = [
      {
        'title': 'Setup RK-03 Minimal White Edition',
        'desc': 'Gabinete NZXT H9 Flow White, Water Cooler Lian Li, Cadeira Ergonômica White e iluminação Pastel Ciano.',
        'image': 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&q=80',
      },
      {
        'title': 'Battle Station RK-03 Esport Dark',
        'desc': 'Múltiplos monitores curvos 240Hz, Core i9 + RTX 4090 refrigerado a líquido, teclado mecânico custom.',
        'image': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
      },
      {
        'title': 'Workstation & Servidor Deep Learning',
        'desc': 'Dual RTX Ada Lovelace, Threadripper PRO, 256GB ECC RAM para inteligência artificial e renderização 3D.',
        'image': 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80',
      },
    ];

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.cardDark,
        title: const Text('Galeria de Setups RK-03', style: TextStyle(fontSize: 16)),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: setups.length,
        itemBuilder: (context, index) {
          final item = setups[index];
          return Container(
            margin: const EdgeInsets.only(bottom: 20),
            decoration: BoxDecoration(
              color: AppColors.cardDark,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: AppColors.border),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ClipRRect(
                  borderRadius: const BorderRadius.vertical(top: Radius.circular(14)),
                  child: Image.network(
                    item['image']!,
                    height: 220,
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        item['title']!,
                        style: const TextStyle(
                          fontSize: 17,
                          fontWeight: FontWeight.bold,
                          color: AppColors.textPrimary,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        item['desc']!,
                        style: const TextStyle(
                          fontSize: 13,
                          color: AppColors.textSecondary,
                          height: 1.3,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

class AppDrawerScreen extends StatefulWidget {
  const AppDrawerScreen({Key? key}) : super(key: key);

  @override
  State<AppDrawerScreen> createState() => _AppDrawerScreenState();
}

class _AppDrawerScreenState extends State<AppDrawerScreen> {
  List<Application> _apps = [];
  List<Application> _filteredApps = [];
  bool _isLoading = true;
  final TextEditingController _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _fetchInstalledApps();
  }

  Future<void> _fetchInstalledApps() async {
    try {
      final apps = await DeviceApps.getInstalledApplications(
        includeSystemApps: true,
        includeAppIcons: true,
        onlyAppsWithLaunchIntent: true,
      );
      apps.sort((a, b) => a.appName.toLowerCase().compareTo(b.appName.toLowerCase()));
      setState(() {
        _apps = apps;
        _filteredApps = apps;
        _isLoading = false;
      });
    } catch (e) {
      setState(() => _isLoading = false);
    }
  }

  void _filterApps(String query) {
    if (query.isEmpty) {
      setState(() => _filteredApps = _apps);
    } else {
      setState(() {
        _filteredApps = _apps
            .where((app) => app.appName.toLowerCase().contains(query.toLowerCase()))
            .toList();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.cardDark,
        title: TextField(
          controller: _searchController,
          style: const TextStyle(color: Colors.white),
          decoration: const InputDecoration(
            hintText: 'Pesquisar aplicativos...',
            hintStyle: TextStyle(color: AppColors.textSecondary),
            border: InputBorder.none,
          ),
          onChanged: _filterApps,
        ),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator(color: AppColors.cyanAccent))
          : GridView.builder(
              padding: const EdgeInsets.all(16),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 4,
                mainAxisSpacing: 20,
                crossAxisSpacing: 16,
                childAspectRatio: 0.8,
              ),
              itemCount: _filteredApps.length,
              itemBuilder: (context, index) {
                final app = _filteredApps[index];
                return InkWell(
                  onTap: () => DeviceApps.openApp(app.packageName),
                  borderRadius: BorderRadius.circular(12),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      if (app is ApplicationWithIcon)
                        Image.memory(app.icon, width: 48, height: 48)
                      else
                        Container(
                          width: 48,
                          height: 48,
                          decoration: BoxDecoration(
                            color: AppColors.cardDark,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Icon(Icons.android, color: AppColors.cyanAccent, size: 28),
                        ),
                      const SizedBox(height: 8),
                      Text(
                        app.appName,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        textAlign: TextAlign.center,
                        style: const TextStyle(color: AppColors.textPrimary, fontSize: 11),
                      ),
                    ],
                  ),
                );
              },
            ),
    );
  }
}

class WebViewScreen extends StatefulWidget {
  final String title;
  final String url;

  const WebViewScreen({Key? key, required this.title, required this.url}) : super(key: key);

  @override
  State<WebViewScreen> createState() => _WebViewScreenState();
}

class _WebViewScreenState extends State<WebViewScreen> {
  InAppWebViewController? _webViewController;
  double _progress = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.cardDark,
        title: Text(widget.title, style: const TextStyle(fontSize: 16)),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => _webViewController?.reload(),
          ),
        ],
      ),
      body: Stack(
        children: [
          InAppWebView(
            initialUrlRequest: URLRequest(url: WebUri(widget.url)),
            onWebViewCreated: (controller) => _webViewController = controller,
            onProgressChanged: (controller, progress) {
              setState(() => _progress = progress / 100);
            },
          ),
          if (_progress < 1.0)
            LinearProgressIndicator(value: _progress, color: AppColors.cyanAccent),
        ],
      ),
    );
  }
}
