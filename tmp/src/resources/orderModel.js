"use strict";

var mongoose = require("mongoose");

var orderSchema = mongoose.Schema({
    "customerId": mongoose.Schema.Types.Mixed,
    "iceOrderId": { type: String, required: true, unique: true, index: true },
    "merlinOrderReference": String,
    "paymentReference": String,
    "paymentType": String,
    "cardNumber": String,
    "fraudResponse": String,
    "internalStatus": {
        "orderConfirmation": { type: Boolean, default: 1 },
        "orderShipped": { type: Boolean, default: 0 },
        "sendToMerlin": { type: Boolean, default: 1 }
    },
    "paymentTransactions": [{
        "transactionDate": Date,
        "status": String,
        "statusdetail": String,
        "txauthno": String,
        "avscv2": String,
        "addressresult": String,
        "postcoderesult": String,
        "cv2result": String,
        "giftaid": String,
        "threedsecurestatus": String,
        "cavv": String,
        "addressstatus": String,
        "payerstatus": String,
        "cardtype": String,
        "last4digits": String,
        "vpssignature": String,
        "fraudresponse": String,
        "surcharge": String,
        "expirydate": String,
        "bankauthcode": String,
        "declinecode": String,
        "token": String,
        "txtype": String,
        "vpsprotocol": String
    }],
    "lastUpdated": Date,
    "currency": String,
    "promotionCode": String,
    "orderStatus": { type: String, default: "payment_required" },
    "orderStatusDetail": { type: String },
    "creationDate": String,
    "orderPrice": {
        "orderLinesTotalWithoutVat": Number,
        "orderLinesTotalWithVat": Number,
        "orderGrandTotalWithoutVat": Number,
        "orderGrandTotalWithVat": Number,
        "orderGrandTotalVat": Number,
        "totalShippingPriceWithoutVat": Number,
        "totalShippingPriceWithVat": Number,
        "additionalShippingTotalWithoutVat": Number,
        "additionalShippingTotalWithVat": Number,
        "additionalSpendForFreeShipping": Number
    },
    "orderLines": [{
        "productId": String,
        "quantity": Number,
        "category": {
            "categoryId": String,
            "categoryName": String
        },
        "name": String,
        "description": String,
        "sku": String,
        "image": {
            "lowResolution": String,
            "highResolution": String
        },
        "brand": {
            "brandId": String,
            "brandName": String,
            "ownBrand": String,
            "imageUrl": String
        },
        "orderLinePrice": {
            "unitPriceWithoutVat": Number,
            "unitPriceWithVat": Number,
            "orderLinePriceWithVat": Number,
            "orderLinePriceWithoutVat": Number,
            "vatType": String,
            "vatRate": Number
        },
        "orderLineShippingDetails": {
            "deliveryDate": {
                "from": String,
                "to": String
            },
            "shippingType": Number,
            "orderLineShippingPriceWithoutVat": Number,
            "orderLineShippingPriceWithVat": Number
        }
    }],
    "shippingDetails": {
        "shippingAddress": {
            "title": String,
            "companyName": String,
            "firstName": String,
            "lastName": String,
            "addressLine1": String,
            "addressLine2": String,
            "city": String,
            "state": String,
            "postalCode": String,
            "countryCode": String,
            "mobilePhone": String,
            "homePhone": String,
            "workPhone": String
        },
        "shippingNotes": String
    },
    "billingDetails": {
        "billingAddress": {
            "title": String,
            "companyName": String,
            "firstName": String,
            "lastName": String,
            "addressLine1": String,
            "addressLine2": String,
            "city": String,
            "state": String,
            "postalCode": String,
            "countryCode": String,
            "mobilePhone": String,
            "homePhone": String,
            "workPhone": String
        }
    }
});

module.exports = mongoose.model("orders", orderSchema);
//# sourceMappingURL=orderModel.js.map