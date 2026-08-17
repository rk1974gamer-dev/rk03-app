# Projeto epic-faraday: RK-03 APP Launcher & Agente Lion

Projeto arquivado e estruturado para o ecossistema **RK-03 Tech & Gaming PC** (`https://www.rk-03assemblerpc.com`).

---

## 📁 Estrutura de Pastas

```
epic-faraday/
├── .github/
│   └── workflows/
│       ├── build_aab.yml          # Compilação gratuita de .AAB e .APK no GitHub Actions
│       └── lion_cron.yml          # Automação periódica do Agente Lion
├── rk03_app/                      # Código-Fonte do Aplicativo Android Launcher
│   ├── android/                   # Configuração nativa com suporte a App Bundle (.aab)
│   ├── assets/mock_data/          # Cache local de dados sincronizados
│   ├── lib/                       # Código Flutter (Telas, Temas, Serviços, Webview)
│   └── pubspec.yaml
└── agent_lion/                    # Agente de IA Lion (Monitoramento, Uptime, Segurança)
    ├── core/
    └── config.json
```

---

## 📱 Gerando e Testando o Aplicativo no Smartphone

### 1. Entendendo os formatos `.AAB` vs `.APK`

| Formato | Finalidade | Como Testar no Smartphone |
| :--- | :--- | :--- |
| **`.AAB` (App Bundle)** | Padrão oficial da Google Play Store (otimizado por arquitetura de processador). | Usado para publicar na Play Store ou instalado via ferramenta `bundletool`. |
| **`.APK` (Instalação Direta)** | Arquivo executável direto para teste em celulares Android. | Envie o arquivo `.apk` para seu smartphone (via WhatsApp, Google Drive ou cabo USB) e toque em **Instalar**. |

---

### 2. Compilação Local (quando Flutter/Android SDK estiver instalado)

Para gerar o **Android App Bundle (.aab)**:
```bash
cd rk03_app
flutter build appbundle --release
```
*Saída*: `build/app/outputs/bundle/release/app-release.aab`

Para gerar o **APK de instalação direta (.apk)**:
```bash
cd rk03_app
flutter build apk --release
```
*Saída*: `build/app/outputs/flutter-apk/app-release.apk`

---

### 3. Compilação Automática na Nuvem (Custo Zero via GitHub Actions)

Basta subir a pasta `epic-faraday` para um repositório no GitHub:
1. O workflow `.github/workflows/build_aab.yml` será executado automaticamente.
2. Na aba **Actions > Artifacts**, você poderá baixar o **`.AAB`** (para a Play Store) e o **`.APK`** (para instalar imediatamente no seu smartphone).
