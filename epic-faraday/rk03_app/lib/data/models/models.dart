import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../../core/constants.dart';

class CompanyInfo {
  final String name;
  final String subtitle;
  final String bio;
  final String phone;
  final String address;
  final String website;
  final int memberCount;

  CompanyInfo({
    required this.name,
    required this.subtitle,
    required this.bio,
    required this.phone,
    required this.address,
    required this.website,
    required this.memberCount,
  });

  factory CompanyInfo.fromJson(Map<String, dynamic> json) {
    return CompanyInfo(
      name: json['name'] ?? AppConstants.appName,
      subtitle: json['subtitle'] ?? AppConstants.subtitle,
      bio: json['bio'] ?? AppConstants.bio,
      phone: json['phone'] ?? AppConstants.phoneDisplay,
      address: json['address'] ?? AppConstants.address,
      website: json['website'] ?? AppConstants.siteUrl,
      memberCount: json['memberCount'] ?? 43,
    );
  }

  Map<String, dynamic> toJson() => {
    'name': name,
    'subtitle': subtitle,
    'bio': bio,
    'phone': phone,
    'address': address,
    'website': website,
    'memberCount': memberCount,
  };
}

class Product {
  final String id;
  final String title;
  final double price;
  final String formattedPrice;
  final String imageUrl;
  final String locationBadge;

  Product({
    required this.id,
    required this.title,
    required this.price,
    required this.formattedPrice,
    required this.imageUrl,
    this.locationBadge = 'Brasil',
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    double p = 0.0;
    if (json['price'] is num) p = (json['price'] as num).toDouble();
    return Product(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      price: p,
      formattedPrice: json['formattedPrice'] ?? 'R\$ ${p.toStringAsFixed(2)}',
      imageUrl: json['imageUrl'] ?? '',
      locationBadge: json['locationBadge'] ?? 'Brasil',
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'title': title,
    'price': price,
    'formattedPrice': formattedPrice,
    'imageUrl': imageUrl,
    'locationBadge': locationBadge,
  };
}

class Plan {
  final String id;
  final String title;
  final String description;
  final double price;
  final String billingPeriod;
  final String trialPeriod;
  final String cancellationText;
  final List<String> benefits;

  Plan({
    required this.id,
    required this.title,
    required this.description,
    required this.price,
    required this.billingPeriod,
    this.trialPeriod = '14 dias de período gratuito',
    this.cancellationText = 'Até o cancelamento',
    required this.benefits,
  });

  factory Plan.fromJson(Map<String, dynamic> json) {
    return Plan(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      price: (json['price'] as num?)?.toDouble() ?? 0.0,
      billingPeriod: json['billingPeriod'] ?? 'a cada 3 meses',
      trialPeriod: json['trialPeriod'] ?? '14 dias de período gratuito',
      cancellationText: json['cancellationText'] ?? 'Até o cancelamento',
      benefits: List<String>.from(json['benefits'] ?? []),
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'title': title,
    'description': description,
    'price': price,
    'billingPeriod': billingPeriod,
    'trialPeriod': trialPeriod,
    'cancellationText': cancellationText,
    'benefits': benefits,
  };
}
