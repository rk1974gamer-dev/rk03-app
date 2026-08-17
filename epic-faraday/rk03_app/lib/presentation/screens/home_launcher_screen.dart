import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../core/constants.dart';
import '../widgets/contact_row.dart';
import 'store_screen.dart';
import 'app_drawer_screen.dart';
import 'webview_screen.dart';

class HomeLauncherScreen extends StatelessWidget {
  const HomeLauncherScreen({Key? key}) : super(key: key);

  Future<void> _launchUrl(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  Future<void> _makePhoneCall(String phoneNumber) async {
    final uri = Uri.parse('tel:$phoneNumber');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 220.0,
            pinned: true,
            backgroundColor: AppColors.background,
            elevation: 0,
            leading: IconButton(
              icon: const CircleAvatar(
                radius: 16,
                backgroundColor: AppColors.cardDark,
                child: Icon(Icons.person, color: AppColors.textSecondary, size: 20),
              ),
              onPressed: () {},
            ),
            title: const Text(
              'Início',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
            ),
            actions: [
              IconButton(
                icon: const Icon(Icons.chat_bubble_outline, color: AppColors.textPrimary),
                onPressed: () => _launchUrl(AppConstants.whatsAppUrl),
              ),
              IconButton(
                icon: const Icon(Icons.notifications_none, color: AppColors.textPrimary),
                onPressed: () {},
              ),
              IconButton(
                icon: const Icon(Icons.shopping_cart_outlined, color: AppColors.textPrimary),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => const StoreScreen()),
                  );
                },
              ),
            ],
            flexibleSpace: FlexibleSpaceBar(
              background: Stack(
                fit: StackFit.expand,
                children: [
                  Container(
                    decoration: const BoxDecoration(
                      gradient: LinearGradient(
                        colors: [Color(0xFF1A1C29), Color(0xFF0C1017)],
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                      ),
                    ),
                    child: Image.network(
                      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000&q=80',
                      fit: BoxFit.cover,
                      errorBuilder: (context, error, stackTrace) => Container(
                        color: AppColors.cardDark,
                        child: const Center(
                          child: Icon(Icons.computer, size: 60, color: AppColors.cyanAccent),
                        ),
                      ),
                    ),
                  ),
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [
                          Colors.transparent,
                          AppColors.background.withOpacity(0.9),
                          AppColors.background,
                        ],
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Container(
                        width: 68,
                        height: 68,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(color: AppColors.border, width: 2),
                          gradient: const RadialGradient(
                            colors: [Color(0xFFFF7A00), Color(0xFF993300)],
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: const Color(0xFFFF7A00).withOpacity(0.3),
                              blurRadius: 12,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: const Center(
                          child: Icon(Icons.sports_esports, color: Colors.white, size: 34),
                        ),
                      ),
                      const Spacer(),
                      OutlinedButton.icon(
                        style: OutlinedButton.styleFrom(
                          foregroundColor: AppColors.cyanAccent,
                          side: const BorderSide(color: AppColors.cyanAccent),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                        ),
                        icon: const Icon(Icons.apps, size: 18),
                        label: const Text('Meus Apps'),
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (_) => const AppDrawerScreen()),
                          );
                        },
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),

                  Text(
                    AppConstants.appName,
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 4),

                  const Text(
                    AppConstants.subtitle,
                    style: TextStyle(
                      fontSize: 13,
                      color: AppColors.textSecondary,
                    ),
                  ),
                  const SizedBox(height: 8),

                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(
                          color: AppColors.cardDark,
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: const Text(
                          'Wix',
                          style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white),
                        ),
                      ),
                      const SizedBox(width: 8),
                      const Text(
                        '${AppConstants.memberCountText}  |  ',
                        style: TextStyle(fontSize: 13, color: AppColors.textSecondary),
                      ),
                      InkWell(
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) => const WebViewScreen(
                                title: 'Informações Gerais',
                                url: AppConstants.siteUrl,
                              ),
                            ),
                          );
                        },
                        child: const Text(
                          'Informações gerais >',
                          style: TextStyle(
                            fontSize: 13,
                            color: AppColors.cyanAccent,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 18),

                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton.icon(
                          style: OutlinedButton.styleFrom(
                            foregroundColor: AppColors.textPrimary,
                            side: const BorderSide(color: AppColors.border),
                            backgroundColor: AppColors.cardDark,
                            padding: const EdgeInsets.symmetric(vertical: 14),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(25),
                            ),
                          ),
                          icon: const Icon(Icons.share_outlined, size: 18),
                          label: const Text(
                            'Convidar',
                            style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
                          ),
                          onPressed: () {
                            _launchUrl('https://api.whatsapp.com/send?text=Conhe%C3%A7a%20a%20RK-03%20Tech%20%26%20Gaming%20PC!%20${AppConstants.siteUrl}');
                          },
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.cyanAccent,
                            foregroundColor: Colors.black,
                            padding: const EdgeInsets.symmetric(vertical: 14),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(25),
                            ),
                            elevation: 4,
                          ),
                          child: const Text(
                            'Comprar',
                            style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                          ),
                          onPressed: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(builder: (_) => const StoreScreen()),
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),

                  const Text(
                    AppConstants.bio,
                    style: TextStyle(
                      fontSize: 14,
                      color: AppColors.textSecondary,
                      height: 1.4,
                    ),
                  ),
                  const SizedBox(height: 20),
                  const Divider(color: AppColors.divider, thickness: 1),
                ],
              ),
            ),
          ),

          SliverToBoxAdapter(
            child: Column(
              children: [
                ContactRow(
                  title: 'Contate-nos',
                  subtitle: 'RK-03...',
                  icon: Icons.chat_bubble,
                  trailing: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.cardDark,
                      foregroundColor: AppColors.textPrimary,
                      side: const BorderSide(color: AppColors.border),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(18),
                      ),
                    ),
                    onPressed: () => _launchUrl(AppConstants.whatsAppUrl),
                    child: const Text('Mensagem'),
                  ),
                  onTap: () => _launchUrl(AppConstants.whatsAppUrl),
                ),
                const Divider(color: AppColors.divider, height: 1, indent: 16, endIndent: 16),

                ContactRow(
                  title: AppConstants.phoneDisplay,
                  subtitle: 'Telefone',
                  icon: Icons.phone_in_talk,
                  onTap: () => _makePhoneCall(AppConstants.phoneRaw),
                ),
                const Divider(color: AppColors.divider, height: 1, indent: 16, endIndent: 16),

                ContactRow(
                  title: '${AppConstants.siteUrl}/',
                  subtitle: 'Tela inicial',
                  icon: Icons.language,
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
                const Divider(color: AppColors.divider, height: 1, indent: 16, endIndent: 16),

                ContactRow(
                  title: AppConstants.address,
                  subtitle: 'Local',
                  icon: Icons.location_on,
                  onTap: () => _launchUrl(AppConstants.mapsUrl),
                ),
                const SizedBox(height: 40),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
