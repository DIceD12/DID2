package main

import (
    "encoding/json"
    "fmt"
    "crypto/rand"
    "crypto/ecdsa"
    "crypto/elliptic"
    "encoding/hex"
)

type DIDDocument struct {
    ID         string                 `json:"id"`
    PublicKey  []map[string]string   `json:"publicKey"`
    // 可以根据需求添加更多字段
}

func main() {
    // 生成 ECDSA 密钥对
    privateKey, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
    if err != nil {
        fmt.Println("Error generating ECDSA key:", err)
        return
    }

    // 获取公钥的字节格式
    publicKeyBytes := elliptic.Marshal(privateKey.PublicKey.Curve, privateKey.PublicKey.X, privateKey.PublicKey.Y)
    // 将公钥字节格式转换为十六进制字符串
    publicKeyHex := hex.EncodeToString(publicKeyBytes)

    // 构建 DID 文档
    didDoc := DIDDocument{
        ID: "did:example:123",
        PublicKey: []map[string]string{
            {
                "id":   "did:example:123#keys-1",
                "type": "ECDSA",
                "publicKeyHex": publicKeyHex,
            },
        },
    }

    // 将 DID 文档转换为 JSON 格式
    didDocJSON, err := json.Marshal(didDoc)
    if err != nil {
        fmt.Println("Error marshaling DID document:", err)
        return
    }

    // 打印生成的 DID 文档
    fmt.Println("Generated DID document:")
    fmt.Println(string(didDocJSON))
}
