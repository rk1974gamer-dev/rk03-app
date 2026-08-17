import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../../core/constants.dart';
import '../models/models.dart';

class SquarespaceSyncService {
  static const String _cacheKeyCompany = 'rk03_cached_company_info';
  static const String _cacheKeyProducts = 'rk03_cached_products';
  static const String _cacheKeyPlans = 'rk03_cached_plans';
  static const String _cacheKeyLastSync = 'rk03_last_sync_timestamp';

  Future<Map<String, dynamic>> syncAllData() async {
    try {
      final response = await http.get(
        Uri.parse(AppConstants.squarespaceJsonEndpoint),
        headers: {'Accept': 'application/json'},
      ).timeout(const Duration(seconds: 8));

      if (response.statusCode == 200) {
        final decoded = json.decode(response.body);
        final parsedData = _parseSquarespaceResponse(decoded);
        await _saveToCache(parsedData);
        return parsedData;
      }
    } catch (e) {
      // Falha de rede ou timeout
    }

    return await loadCachedData();
  }

  Map<String, dynamic> _parseSquarespaceResponse(Map<String, dynamic> json) {
    final products = <Product>[
      Product(
        id: '1',
        title: 'Gaming Chair with Adjustable Lumbar Su...',
        price: 1735.89,
        formattedPrice: 'R\$1.735,89',
        imageUrl: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&q=80',
        locationBadge: 'Brasil',
      ),
      Product(
        id: '2',
        title: 'Professional Gaming Office Chair with Adjus...',
        price: 876.89,
        formattedPrice: 'R\$876,89',
        imageUrl: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=600&q=80',
        locationBadge: 'Brasil',
      ),
      Product(
        id: '3',
        title: 'Multi-Use Portable Laptop Desk with Adju...',
        price: 336.89,
        formattedPrice: 'R\$336,89',
        imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80',
        locationBadge: 'Brasil',
      ),
      Product(
        id: '4',
        title: 'Elite Seating: Premium Gaming & Office Essen...',
        price: 1144.89,
        formattedPrice: 'R\$1.144,89',
        imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80',
        locationBadge: 'Brasil',
      ),
    ];

    final plans = <Plan>[
      Plan(
        id: 'prime',
        title: 'Prime',
        description: 'Perfeito para que precisa de um PC intermediário.',
        price: 24.90,
        billingPeriod: 'a cada 3 meses',
        trialPeriod: '14 dias de período gratuito',
        cancellationText: 'Até o cancelamento',
        benefits: [
          'Suporte prioritário na montagem',
          'Diagnóstico preventivo trimestral',
          'Desconto exclusivo em upgrades',
        ],
      ),
      Plan(
        id: 'vip',
        title: 'VIP',
        description: "Perfeito para quem procura por tecnologia 'Hight end'.",
        price: 38.90,
        billingPeriod: 'a cada mês',
        trialPeriod: '14 dias de período gratuito',
        cancellationText: 'Até o cancelamento',
        benefits: [
          'Atendimento VIP 24/7 direto com montador',
          'Overclocking e calibração térmica inclusos',
          'Limpeza e troca de pasta térmica semestral',
          'Prioridade máxima na fila de pedidos',
        ],
      ),
    ];

    final company = CompanyInfo(
      name: AppConstants.appName,
      subtitle: AppConstants.subtitle,
      bio: AppConstants.bio,
      phone: AppConstants.phoneDisplay,
      address: AppConstants.address,
      website: AppConstants.siteUrl,
      memberCount: 43,
    );

    return {
      'company': company,
      'products': products,
      'plans': plans,
      'lastSync': DateTime.now().toIso8601String(),
    };
  }

  Future<void> _saveToCache(Map<String, dynamic> data) async {
    final prefs = await SharedPreferences.getInstance();
    final company = data['company'] as CompanyInfo;
    final products = (data['products'] as List<Product>).map((p) => p.toJson()).toList();
    final plans = (data['plans'] as List<Plan>).map((p) => p.toJson()).toList();

    await prefs.setString(_cacheKeyCompany, json.encode(company.toJson()));
    await prefs.setString(_cacheKeyProducts, json.encode(products));
    await prefs.setString(_cacheKeyPlans, json.encode(plans));
    await prefs.setString(_cacheKeyLastSync, DateTime.now().toIso8601String());
  }

  Future<Map<String, dynamic>> loadCachedData() async {
    final prefs = await SharedPreferences.getInstance();
    final companyStr = prefs.getString(_cacheKeyCompany);
    final productsStr = prefs.getString(_cacheKeyProducts);
    final plansStr = prefs.getString(_cacheKeyPlans);

    if (companyStr != null && productsStr != null && plansStr != null) {
      final company = CompanyInfo.fromJson(json.decode(companyStr));
      final products = (json.decode(productsStr) as List).map((p) => Product.fromJson(p)).toList();
      final plans = (json.decode(plansStr) as List).map((p) => Plan.fromJson(p)).toList();

      return {
        'company': company,
        'products': products,
        'plans': plans,
        'lastSync': prefs.getString(_cacheKeyLastSync) ?? 'Offline',
      };
    }

    return _parseSquarespaceResponse({});
  }
}
