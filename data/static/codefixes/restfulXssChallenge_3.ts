/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/georrychen/ChXBlockDemo/releases/tag/v13.3.0
*    Source File: restfulXssChallenge_3.ts
*    
*    Copyrights:
*      copyright © by bjoern kimminich & the owasp juice shop contributors 2014-2021
*      copyright (c) 2014-2021 bjoern kimminich
*      copyright (c) 2014-2021 bjoern kimminich & the owasp juice shop contributors
*    
*    Licenses:
*      MIT License
*      SPDXId: MIT
*    
*    Auto-attribution by Threatrix, Inc.
*    
*    ------ END LICENSE ATTRIBUTION ------
*/
ngAfterViewInit () {
    const products = this.productService.search('')
    const quantities = this.quantityService.getAll()
    forkJoin([quantities, products]).subscribe(([quantities, products]) => {
      const dataTable: TableEntry[] = []
      this.tableData = products
      this.trustProductDescription(products)
      for (const product of products) {
        dataTable.push({
          name: product.name,
          price: product.price,
          deluxePrice: product.deluxePrice,
          id: product.id,
          image: product.image,
          description: product.description
        })
      }
      for (const quantity of quantities) {
        const entry = dataTable.find((dataTableEntry) => {
          return dataTableEntry.id === quantity.ProductId
        })
        if (entry === undefined) {
          continue
        }
        entry.quantity = quantity.quantity
      }
      this.dataSource = new MatTableDataSource<TableEntry>(dataTable)
      for (let i = 1; i <= Math.ceil(this.dataSource.data.length / 12); i++) {
        this.pageSizeOptions.push(i * 12)
      }
      this.paginator.pageSizeOptions = this.pageSizeOptions
      this.dataSource.paginator = this.paginator
      this.gridDataSource = this.dataSource.connect()
      this.resultsLength = this.dataSource.data.length
      this.filterTable()
      this.routerSubscription = this.router.events.subscribe(() => {
        this.filterTable()
      })
      this.cdRef.detectChanges()
    }, (err) => console.log(err))
  }

  trustProductDescription (tableData: any[]) {
    for (let i = 0; i < tableData.length; i++) {
      tableData[i].description = this.sanitizer.bypassSecurityTrustHtml(tableData[i].description)
    }
  }