  package main

  import (
    "fmt"
)

  fuction main() {
    // (1)gen key
  fmt.Printf("(1)gen key\n")
  authKey, _ := btcec.NewPrivateKey(btcec.S256())
  recoveryKey, _ := btcec.NewPrivateKey(btcec.S256())

  // (2)create local did and did document
  fmt.Printf("(2)create local did and did document\n")
  didDocument, err := sdk.CreateDID(authKey, recoveryKey, sdk.SetBaiduDIDResolveService())
  if err != nil {
      fmt.Printf("CreateDID err: %v", err)
      os.Exit(-1)
  }

  // (3)post did operation to blockchain
  fmt.Printf("(3)post did operation to blockchain\n")
  resolver, _ := sdk.NewResolver("https://did.baidu.com") // use Baidu DID Resolver
  resp, err := resolver.PostDIDOperation(&sdk.PostDIDOperationRequest{
      DID:       didDocument.ID,
      Document:  didDocument,
      Operation: "create",
      Timestamp: uint64(time.Now().UnixNano() / 1000),
  })
  if err != nil {
      fmt.Printf("PostDIDOperation err: %v", err)
      os.Exit(-1)
  }
  // (4)get did operation result
  retryCount := 20
  for retryCount > 0 {
      fmt.Printf("(4)get did operation result\n")
      opResult, err := resolver.GetDIDOperationResult(resp.Content.OperationID)
      if err != nil {
          fmt.Printf("GetDIDOperationResult err: %v", err)
          os.Exit(-1)
      }
      switch opResult.Content.Status {
      case "Done":
          // op done
          retryCount = -1
      case "Failed":
          fmt.Printf("err: GetDIDOperationResult Failed")
          os.Exit(-1)
      case "Doing":
          retryCount--
          time.Sleep(time.Second * 3)
      }
  }
  // (5)resolve did from Baidu DID Resolver to make sure did is on chain
  fmt.Printf("(5)resolve did from Baidu DID Resolver to make sure did is on chain\n")
  resolvedDidDocument, err := resolver.Resolve(didDocument.ID)
  if err != nil {
      fmt.Printf("Resolve err: %v", err)
      os.Exit(-1)
  }

  // (6)print result
  resolvedDidDocumentBytes, _ := json.MarshalIndent(resolvedDidDocument, "", "  ")
  fmt.Printf("create DID success, DID: %s\n", resolvedDidDocument.ID)
  fmt.Printf("create DID success, DID auth priv key in hex: %s\n", hex.EncodeToString(authKey.Serialize()))
  fmt.Printf("create DID success, DID recovery priv key in hex: %s\n", hex.EncodeToString(recoveryKey.Serialize()))
  fmt.Printf("create DID success, DID Document: \n%v\n", string(resolvedDidDocumentBytes))
  }
  
  