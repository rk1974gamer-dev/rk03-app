import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'core/theme.dart';
import 'core/constants.dart';
import 'presentation/screens/home_launcher_screen.dart';
import 'presentation/screens/store_screen.dart';
import 'presentation/screens/plans_screen.dart';
import 'presentation/screens/gallery_screen.dart';
import 'presentation/screens/app_drawer_screen.dart';
import 'presentation/screens/webview_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
      systemNavigationBarColor: AppColors.background,
      systemNavigationBarIconBrightness: Brightness.light,
    ),
  );
  runApp(const RK03LauncherApp());
}

class RK03LauncherApp extends StatelessWidget {
  const RK03LauncherApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'RK-03 APP',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      home: const MainNavigationHolder(),
    );
  }
}

class MainNavigationHolder extends StatefulWidget {
  const MainNavigationHolder({Key? key}) : super(key: key);

  @override
  State<MainNavigationHolder> createState() => _MainNavigationHolderState();
}

class _MainNavigationHolderState extends State<MainNavigationHolder> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const HomeLauncherScreen(),
    const WebViewScreen(
      title: 'Grupos & Comunidade',
      url: '${AppConstants.siteUrl}/comunidade',
    ),
    const WebViewScreen(
      title: 'Blog & Dicas',
      url: '${AppConstants.siteUrl}/blog',
    ),
    const GalleryScreen(),
    const MoreMenuScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        type: BottomNavigationBarType.fixed,
        backgroundColor: AppColors.cardDark,
        selectedItemColor: AppColors.cyanAccent,
        unselectedItemColor: AppColors.textMuted,
        selectedFontSize: 11,
        unselectedFontSize: 11,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home_outlined),
            activeIcon: Icon(Icons.home),
            label: 'Início',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.groups_outlined),
            activeIcon: Icon(Icons.groups),
            label: 'Grupos',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.forum_outlined),
            activeIcon: Icon(Icons.forum),
            label: 'Blog',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.image_outlined),
            activeIcon: Icon(Icons.image),
            label: 'Galerias',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.menu),
            activeIcon: Icon(Icons.menu_open),
            label: 'More',
          ),
        ],
      ),
    );
  }
}

class MoreMenuScreen extends StatelessWidget {
  const MoreMenuScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.cardDark,
        title: const Text('Menu RK-03', style: TextStyle(fontSize: 16)),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          ListTile(
            tileColor: AppColors.cardDark,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            leading: const Icon(Icons.storefront, color: AppColors.cyanAccent),
            title: const Text('Loja & Produtos'),
            subtitle: const Text('Cadeiras, gabinetes, periféricos e peças'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16, color: AppColors.textSecondary),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const StoreScreen(showAppBar: true)),
              );
            },
          ),
          const SizedBox(height: 12),
          ListTile(
            tileColor: AppColors.cardDark,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            leading: const Icon(Icons.workspace_premium, color: AppColors.cyanAccent),
            title: const Text('Planos de Suporte (Prime & VIP)'),
            subtitle: const Text('Assinaturas periódicas de manutenção e suporte'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16, color: AppColors.textSecondary),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const PlansScreen(showAppBar: true)),
              );
            },
          ),
          const SizedBox(height: 12),
          ListTile(
            tileColor: AppColors.cardDark,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            leading: const Icon(Icons.apps, color: AppColors.cyanAccent),
            title: const Text('Gaveta de Aplicativos (Launcher)'),
            subtitle: const Text('Ver todos os aplicativos instalados no celular'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16, color: AppColors.textSecondary),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const AppDrawerScreen()),
              );
            },
          ),
          const SizedBox(height: 12),
          ListTile(
            tileColor: AppColors.cardDark,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            leading: const Icon(Icons.public, color: AppColors.cyanAccent),
            title: const Text('Acessar Site Squarespace'),
            subtitle: const Text('https://www.rk-03assemblerpc.com'),
            trailing: const Icon(Icons.open_in_new, size: 16, color: AppColors.textSecondary),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => const WebViewScreen(
                    title: 'RK-03 Assembler PC',
                    url: AppConstants.siteUrl,
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
