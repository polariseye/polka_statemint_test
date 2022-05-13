"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const polkadot = __importStar(require("@polkadot/api"));
const keyring = __importStar(require("@polkadot/keyring"));
const cryptoUtil = __importStar(require("@polkadot/util-crypto"));
const util = __importStar(require("@polkadot/util"));
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const axios_1 = __importDefault(require("axios"));
const PRIVATE_KEY_1 = "c007579946bb396add7a3e4dacb051bf0e7a526e44c582eaab97b356faeb39e2";
const PUBLIC_KEY_1 = "fbca8199a6bd4f9aadc31648139792d981ff2a771e345b6658d301ba229ef4dc";
const ADDR_1 = "5Hkr2skHU3q5VtuteyFZYi4JiEN9BeQ5xvoaVDJ7cQW4sTZC";
const MNEMONIC_1 = "rebuild butter wreck field such praise ozone type include rough fringe devote";
const PRIVATE_KEY_2 = "3fa7c232785b1755d754efcff096d0456be89973aabd8e9207a9721270349765";
const PUBLIC_KEY_2 = "6bf31e4869840676f3c7f809fa2f796f1ad7d0e54daaf60566a0cf85149e88b8";
const ADDR_2 = "5EWFCfvUqSkUVbsPSJNAkfGVqVTVwfc1c5XAg3qomDUR5eiR";
const MNEMONIC_2 = "talent chicken history bless remain march wild unlock pizza lawn frequent cry";
const PRIVATE_KEY_3 = "d5edb66892a7989eed02c23371a0c401456a943e1513a455b09c7d7ce2a153c8";
const PUBLIC_KEY_3 = "458cd6d4ac00fa7ca54c23a84ff82a5f0fb2a2e1d7e35e93c6b4676082707bc0";
const ADDR_3 = "5DdtzuVummZuHCL9R9rmWLLy9FrsA1TfBRgyE8Ziq6CQb2uB";
const MNEMONIC_3 = "law awake pupil group swim snack smooth setup front popular chair impose";
const westendDecimal = "1000000000000";
let __conn = null;
//代理参考文档： https://www.scrapingbee.com/blog/proxy-node-fetch/
let oldFetch = global.fetch;
(function setProxy() {
    const HttpsProxyAgent = require('https-proxy-agent');
    global.fetch = function (...arg) {
        arg[1].agent = new HttpsProxyAgent("http://127.0.0.1:1081");
        return oldFetch(...arg);
    };
    //axio 代理设置参考文档: https://masteringjs.io/tutorials/axios/proxy
    axios_1.default.defaults.proxy = false;
    axios_1.default.defaults.httpsAgent = new HttpsProxyAgent("http://127.0.0.1:1081");
})();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield teleport();
    });
}
main().then(() => {
    console.log("execute finish");
}).catch((err) => {
    console.log("execute error:", err);
}).finally(() => {
    process.exit(1);
});
function createAddr() {
    return __awaiter(this, void 0, void 0, function* () {
        yield cryptoUtil.cryptoIsReady();
        let mnemonic = cryptoUtil.mnemonicGenerate();
        //console.log("addr:" ,Buffer.from(cryptoUtil.decodeAddress("5DkkaKaTKiNRWL56DXbBYxq4Y3vzAPBurrYhhCpEfnwbwPRU",undefined,42)).toString("hex"));
        //console.log("addr2:" ,Buffer.from(cryptoUtil.decodeAddress("5Hkr2skHU3q5VtuteyFZYi4JiEN9BeQ5xvoaVDJ7cQW4sTZC",undefined,42)).toString("hex"));
        console.log("mnemonic:", mnemonic);
        console.log("private key:", Buffer.from(cryptoUtil.mnemonicToLegacySeed(mnemonic)).toString("hex"));
        let keyringObj = new keyring.Keyring();
        const sp = keyringObj.createFromUri(mnemonic, { name: 'sr25519' });
        console.log("address:", sp.address);
        console.log("publicKey:", Buffer.from(sp.publicKey).toString("hex"));
    });
}
function addrTest() {
    return __awaiter(this, void 0, void 0, function* () {
        yield cryptoUtil.cryptoWaitReady();
        yield cryptoUtil.cryptoIsReady();
        let keyringObj = new keyring.Keyring(); // {type:"sr25519"}
        const sp = keyringObj.createFromUri(MNEMONIC_1, { name: 'sr25519' });
        console.log("address:", sp.address);
        console.log("publicKey:", Buffer.from(sp.publicKey).toString("hex"));
    });
}
function getConn() {
    return __awaiter(this, void 0, void 0, function* () {
        if (__conn) {
            return __conn;
        }
        yield cryptoUtil.cryptoWaitReady();
        const wsProvider = new polkadot.WsProvider("wss://westmint-rpc.polkadot.io");
        __conn = yield polkadot.ApiPromise.create({ provider: wsProvider });
        yield __conn.isReady;
        return __conn;
    });
}
// "wss://rpc.polkadot.io"
function getBalance() {
    return __awaiter(this, void 0, void 0, function* () {
        const api = yield getConn();
        // 获取主代币余额
        const result = yield api.query.system.account(ADDR_3);
        console.log("free:", result.data.free.toString());
        console.info("balance result:", result);
    });
}
function getAssetBalance() {
    return __awaiter(this, void 0, void 0, function* () {
        const api = yield getConn();
        const assets = (yield api.query.assets.account(1024, ADDR_1)).value;
        console.info("balance:", assets.balance.toString());
        console.info("isFrozen:", assets.isFrozen.toString());
    });
}
function getAssetInffo() {
    return __awaiter(this, void 0, void 0, function* () {
        const api = yield getConn();
        const assetInffo = yield api.query.assets.asset(1024);
        console.info("is empty:", assetInffo.isEmpty);
        const actualAssetInfo = assetInffo.value;
        console.info("supply:", actualAssetInfo.supply.toString());
        console.info("deposit:", actualAssetInfo.deposit.toString());
        console.info("minBalance:", actualAssetInfo.minBalance.toString());
        console.info("accounts:", actualAssetInfo.accounts.toString());
        console.info("origin:", JSON.stringify(actualAssetInfo, null, 2));
        const assetMeta = yield api.query.assets.metadata(1024);
        console.info("asset meta:", JSON.stringify(assetMeta, null, 2));
        console.info("name:", util.hexToString(assetMeta.name.toHex()));
        console.info("symbol:", util.hexToString(assetMeta.symbol.toHex()));
        console.info("decimals:", assetMeta.decimals);
    });
}
function transferToStatemint() {
    return __awaiter(this, void 0, void 0, function* () {
        let fromAddr = ADDR_2;
        let privateKey = PRIVATE_KEY_2;
        let publicKey = PUBLIC_KEY_2;
        let mnemonic = MNEMONIC_2;
        let toAddr = ADDR_1;
        let amount = new bignumber_js_1.default(0.98).multipliedBy(westendDecimal).integerValue().toString(10);
        const api = yield getConn();
        let tx = api.tx.balances.transfer(toAddr, amount);
        let accountInfo = yield api.query.system.account(fromAddr);
        let payload = {
            blockHash: api.genesisHash.toString(),
            genesisHash: api.genesisHash.toString(),
            nonce: accountInfo.nonce,
            runtimeVersion: api.runtimeVersion,
            address: fromAddr,
            method: tx,
            version: api.extrinsicVersion,
            signedExtensions: api.registry.signedExtensions,
            tip: 0,
            era: 0,
        };
        const signerPayload = api.createType("SignerPayload", payload);
        let originUnsigin = signerPayload.toRaw().data;
        let unsigned = (originUnsigin.length > (256 + 1) * 2) ? cryptoUtil.blake2AsHex(originUnsigin) : originUnsigin;
        let keyringObj = new keyring.Keyring();
        const sp = keyringObj.createFromUri(mnemonic, { name: 'sr25519' });
        let signResult = sp.sign(unsigned, { withType: true });
        let signVal = Buffer.from(signResult).toString("hex");
        console.log("sign val:", signVal);
        tx.addSignature(fromAddr, util.hexToU8a(signVal), signerPayload.toPayload());
        let sendResult = yield tx.send();
        console.info("send result:", sendResult.toString());
    });
}
function transferAsset() {
    return __awaiter(this, void 0, void 0, function* () {
        let fromAddr = ADDR_1;
        let privateKey = PRIVATE_KEY_1;
        let publicKey = PUBLIC_KEY_1;
        let toAddr = ADDR_2;
        let amount = "100";
        let assetId = 1023;
        const api = yield getConn();
        let tx = api.tx.assets.transfer(assetId, toAddr, amount);
        let accountInfo = yield api.query.system.account(fromAddr);
        let payload = {
            blockHash: api.genesisHash.toString(),
            genesisHash: api.genesisHash.toString(),
            nonce: accountInfo.nonce,
            runtimeVersion: api.runtimeVersion,
            address: fromAddr,
            method: tx,
            version: api.extrinsicVersion,
            signedExtensions: api.registry.signedExtensions,
            tip: 0,
            era: 0,
        };
        const signerPayload = api.createType("SignerPayload", payload);
        let originUnsigin = signerPayload.toRaw().data;
        let unsigned = (originUnsigin.length > (256 + 1) * 2) ? cryptoUtil.blake2AsHex(originUnsigin) : originUnsigin;
        let keyringObj = new keyring.Keyring();
        const sp = keyringObj.createFromUri(MNEMONIC_1, { name: 'sr25519' });
        let signResult = sp.sign(unsigned, { withType: true });
        let signVal = Buffer.from(signResult).toString("hex");
        console.log("sign val:", signVal);
        tx.addSignature(fromAddr, util.hexToU8a(signVal), signerPayload.toPayload());
        let sendResult = yield tx.send();
        console.info("send result:", sendResult.toString());
    });
}
/*
    创建自己的token
*/
function createAsset() {
    return __awaiter(this, void 0, void 0, function* () {
        const api = yield getConn();
        let fromAddr = ADDR_1;
        let mnemonic = MNEMONIC_1;
        let assetId = 1021;
        let tx = api.tx.utility.batchAll([
            api.tx.assets.create(assetId, fromAddr, 1),
            api.tx.assets.setMetadata(assetId, "NFT test", "NFT", 1),
            api.tx.assets.setTeam(assetId, fromAddr, fromAddr, fromAddr)
        ]);
        yield sendTransaction(mnemonic, fromAddr, tx);
    });
}
/*
    删除token
*/
function destroyAsset() {
    return __awaiter(this, void 0, void 0, function* () {
        const api = yield getConn();
        let fromAddr = ADDR_1;
        let mnemonic = MNEMONIC_1;
        let assetId = 1021;
        let tx = api.tx.assets.destroy(assetId, {});
        yield sendTransaction(mnemonic, fromAddr, tx);
    });
}
function sendTransaction(mnemonic, fromAddr, tx) {
    return __awaiter(this, void 0, void 0, function* () {
        let feeInfo = yield tx.paymentInfo(fromAddr);
        console.info("need fee:", feeInfo.partialFee.toHuman());
        const api = yield getConn();
        let accountInfo = yield api.query.system.account(fromAddr);
        console.info("balance before tx:", JSON.stringify(accountInfo, null, 2));
        let payload = {
            blockHash: api.genesisHash.toString(),
            genesisHash: api.genesisHash.toString(),
            nonce: accountInfo.nonce,
            runtimeVersion: api.runtimeVersion,
            address: fromAddr,
            method: tx,
            version: api.extrinsicVersion,
            signedExtensions: api.registry.signedExtensions,
            tip: 0,
            era: 0,
        };
        const signerPayload = api.createType("SignerPayload", payload);
        let originUnsigin = signerPayload.toRaw().data;
        let unsigned = (originUnsigin.length > (256 + 1) * 2) ? cryptoUtil.blake2AsHex(originUnsigin) : originUnsigin;
        let keyringObj = new keyring.Keyring();
        const sp = keyringObj.createFromUri(mnemonic, { name: 'sr25519' });
        let signResult = sp.sign(unsigned, { withType: true });
        let signVal = Buffer.from(signResult).toString("hex");
        console.log("sign val:", signVal);
        tx.addSignature(fromAddr, util.hexToU8a(signVal), signerPayload.toPayload());
        let sendResult = yield tx.send();
        console.info("send result:", sendResult.toString());
    });
}
function createNFT() {
    return __awaiter(this, void 0, void 0, function* () {
        const api = yield getConn();
        let fromAddr = ADDR_1;
        let mnemonic = MNEMONIC_1;
        let classId = 1021;
        let tx = api.tx.utility.batchAll([
            api.tx.uniques.create(classId, ADDR_1),
            api.tx.uniques.setClassMetadata(classId, "Ipfs://Ipfs/QmZtKqNCpUnNVHFXzw9gtPDPhtYGsgTbAd7kkq3sY1jGp6", false), // set meta data, StateScan默认支持IPFS的图片自动加载，所以测试可以设置为ipfs的有效信息
        ]);
        yield sendTransaction(mnemonic, fromAddr, tx);
    });
}
function mintNFT() {
    return __awaiter(this, void 0, void 0, function* () {
        const api = yield getConn();
        let fromAddr = ADDR_1;
        let mnemonic = MNEMONIC_1;
        let classId = 1021;
        let tx = api.tx.utility.batchAll([
            api.tx.uniques.mint(classId, 2, ADDR_1),
            api.tx.uniques.mint(classId, 3, ADDR_1),
            api.tx.uniques.mint(classId, 4, ADDR_1), // mint nft
        ]);
        yield sendTransaction(mnemonic, fromAddr, tx);
    });
}
function getNFT() {
    return __awaiter(this, void 0, void 0, function* () {
        const api = yield getConn();
        let classId = 1021;
        let ntfId = 1;
        let nftClassInfo = yield api.query.uniques.class(classId);
        //console.info("nft result:", nftClassInfo);
        console.info("nft class info:", JSON.stringify(nftClassInfo, null, 2));
        let metaData = yield api.query.uniques.classMetadataOf(classId);
        let metaDetail = metaData.value;
        console.info("nft class meta:", metaDetail.data.toUtf8());
        let nftInfo = yield api.query.uniques.asset(classId, ntfId);
        console.info("nft instance info:", JSON.stringify(nftInfo, null, 2));
        let nftInstanceMeta = yield api.query.uniques.instanceMetadataOf(classId, ntfId);
        console.info("nft instance meta:", JSON.stringify(nftInstanceMeta, null, 2));
        let instanceMetaDetail = nftInstanceMeta.value;
        console.info("nft instance meta detail:", instanceMetaDetail.data.toUtf8());
    });
}
const StateWestAPI = "https://westmint.statescan.io/api";
const StateDOTAPI = "https://statemint.statescan.io/api";
const StateKusumaAPI = "https://statemine.statescan.io/api";
function getUserNFT() {
    return __awaiter(this, void 0, void 0, function* () {
        const api = yield getConn();
        let accountAddr = ADDR_1;
        let nftClassId = 1021;
        let nftId = 1;
        let accountInfo = yield api.query.uniques.account(accountAddr, nftClassId, nftId);
        console.log("acount detail:", JSON.stringify(accountInfo, null, 2));
        api.rpc.system.accountNextIndex;
        // see: https://github.com/opensquare-network/statescan/blob/main/packages/next/pages/account/%5Bid%5D.js#L639
        // let nftResp = await axios.get(`${StateWestAPI}/addresses/${accountAddr}/nft/instances?page=0&&pageSize=25`);
        // console.info("nft instance:",nftResp.data);
    });
}
function transferNFT() {
    return __awaiter(this, void 0, void 0, function* () {
        let fromAddr = ADDR_1;
        let privateKey = PRIVATE_KEY_1;
        let publicKey = PUBLIC_KEY_1;
        let mnemonic = MNEMONIC_1;
        let toAddr = ADDR_2;
        let classId = 1021;
        let instanceId = 1;
        const api = yield getConn();
        let tx = api.tx.uniques.transfer(classId, instanceId, toAddr);
        yield sendTransaction(mnemonic, fromAddr, tx);
    });
}
// https://wiki.polkadot.network/docs/learn-transaction-fees
//  https://polkadot.js.org/docs/api/cookbook/tx
function getFee() {
    return __awaiter(this, void 0, void 0, function* () {
        let api = yield getConn();
        let tx = api.tx.uniques.transfer(1021, 1, ADDR_2);
        let feeInfo = yield tx.paymentInfo(ADDR_1);
        console.info("fee info:", JSON.stringify(feeInfo, null, 2));
        console.info("actual fee:", feeInfo.partialFee.toHuman());
    });
}
// 跨链资产转移 https://wiki.polkadot.network/docs/learn-teleport
function teleport() {
    return __awaiter(this, void 0, void 0, function* () {
        let api = yield getConn();
        let fromAddr = ADDR_1;
        let mnemonic = MNEMONIC_1;
        let toAddr = ADDR_2;
        let amount = new bignumber_js_1.default(5).multipliedBy(westendDecimal).toString(10);
        let isParaTeleport = true;
        let recipientParaId = 1000; /// 1000 是westmint的平行链Id
        let recipientParaIdObj = {
            V1: isParaTeleport
                ? {
                    interior: 'Here',
                    parents: 1
                }
                : {
                    interior: {
                        X1: {
                            ParaChain: recipientParaId
                        }
                    },
                    parents: 0
                }
        };
        let toAddrObj = {
            V1: {
                interior: {
                    X1: {
                        AccountId32: {
                            id: api.createType('AccountId32', toAddr).toHex(),
                            network: 'Any'
                        }
                    }
                },
                parents: 0
            }
        };
        let amountObj = {
            V1: [{
                    fun: {
                        Fungible: amount
                    },
                    id: {
                        Concrete: {
                            interior: 'Here',
                            parents: isParaTeleport
                                ? 1
                                : 0
                        }
                    }
                }]
        };
        let feeIndex = 0;
        let feeLimitObj = { Unlimited: null };
        let tx = api.tx.polkadotXcm.limitedTeleportAssets(recipientParaIdObj, toAddrObj, amountObj, feeIndex, feeLimitObj);
        yield sendTransaction(mnemonic, fromAddr, tx);
    });
}
/*

    //console.info("parachainInfo:",(await api.query.parachainInfo).parachainId);
    //console.info("all:", api.tx.polkadotXcm.teleportAssets());*/ 
