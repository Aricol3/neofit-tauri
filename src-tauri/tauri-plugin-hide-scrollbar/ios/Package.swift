// swift-tools-version:5.3

import PackageDescription

let package = Package(
    name: "tauri-plugin-hide-scrollbar",
    platforms: [
        .iOS(.v14),
    ],
    products: [
        .library(
            name: "tauri-plugin-hide-scrollbar",
            type: .static,
            targets: ["tauri-plugin-hide-scrollbar"]
        ),
    ],
    dependencies: [
        .package(name: "Tauri", path: "../.tauri/tauri-api")
    ],
    targets: [
        .target(
            name: "tauri-plugin-hide-scrollbar",
            dependencies: [
                .product(name: "Tauri", package: "Tauri")
            ],
            path: "Sources"
        )
    ]
)
