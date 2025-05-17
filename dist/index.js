// @bun
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __require = import.meta.require;

// node_modules/@redis/client/dist/lib/commands/APPEND.js
var require_APPEND = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, value) {
    return ["APPEND", key, value];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/BITCOUNT.js
var require_BITCOUNT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, range) {
    const args = ["BITCOUNT", key];
    if (range) {
      args.push(range.start.toString(), range.end.toString());
      if (range.mode) {
        args.push(range.mode);
      }
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/BITFIELD_RO.js
var require_BITFIELD_RO = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, operations) {
    const args = ["BITFIELD_RO", key];
    for (const operation of operations) {
      args.push("GET", operation.encoding, operation.offset.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/BITFIELD.js
var require_BITFIELD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, operations) {
    const args = ["BITFIELD", key];
    for (const options of operations) {
      switch (options.operation) {
        case "GET":
          args.push("GET", options.encoding, options.offset.toString());
          break;
        case "SET":
          args.push("SET", options.encoding, options.offset.toString(), options.value.toString());
          break;
        case "INCRBY":
          args.push("INCRBY", options.encoding, options.offset.toString(), options.increment.toString());
          break;
        case "OVERFLOW":
          args.push("OVERFLOW", options.behavior);
          break;
      }
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/generic-transformers.js
var require_generic_transformers = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformRangeReply = exports.pushSlotRangesArguments = exports.pushSortArguments = exports.transformFunctionListItemReply = exports.RedisFunctionFlags = exports.transformCommandReply = exports.CommandCategories = exports.CommandFlags = exports.pushOptionalVerdictArgument = exports.pushVerdictArgument = exports.pushVerdictNumberArguments = exports.pushVerdictArguments = exports.pushEvalArguments = exports.evalFirstKeyIndex = exports.transformPXAT = exports.transformEXAT = exports.transformGeoMembersWithReply = exports.GeoReplyWith = exports.pushGeoRadiusStoreArguments = exports.pushGeoRadiusArguments = exports.pushGeoSearchArguments = exports.pushGeoCountArgument = exports.transformLMPopArguments = exports.transformZMPopArguments = exports.transformSortedSetWithScoresReply = exports.transformSortedSetMemberReply = exports.transformSortedSetMemberNullReply = exports.transformStreamsMessagesReply = exports.transformStreamMessagesNullReply = exports.transformStreamMessagesReply = exports.transformStreamMessageNullReply = exports.transformStreamMessageReply = exports.transformTuplesReply = exports.transformStringNumberInfinityArgument = exports.transformNumberInfinityArgument = exports.transformNumberInfinityNullArrayReply = exports.transformNumberInfinityNullReply = exports.transformNumberInfinityReply = exports.pushScanArguments = exports.transformBooleanArrayReply = exports.transformBooleanReply = undefined;
  function transformBooleanReply(reply) {
    return reply === 1;
  }
  exports.transformBooleanReply = transformBooleanReply;
  function transformBooleanArrayReply(reply) {
    return reply.map(transformBooleanReply);
  }
  exports.transformBooleanArrayReply = transformBooleanArrayReply;
  function pushScanArguments(args, cursor, options) {
    args.push(cursor.toString());
    if (options?.MATCH) {
      args.push("MATCH", options.MATCH);
    }
    if (options?.COUNT) {
      args.push("COUNT", options.COUNT.toString());
    }
    return args;
  }
  exports.pushScanArguments = pushScanArguments;
  function transformNumberInfinityReply(reply) {
    switch (reply.toString()) {
      case "+inf":
        return Infinity;
      case "-inf":
        return -Infinity;
      default:
        return Number(reply);
    }
  }
  exports.transformNumberInfinityReply = transformNumberInfinityReply;
  function transformNumberInfinityNullReply(reply) {
    if (reply === null)
      return null;
    return transformNumberInfinityReply(reply);
  }
  exports.transformNumberInfinityNullReply = transformNumberInfinityNullReply;
  function transformNumberInfinityNullArrayReply(reply) {
    return reply.map(transformNumberInfinityNullReply);
  }
  exports.transformNumberInfinityNullArrayReply = transformNumberInfinityNullArrayReply;
  function transformNumberInfinityArgument(num) {
    switch (num) {
      case Infinity:
        return "+inf";
      case -Infinity:
        return "-inf";
      default:
        return num.toString();
    }
  }
  exports.transformNumberInfinityArgument = transformNumberInfinityArgument;
  function transformStringNumberInfinityArgument(num) {
    if (typeof num !== "number")
      return num;
    return transformNumberInfinityArgument(num);
  }
  exports.transformStringNumberInfinityArgument = transformStringNumberInfinityArgument;
  function transformTuplesReply(reply) {
    const message = Object.create(null);
    for (let i = 0;i < reply.length; i += 2) {
      message[reply[i].toString()] = reply[i + 1];
    }
    return message;
  }
  exports.transformTuplesReply = transformTuplesReply;
  function transformStreamMessageReply([id, message]) {
    return {
      id,
      message: transformTuplesReply(message)
    };
  }
  exports.transformStreamMessageReply = transformStreamMessageReply;
  function transformStreamMessageNullReply(reply) {
    if (reply === null)
      return null;
    return transformStreamMessageReply(reply);
  }
  exports.transformStreamMessageNullReply = transformStreamMessageNullReply;
  function transformStreamMessagesReply(reply) {
    return reply.map(transformStreamMessageReply);
  }
  exports.transformStreamMessagesReply = transformStreamMessagesReply;
  function transformStreamMessagesNullReply(reply) {
    return reply.map(transformStreamMessageNullReply);
  }
  exports.transformStreamMessagesNullReply = transformStreamMessagesNullReply;
  function transformStreamsMessagesReply(reply) {
    if (reply === null)
      return null;
    return reply.map(([name, rawMessages]) => ({
      name,
      messages: transformStreamMessagesReply(rawMessages)
    }));
  }
  exports.transformStreamsMessagesReply = transformStreamsMessagesReply;
  function transformSortedSetMemberNullReply(reply) {
    if (!reply.length)
      return null;
    return transformSortedSetMemberReply(reply);
  }
  exports.transformSortedSetMemberNullReply = transformSortedSetMemberNullReply;
  function transformSortedSetMemberReply(reply) {
    return {
      value: reply[0],
      score: transformNumberInfinityReply(reply[1])
    };
  }
  exports.transformSortedSetMemberReply = transformSortedSetMemberReply;
  function transformSortedSetWithScoresReply(reply) {
    const members = [];
    for (let i = 0;i < reply.length; i += 2) {
      members.push({
        value: reply[i],
        score: transformNumberInfinityReply(reply[i + 1])
      });
    }
    return members;
  }
  exports.transformSortedSetWithScoresReply = transformSortedSetWithScoresReply;
  function transformZMPopArguments(args, keys, side, options) {
    pushVerdictArgument(args, keys);
    args.push(side);
    if (options?.COUNT) {
      args.push("COUNT", options.COUNT.toString());
    }
    return args;
  }
  exports.transformZMPopArguments = transformZMPopArguments;
  function transformLMPopArguments(args, keys, side, options) {
    pushVerdictArgument(args, keys);
    args.push(side);
    if (options?.COUNT) {
      args.push("COUNT", options.COUNT.toString());
    }
    return args;
  }
  exports.transformLMPopArguments = transformLMPopArguments;
  function pushGeoCountArgument(args, count) {
    if (typeof count === "number") {
      args.push("COUNT", count.toString());
    } else if (count) {
      args.push("COUNT", count.value.toString());
      if (count.ANY) {
        args.push("ANY");
      }
    }
    return args;
  }
  exports.pushGeoCountArgument = pushGeoCountArgument;
  function pushGeoSearchArguments(args, key, from, by, options) {
    args.push(key);
    if (typeof from === "string") {
      args.push("FROMMEMBER", from);
    } else {
      args.push("FROMLONLAT", from.longitude.toString(), from.latitude.toString());
    }
    if ("radius" in by) {
      args.push("BYRADIUS", by.radius.toString());
    } else {
      args.push("BYBOX", by.width.toString(), by.height.toString());
    }
    args.push(by.unit);
    if (options?.SORT) {
      args.push(options.SORT);
    }
    pushGeoCountArgument(args, options?.COUNT);
    return args;
  }
  exports.pushGeoSearchArguments = pushGeoSearchArguments;
  function pushGeoRadiusArguments(args, key, from, radius, unit, options) {
    args.push(key);
    if (typeof from === "string") {
      args.push(from);
    } else {
      args.push(from.longitude.toString(), from.latitude.toString());
    }
    args.push(radius.toString(), unit);
    if (options?.SORT) {
      args.push(options.SORT);
    }
    pushGeoCountArgument(args, options?.COUNT);
    return args;
  }
  exports.pushGeoRadiusArguments = pushGeoRadiusArguments;
  function pushGeoRadiusStoreArguments(args, key, from, radius, unit, destination, options) {
    pushGeoRadiusArguments(args, key, from, radius, unit, options);
    if (options?.STOREDIST) {
      args.push("STOREDIST", destination);
    } else {
      args.push("STORE", destination);
    }
    return args;
  }
  exports.pushGeoRadiusStoreArguments = pushGeoRadiusStoreArguments;
  var GeoReplyWith;
  (function(GeoReplyWith2) {
    GeoReplyWith2["DISTANCE"] = "WITHDIST";
    GeoReplyWith2["HASH"] = "WITHHASH";
    GeoReplyWith2["COORDINATES"] = "WITHCOORD";
  })(GeoReplyWith || (exports.GeoReplyWith = GeoReplyWith = {}));
  function transformGeoMembersWithReply(reply, replyWith) {
    const replyWithSet = new Set(replyWith);
    let index = 0;
    const distanceIndex = replyWithSet.has(GeoReplyWith.DISTANCE) && ++index, hashIndex = replyWithSet.has(GeoReplyWith.HASH) && ++index, coordinatesIndex = replyWithSet.has(GeoReplyWith.COORDINATES) && ++index;
    return reply.map((member) => {
      const transformedMember = {
        member: member[0]
      };
      if (distanceIndex) {
        transformedMember.distance = member[distanceIndex];
      }
      if (hashIndex) {
        transformedMember.hash = member[hashIndex];
      }
      if (coordinatesIndex) {
        const [longitude, latitude] = member[coordinatesIndex];
        transformedMember.coordinates = {
          longitude,
          latitude
        };
      }
      return transformedMember;
    });
  }
  exports.transformGeoMembersWithReply = transformGeoMembersWithReply;
  function transformEXAT(EXAT) {
    return (typeof EXAT === "number" ? EXAT : Math.floor(EXAT.getTime() / 1000)).toString();
  }
  exports.transformEXAT = transformEXAT;
  function transformPXAT(PXAT) {
    return (typeof PXAT === "number" ? PXAT : PXAT.getTime()).toString();
  }
  exports.transformPXAT = transformPXAT;
  function evalFirstKeyIndex(options) {
    return options?.keys?.[0];
  }
  exports.evalFirstKeyIndex = evalFirstKeyIndex;
  function pushEvalArguments(args, options) {
    if (options?.keys) {
      args.push(options.keys.length.toString(), ...options.keys);
    } else {
      args.push("0");
    }
    if (options?.arguments) {
      args.push(...options.arguments);
    }
    return args;
  }
  exports.pushEvalArguments = pushEvalArguments;
  function pushVerdictArguments(args, value) {
    if (Array.isArray(value)) {
      args = args.concat(value);
    } else {
      args.push(value);
    }
    return args;
  }
  exports.pushVerdictArguments = pushVerdictArguments;
  function pushVerdictNumberArguments(args, value) {
    if (Array.isArray(value)) {
      for (const item of value) {
        args.push(item.toString());
      }
    } else {
      args.push(value.toString());
    }
    return args;
  }
  exports.pushVerdictNumberArguments = pushVerdictNumberArguments;
  function pushVerdictArgument(args, value) {
    if (Array.isArray(value)) {
      args.push(value.length.toString(), ...value);
    } else {
      args.push("1", value);
    }
    return args;
  }
  exports.pushVerdictArgument = pushVerdictArgument;
  function pushOptionalVerdictArgument(args, name, value) {
    if (value === undefined)
      return args;
    args.push(name);
    return pushVerdictArgument(args, value);
  }
  exports.pushOptionalVerdictArgument = pushOptionalVerdictArgument;
  var CommandFlags;
  (function(CommandFlags2) {
    CommandFlags2["WRITE"] = "write";
    CommandFlags2["READONLY"] = "readonly";
    CommandFlags2["DENYOOM"] = "denyoom";
    CommandFlags2["ADMIN"] = "admin";
    CommandFlags2["PUBSUB"] = "pubsub";
    CommandFlags2["NOSCRIPT"] = "noscript";
    CommandFlags2["RANDOM"] = "random";
    CommandFlags2["SORT_FOR_SCRIPT"] = "sort_for_script";
    CommandFlags2["LOADING"] = "loading";
    CommandFlags2["STALE"] = "stale";
    CommandFlags2["SKIP_MONITOR"] = "skip_monitor";
    CommandFlags2["ASKING"] = "asking";
    CommandFlags2["FAST"] = "fast";
    CommandFlags2["MOVABLEKEYS"] = "movablekeys";
  })(CommandFlags || (exports.CommandFlags = CommandFlags = {}));
  var CommandCategories;
  (function(CommandCategories2) {
    CommandCategories2["KEYSPACE"] = "@keyspace";
    CommandCategories2["READ"] = "@read";
    CommandCategories2["WRITE"] = "@write";
    CommandCategories2["SET"] = "@set";
    CommandCategories2["SORTEDSET"] = "@sortedset";
    CommandCategories2["LIST"] = "@list";
    CommandCategories2["HASH"] = "@hash";
    CommandCategories2["STRING"] = "@string";
    CommandCategories2["BITMAP"] = "@bitmap";
    CommandCategories2["HYPERLOGLOG"] = "@hyperloglog";
    CommandCategories2["GEO"] = "@geo";
    CommandCategories2["STREAM"] = "@stream";
    CommandCategories2["PUBSUB"] = "@pubsub";
    CommandCategories2["ADMIN"] = "@admin";
    CommandCategories2["FAST"] = "@fast";
    CommandCategories2["SLOW"] = "@slow";
    CommandCategories2["BLOCKING"] = "@blocking";
    CommandCategories2["DANGEROUS"] = "@dangerous";
    CommandCategories2["CONNECTION"] = "@connection";
    CommandCategories2["TRANSACTION"] = "@transaction";
    CommandCategories2["SCRIPTING"] = "@scripting";
  })(CommandCategories || (exports.CommandCategories = CommandCategories = {}));
  function transformCommandReply([name, arity, flags, firstKeyIndex, lastKeyIndex, step, categories]) {
    return {
      name,
      arity,
      flags: new Set(flags),
      firstKeyIndex,
      lastKeyIndex,
      step,
      categories: new Set(categories)
    };
  }
  exports.transformCommandReply = transformCommandReply;
  var RedisFunctionFlags;
  (function(RedisFunctionFlags2) {
    RedisFunctionFlags2["NO_WRITES"] = "no-writes";
    RedisFunctionFlags2["ALLOW_OOM"] = "allow-oom";
    RedisFunctionFlags2["ALLOW_STALE"] = "allow-stale";
    RedisFunctionFlags2["NO_CLUSTER"] = "no-cluster";
  })(RedisFunctionFlags || (exports.RedisFunctionFlags = RedisFunctionFlags = {}));
  function transformFunctionListItemReply(reply) {
    return {
      libraryName: reply[1],
      engine: reply[3],
      functions: reply[5].map((fn) => ({
        name: fn[1],
        description: fn[3],
        flags: fn[5]
      }))
    };
  }
  exports.transformFunctionListItemReply = transformFunctionListItemReply;
  function pushSortArguments(args, options) {
    if (options?.BY) {
      args.push("BY", options.BY);
    }
    if (options?.LIMIT) {
      args.push("LIMIT", options.LIMIT.offset.toString(), options.LIMIT.count.toString());
    }
    if (options?.GET) {
      for (const pattern of typeof options.GET === "string" ? [options.GET] : options.GET) {
        args.push("GET", pattern);
      }
    }
    if (options?.DIRECTION) {
      args.push(options.DIRECTION);
    }
    if (options?.ALPHA) {
      args.push("ALPHA");
    }
    return args;
  }
  exports.pushSortArguments = pushSortArguments;
  function pushSlotRangeArguments(args, range) {
    args.push(range.start.toString(), range.end.toString());
  }
  function pushSlotRangesArguments(args, ranges) {
    if (Array.isArray(ranges)) {
      for (const range of ranges) {
        pushSlotRangeArguments(args, range);
      }
    } else {
      pushSlotRangeArguments(args, ranges);
    }
    return args;
  }
  exports.pushSlotRangesArguments = pushSlotRangesArguments;
  function transformRangeReply([start, end]) {
    return {
      start,
      end
    };
  }
  exports.transformRangeReply = transformRangeReply;
});

// node_modules/@redis/client/dist/lib/commands/BITOP.js
var require_BITOP = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 2;
  function transformArguments(operation, destKey, key) {
    return (0, generic_transformers_1.pushVerdictArguments)(["BITOP", operation, destKey], key);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/BITPOS.js
var require_BITPOS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, bit, start, end, mode) {
    const args = ["BITPOS", key, bit.toString()];
    if (typeof start === "number") {
      args.push(start.toString());
    }
    if (typeof end === "number") {
      args.push(end.toString());
    }
    if (mode) {
      args.push(mode);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/BLMOVE.js
var require_BLMOVE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(source, destination, sourceDirection, destinationDirection, timeout) {
    return [
      "BLMOVE",
      source,
      destination,
      sourceDirection,
      destinationDirection,
      timeout.toString()
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/LMPOP.js
var require_LMPOP = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 2;
  function transformArguments(keys, side, options) {
    return (0, generic_transformers_1.transformLMPopArguments)(["LMPOP"], keys, side, options);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/BLMPOP.js
var require_BLMPOP = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 3;
  function transformArguments(timeout, keys, side, options) {
    return (0, generic_transformers_1.transformLMPopArguments)(["BLMPOP", timeout.toString()], keys, side, options);
  }
  exports.transformArguments = transformArguments;
  var LMPOP_1 = require_LMPOP();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return LMPOP_1.transformReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/BLPOP.js
var require_BLPOP = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(keys, timeout) {
    const args = (0, generic_transformers_1.pushVerdictArguments)(["BLPOP"], keys);
    args.push(timeout.toString());
    return args;
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    if (reply === null)
      return null;
    return {
      key: reply[0],
      element: reply[1]
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/BRPOP.js
var require_BRPOP = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, timeout) {
    const args = (0, generic_transformers_1.pushVerdictArguments)(["BRPOP"], key);
    args.push(timeout.toString());
    return args;
  }
  exports.transformArguments = transformArguments;
  var BLPOP_1 = require_BLPOP();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return BLPOP_1.transformReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/BRPOPLPUSH.js
var require_BRPOPLPUSH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(source, destination, timeout) {
    return ["BRPOPLPUSH", source, destination, timeout.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ZMPOP.js
var require_ZMPOP = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 2;
  function transformArguments(keys, side, options) {
    return (0, generic_transformers_1.transformZMPopArguments)(["ZMPOP"], keys, side, options);
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return reply === null ? null : {
      key: reply[0],
      elements: reply[1].map(generic_transformers_1.transformSortedSetMemberReply)
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/BZMPOP.js
var require_BZMPOP = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 3;
  function transformArguments(timeout, keys, side, options) {
    return (0, generic_transformers_1.transformZMPopArguments)(["BZMPOP", timeout.toString()], keys, side, options);
  }
  exports.transformArguments = transformArguments;
  var ZMPOP_1 = require_ZMPOP();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return ZMPOP_1.transformReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/BZPOPMAX.js
var require_BZPOPMAX = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, timeout) {
    const args = (0, generic_transformers_1.pushVerdictArguments)(["BZPOPMAX"], key);
    args.push(timeout.toString());
    return args;
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    if (!reply)
      return null;
    return {
      key: reply[0],
      value: reply[1],
      score: (0, generic_transformers_1.transformNumberInfinityReply)(reply[2])
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/BZPOPMIN.js
var require_BZPOPMIN = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, timeout) {
    const args = (0, generic_transformers_1.pushVerdictArguments)(["BZPOPMIN"], key);
    args.push(timeout.toString());
    return args;
  }
  exports.transformArguments = transformArguments;
  var BZPOPMAX_1 = require_BZPOPMAX();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return BZPOPMAX_1.transformReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/COPY.js
var require_COPY = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(source, destination, options) {
    const args = ["COPY", source, destination];
    if (options?.destinationDb) {
      args.push("DB", options.destinationDb.toString());
    }
    if (options?.replace) {
      args.push("REPLACE");
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/DECR.js
var require_DECR = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return ["DECR", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/DECRBY.js
var require_DECRBY = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, decrement) {
    return ["DECRBY", key, decrement.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/DEL.js
var require_DEL = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(keys) {
    return (0, generic_transformers_1.pushVerdictArguments)(["DEL"], keys);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/DUMP.js
var require_DUMP = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return ["DUMP", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/EVAL_RO.js
var require_EVAL_RO = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = generic_transformers_1.evalFirstKeyIndex;
  exports.IS_READ_ONLY = true;
  function transformArguments(script, options) {
    return (0, generic_transformers_1.pushEvalArguments)(["EVAL_RO", script], options);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/EVAL.js
var require_EVAL = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = generic_transformers_1.evalFirstKeyIndex;
  function transformArguments(script, options) {
    return (0, generic_transformers_1.pushEvalArguments)(["EVAL", script], options);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/EVALSHA_RO.js
var require_EVALSHA_RO = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = generic_transformers_1.evalFirstKeyIndex;
  exports.IS_READ_ONLY = true;
  function transformArguments(sha1, options) {
    return (0, generic_transformers_1.pushEvalArguments)(["EVALSHA_RO", sha1], options);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/EVALSHA.js
var require_EVALSHA = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = generic_transformers_1.evalFirstKeyIndex;
  function transformArguments(sha1, options) {
    return (0, generic_transformers_1.pushEvalArguments)(["EVALSHA", sha1], options);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/EXISTS.js
var require_EXISTS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(keys) {
    return (0, generic_transformers_1.pushVerdictArguments)(["EXISTS"], keys);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/EXPIRE.js
var require_EXPIRE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, seconds, mode) {
    const args = ["EXPIRE", key, seconds.toString()];
    if (mode) {
      args.push(mode);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/EXPIREAT.js
var require_EXPIREAT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, timestamp, mode) {
    const args = [
      "EXPIREAT",
      key,
      (0, generic_transformers_1.transformEXAT)(timestamp)
    ];
    if (mode) {
      args.push(mode);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_2 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_2.transformBooleanReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/EXPIRETIME.js
var require_EXPIRETIME = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return ["EXPIRETIME", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/FCALL_RO.js
var require_FCALL_RO = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = generic_transformers_1.evalFirstKeyIndex;
  exports.IS_READ_ONLY = true;
  function transformArguments(fn, options) {
    return (0, generic_transformers_1.pushEvalArguments)(["FCALL_RO", fn], options);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/FCALL.js
var require_FCALL = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = generic_transformers_1.evalFirstKeyIndex;
  function transformArguments(fn, options) {
    return (0, generic_transformers_1.pushEvalArguments)(["FCALL", fn], options);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/GEOADD.js
var require_GEOADD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, toAdd, options) {
    const args = ["GEOADD", key];
    if (options?.NX) {
      args.push("NX");
    } else if (options?.XX) {
      args.push("XX");
    }
    if (options?.CH) {
      args.push("CH");
    }
    for (const { longitude, latitude, member } of Array.isArray(toAdd) ? toAdd : [toAdd]) {
      args.push(longitude.toString(), latitude.toString(), member);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/GEODIST.js
var require_GEODIST = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, member1, member2, unit) {
    const args = ["GEODIST", key, member1, member2];
    if (unit) {
      args.push(unit);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return reply === null ? null : Number(reply);
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/GEOHASH.js
var require_GEOHASH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, member) {
    return (0, generic_transformers_1.pushVerdictArguments)(["GEOHASH", key], member);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/GEOPOS.js
var require_GEOPOS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, member) {
    return (0, generic_transformers_1.pushVerdictArguments)(["GEOPOS", key], member);
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return reply.map((coordinates) => coordinates === null ? null : {
      longitude: coordinates[0],
      latitude: coordinates[1]
    });
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/GEORADIUS_RO.js
var require_GEORADIUS_RO = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, coordinates, radius, unit, options) {
    return (0, generic_transformers_1.pushGeoRadiusArguments)(["GEORADIUS_RO"], key, coordinates, radius, unit, options);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/GEORADIUS_RO_WITH.js
var require_GEORADIUS_RO_WITH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var GEORADIUS_RO_1 = require_GEORADIUS_RO();
  var GEORADIUS_RO_2 = require_GEORADIUS_RO();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return GEORADIUS_RO_2.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return GEORADIUS_RO_2.IS_READ_ONLY;
  } });
  function transformArguments(key, coordinates, radius, unit, replyWith, options) {
    const args = (0, GEORADIUS_RO_1.transformArguments)(key, coordinates, radius, unit, options);
    args.push(...replyWith);
    args.preserve = replyWith;
    return args;
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformGeoMembersWithReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/GEORADIUS.js
var require_GEORADIUS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, coordinates, radius, unit, options) {
    return (0, generic_transformers_1.pushGeoRadiusArguments)(["GEORADIUS"], key, coordinates, radius, unit, options);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/GEORADIUS_WITH.js
var require_GEORADIUS_WITH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var GEORADIUS_1 = require_GEORADIUS();
  var GEORADIUS_2 = require_GEORADIUS();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return GEORADIUS_2.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return GEORADIUS_2.IS_READ_ONLY;
  } });
  function transformArguments(key, coordinates, radius, unit, replyWith, options) {
    const args = (0, GEORADIUS_1.transformArguments)(key, coordinates, radius, unit, options);
    args.push(...replyWith);
    args.preserve = replyWith;
    return args;
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformGeoMembersWithReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/GEORADIUSBYMEMBER_RO.js
var require_GEORADIUSBYMEMBER_RO = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, member, radius, unit, options) {
    return (0, generic_transformers_1.pushGeoRadiusArguments)(["GEORADIUSBYMEMBER_RO"], key, member, radius, unit, options);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/GEORADIUSBYMEMBER_RO_WITH.js
var require_GEORADIUSBYMEMBER_RO_WITH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var GEORADIUSBYMEMBER_RO_1 = require_GEORADIUSBYMEMBER_RO();
  var GEORADIUSBYMEMBER_RO_2 = require_GEORADIUSBYMEMBER_RO();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return GEORADIUSBYMEMBER_RO_2.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return GEORADIUSBYMEMBER_RO_2.IS_READ_ONLY;
  } });
  function transformArguments(key, member, radius, unit, replyWith, options) {
    const args = (0, GEORADIUSBYMEMBER_RO_1.transformArguments)(key, member, radius, unit, options);
    args.push(...replyWith);
    args.preserve = replyWith;
    return args;
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformGeoMembersWithReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/GEORADIUSBYMEMBER.js
var require_GEORADIUSBYMEMBER = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, member, radius, unit, options) {
    return (0, generic_transformers_1.pushGeoRadiusArguments)(["GEORADIUSBYMEMBER"], key, member, radius, unit, options);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/GEORADIUSBYMEMBER_WITH.js
var require_GEORADIUSBYMEMBER_WITH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var GEORADIUSBYMEMBER_1 = require_GEORADIUSBYMEMBER();
  var GEORADIUSBYMEMBER_2 = require_GEORADIUSBYMEMBER();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return GEORADIUSBYMEMBER_2.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return GEORADIUSBYMEMBER_2.IS_READ_ONLY;
  } });
  function transformArguments(key, member, radius, unit, replyWith, options) {
    const args = (0, GEORADIUSBYMEMBER_1.transformArguments)(key, member, radius, unit, options);
    args.push(...replyWith);
    args.preserve = replyWith;
    return args;
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformGeoMembersWithReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/GEORADIUSBYMEMBERSTORE.js
var require_GEORADIUSBYMEMBERSTORE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  var GEORADIUSBYMEMBER_1 = require_GEORADIUSBYMEMBER();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return GEORADIUSBYMEMBER_1.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return GEORADIUSBYMEMBER_1.IS_READ_ONLY;
  } });
  function transformArguments(key, member, radius, unit, destination, options) {
    return (0, generic_transformers_1.pushGeoRadiusStoreArguments)(["GEORADIUSBYMEMBER"], key, member, radius, unit, destination, options);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/GEORADIUSSTORE.js
var require_GEORADIUSSTORE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  var GEORADIUS_1 = require_GEORADIUS();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return GEORADIUS_1.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return GEORADIUS_1.IS_READ_ONLY;
  } });
  function transformArguments(key, coordinates, radius, unit, destination, options) {
    return (0, generic_transformers_1.pushGeoRadiusStoreArguments)(["GEORADIUS"], key, coordinates, radius, unit, destination, options);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/GEOSEARCH.js
var require_GEOSEARCH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, from, by, options) {
    return (0, generic_transformers_1.pushGeoSearchArguments)(["GEOSEARCH"], key, from, by, options);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/GEOSEARCH_WITH.js
var require_GEOSEARCH_WITH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var GEOSEARCH_1 = require_GEOSEARCH();
  var GEOSEARCH_2 = require_GEOSEARCH();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return GEOSEARCH_2.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return GEOSEARCH_2.IS_READ_ONLY;
  } });
  function transformArguments(key, from, by, replyWith, options) {
    const args = (0, GEOSEARCH_1.transformArguments)(key, from, by, options);
    args.push(...replyWith);
    args.preserve = replyWith;
    return args;
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformGeoMembersWithReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/GEOSEARCHSTORE.js
var require_GEOSEARCHSTORE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  var GEOSEARCH_1 = require_GEOSEARCH();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return GEOSEARCH_1.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return GEOSEARCH_1.IS_READ_ONLY;
  } });
  function transformArguments(destination, source, from, by, options) {
    const args = (0, generic_transformers_1.pushGeoSearchArguments)(["GEOSEARCHSTORE", destination], source, from, by, options);
    if (options?.STOREDIST) {
      args.push("STOREDIST");
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    if (typeof reply !== "number") {
      throw new TypeError(`https://github.com/redis/redis/issues/9261`);
    }
    return reply;
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/GET.js
var require_GET = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["GET", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/GETBIT.js
var require_GETBIT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, offset) {
    return ["GETBIT", key, offset.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/GETDEL.js
var require_GETDEL = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return ["GETDEL", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/GETEX.js
var require_GETEX = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, mode) {
    const args = ["GETEX", key];
    if ("EX" in mode) {
      args.push("EX", mode.EX.toString());
    } else if ("PX" in mode) {
      args.push("PX", mode.PX.toString());
    } else if ("EXAT" in mode) {
      args.push("EXAT", (0, generic_transformers_1.transformEXAT)(mode.EXAT));
    } else if ("PXAT" in mode) {
      args.push("PXAT", (0, generic_transformers_1.transformPXAT)(mode.PXAT));
    } else {
      args.push("PERSIST");
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/GETRANGE.js
var require_GETRANGE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, start, end) {
    return ["GETRANGE", key, start.toString(), end.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/GETSET.js
var require_GETSET = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, value) {
    return ["GETSET", key, value];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/HDEL.js
var require_HDEL = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, field) {
    return (0, generic_transformers_1.pushVerdictArguments)(["HDEL", key], field);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/HEXISTS.js
var require_HEXISTS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, field) {
    return ["HEXISTS", key, field];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/HEXPIRE.js
var require_HEXPIRE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = exports.HASH_EXPIRATION = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.HASH_EXPIRATION = {
    FIELD_NOT_EXISTS: -2,
    CONDITION_NOT_MET: 0,
    UPDATED: 1,
    DELETED: 2
  };
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, fields, seconds, mode) {
    const args = ["HEXPIRE", key, seconds.toString()];
    if (mode) {
      args.push(mode);
    }
    args.push("FIELDS");
    return (0, generic_transformers_1.pushVerdictArgument)(args, fields);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/HEXPIREAT.js
var require_HEXPIREAT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, fields, timestamp, mode) {
    const args = [
      "HEXPIREAT",
      key,
      (0, generic_transformers_1.transformEXAT)(timestamp)
    ];
    if (mode) {
      args.push(mode);
    }
    args.push("FIELDS");
    return (0, generic_transformers_1.pushVerdictArgument)(args, fields);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/HEXPIRETIME.js
var require_HEXPIRETIME = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = exports.HASH_EXPIRATION_TIME = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.HASH_EXPIRATION_TIME = {
    FIELD_NOT_EXISTS: -2,
    NO_EXPIRATION: -1
  };
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, fields) {
    return (0, generic_transformers_1.pushVerdictArgument)(["HEXPIRETIME", key, "FIELDS"], fields);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/HGET.js
var require_HGET = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, field) {
    return ["HGET", key, field];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/HGETALL.js
var require_HGETALL = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.TRANSFORM_LEGACY_REPLY = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  exports.TRANSFORM_LEGACY_REPLY = true;
  function transformArguments(key) {
    return ["HGETALL", key];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformTuplesReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/HINCRBY.js
var require_HINCRBY = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, field, increment) {
    return ["HINCRBY", key, field, increment.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/HINCRBYFLOAT.js
var require_HINCRBYFLOAT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, field, increment) {
    return ["HINCRBYFLOAT", key, field, increment.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/HKEYS.js
var require_HKEYS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return ["HKEYS", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/HLEN.js
var require_HLEN = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return ["HLEN", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/HMGET.js
var require_HMGET = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, fields) {
    return (0, generic_transformers_1.pushVerdictArguments)(["HMGET", key], fields);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/HPERSIST.js
var require_HPERSIST = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, fields) {
    return (0, generic_transformers_1.pushVerdictArgument)(["HPERSIST", key, "FIELDS"], fields);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/HPEXPIRE.js
var require_HPEXPIRE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, fields, ms, mode) {
    const args = ["HPEXPIRE", key, ms.toString()];
    if (mode) {
      args.push(mode);
    }
    args.push("FIELDS");
    return (0, generic_transformers_1.pushVerdictArgument)(args, fields);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/HPEXPIREAT.js
var require_HPEXPIREAT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, fields, timestamp, mode) {
    const args = ["HPEXPIREAT", key, (0, generic_transformers_1.transformPXAT)(timestamp)];
    if (mode) {
      args.push(mode);
    }
    args.push("FIELDS");
    return (0, generic_transformers_1.pushVerdictArgument)(args, fields);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/HPEXPIRETIME.js
var require_HPEXPIRETIME = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, fields) {
    return (0, generic_transformers_1.pushVerdictArgument)(["HPEXPIRETIME", key, "FIELDS"], fields);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/HPTTL.js
var require_HPTTL = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, fields) {
    return (0, generic_transformers_1.pushVerdictArgument)(["HPTTL", key, "FIELDS"], fields);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/HRANDFIELD.js
var require_HRANDFIELD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["HRANDFIELD", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/HRANDFIELD_COUNT.js
var require_HRANDFIELD_COUNT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var HRANDFIELD_1 = require_HRANDFIELD();
  var HRANDFIELD_2 = require_HRANDFIELD();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return HRANDFIELD_2.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return HRANDFIELD_2.IS_READ_ONLY;
  } });
  function transformArguments(key, count) {
    return [
      ...(0, HRANDFIELD_1.transformArguments)(key),
      count.toString()
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/HRANDFIELD_COUNT_WITHVALUES.js
var require_HRANDFIELD_COUNT_WITHVALUES = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var HRANDFIELD_COUNT_1 = require_HRANDFIELD_COUNT();
  var HRANDFIELD_COUNT_2 = require_HRANDFIELD_COUNT();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return HRANDFIELD_COUNT_2.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return HRANDFIELD_COUNT_2.IS_READ_ONLY;
  } });
  function transformArguments(key, count) {
    return [
      ...(0, HRANDFIELD_COUNT_1.transformArguments)(key, count),
      "WITHVALUES"
    ];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformTuplesReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/HSCAN.js
var require_HSCAN = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, cursor, options) {
    return (0, generic_transformers_1.pushScanArguments)([
      "HSCAN",
      key
    ], cursor, options);
  }
  exports.transformArguments = transformArguments;
  function transformReply([cursor, rawTuples]) {
    const parsedTuples = [];
    for (let i = 0;i < rawTuples.length; i += 2) {
      parsedTuples.push({
        field: rawTuples[i],
        value: rawTuples[i + 1]
      });
    }
    return {
      cursor: Number(cursor),
      tuples: parsedTuples
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/HSCAN_NOVALUES.js
var require_HSCAN_NOVALUES = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var HSCAN_1 = require_HSCAN();
  var HSCAN_2 = require_HSCAN();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return HSCAN_2.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return HSCAN_2.IS_READ_ONLY;
  } });
  function transformArguments(key, cursor, options) {
    const args = (0, HSCAN_1.transformArguments)(key, cursor, options);
    args.push("NOVALUES");
    return args;
  }
  exports.transformArguments = transformArguments;
  function transformReply([cursor, rawData]) {
    return {
      cursor: Number(cursor),
      keys: rawData
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/HSET.js
var require_HSET = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(...[key, value, fieldValue]) {
    const args = ["HSET", key];
    if (typeof value === "string" || typeof value === "number" || Buffer.isBuffer(value)) {
      args.push(convertValue(value), convertValue(fieldValue));
    } else if (value instanceof Map) {
      pushMap(args, value);
    } else if (Array.isArray(value)) {
      pushTuples(args, value);
    } else {
      pushObject(args, value);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  function pushMap(args, map) {
    for (const [key, value] of map.entries()) {
      args.push(convertValue(key), convertValue(value));
    }
  }
  function pushTuples(args, tuples) {
    for (const tuple of tuples) {
      if (Array.isArray(tuple)) {
        pushTuples(args, tuple);
        continue;
      }
      args.push(convertValue(tuple));
    }
  }
  function pushObject(args, object) {
    for (const key of Object.keys(object)) {
      args.push(convertValue(key), convertValue(object[key]));
    }
  }
  function convertValue(value) {
    return typeof value === "number" ? value.toString() : value;
  }
});

// node_modules/@redis/client/dist/lib/commands/HSETNX.js
var require_HSETNX = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, field, value) {
    return ["HSETNX", key, field, value];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/HSTRLEN.js
var require_HSTRLEN = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, field) {
    return ["HSTRLEN", key, field];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/HTTL.js
var require_HTTL = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, fields) {
    return (0, generic_transformers_1.pushVerdictArgument)(["HTTL", key, "FIELDS"], fields);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/HVALS.js
var require_HVALS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return ["HVALS", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/INCR.js
var require_INCR = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return ["INCR", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/INCRBY.js
var require_INCRBY = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, increment) {
    return ["INCRBY", key, increment.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/INCRBYFLOAT.js
var require_INCRBYFLOAT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, increment) {
    return ["INCRBYFLOAT", key, increment.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/LCS.js
var require_LCS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key1, key2) {
    return [
      "LCS",
      key1,
      key2
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/LCS_IDX_WITHMATCHLEN.js
var require_LCS_IDX_WITHMATCHLEN = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  var LCS_1 = require_LCS();
  var LCS_2 = require_LCS();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return LCS_2.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return LCS_2.IS_READ_ONLY;
  } });
  function transformArguments(key1, key2) {
    const args = (0, LCS_1.transformArguments)(key1, key2);
    args.push("IDX", "WITHMATCHLEN");
    return args;
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return {
      matches: reply[1].map(([key1, key2, length]) => ({
        key1: (0, generic_transformers_1.transformRangeReply)(key1),
        key2: (0, generic_transformers_1.transformRangeReply)(key2),
        length
      })),
      length: reply[3]
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/LCS_IDX.js
var require_LCS_IDX = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  var LCS_1 = require_LCS();
  var LCS_2 = require_LCS();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return LCS_2.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return LCS_2.IS_READ_ONLY;
  } });
  function transformArguments(key1, key2) {
    const args = (0, LCS_1.transformArguments)(key1, key2);
    args.push("IDX");
    return args;
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return {
      matches: reply[1].map(([key1, key2]) => ({
        key1: (0, generic_transformers_1.transformRangeReply)(key1),
        key2: (0, generic_transformers_1.transformRangeReply)(key2)
      })),
      length: reply[3]
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/LCS_LEN.js
var require_LCS_LEN = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var LCS_1 = require_LCS();
  var LCS_2 = require_LCS();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return LCS_2.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return LCS_2.IS_READ_ONLY;
  } });
  function transformArguments(key1, key2) {
    const args = (0, LCS_1.transformArguments)(key1, key2);
    args.push("LEN");
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/LINDEX.js
var require_LINDEX = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, index) {
    return ["LINDEX", key, index.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/LINSERT.js
var require_LINSERT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, position, pivot, element) {
    return [
      "LINSERT",
      key,
      position,
      pivot,
      element
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/LLEN.js
var require_LLEN = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["LLEN", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/LMOVE.js
var require_LMOVE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(source, destination, sourceSide, destinationSide) {
    return [
      "LMOVE",
      source,
      destination,
      sourceSide,
      destinationSide
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/LPOP_COUNT.js
var require_LPOP_COUNT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, count) {
    return ["LPOP", key, count.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/LPOP.js
var require_LPOP = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return ["LPOP", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/LPOS.js
var require_LPOS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, element, options) {
    const args = ["LPOS", key, element];
    if (typeof options?.RANK === "number") {
      args.push("RANK", options.RANK.toString());
    }
    if (typeof options?.MAXLEN === "number") {
      args.push("MAXLEN", options.MAXLEN.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/LPOS_COUNT.js
var require_LPOS_COUNT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var LPOS_1 = require_LPOS();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return LPOS_1.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return LPOS_1.IS_READ_ONLY;
  } });
  function transformArguments(key, element, count, options) {
    const args = ["LPOS", key, element];
    if (typeof options?.RANK === "number") {
      args.push("RANK", options.RANK.toString());
    }
    args.push("COUNT", count.toString());
    if (typeof options?.MAXLEN === "number") {
      args.push("MAXLEN", options.MAXLEN.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/LPUSH.js
var require_LPUSH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, elements) {
    return (0, generic_transformers_1.pushVerdictArguments)(["LPUSH", key], elements);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/LPUSHX.js
var require_LPUSHX = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, element) {
    return (0, generic_transformers_1.pushVerdictArguments)(["LPUSHX", key], element);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/LRANGE.js
var require_LRANGE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, start, stop) {
    return [
      "LRANGE",
      key,
      start.toString(),
      stop.toString()
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/LREM.js
var require_LREM = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, count, element) {
    return [
      "LREM",
      key,
      count.toString(),
      element
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/LSET.js
var require_LSET = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, index, element) {
    return [
      "LSET",
      key,
      index.toString(),
      element
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/LTRIM.js
var require_LTRIM = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, start, stop) {
    return [
      "LTRIM",
      key,
      start.toString(),
      stop.toString()
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/MGET.js
var require_MGET = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(keys) {
    return ["MGET", ...keys];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/MIGRATE.js
var require_MIGRATE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(host, port, key, destinationDb, timeout, options) {
    const args = ["MIGRATE", host, port.toString()], isKeyArray = Array.isArray(key);
    if (isKeyArray) {
      args.push("");
    } else {
      args.push(key);
    }
    args.push(destinationDb.toString(), timeout.toString());
    if (options?.COPY) {
      args.push("COPY");
    }
    if (options?.REPLACE) {
      args.push("REPLACE");
    }
    if (options?.AUTH) {
      if (options.AUTH.username) {
        args.push("AUTH2", options.AUTH.username, options.AUTH.password);
      } else {
        args.push("AUTH", options.AUTH.password);
      }
    }
    if (isKeyArray) {
      args.push("KEYS", ...key);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/MSET.js
var require_MSET = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(toSet) {
    const args = ["MSET"];
    if (Array.isArray(toSet)) {
      args.push(...toSet.flat());
    } else {
      for (const key of Object.keys(toSet)) {
        args.push(key, toSet[key]);
      }
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/MSETNX.js
var require_MSETNX = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(toSet) {
    const args = ["MSETNX"];
    if (Array.isArray(toSet)) {
      args.push(...toSet.flat());
    } else {
      for (const key of Object.keys(toSet)) {
        args.push(key, toSet[key]);
      }
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/OBJECT_ENCODING.js
var require_OBJECT_ENCODING = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 2;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["OBJECT", "ENCODING", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/OBJECT_FREQ.js
var require_OBJECT_FREQ = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 2;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["OBJECT", "FREQ", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/OBJECT_IDLETIME.js
var require_OBJECT_IDLETIME = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 2;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["OBJECT", "IDLETIME", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/OBJECT_REFCOUNT.js
var require_OBJECT_REFCOUNT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 2;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["OBJECT", "REFCOUNT", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/PERSIST.js
var require_PERSIST = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return ["PERSIST", key];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/PEXPIRE.js
var require_PEXPIRE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, milliseconds, mode) {
    const args = ["PEXPIRE", key, milliseconds.toString()];
    if (mode) {
      args.push(mode);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/PEXPIREAT.js
var require_PEXPIREAT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, millisecondsTimestamp, mode) {
    const args = [
      "PEXPIREAT",
      key,
      (0, generic_transformers_1.transformPXAT)(millisecondsTimestamp)
    ];
    if (mode) {
      args.push(mode);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_2 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_2.transformBooleanReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/PEXPIRETIME.js
var require_PEXPIRETIME = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return ["PEXPIRETIME", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/PFADD.js
var require_PFADD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, element) {
    return (0, generic_transformers_1.pushVerdictArguments)(["PFADD", key], element);
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_2 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_2.transformBooleanReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/PFCOUNT.js
var require_PFCOUNT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return (0, generic_transformers_1.pushVerdictArguments)(["PFCOUNT"], key);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/PFMERGE.js
var require_PFMERGE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(destination, source) {
    return (0, generic_transformers_1.pushVerdictArguments)(["PFMERGE", destination], source);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/PSETEX.js
var require_PSETEX = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, milliseconds, value) {
    return [
      "PSETEX",
      key,
      milliseconds.toString(),
      value
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/PTTL.js
var require_PTTL = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["PTTL", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/PUBLISH.js
var require_PUBLISH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments(channel, message) {
    return ["PUBLISH", channel, message];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/RENAME.js
var require_RENAME = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, newKey) {
    return ["RENAME", key, newKey];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/RENAMENX.js
var require_RENAMENX = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, newKey) {
    return ["RENAMENX", key, newKey];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/RESTORE.js
var require_RESTORE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, ttl, serializedValue, options) {
    const args = ["RESTORE", key, ttl.toString(), serializedValue];
    if (options?.REPLACE) {
      args.push("REPLACE");
    }
    if (options?.ABSTTL) {
      args.push("ABSTTL");
    }
    if (options?.IDLETIME) {
      args.push("IDLETIME", options.IDLETIME.toString());
    }
    if (options?.FREQ) {
      args.push("FREQ", options.FREQ.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/RPOP_COUNT.js
var require_RPOP_COUNT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, count) {
    return ["RPOP", key, count.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/RPOP.js
var require_RPOP = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return ["RPOP", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/RPOPLPUSH.js
var require_RPOPLPUSH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(source, destination) {
    return ["RPOPLPUSH", source, destination];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/RPUSH.js
var require_RPUSH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, element) {
    return (0, generic_transformers_1.pushVerdictArguments)(["RPUSH", key], element);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/RPUSHX.js
var require_RPUSHX = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, element) {
    return (0, generic_transformers_1.pushVerdictArguments)(["RPUSHX", key], element);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SADD.js
var require_SADD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, members) {
    return (0, generic_transformers_1.pushVerdictArguments)(["SADD", key], members);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SCARD.js
var require_SCARD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return ["SCARD", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SDIFF.js
var require_SDIFF = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(keys) {
    return (0, generic_transformers_1.pushVerdictArguments)(["SDIFF"], keys);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SDIFFSTORE.js
var require_SDIFFSTORE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(destination, keys) {
    return (0, generic_transformers_1.pushVerdictArguments)(["SDIFFSTORE", destination], keys);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SET.js
var require_SET = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, value, options) {
    const args = [
      "SET",
      key,
      typeof value === "number" ? value.toString() : value
    ];
    if (options?.EX !== undefined) {
      args.push("EX", options.EX.toString());
    } else if (options?.PX !== undefined) {
      args.push("PX", options.PX.toString());
    } else if (options?.EXAT !== undefined) {
      args.push("EXAT", options.EXAT.toString());
    } else if (options?.PXAT !== undefined) {
      args.push("PXAT", options.PXAT.toString());
    } else if (options?.KEEPTTL) {
      args.push("KEEPTTL");
    }
    if (options?.NX) {
      args.push("NX");
    } else if (options?.XX) {
      args.push("XX");
    }
    if (options?.GET) {
      args.push("GET");
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SETBIT.js
var require_SETBIT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, offset, value) {
    return ["SETBIT", key, offset.toString(), value.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SETEX.js
var require_SETEX = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, seconds, value) {
    return [
      "SETEX",
      key,
      seconds.toString(),
      value
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SETNX.js
var require_SETNX = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, value) {
    return ["SETNX", key, value];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/SETRANGE.js
var require_SETRANGE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, offset, value) {
    return ["SETRANGE", key, offset.toString(), value];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SINTER.js
var require_SINTER = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(keys) {
    return (0, generic_transformers_1.pushVerdictArguments)(["SINTER"], keys);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SINTERCARD.js
var require_SINTERCARD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 2;
  exports.IS_READ_ONLY = true;
  function transformArguments(keys, limit) {
    const args = (0, generic_transformers_1.pushVerdictArgument)(["SINTERCARD"], keys);
    if (limit) {
      args.push("LIMIT", limit.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SINTERSTORE.js
var require_SINTERSTORE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(destination, keys) {
    return (0, generic_transformers_1.pushVerdictArguments)(["SINTERSTORE", destination], keys);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SISMEMBER.js
var require_SISMEMBER = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, member) {
    return ["SISMEMBER", key, member];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/SMEMBERS.js
var require_SMEMBERS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return ["SMEMBERS", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SMISMEMBER.js
var require_SMISMEMBER = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, members) {
    return ["SMISMEMBER", key, ...members];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanArrayReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/SMOVE.js
var require_SMOVE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(source, destination, member) {
    return ["SMOVE", source, destination, member];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/SORT_RO.js
var require_SORT_RO = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, options) {
    return (0, generic_transformers_1.pushSortArguments)(["SORT_RO", key], options);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SORT.js
var require_SORT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, options) {
    return (0, generic_transformers_1.pushSortArguments)(["SORT", key], options);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SORT_STORE.js
var require_SORT_STORE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var SORT_1 = require_SORT();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(source, destination, options) {
    const args = (0, SORT_1.transformArguments)(source, options);
    args.push("STORE", destination);
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SPOP.js
var require_SPOP = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, count) {
    const args = ["SPOP", key];
    if (typeof count === "number") {
      args.push(count.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SPUBLISH.js
var require_SPUBLISH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(channel, message) {
    return ["SPUBLISH", channel, message];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SRANDMEMBER.js
var require_SRANDMEMBER = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return ["SRANDMEMBER", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SRANDMEMBER_COUNT.js
var require_SRANDMEMBER_COUNT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var SRANDMEMBER_1 = require_SRANDMEMBER();
  var SRANDMEMBER_2 = require_SRANDMEMBER();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return SRANDMEMBER_2.FIRST_KEY_INDEX;
  } });
  function transformArguments(key, count) {
    return [
      ...(0, SRANDMEMBER_1.transformArguments)(key),
      count.toString()
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SREM.js
var require_SREM = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, members) {
    return (0, generic_transformers_1.pushVerdictArguments)(["SREM", key], members);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SSCAN.js
var require_SSCAN = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, cursor, options) {
    return (0, generic_transformers_1.pushScanArguments)([
      "SSCAN",
      key
    ], cursor, options);
  }
  exports.transformArguments = transformArguments;
  function transformReply([cursor, members]) {
    return {
      cursor: Number(cursor),
      members
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/STRLEN.js
var require_STRLEN = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["STRLEN", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SUNION.js
var require_SUNION = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(keys) {
    return (0, generic_transformers_1.pushVerdictArguments)(["SUNION"], keys);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SUNIONSTORE.js
var require_SUNIONSTORE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(destination, keys) {
    return (0, generic_transformers_1.pushVerdictArguments)(["SUNIONSTORE", destination], keys);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/TOUCH.js
var require_TOUCH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return (0, generic_transformers_1.pushVerdictArguments)(["TOUCH"], key);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/TTL.js
var require_TTL = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["TTL", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/TYPE.js
var require_TYPE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["TYPE", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/UNLINK.js
var require_UNLINK = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return (0, generic_transformers_1.pushVerdictArguments)(["UNLINK"], key);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/WATCH.js
var require_WATCH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return (0, generic_transformers_1.pushVerdictArguments)(["WATCH"], key);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/XACK.js
var require_XACK = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, group, id) {
    return (0, generic_transformers_1.pushVerdictArguments)(["XACK", key, group], id);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/XADD.js
var require_XADD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, id, message, options) {
    const args = ["XADD", key];
    if (options?.NOMKSTREAM) {
      args.push("NOMKSTREAM");
    }
    if (options?.TRIM) {
      if (options.TRIM.strategy) {
        args.push(options.TRIM.strategy);
      }
      if (options.TRIM.strategyModifier) {
        args.push(options.TRIM.strategyModifier);
      }
      args.push(options.TRIM.threshold.toString());
      if (options.TRIM.limit) {
        args.push("LIMIT", options.TRIM.limit.toString());
      }
    }
    args.push(id);
    for (const [key2, value] of Object.entries(message)) {
      args.push(key2, value);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/XAUTOCLAIM.js
var require_XAUTOCLAIM = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, group, consumer, minIdleTime, start, options) {
    const args = ["XAUTOCLAIM", key, group, consumer, minIdleTime.toString(), start];
    if (options?.COUNT) {
      args.push("COUNT", options.COUNT.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return {
      nextId: reply[0],
      messages: (0, generic_transformers_1.transformStreamMessagesNullReply)(reply[1])
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/XAUTOCLAIM_JUSTID.js
var require_XAUTOCLAIM_JUSTID = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var XAUTOCLAIM_1 = require_XAUTOCLAIM();
  var XAUTOCLAIM_2 = require_XAUTOCLAIM();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return XAUTOCLAIM_2.FIRST_KEY_INDEX;
  } });
  function transformArguments(...args) {
    return [
      ...(0, XAUTOCLAIM_1.transformArguments)(...args),
      "JUSTID"
    ];
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return {
      nextId: reply[0],
      messages: reply[1]
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/XCLAIM.js
var require_XCLAIM = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, group, consumer, minIdleTime, id, options) {
    const args = (0, generic_transformers_1.pushVerdictArguments)(["XCLAIM", key, group, consumer, minIdleTime.toString()], id);
    if (options?.IDLE) {
      args.push("IDLE", options.IDLE.toString());
    }
    if (options?.TIME) {
      args.push("TIME", (typeof options.TIME === "number" ? options.TIME : options.TIME.getTime()).toString());
    }
    if (options?.RETRYCOUNT) {
      args.push("RETRYCOUNT", options.RETRYCOUNT.toString());
    }
    if (options?.FORCE) {
      args.push("FORCE");
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_2 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_2.transformStreamMessagesNullReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/XCLAIM_JUSTID.js
var require_XCLAIM_JUSTID = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var XCLAIM_1 = require_XCLAIM();
  var XCLAIM_2 = require_XCLAIM();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return XCLAIM_2.FIRST_KEY_INDEX;
  } });
  function transformArguments(...args) {
    return [
      ...(0, XCLAIM_1.transformArguments)(...args),
      "JUSTID"
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/XDEL.js
var require_XDEL = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, id) {
    return (0, generic_transformers_1.pushVerdictArguments)(["XDEL", key], id);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/XGROUP_CREATE.js
var require_XGROUP_CREATE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 2;
  function transformArguments(key, group, id, options) {
    const args = ["XGROUP", "CREATE", key, group, id];
    if (options?.MKSTREAM) {
      args.push("MKSTREAM");
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/XGROUP_CREATECONSUMER.js
var require_XGROUP_CREATECONSUMER = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 2;
  function transformArguments(key, group, consumer) {
    return ["XGROUP", "CREATECONSUMER", key, group, consumer];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/XGROUP_DELCONSUMER.js
var require_XGROUP_DELCONSUMER = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 2;
  function transformArguments(key, group, consumer) {
    return ["XGROUP", "DELCONSUMER", key, group, consumer];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/XGROUP_DESTROY.js
var require_XGROUP_DESTROY = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 2;
  function transformArguments(key, group) {
    return ["XGROUP", "DESTROY", key, group];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/XGROUP_SETID.js
var require_XGROUP_SETID = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 2;
  function transformArguments(key, group, id) {
    return ["XGROUP", "SETID", key, group, id];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/XINFO_CONSUMERS.js
var require_XINFO_CONSUMERS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 2;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, group) {
    return ["XINFO", "CONSUMERS", key, group];
  }
  exports.transformArguments = transformArguments;
  function transformReply(rawReply) {
    return rawReply.map((consumer) => ({
      name: consumer[1],
      pending: consumer[3],
      idle: consumer[5],
      inactive: consumer[7]
    }));
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/XINFO_GROUPS.js
var require_XINFO_GROUPS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 2;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["XINFO", "GROUPS", key];
  }
  exports.transformArguments = transformArguments;
  function transformReply(rawReply) {
    return rawReply.map((group) => ({
      name: group[1],
      consumers: group[3],
      pending: group[5],
      lastDeliveredId: group[7]
    }));
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/XINFO_STREAM.js
var require_XINFO_STREAM = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 2;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["XINFO", "STREAM", key];
  }
  exports.transformArguments = transformArguments;
  function transformReply(rawReply) {
    const parsedReply = {};
    for (let i = 0;i < rawReply.length; i += 2) {
      switch (rawReply[i]) {
        case "length":
          parsedReply.length = rawReply[i + 1];
          break;
        case "radix-tree-keys":
          parsedReply.radixTreeKeys = rawReply[i + 1];
          break;
        case "radix-tree-nodes":
          parsedReply.radixTreeNodes = rawReply[i + 1];
          break;
        case "groups":
          parsedReply.groups = rawReply[i + 1];
          break;
        case "last-generated-id":
          parsedReply.lastGeneratedId = rawReply[i + 1];
          break;
        case "first-entry":
          parsedReply.firstEntry = rawReply[i + 1] ? {
            id: rawReply[i + 1][0],
            message: (0, generic_transformers_1.transformTuplesReply)(rawReply[i + 1][1])
          } : null;
          break;
        case "last-entry":
          parsedReply.lastEntry = rawReply[i + 1] ? {
            id: rawReply[i + 1][0],
            message: (0, generic_transformers_1.transformTuplesReply)(rawReply[i + 1][1])
          } : null;
          break;
      }
    }
    return parsedReply;
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/XLEN.js
var require_XLEN = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["XLEN", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/XPENDING_RANGE.js
var require_XPENDING_RANGE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, group, start, end, count, options) {
    const args = ["XPENDING", key, group];
    if (options?.IDLE) {
      args.push("IDLE", options.IDLE.toString());
    }
    args.push(start, end, count.toString());
    if (options?.consumer) {
      args.push(options.consumer);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return reply.map(([id, owner, millisecondsSinceLastDelivery, deliveriesCounter]) => ({
      id,
      owner,
      millisecondsSinceLastDelivery,
      deliveriesCounter
    }));
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/XPENDING.js
var require_XPENDING = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, group) {
    return ["XPENDING", key, group];
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return {
      pending: reply[0],
      firstId: reply[1],
      lastId: reply[2],
      consumers: reply[3] === null ? null : reply[3].map(([name, deliveriesCounter]) => ({
        name,
        deliveriesCounter: Number(deliveriesCounter)
      }))
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/XRANGE.js
var require_XRANGE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, start, end, options) {
    const args = ["XRANGE", key, start, end];
    if (options?.COUNT) {
      args.push("COUNT", options.COUNT.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformStreamMessagesReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/XREAD.js
var require_XREAD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var FIRST_KEY_INDEX = (streams) => {
    return Array.isArray(streams) ? streams[0].key : streams.key;
  };
  exports.FIRST_KEY_INDEX = FIRST_KEY_INDEX;
  exports.IS_READ_ONLY = true;
  function transformArguments(streams, options) {
    const args = ["XREAD"];
    if (options?.COUNT) {
      args.push("COUNT", options.COUNT.toString());
    }
    if (typeof options?.BLOCK === "number") {
      args.push("BLOCK", options.BLOCK.toString());
    }
    args.push("STREAMS");
    const streamsArray = Array.isArray(streams) ? streams : [streams], argsLength = args.length;
    for (let i = 0;i < streamsArray.length; i++) {
      const stream = streamsArray[i];
      args[argsLength + i] = stream.key;
      args[argsLength + streamsArray.length + i] = stream.id;
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformStreamsMessagesReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/XREADGROUP.js
var require_XREADGROUP = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var FIRST_KEY_INDEX = (_group, _consumer, streams) => {
    return Array.isArray(streams) ? streams[0].key : streams.key;
  };
  exports.FIRST_KEY_INDEX = FIRST_KEY_INDEX;
  exports.IS_READ_ONLY = true;
  function transformArguments(group, consumer, streams, options) {
    const args = ["XREADGROUP", "GROUP", group, consumer];
    if (options?.COUNT) {
      args.push("COUNT", options.COUNT.toString());
    }
    if (typeof options?.BLOCK === "number") {
      args.push("BLOCK", options.BLOCK.toString());
    }
    if (options?.NOACK) {
      args.push("NOACK");
    }
    args.push("STREAMS");
    const streamsArray = Array.isArray(streams) ? streams : [streams], argsLength = args.length;
    for (let i = 0;i < streamsArray.length; i++) {
      const stream = streamsArray[i];
      args[argsLength + i] = stream.key;
      args[argsLength + streamsArray.length + i] = stream.id;
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformStreamsMessagesReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/XREVRANGE.js
var require_XREVRANGE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, start, end, options) {
    const args = ["XREVRANGE", key, start, end];
    if (options?.COUNT) {
      args.push("COUNT", options.COUNT.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformStreamMessagesReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/XSETID.js
var require_XSETID = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, lastId, options) {
    const args = ["XSETID", key, lastId];
    if (options?.ENTRIESADDED) {
      args.push("ENTRIESADDED", options.ENTRIESADDED.toString());
    }
    if (options?.MAXDELETEDID) {
      args.push("MAXDELETEDID", options.MAXDELETEDID);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/XTRIM.js
var require_XTRIM = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, strategy, threshold, options) {
    const args = ["XTRIM", key, strategy];
    if (options?.strategyModifier) {
      args.push(options.strategyModifier);
    }
    args.push(threshold.toString());
    if (options?.LIMIT) {
      args.push("LIMIT", options.LIMIT.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ZADD.js
var require_ZADD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, members, options) {
    const args = ["ZADD", key];
    if (options?.NX) {
      args.push("NX");
    } else {
      if (options?.XX) {
        args.push("XX");
      }
      if (options?.GT) {
        args.push("GT");
      } else if (options?.LT) {
        args.push("LT");
      }
    }
    if (options?.CH) {
      args.push("CH");
    }
    if (options?.INCR) {
      args.push("INCR");
    }
    for (const { score, value } of Array.isArray(members) ? members : [members]) {
      args.push((0, generic_transformers_1.transformNumberInfinityArgument)(score), value);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_2 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_2.transformNumberInfinityReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/ZCARD.js
var require_ZCARD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["ZCARD", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ZCOUNT.js
var require_ZCOUNT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, min, max) {
    return [
      "ZCOUNT",
      key,
      (0, generic_transformers_1.transformStringNumberInfinityArgument)(min),
      (0, generic_transformers_1.transformStringNumberInfinityArgument)(max)
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ZDIFF.js
var require_ZDIFF = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 2;
  exports.IS_READ_ONLY = true;
  function transformArguments(keys) {
    return (0, generic_transformers_1.pushVerdictArgument)(["ZDIFF"], keys);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ZDIFF_WITHSCORES.js
var require_ZDIFF_WITHSCORES = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var ZDIFF_1 = require_ZDIFF();
  var ZDIFF_2 = require_ZDIFF();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return ZDIFF_2.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return ZDIFF_2.IS_READ_ONLY;
  } });
  function transformArguments(...args) {
    return [
      ...(0, ZDIFF_1.transformArguments)(...args),
      "WITHSCORES"
    ];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformSortedSetWithScoresReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/ZDIFFSTORE.js
var require_ZDIFFSTORE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(destination, keys) {
    return (0, generic_transformers_1.pushVerdictArgument)(["ZDIFFSTORE", destination], keys);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ZINCRBY.js
var require_ZINCRBY = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, increment, member) {
    return [
      "ZINCRBY",
      key,
      (0, generic_transformers_1.transformNumberInfinityArgument)(increment),
      member
    ];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_2 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_2.transformNumberInfinityReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/ZINTER.js
var require_ZINTER = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 2;
  exports.IS_READ_ONLY = true;
  function transformArguments(keys, options) {
    const args = (0, generic_transformers_1.pushVerdictArgument)(["ZINTER"], keys);
    if (options?.WEIGHTS) {
      args.push("WEIGHTS", ...options.WEIGHTS.map((weight) => weight.toString()));
    }
    if (options?.AGGREGATE) {
      args.push("AGGREGATE", options.AGGREGATE);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ZINTER_WITHSCORES.js
var require_ZINTER_WITHSCORES = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var ZINTER_1 = require_ZINTER();
  var ZINTER_2 = require_ZINTER();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return ZINTER_2.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return ZINTER_2.IS_READ_ONLY;
  } });
  function transformArguments(...args) {
    return [
      ...(0, ZINTER_1.transformArguments)(...args),
      "WITHSCORES"
    ];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformSortedSetWithScoresReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/ZINTERCARD.js
var require_ZINTERCARD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 2;
  exports.IS_READ_ONLY = true;
  function transformArguments(keys, limit) {
    const args = (0, generic_transformers_1.pushVerdictArgument)(["ZINTERCARD"], keys);
    if (limit) {
      args.push("LIMIT", limit.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ZINTERSTORE.js
var require_ZINTERSTORE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(destination, keys, options) {
    const args = (0, generic_transformers_1.pushVerdictArgument)(["ZINTERSTORE", destination], keys);
    if (options?.WEIGHTS) {
      args.push("WEIGHTS", ...options.WEIGHTS.map((weight) => weight.toString()));
    }
    if (options?.AGGREGATE) {
      args.push("AGGREGATE", options.AGGREGATE);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ZLEXCOUNT.js
var require_ZLEXCOUNT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, min, max) {
    return [
      "ZLEXCOUNT",
      key,
      min,
      max
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ZMSCORE.js
var require_ZMSCORE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, member) {
    return (0, generic_transformers_1.pushVerdictArguments)(["ZMSCORE", key], member);
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_2 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_2.transformNumberInfinityNullArrayReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/ZPOPMAX.js
var require_ZPOPMAX = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return [
      "ZPOPMAX",
      key
    ];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformSortedSetMemberNullReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/ZPOPMAX_COUNT.js
var require_ZPOPMAX_COUNT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var ZPOPMAX_1 = require_ZPOPMAX();
  var ZPOPMAX_2 = require_ZPOPMAX();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return ZPOPMAX_2.FIRST_KEY_INDEX;
  } });
  function transformArguments(key, count) {
    return [
      ...(0, ZPOPMAX_1.transformArguments)(key),
      count.toString()
    ];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformSortedSetWithScoresReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/ZPOPMIN.js
var require_ZPOPMIN = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return [
      "ZPOPMIN",
      key
    ];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformSortedSetMemberNullReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/ZPOPMIN_COUNT.js
var require_ZPOPMIN_COUNT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var ZPOPMIN_1 = require_ZPOPMIN();
  var ZPOPMIN_2 = require_ZPOPMIN();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return ZPOPMIN_2.FIRST_KEY_INDEX;
  } });
  function transformArguments(key, count) {
    return [
      ...(0, ZPOPMIN_1.transformArguments)(key),
      count.toString()
    ];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformSortedSetWithScoresReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/ZRANDMEMBER.js
var require_ZRANDMEMBER = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["ZRANDMEMBER", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ZRANDMEMBER_COUNT.js
var require_ZRANDMEMBER_COUNT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var ZRANDMEMBER_1 = require_ZRANDMEMBER();
  var ZRANDMEMBER_2 = require_ZRANDMEMBER();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return ZRANDMEMBER_2.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return ZRANDMEMBER_2.IS_READ_ONLY;
  } });
  function transformArguments(key, count) {
    return [
      ...(0, ZRANDMEMBER_1.transformArguments)(key),
      count.toString()
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ZRANDMEMBER_COUNT_WITHSCORES.js
var require_ZRANDMEMBER_COUNT_WITHSCORES = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var ZRANDMEMBER_COUNT_1 = require_ZRANDMEMBER_COUNT();
  var ZRANDMEMBER_COUNT_2 = require_ZRANDMEMBER_COUNT();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return ZRANDMEMBER_COUNT_2.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return ZRANDMEMBER_COUNT_2.IS_READ_ONLY;
  } });
  function transformArguments(...args) {
    return [
      ...(0, ZRANDMEMBER_COUNT_1.transformArguments)(...args),
      "WITHSCORES"
    ];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformSortedSetWithScoresReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/ZRANGE.js
var require_ZRANGE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, min, max, options) {
    const args = [
      "ZRANGE",
      key,
      (0, generic_transformers_1.transformStringNumberInfinityArgument)(min),
      (0, generic_transformers_1.transformStringNumberInfinityArgument)(max)
    ];
    switch (options?.BY) {
      case "SCORE":
        args.push("BYSCORE");
        break;
      case "LEX":
        args.push("BYLEX");
        break;
    }
    if (options?.REV) {
      args.push("REV");
    }
    if (options?.LIMIT) {
      args.push("LIMIT", options.LIMIT.offset.toString(), options.LIMIT.count.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ZRANGE_WITHSCORES.js
var require_ZRANGE_WITHSCORES = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var ZRANGE_1 = require_ZRANGE();
  var ZRANGE_2 = require_ZRANGE();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return ZRANGE_2.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return ZRANGE_2.IS_READ_ONLY;
  } });
  function transformArguments(...args) {
    return [
      ...(0, ZRANGE_1.transformArguments)(...args),
      "WITHSCORES"
    ];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformSortedSetWithScoresReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/ZRANGEBYLEX.js
var require_ZRANGEBYLEX = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, min, max, options) {
    const args = [
      "ZRANGEBYLEX",
      key,
      (0, generic_transformers_1.transformStringNumberInfinityArgument)(min),
      (0, generic_transformers_1.transformStringNumberInfinityArgument)(max)
    ];
    if (options?.LIMIT) {
      args.push("LIMIT", options.LIMIT.offset.toString(), options.LIMIT.count.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ZRANGEBYSCORE.js
var require_ZRANGEBYSCORE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, min, max, options) {
    const args = [
      "ZRANGEBYSCORE",
      key,
      (0, generic_transformers_1.transformStringNumberInfinityArgument)(min),
      (0, generic_transformers_1.transformStringNumberInfinityArgument)(max)
    ];
    if (options?.LIMIT) {
      args.push("LIMIT", options.LIMIT.offset.toString(), options.LIMIT.count.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ZRANGEBYSCORE_WITHSCORES.js
var require_ZRANGEBYSCORE_WITHSCORES = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var ZRANGEBYSCORE_1 = require_ZRANGEBYSCORE();
  var ZRANGEBYSCORE_2 = require_ZRANGEBYSCORE();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return ZRANGEBYSCORE_2.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return ZRANGEBYSCORE_2.IS_READ_ONLY;
  } });
  function transformArguments(key, min, max, options) {
    return [
      ...(0, ZRANGEBYSCORE_1.transformArguments)(key, min, max, options),
      "WITHSCORES"
    ];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformSortedSetWithScoresReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/ZRANGESTORE.js
var require_ZRANGESTORE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(dst, src, min, max, options) {
    const args = [
      "ZRANGESTORE",
      dst,
      src,
      (0, generic_transformers_1.transformStringNumberInfinityArgument)(min),
      (0, generic_transformers_1.transformStringNumberInfinityArgument)(max)
    ];
    switch (options?.BY) {
      case "SCORE":
        args.push("BYSCORE");
        break;
      case "LEX":
        args.push("BYLEX");
        break;
    }
    if (options?.REV) {
      args.push("REV");
    }
    if (options?.LIMIT) {
      args.push("LIMIT", options.LIMIT.offset.toString(), options.LIMIT.count.toString());
    }
    if (options?.WITHSCORES) {
      args.push("WITHSCORES");
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    if (typeof reply !== "number") {
      throw new TypeError(`Upgrade to Redis 6.2.5 and up (https://github.com/redis/redis/pull/9089)`);
    }
    return reply;
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/ZRANK.js
var require_ZRANK = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, member) {
    return ["ZRANK", key, member];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ZREM.js
var require_ZREM = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, member) {
    return (0, generic_transformers_1.pushVerdictArguments)(["ZREM", key], member);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ZREMRANGEBYLEX.js
var require_ZREMRANGEBYLEX = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, min, max) {
    return [
      "ZREMRANGEBYLEX",
      key,
      (0, generic_transformers_1.transformStringNumberInfinityArgument)(min),
      (0, generic_transformers_1.transformStringNumberInfinityArgument)(max)
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ZREMRANGEBYRANK.js
var require_ZREMRANGEBYRANK = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, start, stop) {
    return ["ZREMRANGEBYRANK", key, start.toString(), stop.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ZREMRANGEBYSCORE.js
var require_ZREMRANGEBYSCORE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, min, max) {
    return [
      "ZREMRANGEBYSCORE",
      key,
      (0, generic_transformers_1.transformStringNumberInfinityArgument)(min),
      (0, generic_transformers_1.transformStringNumberInfinityArgument)(max)
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ZREVRANK.js
var require_ZREVRANK = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, member) {
    return ["ZREVRANK", key, member];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ZSCAN.js
var require_ZSCAN = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, cursor, options) {
    return (0, generic_transformers_1.pushScanArguments)([
      "ZSCAN",
      key
    ], cursor, options);
  }
  exports.transformArguments = transformArguments;
  function transformReply([cursor, rawMembers]) {
    const parsedMembers = [];
    for (let i = 0;i < rawMembers.length; i += 2) {
      parsedMembers.push({
        value: rawMembers[i],
        score: (0, generic_transformers_1.transformNumberInfinityReply)(rawMembers[i + 1])
      });
    }
    return {
      cursor: Number(cursor),
      members: parsedMembers
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/ZSCORE.js
var require_ZSCORE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, member) {
    return ["ZSCORE", key, member];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformNumberInfinityNullReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/ZUNION.js
var require_ZUNION = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 2;
  exports.IS_READ_ONLY = true;
  function transformArguments(keys, options) {
    const args = (0, generic_transformers_1.pushVerdictArgument)(["ZUNION"], keys);
    if (options?.WEIGHTS) {
      args.push("WEIGHTS", ...options.WEIGHTS.map((weight) => weight.toString()));
    }
    if (options?.AGGREGATE) {
      args.push("AGGREGATE", options.AGGREGATE);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ZUNION_WITHSCORES.js
var require_ZUNION_WITHSCORES = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var ZUNION_1 = require_ZUNION();
  var ZUNION_2 = require_ZUNION();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return ZUNION_2.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return ZUNION_2.IS_READ_ONLY;
  } });
  function transformArguments(...args) {
    return [
      ...(0, ZUNION_1.transformArguments)(...args),
      "WITHSCORES"
    ];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformSortedSetWithScoresReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/ZUNIONSTORE.js
var require_ZUNIONSTORE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(destination, keys, options) {
    const args = (0, generic_transformers_1.pushVerdictArgument)(["ZUNIONSTORE", destination], keys);
    if (options?.WEIGHTS) {
      args.push("WEIGHTS", ...options.WEIGHTS.map((weight) => weight.toString()));
    }
    if (options?.AGGREGATE) {
      args.push("AGGREGATE", options.AGGREGATE);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/cluster/commands.js
var require_commands = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var APPEND = require_APPEND();
  var BITCOUNT = require_BITCOUNT();
  var BITFIELD_RO = require_BITFIELD_RO();
  var BITFIELD = require_BITFIELD();
  var BITOP = require_BITOP();
  var BITPOS = require_BITPOS();
  var BLMOVE = require_BLMOVE();
  var BLMPOP = require_BLMPOP();
  var BLPOP = require_BLPOP();
  var BRPOP = require_BRPOP();
  var BRPOPLPUSH = require_BRPOPLPUSH();
  var BZMPOP = require_BZMPOP();
  var BZPOPMAX = require_BZPOPMAX();
  var BZPOPMIN = require_BZPOPMIN();
  var COPY = require_COPY();
  var DECR = require_DECR();
  var DECRBY = require_DECRBY();
  var DEL = require_DEL();
  var DUMP = require_DUMP();
  var EVAL_RO = require_EVAL_RO();
  var EVAL = require_EVAL();
  var EVALSHA_RO = require_EVALSHA_RO();
  var EVALSHA = require_EVALSHA();
  var EXISTS = require_EXISTS();
  var EXPIRE = require_EXPIRE();
  var EXPIREAT = require_EXPIREAT();
  var EXPIRETIME = require_EXPIRETIME();
  var FCALL_RO = require_FCALL_RO();
  var FCALL = require_FCALL();
  var GEOADD = require_GEOADD();
  var GEODIST = require_GEODIST();
  var GEOHASH = require_GEOHASH();
  var GEOPOS = require_GEOPOS();
  var GEORADIUS_RO_WITH = require_GEORADIUS_RO_WITH();
  var GEORADIUS_RO = require_GEORADIUS_RO();
  var GEORADIUS_WITH = require_GEORADIUS_WITH();
  var GEORADIUS = require_GEORADIUS();
  var GEORADIUSBYMEMBER_RO_WITH = require_GEORADIUSBYMEMBER_RO_WITH();
  var GEORADIUSBYMEMBER_RO = require_GEORADIUSBYMEMBER_RO();
  var GEORADIUSBYMEMBER_WITH = require_GEORADIUSBYMEMBER_WITH();
  var GEORADIUSBYMEMBER = require_GEORADIUSBYMEMBER();
  var GEORADIUSBYMEMBERSTORE = require_GEORADIUSBYMEMBERSTORE();
  var GEORADIUSSTORE = require_GEORADIUSSTORE();
  var GEOSEARCH_WITH = require_GEOSEARCH_WITH();
  var GEOSEARCH = require_GEOSEARCH();
  var GEOSEARCHSTORE = require_GEOSEARCHSTORE();
  var GET = require_GET();
  var GETBIT = require_GETBIT();
  var GETDEL = require_GETDEL();
  var GETEX = require_GETEX();
  var GETRANGE = require_GETRANGE();
  var GETSET = require_GETSET();
  var HDEL = require_HDEL();
  var HEXISTS = require_HEXISTS();
  var HEXPIRE = require_HEXPIRE();
  var HEXPIREAT = require_HEXPIREAT();
  var HEXPIRETIME = require_HEXPIRETIME();
  var HGET = require_HGET();
  var HGETALL = require_HGETALL();
  var HINCRBY = require_HINCRBY();
  var HINCRBYFLOAT = require_HINCRBYFLOAT();
  var HKEYS = require_HKEYS();
  var HLEN = require_HLEN();
  var HMGET = require_HMGET();
  var HPERSIST = require_HPERSIST();
  var HPEXPIRE = require_HPEXPIRE();
  var HPEXPIREAT = require_HPEXPIREAT();
  var HPEXPIRETIME = require_HPEXPIRETIME();
  var HPTTL = require_HPTTL();
  var HRANDFIELD_COUNT_WITHVALUES = require_HRANDFIELD_COUNT_WITHVALUES();
  var HRANDFIELD_COUNT = require_HRANDFIELD_COUNT();
  var HRANDFIELD = require_HRANDFIELD();
  var HSCAN = require_HSCAN();
  var HSCAN_NOVALUES = require_HSCAN_NOVALUES();
  var HSET = require_HSET();
  var HSETNX = require_HSETNX();
  var HSTRLEN = require_HSTRLEN();
  var HTTL = require_HTTL();
  var HVALS = require_HVALS();
  var INCR = require_INCR();
  var INCRBY = require_INCRBY();
  var INCRBYFLOAT = require_INCRBYFLOAT();
  var LCS_IDX_WITHMATCHLEN = require_LCS_IDX_WITHMATCHLEN();
  var LCS_IDX = require_LCS_IDX();
  var LCS_LEN = require_LCS_LEN();
  var LCS = require_LCS();
  var LINDEX = require_LINDEX();
  var LINSERT = require_LINSERT();
  var LLEN = require_LLEN();
  var LMOVE = require_LMOVE();
  var LMPOP = require_LMPOP();
  var LPOP_COUNT = require_LPOP_COUNT();
  var LPOP = require_LPOP();
  var LPOS_COUNT = require_LPOS_COUNT();
  var LPOS = require_LPOS();
  var LPUSH = require_LPUSH();
  var LPUSHX = require_LPUSHX();
  var LRANGE = require_LRANGE();
  var LREM = require_LREM();
  var LSET = require_LSET();
  var LTRIM = require_LTRIM();
  var MGET = require_MGET();
  var MIGRATE = require_MIGRATE();
  var MSET = require_MSET();
  var MSETNX = require_MSETNX();
  var OBJECT_ENCODING = require_OBJECT_ENCODING();
  var OBJECT_FREQ = require_OBJECT_FREQ();
  var OBJECT_IDLETIME = require_OBJECT_IDLETIME();
  var OBJECT_REFCOUNT = require_OBJECT_REFCOUNT();
  var PERSIST = require_PERSIST();
  var PEXPIRE = require_PEXPIRE();
  var PEXPIREAT = require_PEXPIREAT();
  var PEXPIRETIME = require_PEXPIRETIME();
  var PFADD = require_PFADD();
  var PFCOUNT = require_PFCOUNT();
  var PFMERGE = require_PFMERGE();
  var PSETEX = require_PSETEX();
  var PTTL = require_PTTL();
  var PUBLISH = require_PUBLISH();
  var RENAME = require_RENAME();
  var RENAMENX = require_RENAMENX();
  var RESTORE = require_RESTORE();
  var RPOP_COUNT = require_RPOP_COUNT();
  var RPOP = require_RPOP();
  var RPOPLPUSH = require_RPOPLPUSH();
  var RPUSH = require_RPUSH();
  var RPUSHX = require_RPUSHX();
  var SADD = require_SADD();
  var SCARD = require_SCARD();
  var SDIFF = require_SDIFF();
  var SDIFFSTORE = require_SDIFFSTORE();
  var SET = require_SET();
  var SETBIT = require_SETBIT();
  var SETEX = require_SETEX();
  var SETNX = require_SETNX();
  var SETRANGE = require_SETRANGE();
  var SINTER = require_SINTER();
  var SINTERCARD = require_SINTERCARD();
  var SINTERSTORE = require_SINTERSTORE();
  var SISMEMBER = require_SISMEMBER();
  var SMEMBERS = require_SMEMBERS();
  var SMISMEMBER = require_SMISMEMBER();
  var SMOVE = require_SMOVE();
  var SORT_RO = require_SORT_RO();
  var SORT_STORE = require_SORT_STORE();
  var SORT = require_SORT();
  var SPOP = require_SPOP();
  var SPUBLISH = require_SPUBLISH();
  var SRANDMEMBER_COUNT = require_SRANDMEMBER_COUNT();
  var SRANDMEMBER = require_SRANDMEMBER();
  var SREM = require_SREM();
  var SSCAN = require_SSCAN();
  var STRLEN = require_STRLEN();
  var SUNION = require_SUNION();
  var SUNIONSTORE = require_SUNIONSTORE();
  var TOUCH = require_TOUCH();
  var TTL = require_TTL();
  var TYPE = require_TYPE();
  var UNLINK = require_UNLINK();
  var WATCH = require_WATCH();
  var XACK = require_XACK();
  var XADD = require_XADD();
  var XAUTOCLAIM_JUSTID = require_XAUTOCLAIM_JUSTID();
  var XAUTOCLAIM = require_XAUTOCLAIM();
  var XCLAIM_JUSTID = require_XCLAIM_JUSTID();
  var XCLAIM = require_XCLAIM();
  var XDEL = require_XDEL();
  var XGROUP_CREATE = require_XGROUP_CREATE();
  var XGROUP_CREATECONSUMER = require_XGROUP_CREATECONSUMER();
  var XGROUP_DELCONSUMER = require_XGROUP_DELCONSUMER();
  var XGROUP_DESTROY = require_XGROUP_DESTROY();
  var XGROUP_SETID = require_XGROUP_SETID();
  var XINFO_CONSUMERS = require_XINFO_CONSUMERS();
  var XINFO_GROUPS = require_XINFO_GROUPS();
  var XINFO_STREAM = require_XINFO_STREAM();
  var XLEN = require_XLEN();
  var XPENDING_RANGE = require_XPENDING_RANGE();
  var XPENDING = require_XPENDING();
  var XRANGE = require_XRANGE();
  var XREAD = require_XREAD();
  var XREADGROUP = require_XREADGROUP();
  var XREVRANGE = require_XREVRANGE();
  var XSETID = require_XSETID();
  var XTRIM = require_XTRIM();
  var ZADD = require_ZADD();
  var ZCARD = require_ZCARD();
  var ZCOUNT = require_ZCOUNT();
  var ZDIFF_WITHSCORES = require_ZDIFF_WITHSCORES();
  var ZDIFF = require_ZDIFF();
  var ZDIFFSTORE = require_ZDIFFSTORE();
  var ZINCRBY = require_ZINCRBY();
  var ZINTER_WITHSCORES = require_ZINTER_WITHSCORES();
  var ZINTER = require_ZINTER();
  var ZINTERCARD = require_ZINTERCARD();
  var ZINTERSTORE = require_ZINTERSTORE();
  var ZLEXCOUNT = require_ZLEXCOUNT();
  var ZMPOP = require_ZMPOP();
  var ZMSCORE = require_ZMSCORE();
  var ZPOPMAX_COUNT = require_ZPOPMAX_COUNT();
  var ZPOPMAX = require_ZPOPMAX();
  var ZPOPMIN_COUNT = require_ZPOPMIN_COUNT();
  var ZPOPMIN = require_ZPOPMIN();
  var ZRANDMEMBER_COUNT_WITHSCORES = require_ZRANDMEMBER_COUNT_WITHSCORES();
  var ZRANDMEMBER_COUNT = require_ZRANDMEMBER_COUNT();
  var ZRANDMEMBER = require_ZRANDMEMBER();
  var ZRANGE_WITHSCORES = require_ZRANGE_WITHSCORES();
  var ZRANGE = require_ZRANGE();
  var ZRANGEBYLEX = require_ZRANGEBYLEX();
  var ZRANGEBYSCORE_WITHSCORES = require_ZRANGEBYSCORE_WITHSCORES();
  var ZRANGEBYSCORE = require_ZRANGEBYSCORE();
  var ZRANGESTORE = require_ZRANGESTORE();
  var ZRANK = require_ZRANK();
  var ZREM = require_ZREM();
  var ZREMRANGEBYLEX = require_ZREMRANGEBYLEX();
  var ZREMRANGEBYRANK = require_ZREMRANGEBYRANK();
  var ZREMRANGEBYSCORE = require_ZREMRANGEBYSCORE();
  var ZREVRANK = require_ZREVRANK();
  var ZSCAN = require_ZSCAN();
  var ZSCORE = require_ZSCORE();
  var ZUNION_WITHSCORES = require_ZUNION_WITHSCORES();
  var ZUNION = require_ZUNION();
  var ZUNIONSTORE = require_ZUNIONSTORE();
  exports.default = {
    APPEND,
    append: APPEND,
    BITCOUNT,
    bitCount: BITCOUNT,
    BITFIELD_RO,
    bitFieldRo: BITFIELD_RO,
    BITFIELD,
    bitField: BITFIELD,
    BITOP,
    bitOp: BITOP,
    BITPOS,
    bitPos: BITPOS,
    BLMOVE,
    blMove: BLMOVE,
    BLMPOP,
    blmPop: BLMPOP,
    BLPOP,
    blPop: BLPOP,
    BRPOP,
    brPop: BRPOP,
    BRPOPLPUSH,
    brPopLPush: BRPOPLPUSH,
    BZMPOP,
    bzmPop: BZMPOP,
    BZPOPMAX,
    bzPopMax: BZPOPMAX,
    BZPOPMIN,
    bzPopMin: BZPOPMIN,
    COPY,
    copy: COPY,
    DECR,
    decr: DECR,
    DECRBY,
    decrBy: DECRBY,
    DEL,
    del: DEL,
    DUMP,
    dump: DUMP,
    EVAL_RO,
    evalRo: EVAL_RO,
    EVAL,
    eval: EVAL,
    EVALSHA,
    evalSha: EVALSHA,
    EVALSHA_RO,
    evalShaRo: EVALSHA_RO,
    EXISTS,
    exists: EXISTS,
    EXPIRE,
    expire: EXPIRE,
    EXPIREAT,
    expireAt: EXPIREAT,
    EXPIRETIME,
    expireTime: EXPIRETIME,
    FCALL_RO,
    fCallRo: FCALL_RO,
    FCALL,
    fCall: FCALL,
    GEOADD,
    geoAdd: GEOADD,
    GEODIST,
    geoDist: GEODIST,
    GEOHASH,
    geoHash: GEOHASH,
    GEOPOS,
    geoPos: GEOPOS,
    GEORADIUS_RO_WITH,
    geoRadiusRoWith: GEORADIUS_RO_WITH,
    GEORADIUS_RO,
    geoRadiusRo: GEORADIUS_RO,
    GEORADIUS_WITH,
    geoRadiusWith: GEORADIUS_WITH,
    GEORADIUS,
    geoRadius: GEORADIUS,
    GEORADIUSBYMEMBER_RO_WITH,
    geoRadiusByMemberRoWith: GEORADIUSBYMEMBER_RO_WITH,
    GEORADIUSBYMEMBER_RO,
    geoRadiusByMemberRo: GEORADIUSBYMEMBER_RO,
    GEORADIUSBYMEMBER_WITH,
    geoRadiusByMemberWith: GEORADIUSBYMEMBER_WITH,
    GEORADIUSBYMEMBER,
    geoRadiusByMember: GEORADIUSBYMEMBER,
    GEORADIUSBYMEMBERSTORE,
    geoRadiusByMemberStore: GEORADIUSBYMEMBERSTORE,
    GEORADIUSSTORE,
    geoRadiusStore: GEORADIUSSTORE,
    GEOSEARCH_WITH,
    geoSearchWith: GEOSEARCH_WITH,
    GEOSEARCH,
    geoSearch: GEOSEARCH,
    GEOSEARCHSTORE,
    geoSearchStore: GEOSEARCHSTORE,
    GET,
    get: GET,
    GETBIT,
    getBit: GETBIT,
    GETDEL,
    getDel: GETDEL,
    GETEX,
    getEx: GETEX,
    GETRANGE,
    getRange: GETRANGE,
    GETSET,
    getSet: GETSET,
    HDEL,
    hDel: HDEL,
    HEXISTS,
    hExists: HEXISTS,
    HEXPIRE,
    hExpire: HEXPIRE,
    HEXPIREAT,
    hExpireAt: HEXPIREAT,
    HEXPIRETIME,
    hExpireTime: HEXPIRETIME,
    HGET,
    hGet: HGET,
    HGETALL,
    hGetAll: HGETALL,
    HINCRBY,
    hIncrBy: HINCRBY,
    HINCRBYFLOAT,
    hIncrByFloat: HINCRBYFLOAT,
    HKEYS,
    hKeys: HKEYS,
    HLEN,
    hLen: HLEN,
    HMGET,
    hmGet: HMGET,
    HPERSIST,
    hPersist: HPERSIST,
    HPEXPIRE,
    hpExpire: HPEXPIRE,
    HPEXPIREAT,
    hpExpireAt: HPEXPIREAT,
    HPEXPIRETIME,
    hpExpireTime: HPEXPIRETIME,
    HPTTL,
    hpTTL: HPTTL,
    HRANDFIELD_COUNT_WITHVALUES,
    hRandFieldCountWithValues: HRANDFIELD_COUNT_WITHVALUES,
    HRANDFIELD_COUNT,
    hRandFieldCount: HRANDFIELD_COUNT,
    HRANDFIELD,
    hRandField: HRANDFIELD,
    HSCAN,
    hScan: HSCAN,
    HSCAN_NOVALUES,
    hScanNoValues: HSCAN_NOVALUES,
    HSET,
    hSet: HSET,
    HSETNX,
    hSetNX: HSETNX,
    HSTRLEN,
    hStrLen: HSTRLEN,
    HTTL,
    hTTL: HTTL,
    HVALS,
    hVals: HVALS,
    INCR,
    incr: INCR,
    INCRBY,
    incrBy: INCRBY,
    INCRBYFLOAT,
    incrByFloat: INCRBYFLOAT,
    LCS_IDX_WITHMATCHLEN,
    lcsIdxWithMatchLen: LCS_IDX_WITHMATCHLEN,
    LCS_IDX,
    lcsIdx: LCS_IDX,
    LCS_LEN,
    lcsLen: LCS_LEN,
    LCS,
    lcs: LCS,
    LINDEX,
    lIndex: LINDEX,
    LINSERT,
    lInsert: LINSERT,
    LLEN,
    lLen: LLEN,
    LMOVE,
    lMove: LMOVE,
    LMPOP,
    lmPop: LMPOP,
    LPOP_COUNT,
    lPopCount: LPOP_COUNT,
    LPOP,
    lPop: LPOP,
    LPOS_COUNT,
    lPosCount: LPOS_COUNT,
    LPOS,
    lPos: LPOS,
    LPUSH,
    lPush: LPUSH,
    LPUSHX,
    lPushX: LPUSHX,
    LRANGE,
    lRange: LRANGE,
    LREM,
    lRem: LREM,
    LSET,
    lSet: LSET,
    LTRIM,
    lTrim: LTRIM,
    MGET,
    mGet: MGET,
    MIGRATE,
    migrate: MIGRATE,
    MSET,
    mSet: MSET,
    MSETNX,
    mSetNX: MSETNX,
    OBJECT_ENCODING,
    objectEncoding: OBJECT_ENCODING,
    OBJECT_FREQ,
    objectFreq: OBJECT_FREQ,
    OBJECT_IDLETIME,
    objectIdleTime: OBJECT_IDLETIME,
    OBJECT_REFCOUNT,
    objectRefCount: OBJECT_REFCOUNT,
    PERSIST,
    persist: PERSIST,
    PEXPIRE,
    pExpire: PEXPIRE,
    PEXPIREAT,
    pExpireAt: PEXPIREAT,
    PEXPIRETIME,
    pExpireTime: PEXPIRETIME,
    PFADD,
    pfAdd: PFADD,
    PFCOUNT,
    pfCount: PFCOUNT,
    PFMERGE,
    pfMerge: PFMERGE,
    PSETEX,
    pSetEx: PSETEX,
    PTTL,
    pTTL: PTTL,
    PUBLISH,
    publish: PUBLISH,
    RENAME,
    rename: RENAME,
    RENAMENX,
    renameNX: RENAMENX,
    RESTORE,
    restore: RESTORE,
    RPOP_COUNT,
    rPopCount: RPOP_COUNT,
    RPOP,
    rPop: RPOP,
    RPOPLPUSH,
    rPopLPush: RPOPLPUSH,
    RPUSH,
    rPush: RPUSH,
    RPUSHX,
    rPushX: RPUSHX,
    SADD,
    sAdd: SADD,
    SCARD,
    sCard: SCARD,
    SDIFF,
    sDiff: SDIFF,
    SDIFFSTORE,
    sDiffStore: SDIFFSTORE,
    SINTER,
    sInter: SINTER,
    SINTERCARD,
    sInterCard: SINTERCARD,
    SINTERSTORE,
    sInterStore: SINTERSTORE,
    SET,
    set: SET,
    SETBIT,
    setBit: SETBIT,
    SETEX,
    setEx: SETEX,
    SETNX,
    setNX: SETNX,
    SETRANGE,
    setRange: SETRANGE,
    SISMEMBER,
    sIsMember: SISMEMBER,
    SMEMBERS,
    sMembers: SMEMBERS,
    SMISMEMBER,
    smIsMember: SMISMEMBER,
    SMOVE,
    sMove: SMOVE,
    SORT_RO,
    sortRo: SORT_RO,
    SORT_STORE,
    sortStore: SORT_STORE,
    SORT,
    sort: SORT,
    SPOP,
    sPop: SPOP,
    SPUBLISH,
    sPublish: SPUBLISH,
    SRANDMEMBER_COUNT,
    sRandMemberCount: SRANDMEMBER_COUNT,
    SRANDMEMBER,
    sRandMember: SRANDMEMBER,
    SREM,
    sRem: SREM,
    SSCAN,
    sScan: SSCAN,
    STRLEN,
    strLen: STRLEN,
    SUNION,
    sUnion: SUNION,
    SUNIONSTORE,
    sUnionStore: SUNIONSTORE,
    TOUCH,
    touch: TOUCH,
    TTL,
    ttl: TTL,
    TYPE,
    type: TYPE,
    UNLINK,
    unlink: UNLINK,
    WATCH,
    watch: WATCH,
    XACK,
    xAck: XACK,
    XADD,
    xAdd: XADD,
    XAUTOCLAIM_JUSTID,
    xAutoClaimJustId: XAUTOCLAIM_JUSTID,
    XAUTOCLAIM,
    xAutoClaim: XAUTOCLAIM,
    XCLAIM,
    xClaim: XCLAIM,
    XCLAIM_JUSTID,
    xClaimJustId: XCLAIM_JUSTID,
    XDEL,
    xDel: XDEL,
    XGROUP_CREATE,
    xGroupCreate: XGROUP_CREATE,
    XGROUP_CREATECONSUMER,
    xGroupCreateConsumer: XGROUP_CREATECONSUMER,
    XGROUP_DELCONSUMER,
    xGroupDelConsumer: XGROUP_DELCONSUMER,
    XGROUP_DESTROY,
    xGroupDestroy: XGROUP_DESTROY,
    XGROUP_SETID,
    xGroupSetId: XGROUP_SETID,
    XINFO_CONSUMERS,
    xInfoConsumers: XINFO_CONSUMERS,
    XINFO_GROUPS,
    xInfoGroups: XINFO_GROUPS,
    XINFO_STREAM,
    xInfoStream: XINFO_STREAM,
    XLEN,
    xLen: XLEN,
    XPENDING_RANGE,
    xPendingRange: XPENDING_RANGE,
    XPENDING,
    xPending: XPENDING,
    XRANGE,
    xRange: XRANGE,
    XREAD,
    xRead: XREAD,
    XREADGROUP,
    xReadGroup: XREADGROUP,
    XREVRANGE,
    xRevRange: XREVRANGE,
    XSETID,
    xSetId: XSETID,
    XTRIM,
    xTrim: XTRIM,
    ZADD,
    zAdd: ZADD,
    ZCARD,
    zCard: ZCARD,
    ZCOUNT,
    zCount: ZCOUNT,
    ZDIFF_WITHSCORES,
    zDiffWithScores: ZDIFF_WITHSCORES,
    ZDIFF,
    zDiff: ZDIFF,
    ZDIFFSTORE,
    zDiffStore: ZDIFFSTORE,
    ZINCRBY,
    zIncrBy: ZINCRBY,
    ZINTER_WITHSCORES,
    zInterWithScores: ZINTER_WITHSCORES,
    ZINTER,
    zInter: ZINTER,
    ZINTERCARD,
    zInterCard: ZINTERCARD,
    ZINTERSTORE,
    zInterStore: ZINTERSTORE,
    ZLEXCOUNT,
    zLexCount: ZLEXCOUNT,
    ZMPOP,
    zmPop: ZMPOP,
    ZMSCORE,
    zmScore: ZMSCORE,
    ZPOPMAX_COUNT,
    zPopMaxCount: ZPOPMAX_COUNT,
    ZPOPMAX,
    zPopMax: ZPOPMAX,
    ZPOPMIN_COUNT,
    zPopMinCount: ZPOPMIN_COUNT,
    ZPOPMIN,
    zPopMin: ZPOPMIN,
    ZRANDMEMBER_COUNT_WITHSCORES,
    zRandMemberCountWithScores: ZRANDMEMBER_COUNT_WITHSCORES,
    ZRANDMEMBER_COUNT,
    zRandMemberCount: ZRANDMEMBER_COUNT,
    ZRANDMEMBER,
    zRandMember: ZRANDMEMBER,
    ZRANGE_WITHSCORES,
    zRangeWithScores: ZRANGE_WITHSCORES,
    ZRANGE,
    zRange: ZRANGE,
    ZRANGEBYLEX,
    zRangeByLex: ZRANGEBYLEX,
    ZRANGEBYSCORE_WITHSCORES,
    zRangeByScoreWithScores: ZRANGEBYSCORE_WITHSCORES,
    ZRANGEBYSCORE,
    zRangeByScore: ZRANGEBYSCORE,
    ZRANGESTORE,
    zRangeStore: ZRANGESTORE,
    ZRANK,
    zRank: ZRANK,
    ZREM,
    zRem: ZREM,
    ZREMRANGEBYLEX,
    zRemRangeByLex: ZREMRANGEBYLEX,
    ZREMRANGEBYRANK,
    zRemRangeByRank: ZREMRANGEBYRANK,
    ZREMRANGEBYSCORE,
    zRemRangeByScore: ZREMRANGEBYSCORE,
    ZREVRANK,
    zRevRank: ZREVRANK,
    ZSCAN,
    zScan: ZSCAN,
    ZSCORE,
    zScore: ZSCORE,
    ZUNION_WITHSCORES,
    zUnionWithScores: ZUNION_WITHSCORES,
    ZUNION,
    zUnion: ZUNION,
    ZUNIONSTORE,
    zUnionStore: ZUNIONSTORE
  };
});

// node_modules/@redis/client/dist/lib/commands/ACL_CAT.js
var require_ACL_CAT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(categoryName) {
    const args = ["ACL", "CAT"];
    if (categoryName) {
      args.push(categoryName);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ACL_DELUSER.js
var require_ACL_DELUSER = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  var generic_transformers_1 = require_generic_transformers();
  function transformArguments(username) {
    return (0, generic_transformers_1.pushVerdictArguments)(["ACL", "DELUSER"], username);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ACL_DRYRUN.js
var require_ACL_DRYRUN = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments(username, command) {
    return [
      "ACL",
      "DRYRUN",
      username,
      ...command
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ACL_GENPASS.js
var require_ACL_GENPASS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(bits) {
    const args = ["ACL", "GENPASS"];
    if (bits) {
      args.push(bits.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ACL_GETUSER.js
var require_ACL_GETUSER = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = undefined;
  function transformArguments(username) {
    return ["ACL", "GETUSER", username];
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return {
      flags: reply[1],
      passwords: reply[3],
      commands: reply[5],
      keys: reply[7],
      channels: reply[9],
      selectors: reply[11]
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/ACL_LIST.js
var require_ACL_LIST = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["ACL", "LIST"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ACL_LOAD.js
var require_ACL_LOAD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["ACL", "LOAD"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ACL_LOG_RESET.js
var require_ACL_LOG_RESET = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["ACL", "LOG", "RESET"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ACL_LOG.js
var require_ACL_LOG = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = undefined;
  function transformArguments(count) {
    const args = ["ACL", "LOG"];
    if (count) {
      args.push(count.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return reply.map((log) => ({
      count: log[1],
      reason: log[3],
      context: log[5],
      object: log[7],
      username: log[9],
      ageSeconds: Number(log[11]),
      clientInfo: log[13]
    }));
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/ACL_SAVE.js
var require_ACL_SAVE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["ACL", "SAVE"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ACL_SETUSER.js
var require_ACL_SETUSER = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  var generic_transformers_1 = require_generic_transformers();
  function transformArguments(username, rule) {
    return (0, generic_transformers_1.pushVerdictArguments)(["ACL", "SETUSER", username], rule);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ACL_USERS.js
var require_ACL_USERS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["ACL", "USERS"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ACL_WHOAMI.js
var require_ACL_WHOAMI = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["ACL", "WHOAMI"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ASKING.js
var require_ASKING = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["ASKING"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/AUTH.js
var require_AUTH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments({ username, password }) {
    if (!username) {
      return ["AUTH", password];
    }
    return ["AUTH", username, password];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/BGREWRITEAOF.js
var require_BGREWRITEAOF = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["BGREWRITEAOF"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/BGSAVE.js
var require_BGSAVE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(options) {
    const args = ["BGSAVE"];
    if (options?.SCHEDULE) {
      args.push("SCHEDULE");
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLIENT_CACHING.js
var require_CLIENT_CACHING = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(value) {
    return [
      "CLIENT",
      "CACHING",
      value ? "YES" : "NO"
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLIENT_GETNAME.js
var require_CLIENT_GETNAME = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["CLIENT", "GETNAME"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLIENT_GETREDIR.js
var require_CLIENT_GETREDIR = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["CLIENT", "GETREDIR"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLIENT_ID.js
var require_CLIENT_ID = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments() {
    return ["CLIENT", "ID"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLIENT_KILL.js
var require_CLIENT_KILL = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.ClientKillFilters = undefined;
  var ClientKillFilters;
  (function(ClientKillFilters2) {
    ClientKillFilters2["ADDRESS"] = "ADDR";
    ClientKillFilters2["LOCAL_ADDRESS"] = "LADDR";
    ClientKillFilters2["ID"] = "ID";
    ClientKillFilters2["TYPE"] = "TYPE";
    ClientKillFilters2["USER"] = "USER";
    ClientKillFilters2["SKIP_ME"] = "SKIPME";
    ClientKillFilters2["MAXAGE"] = "MAXAGE";
  })(ClientKillFilters || (exports.ClientKillFilters = ClientKillFilters = {}));
  function transformArguments(filters) {
    const args = ["CLIENT", "KILL"];
    if (Array.isArray(filters)) {
      for (const filter of filters) {
        pushFilter(args, filter);
      }
    } else {
      pushFilter(args, filters);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  function pushFilter(args, filter) {
    if (filter === ClientKillFilters.SKIP_ME) {
      args.push("SKIPME");
      return;
    }
    args.push(filter.filter);
    switch (filter.filter) {
      case ClientKillFilters.ADDRESS:
        args.push(filter.address);
        break;
      case ClientKillFilters.LOCAL_ADDRESS:
        args.push(filter.localAddress);
        break;
      case ClientKillFilters.ID:
        args.push(typeof filter.id === "number" ? filter.id.toString() : filter.id);
        break;
      case ClientKillFilters.TYPE:
        args.push(filter.type);
        break;
      case ClientKillFilters.USER:
        args.push(filter.username);
        break;
      case ClientKillFilters.SKIP_ME:
        args.push(filter.skipMe ? "yes" : "no");
        break;
      case ClientKillFilters.MAXAGE:
        args.push(filter.maxAge.toString());
        break;
    }
  }
});

// node_modules/@redis/client/dist/lib/commands/CLIENT_INFO.js
var require_CLIENT_INFO = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments() {
    return ["CLIENT", "INFO"];
  }
  exports.transformArguments = transformArguments;
  var CLIENT_INFO_REGEX = /([^\s=]+)=([^\s]*)/g;
  function transformReply(rawReply) {
    const map = {};
    for (const item of rawReply.matchAll(CLIENT_INFO_REGEX)) {
      map[item[1]] = item[2];
    }
    const reply = {
      id: Number(map.id),
      addr: map.addr,
      fd: Number(map.fd),
      name: map.name,
      age: Number(map.age),
      idle: Number(map.idle),
      flags: map.flags,
      db: Number(map.db),
      sub: Number(map.sub),
      psub: Number(map.psub),
      multi: Number(map.multi),
      qbuf: Number(map.qbuf),
      qbufFree: Number(map["qbuf-free"]),
      argvMem: Number(map["argv-mem"]),
      obl: Number(map.obl),
      oll: Number(map.oll),
      omem: Number(map.omem),
      totMem: Number(map["tot-mem"]),
      events: map.events,
      cmd: map.cmd,
      user: map.user,
      libName: map["lib-name"],
      libVer: map["lib-ver"]
    };
    if (map.laddr !== undefined) {
      reply.laddr = map.laddr;
    }
    if (map.redir !== undefined) {
      reply.redir = Number(map.redir);
    }
    if (map.ssub !== undefined) {
      reply.ssub = Number(map.ssub);
    }
    if (map["multi-mem"] !== undefined) {
      reply.multiMem = Number(map["multi-mem"]);
    }
    if (map.resp !== undefined) {
      reply.resp = Number(map.resp);
    }
    return reply;
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/CLIENT_LIST.js
var require_CLIENT_LIST = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = undefined;
  var generic_transformers_1 = require_generic_transformers();
  var CLIENT_INFO_1 = require_CLIENT_INFO();
  exports.IS_READ_ONLY = true;
  function transformArguments(filter) {
    let args = ["CLIENT", "LIST"];
    if (filter) {
      if (filter.TYPE !== undefined) {
        args.push("TYPE", filter.TYPE);
      } else {
        args.push("ID");
        args = (0, generic_transformers_1.pushVerdictArguments)(args, filter.ID);
      }
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  function transformReply(rawReply) {
    const split = rawReply.split(`
`), length = split.length - 1, reply = [];
    for (let i = 0;i < length; i++) {
      reply.push((0, CLIENT_INFO_1.transformReply)(split[i]));
    }
    return reply;
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/CLIENT_NO-EVICT.js
var require_CLIENT_NO_EVICT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(value) {
    return [
      "CLIENT",
      "NO-EVICT",
      value ? "ON" : "OFF"
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLIENT_NO-TOUCH.js
var require_CLIENT_NO_TOUCH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(value) {
    return [
      "CLIENT",
      "NO-TOUCH",
      value ? "ON" : "OFF"
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLIENT_PAUSE.js
var require_CLIENT_PAUSE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(timeout, mode) {
    const args = [
      "CLIENT",
      "PAUSE",
      timeout.toString()
    ];
    if (mode) {
      args.push(mode);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLIENT_SETNAME.js
var require_CLIENT_SETNAME = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(name) {
    return ["CLIENT", "SETNAME", name];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLIENT_TRACKING.js
var require_CLIENT_TRACKING = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(mode, options) {
    const args = [
      "CLIENT",
      "TRACKING",
      mode ? "ON" : "OFF"
    ];
    if (mode) {
      if (options?.REDIRECT) {
        args.push("REDIRECT", options.REDIRECT.toString());
      }
      if (isBroadcast(options)) {
        args.push("BCAST");
        if (options?.PREFIX) {
          if (Array.isArray(options.PREFIX)) {
            for (const prefix of options.PREFIX) {
              args.push("PREFIX", prefix);
            }
          } else {
            args.push("PREFIX", options.PREFIX);
          }
        }
      } else if (isOptIn(options)) {
        args.push("OPTIN");
      } else if (isOptOut(options)) {
        args.push("OPTOUT");
      }
      if (options?.NOLOOP) {
        args.push("NOLOOP");
      }
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  function isBroadcast(options) {
    return options?.BCAST === true;
  }
  function isOptIn(options) {
    return options?.OPTIN === true;
  }
  function isOptOut(options) {
    return options?.OPTOUT === true;
  }
});

// node_modules/@redis/client/dist/lib/commands/CLIENT_TRACKINGINFO.js
var require_CLIENT_TRACKINGINFO = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = undefined;
  function transformArguments() {
    return ["CLIENT", "TRACKINGINFO"];
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return {
      flags: new Set(reply[1]),
      redirect: reply[3],
      prefixes: reply[5]
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/CLIENT_UNPAUSE.js
var require_CLIENT_UNPAUSE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["CLIENT", "UNPAUSE"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_ADDSLOTS.js
var require_CLUSTER_ADDSLOTS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  var generic_transformers_1 = require_generic_transformers();
  function transformArguments(slots) {
    return (0, generic_transformers_1.pushVerdictNumberArguments)(["CLUSTER", "ADDSLOTS"], slots);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_ADDSLOTSRANGE.js
var require_CLUSTER_ADDSLOTSRANGE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  var generic_transformers_1 = require_generic_transformers();
  function transformArguments(ranges) {
    return (0, generic_transformers_1.pushSlotRangesArguments)(["CLUSTER", "ADDSLOTSRANGE"], ranges);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_BUMPEPOCH.js
var require_CLUSTER_BUMPEPOCH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["CLUSTER", "BUMPEPOCH"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_COUNT-FAILURE-REPORTS.js
var require_CLUSTER_COUNT_FAILURE_REPORTS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(nodeId) {
    return ["CLUSTER", "COUNT-FAILURE-REPORTS", nodeId];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_COUNTKEYSINSLOT.js
var require_CLUSTER_COUNTKEYSINSLOT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(slot) {
    return ["CLUSTER", "COUNTKEYSINSLOT", slot.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_DELSLOTS.js
var require_CLUSTER_DELSLOTS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  var generic_transformers_1 = require_generic_transformers();
  function transformArguments(slots) {
    return (0, generic_transformers_1.pushVerdictNumberArguments)(["CLUSTER", "DELSLOTS"], slots);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_DELSLOTSRANGE.js
var require_CLUSTER_DELSLOTSRANGE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  var generic_transformers_1 = require_generic_transformers();
  function transformArguments(ranges) {
    return (0, generic_transformers_1.pushSlotRangesArguments)(["CLUSTER", "DELSLOTSRANGE"], ranges);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_FAILOVER.js
var require_CLUSTER_FAILOVER = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FailoverModes = undefined;
  var FailoverModes;
  (function(FailoverModes2) {
    FailoverModes2["FORCE"] = "FORCE";
    FailoverModes2["TAKEOVER"] = "TAKEOVER";
  })(FailoverModes || (exports.FailoverModes = FailoverModes = {}));
  function transformArguments(mode) {
    const args = ["CLUSTER", "FAILOVER"];
    if (mode) {
      args.push(mode);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_FLUSHSLOTS.js
var require_CLUSTER_FLUSHSLOTS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["CLUSTER", "FLUSHSLOTS"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_FORGET.js
var require_CLUSTER_FORGET = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(nodeId) {
    return ["CLUSTER", "FORGET", nodeId];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_GETKEYSINSLOT.js
var require_CLUSTER_GETKEYSINSLOT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(slot, count) {
    return ["CLUSTER", "GETKEYSINSLOT", slot.toString(), count.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_INFO.js
var require_CLUSTER_INFO = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.extractLineValue = exports.transformReply = exports.transformArguments = undefined;
  function transformArguments() {
    return ["CLUSTER", "INFO"];
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    const lines = reply.split(`\r
`);
    return {
      state: extractLineValue(lines[0]),
      slots: {
        assigned: Number(extractLineValue(lines[1])),
        ok: Number(extractLineValue(lines[2])),
        pfail: Number(extractLineValue(lines[3])),
        fail: Number(extractLineValue(lines[4]))
      },
      knownNodes: Number(extractLineValue(lines[5])),
      size: Number(extractLineValue(lines[6])),
      currentEpoch: Number(extractLineValue(lines[7])),
      myEpoch: Number(extractLineValue(lines[8])),
      stats: {
        messagesSent: Number(extractLineValue(lines[9])),
        messagesReceived: Number(extractLineValue(lines[10]))
      }
    };
  }
  exports.transformReply = transformReply;
  function extractLineValue(line) {
    return line.substring(line.indexOf(":") + 1);
  }
  exports.extractLineValue = extractLineValue;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_KEYSLOT.js
var require_CLUSTER_KEYSLOT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(key) {
    return ["CLUSTER", "KEYSLOT", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_LINKS.js
var require_CLUSTER_LINKS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = undefined;
  function transformArguments() {
    return ["CLUSTER", "LINKS"];
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return reply.map((peerLink) => ({
      direction: peerLink[1],
      node: peerLink[3],
      createTime: Number(peerLink[5]),
      events: peerLink[7],
      sendBufferAllocated: Number(peerLink[9]),
      sendBufferUsed: Number(peerLink[11])
    }));
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_MEET.js
var require_CLUSTER_MEET = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(ip, port) {
    return ["CLUSTER", "MEET", ip, port.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_MYID.js
var require_CLUSTER_MYID = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["CLUSTER", "MYID"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_MYSHARDID.js
var require_CLUSTER_MYSHARDID = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments() {
    return ["CLUSTER", "MYSHARDID"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_NODES.js
var require_CLUSTER_NODES = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.RedisClusterNodeLinkStates = exports.transformArguments = undefined;
  function transformArguments() {
    return ["CLUSTER", "NODES"];
  }
  exports.transformArguments = transformArguments;
  var RedisClusterNodeLinkStates;
  (function(RedisClusterNodeLinkStates2) {
    RedisClusterNodeLinkStates2["CONNECTED"] = "connected";
    RedisClusterNodeLinkStates2["DISCONNECTED"] = "disconnected";
  })(RedisClusterNodeLinkStates || (exports.RedisClusterNodeLinkStates = RedisClusterNodeLinkStates = {}));
  function transformReply(reply) {
    const lines = reply.split(`
`);
    lines.pop();
    const mastersMap = new Map, replicasMap = new Map;
    for (const line of lines) {
      const [id, address, flags, masterId, pingSent, pongRecv, configEpoch, linkState, ...slots] = line.split(" "), node = {
        id,
        address,
        ...transformNodeAddress(address),
        flags: flags.split(","),
        pingSent: Number(pingSent),
        pongRecv: Number(pongRecv),
        configEpoch: Number(configEpoch),
        linkState
      };
      if (masterId === "-") {
        let replicas = replicasMap.get(id);
        if (!replicas) {
          replicas = [];
          replicasMap.set(id, replicas);
        }
        mastersMap.set(id, {
          ...node,
          slots: slots.map((slot) => {
            const [fromString, toString] = slot.split("-", 2), from = Number(fromString);
            return {
              from,
              to: toString ? Number(toString) : from
            };
          }),
          replicas
        });
      } else {
        const replicas = replicasMap.get(masterId);
        if (!replicas) {
          replicasMap.set(masterId, [node]);
        } else {
          replicas.push(node);
        }
      }
    }
    return [...mastersMap.values()];
  }
  exports.transformReply = transformReply;
  function transformNodeAddress(address) {
    const indexOfColon = address.lastIndexOf(":"), indexOfAt = address.indexOf("@", indexOfColon), host = address.substring(0, indexOfColon);
    if (indexOfAt === -1) {
      return {
        host,
        port: Number(address.substring(indexOfColon + 1)),
        cport: null
      };
    }
    return {
      host: address.substring(0, indexOfColon),
      port: Number(address.substring(indexOfColon + 1, indexOfAt)),
      cport: Number(address.substring(indexOfAt + 1))
    };
  }
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_REPLICAS.js
var require_CLUSTER_REPLICAS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = undefined;
  function transformArguments(nodeId) {
    return ["CLUSTER", "REPLICAS", nodeId];
  }
  exports.transformArguments = transformArguments;
  var CLUSTER_NODES_1 = require_CLUSTER_NODES();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return CLUSTER_NODES_1.transformReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_REPLICATE.js
var require_CLUSTER_REPLICATE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(nodeId) {
    return ["CLUSTER", "REPLICATE", nodeId];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_RESET.js
var require_CLUSTER_RESET = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(mode) {
    const args = ["CLUSTER", "RESET"];
    if (mode) {
      args.push(mode);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_SAVECONFIG.js
var require_CLUSTER_SAVECONFIG = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["CLUSTER", "SAVECONFIG"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_SET-CONFIG-EPOCH.js
var require_CLUSTER_SET_CONFIG_EPOCH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(configEpoch) {
    return ["CLUSTER", "SET-CONFIG-EPOCH", configEpoch.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_SETSLOT.js
var require_CLUSTER_SETSLOT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.ClusterSlotStates = undefined;
  var ClusterSlotStates;
  (function(ClusterSlotStates2) {
    ClusterSlotStates2["IMPORTING"] = "IMPORTING";
    ClusterSlotStates2["MIGRATING"] = "MIGRATING";
    ClusterSlotStates2["STABLE"] = "STABLE";
    ClusterSlotStates2["NODE"] = "NODE";
  })(ClusterSlotStates || (exports.ClusterSlotStates = ClusterSlotStates = {}));
  function transformArguments(slot, state, nodeId) {
    const args = ["CLUSTER", "SETSLOT", slot.toString(), state];
    if (nodeId) {
      args.push(nodeId);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CLUSTER_SLOTS.js
var require_CLUSTER_SLOTS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = undefined;
  function transformArguments() {
    return ["CLUSTER", "SLOTS"];
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return reply.map(([from, to, master, ...replicas]) => {
      return {
        from,
        to,
        master: transformNode(master),
        replicas: replicas.map(transformNode)
      };
    });
  }
  exports.transformReply = transformReply;
  function transformNode([ip, port, id]) {
    return {
      ip,
      port,
      id
    };
  }
});

// node_modules/@redis/client/dist/lib/commands/COMMAND_COUNT.js
var require_COMMAND_COUNT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments() {
    return ["COMMAND", "COUNT"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/COMMAND_GETKEYS.js
var require_COMMAND_GETKEYS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments(args) {
    return ["COMMAND", "GETKEYS", ...args];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/COMMAND_GETKEYSANDFLAGS.js
var require_COMMAND_GETKEYSANDFLAGS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments(args) {
    return ["COMMAND", "GETKEYSANDFLAGS", ...args];
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return reply.map(([key, flags]) => ({
      key,
      flags
    }));
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/COMMAND_INFO.js
var require_COMMAND_INFO = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.IS_READ_ONLY = true;
  function transformArguments(commands) {
    return ["COMMAND", "INFO", ...commands];
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return reply.map((command) => command ? (0, generic_transformers_1.transformCommandReply)(command) : null);
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/COMMAND_LIST.js
var require_COMMAND_LIST = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FilterBy = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  var FilterBy;
  (function(FilterBy2) {
    FilterBy2["MODULE"] = "MODULE";
    FilterBy2["ACLCAT"] = "ACLCAT";
    FilterBy2["PATTERN"] = "PATTERN";
  })(FilterBy || (exports.FilterBy = FilterBy = {}));
  function transformArguments(filter) {
    const args = ["COMMAND", "LIST"];
    if (filter) {
      args.push("FILTERBY", filter.filterBy, filter.value);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/COMMAND.js
var require_COMMAND = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.IS_READ_ONLY = true;
  function transformArguments() {
    return ["COMMAND"];
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return reply.map(generic_transformers_1.transformCommandReply);
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/CONFIG_GET.js
var require_CONFIG_GET = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = undefined;
  function transformArguments(parameter) {
    return ["CONFIG", "GET", parameter];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformTuplesReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/CONFIG_RESETSTAT.js
var require_CONFIG_RESETSTAT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["CONFIG", "RESETSTAT"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CONFIG_REWRITE.js
var require_CONFIG_REWRITE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["CONFIG", "REWRITE"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/CONFIG_SET.js
var require_CONFIG_SET = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(...[parameterOrConfig, value]) {
    const args = ["CONFIG", "SET"];
    if (typeof parameterOrConfig === "string") {
      args.push(parameterOrConfig, value);
    } else {
      for (const [key, value2] of Object.entries(parameterOrConfig)) {
        args.push(key, value2);
      }
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/DBSIZE.js
var require_DBSIZE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments() {
    return ["DBSIZE"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/DISCARD.js
var require_DISCARD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["DISCARD"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ECHO.js
var require_ECHO = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments(message) {
    return ["ECHO", message];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/FAILOVER.js
var require_FAILOVER = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(options) {
    const args = ["FAILOVER"];
    if (options?.TO) {
      args.push("TO", options.TO.host, options.TO.port.toString());
      if (options.TO.FORCE) {
        args.push("FORCE");
      }
    }
    if (options?.ABORT) {
      args.push("ABORT");
    }
    if (options?.TIMEOUT) {
      args.push("TIMEOUT", options.TIMEOUT.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/FLUSHALL.js
var require_FLUSHALL = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.RedisFlushModes = undefined;
  var RedisFlushModes;
  (function(RedisFlushModes2) {
    RedisFlushModes2["ASYNC"] = "ASYNC";
    RedisFlushModes2["SYNC"] = "SYNC";
  })(RedisFlushModes || (exports.RedisFlushModes = RedisFlushModes = {}));
  function transformArguments(mode) {
    const args = ["FLUSHALL"];
    if (mode) {
      args.push(mode);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/FLUSHDB.js
var require_FLUSHDB = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(mode) {
    const args = ["FLUSHDB"];
    if (mode) {
      args.push(mode);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/FUNCTION_DELETE.js
var require_FUNCTION_DELETE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(library) {
    return ["FUNCTION", "DELETE", library];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/FUNCTION_DUMP.js
var require_FUNCTION_DUMP = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["FUNCTION", "DUMP"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/FUNCTION_FLUSH.js
var require_FUNCTION_FLUSH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(mode) {
    const args = ["FUNCTION", "FLUSH"];
    if (mode) {
      args.push(mode);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/FUNCTION_KILL.js
var require_FUNCTION_KILL = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["FUNCTION", "KILL"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/FUNCTION_LIST.js
var require_FUNCTION_LIST = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = undefined;
  var generic_transformers_1 = require_generic_transformers();
  function transformArguments(pattern) {
    const args = ["FUNCTION", "LIST"];
    if (pattern) {
      args.push(pattern);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return reply.map(generic_transformers_1.transformFunctionListItemReply);
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/FUNCTION_LIST_WITHCODE.js
var require_FUNCTION_LIST_WITHCODE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = undefined;
  var FUNCTION_LIST_1 = require_FUNCTION_LIST();
  var generic_transformers_1 = require_generic_transformers();
  function transformArguments(pattern) {
    const args = (0, FUNCTION_LIST_1.transformArguments)(pattern);
    args.push("WITHCODE");
    return args;
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return reply.map((library) => ({
      ...(0, generic_transformers_1.transformFunctionListItemReply)(library),
      libraryCode: library[7]
    }));
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/FUNCTION_LOAD.js
var require_FUNCTION_LOAD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(code, options) {
    const args = ["FUNCTION", "LOAD"];
    if (options?.REPLACE) {
      args.push("REPLACE");
    }
    args.push(code);
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/FUNCTION_RESTORE.js
var require_FUNCTION_RESTORE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(dump, mode) {
    const args = ["FUNCTION", "RESTORE", dump];
    if (mode) {
      args.push(mode);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/FUNCTION_STATS.js
var require_FUNCTION_STATS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = undefined;
  function transformArguments() {
    return ["FUNCTION", "STATS"];
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    const engines = Object.create(null);
    for (let i = 0;i < reply[3].length; i++) {
      engines[reply[3][i]] = {
        librariesCount: reply[3][++i][1],
        functionsCount: reply[3][i][3]
      };
    }
    return {
      runningScript: reply[1] === null ? null : {
        name: reply[1][1],
        command: reply[1][3],
        durationMs: reply[1][5]
      },
      engines
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/HELLO.js
var require_HELLO = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = undefined;
  function transformArguments(options) {
    const args = ["HELLO"];
    if (options) {
      args.push(options.protover.toString());
      if (options.auth) {
        args.push("AUTH", options.auth.username, options.auth.password);
      }
      if (options.clientName) {
        args.push("SETNAME", options.clientName);
      }
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return {
      server: reply[1],
      version: reply[3],
      proto: reply[5],
      id: reply[7],
      mode: reply[9],
      role: reply[11],
      modules: reply[13]
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/INFO.js
var require_INFO = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments(section) {
    const args = ["INFO"];
    if (section) {
      args.push(section);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/KEYS.js
var require_KEYS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(pattern) {
    return ["KEYS", pattern];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/LASTSAVE.js
var require_LASTSAVE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments() {
    return ["LASTSAVE"];
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return new Date(reply);
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/LATENCY_DOCTOR.js
var require_LATENCY_DOCTOR = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["LATENCY", "DOCTOR"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/LATENCY_GRAPH.js
var require_LATENCY_GRAPH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(event) {
    return ["LATENCY", "GRAPH", event];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/LATENCY_HISTORY.js
var require_LATENCY_HISTORY = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(event) {
    return ["LATENCY", "HISTORY", event];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/LATENCY_LATEST.js
var require_LATENCY_LATEST = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["LATENCY", "LATEST"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/LOLWUT.js
var require_LOLWUT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments(version, ...optionalArguments) {
    const args = ["LOLWUT"];
    if (version) {
      args.push("VERSION", version.toString(), ...optionalArguments.map(String));
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/MEMORY_DOCTOR.js
var require_MEMORY_DOCTOR = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["MEMORY", "DOCTOR"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/MEMORY_MALLOC-STATS.js
var require_MEMORY_MALLOC_STATS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["MEMORY", "MALLOC-STATS"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/MEMORY_PURGE.js
var require_MEMORY_PURGE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["MEMORY", "PURGE"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/MEMORY_STATS.js
var require_MEMORY_STATS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = undefined;
  function transformArguments() {
    return ["MEMORY", "STATS"];
  }
  exports.transformArguments = transformArguments;
  var FIELDS_MAPPING = {
    "peak.allocated": "peakAllocated",
    "total.allocated": "totalAllocated",
    "startup.allocated": "startupAllocated",
    "replication.backlog": "replicationBacklog",
    "clients.slaves": "clientsReplicas",
    "clients.normal": "clientsNormal",
    "aof.buffer": "aofBuffer",
    "lua.caches": "luaCaches",
    "overhead.total": "overheadTotal",
    "keys.count": "keysCount",
    "keys.bytes-per-key": "keysBytesPerKey",
    "dataset.bytes": "datasetBytes",
    "dataset.percentage": "datasetPercentage",
    "peak.percentage": "peakPercentage",
    "allocator.allocated": "allocatorAllocated",
    "allocator.active": "allocatorActive",
    "allocator.resident": "allocatorResident",
    "allocator-fragmentation.ratio": "allocatorFragmentationRatio",
    "allocator-fragmentation.bytes": "allocatorFragmentationBytes",
    "allocator-rss.ratio": "allocatorRssRatio",
    "allocator-rss.bytes": "allocatorRssBytes",
    "rss-overhead.ratio": "rssOverheadRatio",
    "rss-overhead.bytes": "rssOverheadBytes",
    fragmentation: "fragmentation",
    "fragmentation.bytes": "fragmentationBytes"
  };
  var DB_FIELDS_MAPPING = {
    "overhead.hashtable.main": "overheadHashtableMain",
    "overhead.hashtable.expires": "overheadHashtableExpires"
  };
  function transformReply(rawReply) {
    const reply = {
      db: {}
    };
    for (let i = 0;i < rawReply.length; i += 2) {
      const key = rawReply[i];
      if (key.startsWith("db.")) {
        const dbTuples = rawReply[i + 1], db = {};
        for (let j = 0;j < dbTuples.length; j += 2) {
          db[DB_FIELDS_MAPPING[dbTuples[j]]] = dbTuples[j + 1];
        }
        reply.db[key.substring(3)] = db;
        continue;
      }
      reply[FIELDS_MAPPING[key]] = Number(rawReply[i + 1]);
    }
    return reply;
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/MEMORY_USAGE.js
var require_MEMORY_USAGE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, options) {
    const args = ["MEMORY", "USAGE", key];
    if (options?.SAMPLES) {
      args.push("SAMPLES", options.SAMPLES.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/MODULE_LIST.js
var require_MODULE_LIST = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["MODULE", "LIST"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/MODULE_LOAD.js
var require_MODULE_LOAD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(path, moduleArgs) {
    const args = ["MODULE", "LOAD", path];
    if (moduleArgs) {
      args.push(...moduleArgs);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/MODULE_UNLOAD.js
var require_MODULE_UNLOAD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(name) {
    return ["MODULE", "UNLOAD", name];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/MOVE.js
var require_MOVE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, db) {
    return ["MOVE", key, db.toString()];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/PING.js
var require_PING = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(message) {
    const args = ["PING"];
    if (message) {
      args.push(message);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/PUBSUB_CHANNELS.js
var require_PUBSUB_CHANNELS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments(pattern) {
    const args = ["PUBSUB", "CHANNELS"];
    if (pattern) {
      args.push(pattern);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/PUBSUB_NUMPAT.js
var require_PUBSUB_NUMPAT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments() {
    return ["PUBSUB", "NUMPAT"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/PUBSUB_NUMSUB.js
var require_PUBSUB_NUMSUB = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.IS_READ_ONLY = true;
  function transformArguments(channels) {
    const args = ["PUBSUB", "NUMSUB"];
    if (channels)
      return (0, generic_transformers_1.pushVerdictArguments)(args, channels);
    return args;
  }
  exports.transformArguments = transformArguments;
  function transformReply(rawReply) {
    const transformedReply = Object.create(null);
    for (let i = 0;i < rawReply.length; i += 2) {
      transformedReply[rawReply[i]] = rawReply[i + 1];
    }
    return transformedReply;
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/PUBSUB_SHARDCHANNELS.js
var require_PUBSUB_SHARDCHANNELS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments(pattern) {
    const args = ["PUBSUB", "SHARDCHANNELS"];
    if (pattern)
      args.push(pattern);
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/PUBSUB_SHARDNUMSUB.js
var require_PUBSUB_SHARDNUMSUB = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.IS_READ_ONLY = true;
  function transformArguments(channels) {
    const args = ["PUBSUB", "SHARDNUMSUB"];
    if (channels)
      return (0, generic_transformers_1.pushVerdictArguments)(args, channels);
    return args;
  }
  exports.transformArguments = transformArguments;
  function transformReply(rawReply) {
    const transformedReply = Object.create(null);
    for (let i = 0;i < rawReply.length; i += 2) {
      transformedReply[rawReply[i]] = rawReply[i + 1];
    }
    return transformedReply;
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/RANDOMKEY.js
var require_RANDOMKEY = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments() {
    return ["RANDOMKEY"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/READONLY.js
var require_READONLY = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["READONLY"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/READWRITE.js
var require_READWRITE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["READWRITE"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/REPLICAOF.js
var require_REPLICAOF = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(host, port) {
    return ["REPLICAOF", host, port.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/RESTORE-ASKING.js
var require_RESTORE_ASKING = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["RESTORE-ASKING"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/ROLE.js
var require_ROLE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments() {
    return ["ROLE"];
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    switch (reply[0]) {
      case "master":
        return {
          role: "master",
          replicationOffest: reply[1],
          replicas: reply[2].map(([ip, port, replicationOffest]) => ({
            ip,
            port: Number(port),
            replicationOffest: Number(replicationOffest)
          }))
        };
      case "slave":
        return {
          role: "slave",
          master: {
            ip: reply[1],
            port: reply[2]
          },
          state: reply[3],
          dataReceived: reply[4]
        };
      case "sentinel":
        return {
          role: "sentinel",
          masterNames: reply[1]
        };
    }
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/SAVE.js
var require_SAVE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["SAVE"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SCAN.js
var require_SCAN = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.IS_READ_ONLY = true;
  function transformArguments(cursor, options) {
    const args = (0, generic_transformers_1.pushScanArguments)(["SCAN"], cursor, options);
    if (options?.TYPE) {
      args.push("TYPE", options.TYPE);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  function transformReply([cursor, keys]) {
    return {
      cursor: Number(cursor),
      keys
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/SCRIPT_DEBUG.js
var require_SCRIPT_DEBUG = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(mode) {
    return ["SCRIPT", "DEBUG", mode];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SCRIPT_EXISTS.js
var require_SCRIPT_EXISTS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = undefined;
  var generic_transformers_1 = require_generic_transformers();
  function transformArguments(sha1) {
    return (0, generic_transformers_1.pushVerdictArguments)(["SCRIPT", "EXISTS"], sha1);
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_2 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_2.transformBooleanArrayReply;
  } });
});

// node_modules/@redis/client/dist/lib/commands/SCRIPT_FLUSH.js
var require_SCRIPT_FLUSH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(mode) {
    const args = ["SCRIPT", "FLUSH"];
    if (mode) {
      args.push(mode);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SCRIPT_KILL.js
var require_SCRIPT_KILL = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["SCRIPT", "KILL"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SCRIPT_LOAD.js
var require_SCRIPT_LOAD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(script) {
    return ["SCRIPT", "LOAD", script];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SHUTDOWN.js
var require_SHUTDOWN = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(mode) {
    const args = ["SHUTDOWN"];
    if (mode) {
      args.push(mode);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/SWAPDB.js
var require_SWAPDB = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(index1, index2) {
    return ["SWAPDB", index1.toString(), index2.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/TIME.js
var require_TIME = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = undefined;
  function transformArguments() {
    return ["TIME"];
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    const seconds = Number(reply[0]), microseconds = Number(reply[1]), d = new Date(seconds * 1000 + microseconds / 1000);
    d.microseconds = microseconds;
    return d;
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/client/dist/lib/commands/UNWATCH.js
var require_UNWATCH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["UNWATCH"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/commands/WAIT.js
var require_WAIT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(numberOfReplicas, timeout) {
    return ["WAIT", numberOfReplicas.toString(), timeout.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/client/dist/lib/client/commands.js
var require_commands2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var commands_1 = require_commands();
  var ACL_CAT = require_ACL_CAT();
  var ACL_DELUSER = require_ACL_DELUSER();
  var ACL_DRYRUN = require_ACL_DRYRUN();
  var ACL_GENPASS = require_ACL_GENPASS();
  var ACL_GETUSER = require_ACL_GETUSER();
  var ACL_LIST = require_ACL_LIST();
  var ACL_LOAD = require_ACL_LOAD();
  var ACL_LOG_RESET = require_ACL_LOG_RESET();
  var ACL_LOG = require_ACL_LOG();
  var ACL_SAVE = require_ACL_SAVE();
  var ACL_SETUSER = require_ACL_SETUSER();
  var ACL_USERS = require_ACL_USERS();
  var ACL_WHOAMI = require_ACL_WHOAMI();
  var ASKING = require_ASKING();
  var AUTH = require_AUTH();
  var BGREWRITEAOF = require_BGREWRITEAOF();
  var BGSAVE = require_BGSAVE();
  var CLIENT_CACHING = require_CLIENT_CACHING();
  var CLIENT_GETNAME = require_CLIENT_GETNAME();
  var CLIENT_GETREDIR = require_CLIENT_GETREDIR();
  var CLIENT_ID = require_CLIENT_ID();
  var CLIENT_KILL = require_CLIENT_KILL();
  var CLIENT_LIST = require_CLIENT_LIST();
  var CLIENT_NO_EVICT = require_CLIENT_NO_EVICT();
  var CLIENT_NO_TOUCH = require_CLIENT_NO_TOUCH();
  var CLIENT_PAUSE = require_CLIENT_PAUSE();
  var CLIENT_SETNAME = require_CLIENT_SETNAME();
  var CLIENT_TRACKING = require_CLIENT_TRACKING();
  var CLIENT_TRACKINGINFO = require_CLIENT_TRACKINGINFO();
  var CLIENT_UNPAUSE = require_CLIENT_UNPAUSE();
  var CLIENT_INFO = require_CLIENT_INFO();
  var CLUSTER_ADDSLOTS = require_CLUSTER_ADDSLOTS();
  var CLUSTER_ADDSLOTSRANGE = require_CLUSTER_ADDSLOTSRANGE();
  var CLUSTER_BUMPEPOCH = require_CLUSTER_BUMPEPOCH();
  var CLUSTER_COUNT_FAILURE_REPORTS = require_CLUSTER_COUNT_FAILURE_REPORTS();
  var CLUSTER_COUNTKEYSINSLOT = require_CLUSTER_COUNTKEYSINSLOT();
  var CLUSTER_DELSLOTS = require_CLUSTER_DELSLOTS();
  var CLUSTER_DELSLOTSRANGE = require_CLUSTER_DELSLOTSRANGE();
  var CLUSTER_FAILOVER = require_CLUSTER_FAILOVER();
  var CLUSTER_FLUSHSLOTS = require_CLUSTER_FLUSHSLOTS();
  var CLUSTER_FORGET = require_CLUSTER_FORGET();
  var CLUSTER_GETKEYSINSLOT = require_CLUSTER_GETKEYSINSLOT();
  var CLUSTER_INFO = require_CLUSTER_INFO();
  var CLUSTER_KEYSLOT = require_CLUSTER_KEYSLOT();
  var CLUSTER_LINKS = require_CLUSTER_LINKS();
  var CLUSTER_MEET = require_CLUSTER_MEET();
  var CLUSTER_MYID = require_CLUSTER_MYID();
  var CLUSTER_MYSHARDID = require_CLUSTER_MYSHARDID();
  var CLUSTER_NODES = require_CLUSTER_NODES();
  var CLUSTER_REPLICAS = require_CLUSTER_REPLICAS();
  var CLUSTER_REPLICATE = require_CLUSTER_REPLICATE();
  var CLUSTER_RESET = require_CLUSTER_RESET();
  var CLUSTER_SAVECONFIG = require_CLUSTER_SAVECONFIG();
  var CLUSTER_SET_CONFIG_EPOCH = require_CLUSTER_SET_CONFIG_EPOCH();
  var CLUSTER_SETSLOT = require_CLUSTER_SETSLOT();
  var CLUSTER_SLOTS = require_CLUSTER_SLOTS();
  var COMMAND_COUNT = require_COMMAND_COUNT();
  var COMMAND_GETKEYS = require_COMMAND_GETKEYS();
  var COMMAND_GETKEYSANDFLAGS = require_COMMAND_GETKEYSANDFLAGS();
  var COMMAND_INFO = require_COMMAND_INFO();
  var COMMAND_LIST = require_COMMAND_LIST();
  var COMMAND = require_COMMAND();
  var CONFIG_GET = require_CONFIG_GET();
  var CONFIG_RESETASTAT = require_CONFIG_RESETSTAT();
  var CONFIG_REWRITE = require_CONFIG_REWRITE();
  var CONFIG_SET = require_CONFIG_SET();
  var DBSIZE = require_DBSIZE();
  var DISCARD = require_DISCARD();
  var ECHO = require_ECHO();
  var FAILOVER = require_FAILOVER();
  var FLUSHALL = require_FLUSHALL();
  var FLUSHDB = require_FLUSHDB();
  var FUNCTION_DELETE = require_FUNCTION_DELETE();
  var FUNCTION_DUMP = require_FUNCTION_DUMP();
  var FUNCTION_FLUSH = require_FUNCTION_FLUSH();
  var FUNCTION_KILL = require_FUNCTION_KILL();
  var FUNCTION_LIST_WITHCODE = require_FUNCTION_LIST_WITHCODE();
  var FUNCTION_LIST = require_FUNCTION_LIST();
  var FUNCTION_LOAD = require_FUNCTION_LOAD();
  var FUNCTION_RESTORE = require_FUNCTION_RESTORE();
  var FUNCTION_STATS = require_FUNCTION_STATS();
  var HELLO = require_HELLO();
  var INFO = require_INFO();
  var KEYS = require_KEYS();
  var LASTSAVE = require_LASTSAVE();
  var LATENCY_DOCTOR = require_LATENCY_DOCTOR();
  var LATENCY_GRAPH = require_LATENCY_GRAPH();
  var LATENCY_HISTORY = require_LATENCY_HISTORY();
  var LATENCY_LATEST = require_LATENCY_LATEST();
  var LOLWUT = require_LOLWUT();
  var MEMORY_DOCTOR = require_MEMORY_DOCTOR();
  var MEMORY_MALLOC_STATS = require_MEMORY_MALLOC_STATS();
  var MEMORY_PURGE = require_MEMORY_PURGE();
  var MEMORY_STATS = require_MEMORY_STATS();
  var MEMORY_USAGE = require_MEMORY_USAGE();
  var MODULE_LIST = require_MODULE_LIST();
  var MODULE_LOAD = require_MODULE_LOAD();
  var MODULE_UNLOAD = require_MODULE_UNLOAD();
  var MOVE = require_MOVE();
  var PING = require_PING();
  var PUBSUB_CHANNELS = require_PUBSUB_CHANNELS();
  var PUBSUB_NUMPAT = require_PUBSUB_NUMPAT();
  var PUBSUB_NUMSUB = require_PUBSUB_NUMSUB();
  var PUBSUB_SHARDCHANNELS = require_PUBSUB_SHARDCHANNELS();
  var PUBSUB_SHARDNUMSUB = require_PUBSUB_SHARDNUMSUB();
  var RANDOMKEY = require_RANDOMKEY();
  var READONLY = require_READONLY();
  var READWRITE = require_READWRITE();
  var REPLICAOF = require_REPLICAOF();
  var RESTORE_ASKING = require_RESTORE_ASKING();
  var ROLE = require_ROLE();
  var SAVE = require_SAVE();
  var SCAN = require_SCAN();
  var SCRIPT_DEBUG = require_SCRIPT_DEBUG();
  var SCRIPT_EXISTS = require_SCRIPT_EXISTS();
  var SCRIPT_FLUSH = require_SCRIPT_FLUSH();
  var SCRIPT_KILL = require_SCRIPT_KILL();
  var SCRIPT_LOAD = require_SCRIPT_LOAD();
  var SHUTDOWN = require_SHUTDOWN();
  var SWAPDB = require_SWAPDB();
  var TIME = require_TIME();
  var UNWATCH = require_UNWATCH();
  var WAIT = require_WAIT();
  exports.default = {
    ...commands_1.default,
    ACL_CAT,
    aclCat: ACL_CAT,
    ACL_DELUSER,
    aclDelUser: ACL_DELUSER,
    ACL_DRYRUN,
    aclDryRun: ACL_DRYRUN,
    ACL_GENPASS,
    aclGenPass: ACL_GENPASS,
    ACL_GETUSER,
    aclGetUser: ACL_GETUSER,
    ACL_LIST,
    aclList: ACL_LIST,
    ACL_LOAD,
    aclLoad: ACL_LOAD,
    ACL_LOG_RESET,
    aclLogReset: ACL_LOG_RESET,
    ACL_LOG,
    aclLog: ACL_LOG,
    ACL_SAVE,
    aclSave: ACL_SAVE,
    ACL_SETUSER,
    aclSetUser: ACL_SETUSER,
    ACL_USERS,
    aclUsers: ACL_USERS,
    ACL_WHOAMI,
    aclWhoAmI: ACL_WHOAMI,
    ASKING,
    asking: ASKING,
    AUTH,
    auth: AUTH,
    BGREWRITEAOF,
    bgRewriteAof: BGREWRITEAOF,
    BGSAVE,
    bgSave: BGSAVE,
    CLIENT_CACHING,
    clientCaching: CLIENT_CACHING,
    CLIENT_GETNAME,
    clientGetName: CLIENT_GETNAME,
    CLIENT_GETREDIR,
    clientGetRedir: CLIENT_GETREDIR,
    CLIENT_ID,
    clientId: CLIENT_ID,
    CLIENT_KILL,
    clientKill: CLIENT_KILL,
    "CLIENT_NO-EVICT": CLIENT_NO_EVICT,
    clientNoEvict: CLIENT_NO_EVICT,
    "CLIENT_NO-TOUCH": CLIENT_NO_TOUCH,
    clientNoTouch: CLIENT_NO_TOUCH,
    CLIENT_LIST,
    clientList: CLIENT_LIST,
    CLIENT_PAUSE,
    clientPause: CLIENT_PAUSE,
    CLIENT_SETNAME,
    clientSetName: CLIENT_SETNAME,
    CLIENT_TRACKING,
    clientTracking: CLIENT_TRACKING,
    CLIENT_TRACKINGINFO,
    clientTrackingInfo: CLIENT_TRACKINGINFO,
    CLIENT_UNPAUSE,
    clientUnpause: CLIENT_UNPAUSE,
    CLIENT_INFO,
    clientInfo: CLIENT_INFO,
    CLUSTER_ADDSLOTS,
    clusterAddSlots: CLUSTER_ADDSLOTS,
    CLUSTER_ADDSLOTSRANGE,
    clusterAddSlotsRange: CLUSTER_ADDSLOTSRANGE,
    CLUSTER_BUMPEPOCH,
    clusterBumpEpoch: CLUSTER_BUMPEPOCH,
    CLUSTER_COUNT_FAILURE_REPORTS,
    clusterCountFailureReports: CLUSTER_COUNT_FAILURE_REPORTS,
    CLUSTER_COUNTKEYSINSLOT,
    clusterCountKeysInSlot: CLUSTER_COUNTKEYSINSLOT,
    CLUSTER_DELSLOTS,
    clusterDelSlots: CLUSTER_DELSLOTS,
    CLUSTER_DELSLOTSRANGE,
    clusterDelSlotsRange: CLUSTER_DELSLOTSRANGE,
    CLUSTER_FAILOVER,
    clusterFailover: CLUSTER_FAILOVER,
    CLUSTER_FLUSHSLOTS,
    clusterFlushSlots: CLUSTER_FLUSHSLOTS,
    CLUSTER_FORGET,
    clusterForget: CLUSTER_FORGET,
    CLUSTER_GETKEYSINSLOT,
    clusterGetKeysInSlot: CLUSTER_GETKEYSINSLOT,
    CLUSTER_INFO,
    clusterInfo: CLUSTER_INFO,
    CLUSTER_KEYSLOT,
    clusterKeySlot: CLUSTER_KEYSLOT,
    CLUSTER_LINKS,
    clusterLinks: CLUSTER_LINKS,
    CLUSTER_MEET,
    clusterMeet: CLUSTER_MEET,
    CLUSTER_MYID,
    clusterMyId: CLUSTER_MYID,
    CLUSTER_MYSHARDID,
    clusterMyShardId: CLUSTER_MYSHARDID,
    CLUSTER_NODES,
    clusterNodes: CLUSTER_NODES,
    CLUSTER_REPLICAS,
    clusterReplicas: CLUSTER_REPLICAS,
    CLUSTER_REPLICATE,
    clusterReplicate: CLUSTER_REPLICATE,
    CLUSTER_RESET,
    clusterReset: CLUSTER_RESET,
    CLUSTER_SAVECONFIG,
    clusterSaveConfig: CLUSTER_SAVECONFIG,
    CLUSTER_SET_CONFIG_EPOCH,
    clusterSetConfigEpoch: CLUSTER_SET_CONFIG_EPOCH,
    CLUSTER_SETSLOT,
    clusterSetSlot: CLUSTER_SETSLOT,
    CLUSTER_SLOTS,
    clusterSlots: CLUSTER_SLOTS,
    COMMAND_COUNT,
    commandCount: COMMAND_COUNT,
    COMMAND_GETKEYS,
    commandGetKeys: COMMAND_GETKEYS,
    COMMAND_GETKEYSANDFLAGS,
    commandGetKeysAndFlags: COMMAND_GETKEYSANDFLAGS,
    COMMAND_INFO,
    commandInfo: COMMAND_INFO,
    COMMAND_LIST,
    commandList: COMMAND_LIST,
    COMMAND,
    command: COMMAND,
    CONFIG_GET,
    configGet: CONFIG_GET,
    CONFIG_RESETASTAT,
    configResetStat: CONFIG_RESETASTAT,
    CONFIG_REWRITE,
    configRewrite: CONFIG_REWRITE,
    CONFIG_SET,
    configSet: CONFIG_SET,
    DBSIZE,
    dbSize: DBSIZE,
    DISCARD,
    discard: DISCARD,
    ECHO,
    echo: ECHO,
    FAILOVER,
    failover: FAILOVER,
    FLUSHALL,
    flushAll: FLUSHALL,
    FLUSHDB,
    flushDb: FLUSHDB,
    FUNCTION_DELETE,
    functionDelete: FUNCTION_DELETE,
    FUNCTION_DUMP,
    functionDump: FUNCTION_DUMP,
    FUNCTION_FLUSH,
    functionFlush: FUNCTION_FLUSH,
    FUNCTION_KILL,
    functionKill: FUNCTION_KILL,
    FUNCTION_LIST_WITHCODE,
    functionListWithCode: FUNCTION_LIST_WITHCODE,
    FUNCTION_LIST,
    functionList: FUNCTION_LIST,
    FUNCTION_LOAD,
    functionLoad: FUNCTION_LOAD,
    FUNCTION_RESTORE,
    functionRestore: FUNCTION_RESTORE,
    FUNCTION_STATS,
    functionStats: FUNCTION_STATS,
    HELLO,
    hello: HELLO,
    INFO,
    info: INFO,
    KEYS,
    keys: KEYS,
    LASTSAVE,
    lastSave: LASTSAVE,
    LATENCY_DOCTOR,
    latencyDoctor: LATENCY_DOCTOR,
    LATENCY_GRAPH,
    latencyGraph: LATENCY_GRAPH,
    LATENCY_HISTORY,
    latencyHistory: LATENCY_HISTORY,
    LATENCY_LATEST,
    latencyLatest: LATENCY_LATEST,
    LOLWUT,
    lolwut: LOLWUT,
    MEMORY_DOCTOR,
    memoryDoctor: MEMORY_DOCTOR,
    "MEMORY_MALLOC-STATS": MEMORY_MALLOC_STATS,
    memoryMallocStats: MEMORY_MALLOC_STATS,
    MEMORY_PURGE,
    memoryPurge: MEMORY_PURGE,
    MEMORY_STATS,
    memoryStats: MEMORY_STATS,
    MEMORY_USAGE,
    memoryUsage: MEMORY_USAGE,
    MODULE_LIST,
    moduleList: MODULE_LIST,
    MODULE_LOAD,
    moduleLoad: MODULE_LOAD,
    MODULE_UNLOAD,
    moduleUnload: MODULE_UNLOAD,
    MOVE,
    move: MOVE,
    PING,
    ping: PING,
    PUBSUB_CHANNELS,
    pubSubChannels: PUBSUB_CHANNELS,
    PUBSUB_NUMPAT,
    pubSubNumPat: PUBSUB_NUMPAT,
    PUBSUB_NUMSUB,
    pubSubNumSub: PUBSUB_NUMSUB,
    PUBSUB_SHARDCHANNELS,
    pubSubShardChannels: PUBSUB_SHARDCHANNELS,
    PUBSUB_SHARDNUMSUB,
    pubSubShardNumSub: PUBSUB_SHARDNUMSUB,
    RANDOMKEY,
    randomKey: RANDOMKEY,
    READONLY,
    readonly: READONLY,
    READWRITE,
    readwrite: READWRITE,
    REPLICAOF,
    replicaOf: REPLICAOF,
    "RESTORE-ASKING": RESTORE_ASKING,
    restoreAsking: RESTORE_ASKING,
    ROLE,
    role: ROLE,
    SAVE,
    save: SAVE,
    SCAN,
    scan: SCAN,
    SCRIPT_DEBUG,
    scriptDebug: SCRIPT_DEBUG,
    SCRIPT_EXISTS,
    scriptExists: SCRIPT_EXISTS,
    SCRIPT_FLUSH,
    scriptFlush: SCRIPT_FLUSH,
    SCRIPT_KILL,
    scriptKill: SCRIPT_KILL,
    SCRIPT_LOAD,
    scriptLoad: SCRIPT_LOAD,
    SHUTDOWN,
    shutdown: SHUTDOWN,
    SWAPDB,
    swapDb: SWAPDB,
    TIME,
    time: TIME,
    UNWATCH,
    unwatch: UNWATCH,
    WAIT,
    wait: WAIT
  };
});

// node_modules/@redis/client/dist/lib/errors.js
var require_errors = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.MultiErrorReply = exports.ErrorReply = exports.ReconnectStrategyError = exports.RootNodesUnavailableError = exports.SocketClosedUnexpectedlyError = exports.DisconnectsClientError = exports.ClientOfflineError = exports.ClientClosedError = exports.ConnectionTimeoutError = exports.WatchError = exports.AbortError = undefined;

  class AbortError extends Error {
    constructor() {
      super("The command was aborted");
    }
  }
  exports.AbortError = AbortError;

  class WatchError extends Error {
    constructor() {
      super("One (or more) of the watched keys has been changed");
    }
  }
  exports.WatchError = WatchError;

  class ConnectionTimeoutError extends Error {
    constructor() {
      super("Connection timeout");
    }
  }
  exports.ConnectionTimeoutError = ConnectionTimeoutError;

  class ClientClosedError extends Error {
    constructor() {
      super("The client is closed");
    }
  }
  exports.ClientClosedError = ClientClosedError;

  class ClientOfflineError extends Error {
    constructor() {
      super("The client is offline");
    }
  }
  exports.ClientOfflineError = ClientOfflineError;

  class DisconnectsClientError extends Error {
    constructor() {
      super("Disconnects client");
    }
  }
  exports.DisconnectsClientError = DisconnectsClientError;

  class SocketClosedUnexpectedlyError extends Error {
    constructor() {
      super("Socket closed unexpectedly");
    }
  }
  exports.SocketClosedUnexpectedlyError = SocketClosedUnexpectedlyError;

  class RootNodesUnavailableError extends Error {
    constructor() {
      super("All the root nodes are unavailable");
    }
  }
  exports.RootNodesUnavailableError = RootNodesUnavailableError;

  class ReconnectStrategyError extends Error {
    constructor(originalError, socketError) {
      super(originalError.message);
      Object.defineProperty(this, "originalError", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: undefined
      });
      Object.defineProperty(this, "socketError", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: undefined
      });
      this.originalError = originalError;
      this.socketError = socketError;
    }
  }
  exports.ReconnectStrategyError = ReconnectStrategyError;

  class ErrorReply extends Error {
    constructor(message) {
      super(message);
      this.stack = undefined;
    }
  }
  exports.ErrorReply = ErrorReply;

  class MultiErrorReply extends ErrorReply {
    constructor(replies, errorIndexes) {
      super(`${errorIndexes.length} commands failed, see .replies and .errorIndexes for more information`);
      Object.defineProperty(this, "replies", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: undefined
      });
      Object.defineProperty(this, "errorIndexes", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: undefined
      });
      this.replies = replies;
      this.errorIndexes = errorIndexes;
    }
    *errors() {
      for (const index of this.errorIndexes) {
        yield this.replies[index];
      }
    }
  }
  exports.MultiErrorReply = MultiErrorReply;
});

// node_modules/@redis/client/dist/lib/utils.js
var require_utils = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.promiseTimeout = undefined;
  function promiseTimeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  exports.promiseTimeout = promiseTimeout;
});

// node_modules/@redis/client/dist/lib/client/socket.js
var require_socket = __commonJS((exports) => {
  var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m")
      throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var _RedisSocket_instances;
  var _a;
  var _RedisSocket_initiateOptions;
  var _RedisSocket_isTlsSocket;
  var _RedisSocket_initiator;
  var _RedisSocket_options;
  var _RedisSocket_socket;
  var _RedisSocket_isOpen;
  var _RedisSocket_isReady;
  var _RedisSocket_writableNeedDrain;
  var _RedisSocket_isSocketUnrefed;
  var _RedisSocket_reconnectStrategy;
  var _RedisSocket_shouldReconnect;
  var _RedisSocket_connect;
  var _RedisSocket_createSocket;
  var _RedisSocket_createNetSocket;
  var _RedisSocket_createTlsSocket;
  var _RedisSocket_onSocketError;
  var _RedisSocket_disconnect;
  var _RedisSocket_isCorked;
  Object.defineProperty(exports, "__esModule", { value: true });
  var events_1 = __require("node:events");
  var net = __require("node:net");
  var tls = __require("node:tls");
  var errors_1 = require_errors();
  var utils_1 = require_utils();

  class RedisSocket extends events_1.EventEmitter {
    get isOpen() {
      return __classPrivateFieldGet(this, _RedisSocket_isOpen, "f");
    }
    get isReady() {
      return __classPrivateFieldGet(this, _RedisSocket_isReady, "f");
    }
    get writableNeedDrain() {
      return __classPrivateFieldGet(this, _RedisSocket_writableNeedDrain, "f");
    }
    constructor(initiator, options) {
      super();
      _RedisSocket_instances.add(this);
      _RedisSocket_initiator.set(this, undefined);
      _RedisSocket_options.set(this, undefined);
      _RedisSocket_socket.set(this, undefined);
      _RedisSocket_isOpen.set(this, false);
      _RedisSocket_isReady.set(this, false);
      _RedisSocket_writableNeedDrain.set(this, false);
      _RedisSocket_isSocketUnrefed.set(this, false);
      _RedisSocket_isCorked.set(this, false);
      __classPrivateFieldSet(this, _RedisSocket_initiator, initiator, "f");
      __classPrivateFieldSet(this, _RedisSocket_options, __classPrivateFieldGet(_a, _a, "m", _RedisSocket_initiateOptions).call(_a, options), "f");
    }
    async connect() {
      if (__classPrivateFieldGet(this, _RedisSocket_isOpen, "f")) {
        throw new Error("Socket already opened");
      }
      __classPrivateFieldSet(this, _RedisSocket_isOpen, true, "f");
      return __classPrivateFieldGet(this, _RedisSocket_instances, "m", _RedisSocket_connect).call(this);
    }
    writeCommand(args) {
      if (!__classPrivateFieldGet(this, _RedisSocket_socket, "f")) {
        throw new errors_1.ClientClosedError;
      }
      for (const toWrite of args) {
        __classPrivateFieldSet(this, _RedisSocket_writableNeedDrain, !__classPrivateFieldGet(this, _RedisSocket_socket, "f").write(toWrite), "f");
      }
    }
    disconnect() {
      if (!__classPrivateFieldGet(this, _RedisSocket_isOpen, "f")) {
        throw new errors_1.ClientClosedError;
      }
      __classPrivateFieldSet(this, _RedisSocket_isOpen, false, "f");
      __classPrivateFieldGet(this, _RedisSocket_instances, "m", _RedisSocket_disconnect).call(this);
    }
    async quit(fn) {
      if (!__classPrivateFieldGet(this, _RedisSocket_isOpen, "f")) {
        throw new errors_1.ClientClosedError;
      }
      __classPrivateFieldSet(this, _RedisSocket_isOpen, false, "f");
      const reply = await fn();
      __classPrivateFieldGet(this, _RedisSocket_instances, "m", _RedisSocket_disconnect).call(this);
      return reply;
    }
    cork() {
      if (!__classPrivateFieldGet(this, _RedisSocket_socket, "f") || __classPrivateFieldGet(this, _RedisSocket_isCorked, "f")) {
        return;
      }
      __classPrivateFieldGet(this, _RedisSocket_socket, "f").cork();
      __classPrivateFieldSet(this, _RedisSocket_isCorked, true, "f");
      setImmediate(() => {
        __classPrivateFieldGet(this, _RedisSocket_socket, "f")?.uncork();
        __classPrivateFieldSet(this, _RedisSocket_isCorked, false, "f");
      });
    }
    ref() {
      __classPrivateFieldSet(this, _RedisSocket_isSocketUnrefed, false, "f");
      __classPrivateFieldGet(this, _RedisSocket_socket, "f")?.ref();
    }
    unref() {
      __classPrivateFieldSet(this, _RedisSocket_isSocketUnrefed, true, "f");
      __classPrivateFieldGet(this, _RedisSocket_socket, "f")?.unref();
    }
  }
  _a = RedisSocket, _RedisSocket_initiator = new WeakMap, _RedisSocket_options = new WeakMap, _RedisSocket_socket = new WeakMap, _RedisSocket_isOpen = new WeakMap, _RedisSocket_isReady = new WeakMap, _RedisSocket_writableNeedDrain = new WeakMap, _RedisSocket_isSocketUnrefed = new WeakMap, _RedisSocket_isCorked = new WeakMap, _RedisSocket_instances = new WeakSet, _RedisSocket_initiateOptions = function _RedisSocket_initiateOptions(options) {
    var _b, _c;
    options ?? (options = {});
    if (!options.path) {
      (_b = options).port ?? (_b.port = 6379);
      (_c = options).host ?? (_c.host = "localhost");
    }
    options.connectTimeout ?? (options.connectTimeout = 5000);
    options.keepAlive ?? (options.keepAlive = 5000);
    options.noDelay ?? (options.noDelay = true);
    return options;
  }, _RedisSocket_isTlsSocket = function _RedisSocket_isTlsSocket(options) {
    return options.tls === true;
  }, _RedisSocket_reconnectStrategy = function _RedisSocket_reconnectStrategy(retries, cause) {
    if (__classPrivateFieldGet(this, _RedisSocket_options, "f").reconnectStrategy === false) {
      return false;
    } else if (typeof __classPrivateFieldGet(this, _RedisSocket_options, "f").reconnectStrategy === "number") {
      return __classPrivateFieldGet(this, _RedisSocket_options, "f").reconnectStrategy;
    } else if (__classPrivateFieldGet(this, _RedisSocket_options, "f").reconnectStrategy) {
      try {
        const retryIn = __classPrivateFieldGet(this, _RedisSocket_options, "f").reconnectStrategy(retries, cause);
        if (retryIn !== false && !(retryIn instanceof Error) && typeof retryIn !== "number") {
          throw new TypeError(`Reconnect strategy should return \`false | Error | number\`, got ${retryIn} instead`);
        }
        return retryIn;
      } catch (err) {
        this.emit("error", err);
      }
    }
    return Math.min(retries * 50, 500);
  }, _RedisSocket_shouldReconnect = function _RedisSocket_shouldReconnect(retries, cause) {
    const retryIn = __classPrivateFieldGet(this, _RedisSocket_instances, "m", _RedisSocket_reconnectStrategy).call(this, retries, cause);
    if (retryIn === false) {
      __classPrivateFieldSet(this, _RedisSocket_isOpen, false, "f");
      this.emit("error", cause);
      return cause;
    } else if (retryIn instanceof Error) {
      __classPrivateFieldSet(this, _RedisSocket_isOpen, false, "f");
      this.emit("error", cause);
      return new errors_1.ReconnectStrategyError(retryIn, cause);
    }
    return retryIn;
  }, _RedisSocket_connect = async function _RedisSocket_connect() {
    let retries = 0;
    do {
      try {
        __classPrivateFieldSet(this, _RedisSocket_socket, await __classPrivateFieldGet(this, _RedisSocket_instances, "m", _RedisSocket_createSocket).call(this), "f");
        __classPrivateFieldSet(this, _RedisSocket_writableNeedDrain, false, "f");
        this.emit("connect");
        try {
          await __classPrivateFieldGet(this, _RedisSocket_initiator, "f").call(this);
        } catch (err) {
          __classPrivateFieldGet(this, _RedisSocket_socket, "f").destroy();
          __classPrivateFieldSet(this, _RedisSocket_socket, undefined, "f");
          throw err;
        }
        __classPrivateFieldSet(this, _RedisSocket_isReady, true, "f");
        this.emit("ready");
      } catch (err) {
        const retryIn = __classPrivateFieldGet(this, _RedisSocket_instances, "m", _RedisSocket_shouldReconnect).call(this, retries++, err);
        if (typeof retryIn !== "number") {
          throw retryIn;
        }
        this.emit("error", err);
        await (0, utils_1.promiseTimeout)(retryIn);
        this.emit("reconnecting");
      }
    } while (__classPrivateFieldGet(this, _RedisSocket_isOpen, "f") && !__classPrivateFieldGet(this, _RedisSocket_isReady, "f"));
  }, _RedisSocket_createSocket = function _RedisSocket_createSocket() {
    return new Promise((resolve, reject) => {
      const { connectEvent, socket } = __classPrivateFieldGet(_a, _a, "m", _RedisSocket_isTlsSocket).call(_a, __classPrivateFieldGet(this, _RedisSocket_options, "f")) ? __classPrivateFieldGet(this, _RedisSocket_instances, "m", _RedisSocket_createTlsSocket).call(this) : __classPrivateFieldGet(this, _RedisSocket_instances, "m", _RedisSocket_createNetSocket).call(this);
      if (__classPrivateFieldGet(this, _RedisSocket_options, "f").connectTimeout) {
        socket.setTimeout(__classPrivateFieldGet(this, _RedisSocket_options, "f").connectTimeout, () => socket.destroy(new errors_1.ConnectionTimeoutError));
      }
      if (__classPrivateFieldGet(this, _RedisSocket_isSocketUnrefed, "f")) {
        socket.unref();
      }
      socket.setNoDelay(__classPrivateFieldGet(this, _RedisSocket_options, "f").noDelay).once("error", reject).once(connectEvent, () => {
        socket.setTimeout(0).setKeepAlive(__classPrivateFieldGet(this, _RedisSocket_options, "f").keepAlive !== false, __classPrivateFieldGet(this, _RedisSocket_options, "f").keepAlive || 0).off("error", reject).once("error", (err) => __classPrivateFieldGet(this, _RedisSocket_instances, "m", _RedisSocket_onSocketError).call(this, err)).once("close", (hadError) => {
          if (!hadError && __classPrivateFieldGet(this, _RedisSocket_isOpen, "f") && __classPrivateFieldGet(this, _RedisSocket_socket, "f") === socket) {
            __classPrivateFieldGet(this, _RedisSocket_instances, "m", _RedisSocket_onSocketError).call(this, new errors_1.SocketClosedUnexpectedlyError);
          }
        }).on("drain", () => {
          __classPrivateFieldSet(this, _RedisSocket_writableNeedDrain, false, "f");
          this.emit("drain");
        }).on("data", (data) => this.emit("data", data));
        resolve(socket);
      });
    });
  }, _RedisSocket_createNetSocket = function _RedisSocket_createNetSocket() {
    return {
      connectEvent: "connect",
      socket: net.connect(__classPrivateFieldGet(this, _RedisSocket_options, "f"))
    };
  }, _RedisSocket_createTlsSocket = function _RedisSocket_createTlsSocket() {
    return {
      connectEvent: "secureConnect",
      socket: tls.connect(__classPrivateFieldGet(this, _RedisSocket_options, "f"))
    };
  }, _RedisSocket_onSocketError = function _RedisSocket_onSocketError(err) {
    const wasReady = __classPrivateFieldGet(this, _RedisSocket_isReady, "f");
    __classPrivateFieldSet(this, _RedisSocket_isReady, false, "f");
    this.emit("error", err);
    if (!wasReady || !__classPrivateFieldGet(this, _RedisSocket_isOpen, "f") || typeof __classPrivateFieldGet(this, _RedisSocket_instances, "m", _RedisSocket_shouldReconnect).call(this, 0, err) !== "number")
      return;
    this.emit("reconnecting");
    __classPrivateFieldGet(this, _RedisSocket_instances, "m", _RedisSocket_connect).call(this).catch(() => {});
  }, _RedisSocket_disconnect = function _RedisSocket_disconnect() {
    __classPrivateFieldSet(this, _RedisSocket_isReady, false, "f");
    if (__classPrivateFieldGet(this, _RedisSocket_socket, "f")) {
      __classPrivateFieldGet(this, _RedisSocket_socket, "f").destroy();
      __classPrivateFieldSet(this, _RedisSocket_socket, undefined, "f");
    }
    this.emit("end");
  };
  exports.default = RedisSocket;
});

// node_modules/yallist/iterator.js
var require_iterator = __commonJS((exports, module) => {
  module.exports = function(Yallist) {
    Yallist.prototype[Symbol.iterator] = function* () {
      for (let walker = this.head;walker; walker = walker.next) {
        yield walker.value;
      }
    };
  };
});

// node_modules/yallist/yallist.js
var require_yallist = __commonJS((exports, module) => {
  module.exports = Yallist;
  Yallist.Node = Node3;
  Yallist.create = Yallist;
  function Yallist(list) {
    var self = this;
    if (!(self instanceof Yallist)) {
      self = new Yallist;
    }
    self.tail = null;
    self.head = null;
    self.length = 0;
    if (list && typeof list.forEach === "function") {
      list.forEach(function(item) {
        self.push(item);
      });
    } else if (arguments.length > 0) {
      for (var i = 0, l = arguments.length;i < l; i++) {
        self.push(arguments[i]);
      }
    }
    return self;
  }
  Yallist.prototype.removeNode = function(node) {
    if (node.list !== this) {
      throw new Error("removing node which does not belong to this list");
    }
    var next = node.next;
    var prev = node.prev;
    if (next) {
      next.prev = prev;
    }
    if (prev) {
      prev.next = next;
    }
    if (node === this.head) {
      this.head = next;
    }
    if (node === this.tail) {
      this.tail = prev;
    }
    node.list.length--;
    node.next = null;
    node.prev = null;
    node.list = null;
    return next;
  };
  Yallist.prototype.unshiftNode = function(node) {
    if (node === this.head) {
      return;
    }
    if (node.list) {
      node.list.removeNode(node);
    }
    var head = this.head;
    node.list = this;
    node.next = head;
    if (head) {
      head.prev = node;
    }
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.length++;
  };
  Yallist.prototype.pushNode = function(node) {
    if (node === this.tail) {
      return;
    }
    if (node.list) {
      node.list.removeNode(node);
    }
    var tail = this.tail;
    node.list = this;
    node.prev = tail;
    if (tail) {
      tail.next = node;
    }
    this.tail = node;
    if (!this.head) {
      this.head = node;
    }
    this.length++;
  };
  Yallist.prototype.push = function() {
    for (var i = 0, l = arguments.length;i < l; i++) {
      push(this, arguments[i]);
    }
    return this.length;
  };
  Yallist.prototype.unshift = function() {
    for (var i = 0, l = arguments.length;i < l; i++) {
      unshift(this, arguments[i]);
    }
    return this.length;
  };
  Yallist.prototype.pop = function() {
    if (!this.tail) {
      return;
    }
    var res = this.tail.value;
    this.tail = this.tail.prev;
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }
    this.length--;
    return res;
  };
  Yallist.prototype.shift = function() {
    if (!this.head) {
      return;
    }
    var res = this.head.value;
    this.head = this.head.next;
    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    this.length--;
    return res;
  };
  Yallist.prototype.forEach = function(fn, thisp) {
    thisp = thisp || this;
    for (var walker = this.head, i = 0;walker !== null; i++) {
      fn.call(thisp, walker.value, i, this);
      walker = walker.next;
    }
  };
  Yallist.prototype.forEachReverse = function(fn, thisp) {
    thisp = thisp || this;
    for (var walker = this.tail, i = this.length - 1;walker !== null; i--) {
      fn.call(thisp, walker.value, i, this);
      walker = walker.prev;
    }
  };
  Yallist.prototype.get = function(n) {
    for (var i = 0, walker = this.head;walker !== null && i < n; i++) {
      walker = walker.next;
    }
    if (i === n && walker !== null) {
      return walker.value;
    }
  };
  Yallist.prototype.getReverse = function(n) {
    for (var i = 0, walker = this.tail;walker !== null && i < n; i++) {
      walker = walker.prev;
    }
    if (i === n && walker !== null) {
      return walker.value;
    }
  };
  Yallist.prototype.map = function(fn, thisp) {
    thisp = thisp || this;
    var res = new Yallist;
    for (var walker = this.head;walker !== null; ) {
      res.push(fn.call(thisp, walker.value, this));
      walker = walker.next;
    }
    return res;
  };
  Yallist.prototype.mapReverse = function(fn, thisp) {
    thisp = thisp || this;
    var res = new Yallist;
    for (var walker = this.tail;walker !== null; ) {
      res.push(fn.call(thisp, walker.value, this));
      walker = walker.prev;
    }
    return res;
  };
  Yallist.prototype.reduce = function(fn, initial) {
    var acc;
    var walker = this.head;
    if (arguments.length > 1) {
      acc = initial;
    } else if (this.head) {
      walker = this.head.next;
      acc = this.head.value;
    } else {
      throw new TypeError("Reduce of empty list with no initial value");
    }
    for (var i = 0;walker !== null; i++) {
      acc = fn(acc, walker.value, i);
      walker = walker.next;
    }
    return acc;
  };
  Yallist.prototype.reduceReverse = function(fn, initial) {
    var acc;
    var walker = this.tail;
    if (arguments.length > 1) {
      acc = initial;
    } else if (this.tail) {
      walker = this.tail.prev;
      acc = this.tail.value;
    } else {
      throw new TypeError("Reduce of empty list with no initial value");
    }
    for (var i = this.length - 1;walker !== null; i--) {
      acc = fn(acc, walker.value, i);
      walker = walker.prev;
    }
    return acc;
  };
  Yallist.prototype.toArray = function() {
    var arr = new Array(this.length);
    for (var i = 0, walker = this.head;walker !== null; i++) {
      arr[i] = walker.value;
      walker = walker.next;
    }
    return arr;
  };
  Yallist.prototype.toArrayReverse = function() {
    var arr = new Array(this.length);
    for (var i = 0, walker = this.tail;walker !== null; i++) {
      arr[i] = walker.value;
      walker = walker.prev;
    }
    return arr;
  };
  Yallist.prototype.slice = function(from, to) {
    to = to || this.length;
    if (to < 0) {
      to += this.length;
    }
    from = from || 0;
    if (from < 0) {
      from += this.length;
    }
    var ret = new Yallist;
    if (to < from || to < 0) {
      return ret;
    }
    if (from < 0) {
      from = 0;
    }
    if (to > this.length) {
      to = this.length;
    }
    for (var i = 0, walker = this.head;walker !== null && i < from; i++) {
      walker = walker.next;
    }
    for (;walker !== null && i < to; i++, walker = walker.next) {
      ret.push(walker.value);
    }
    return ret;
  };
  Yallist.prototype.sliceReverse = function(from, to) {
    to = to || this.length;
    if (to < 0) {
      to += this.length;
    }
    from = from || 0;
    if (from < 0) {
      from += this.length;
    }
    var ret = new Yallist;
    if (to < from || to < 0) {
      return ret;
    }
    if (from < 0) {
      from = 0;
    }
    if (to > this.length) {
      to = this.length;
    }
    for (var i = this.length, walker = this.tail;walker !== null && i > to; i--) {
      walker = walker.prev;
    }
    for (;walker !== null && i > from; i--, walker = walker.prev) {
      ret.push(walker.value);
    }
    return ret;
  };
  Yallist.prototype.splice = function(start, deleteCount, ...nodes) {
    if (start > this.length) {
      start = this.length - 1;
    }
    if (start < 0) {
      start = this.length + start;
    }
    for (var i = 0, walker = this.head;walker !== null && i < start; i++) {
      walker = walker.next;
    }
    var ret = [];
    for (var i = 0;walker && i < deleteCount; i++) {
      ret.push(walker.value);
      walker = this.removeNode(walker);
    }
    if (walker === null) {
      walker = this.tail;
    }
    if (walker !== this.head && walker !== this.tail) {
      walker = walker.prev;
    }
    for (var i = 0;i < nodes.length; i++) {
      walker = insert(this, walker, nodes[i]);
    }
    return ret;
  };
  Yallist.prototype.reverse = function() {
    var head = this.head;
    var tail = this.tail;
    for (var walker = head;walker !== null; walker = walker.prev) {
      var p = walker.prev;
      walker.prev = walker.next;
      walker.next = p;
    }
    this.head = tail;
    this.tail = head;
    return this;
  };
  function insert(self, node, value) {
    var inserted = node === self.head ? new Node3(value, null, node, self) : new Node3(value, node, node.next, self);
    if (inserted.next === null) {
      self.tail = inserted;
    }
    if (inserted.prev === null) {
      self.head = inserted;
    }
    self.length++;
    return inserted;
  }
  function push(self, item) {
    self.tail = new Node3(item, self.tail, null, self);
    if (!self.head) {
      self.head = self.tail;
    }
    self.length++;
  }
  function unshift(self, item) {
    self.head = new Node3(item, null, self.head, self);
    if (!self.tail) {
      self.tail = self.head;
    }
    self.length++;
  }
  function Node3(value, prev, next, list) {
    if (!(this instanceof Node3)) {
      return new Node3(value, prev, next, list);
    }
    this.list = list;
    this.value = value;
    if (prev) {
      prev.next = this;
      this.prev = prev;
    } else {
      this.prev = null;
    }
    if (next) {
      next.prev = this;
      this.next = next;
    } else {
      this.next = null;
    }
  }
  try {
    require_iterator()(Yallist);
  } catch (er) {}
});

// node_modules/@redis/client/dist/lib/client/RESP2/composers/buffer.js
var require_buffer = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });

  class BufferComposer {
    constructor() {
      Object.defineProperty(this, "chunks", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: []
      });
    }
    write(buffer) {
      this.chunks.push(buffer);
    }
    end(buffer) {
      this.write(buffer);
      return Buffer.concat(this.chunks.splice(0));
    }
    reset() {
      this.chunks = [];
    }
  }
  exports.default = BufferComposer;
});

// node_modules/@redis/client/dist/lib/client/RESP2/composers/string.js
var require_string = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var string_decoder_1 = __require("node:string_decoder");

  class StringComposer {
    constructor() {
      Object.defineProperty(this, "decoder", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: new string_decoder_1.StringDecoder
      });
      Object.defineProperty(this, "string", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: ""
      });
    }
    write(buffer) {
      this.string += this.decoder.write(buffer);
    }
    end(buffer) {
      const string = this.string + this.decoder.end(buffer);
      this.string = "";
      return string;
    }
    reset() {
      this.string = "";
    }
  }
  exports.default = StringComposer;
});

// node_modules/@redis/client/dist/lib/client/RESP2/decoder.js
var require_decoder = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var errors_1 = require_errors();
  var buffer_1 = require_buffer();
  var string_1 = require_string();
  var Types;
  (function(Types2) {
    Types2[Types2["SIMPLE_STRING"] = 43] = "SIMPLE_STRING";
    Types2[Types2["ERROR"] = 45] = "ERROR";
    Types2[Types2["INTEGER"] = 58] = "INTEGER";
    Types2[Types2["BULK_STRING"] = 36] = "BULK_STRING";
    Types2[Types2["ARRAY"] = 42] = "ARRAY";
  })(Types || (Types = {}));
  var ASCII;
  (function(ASCII2) {
    ASCII2[ASCII2["CR"] = 13] = "CR";
    ASCII2[ASCII2["ZERO"] = 48] = "ZERO";
    ASCII2[ASCII2["MINUS"] = 45] = "MINUS";
  })(ASCII || (ASCII = {}));

  class RESP2Decoder {
    constructor(options) {
      Object.defineProperty(this, "options", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: options
      });
      Object.defineProperty(this, "cursor", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 0
      });
      Object.defineProperty(this, "type", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: undefined
      });
      Object.defineProperty(this, "bufferComposer", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: new buffer_1.default
      });
      Object.defineProperty(this, "stringComposer", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: new string_1.default
      });
      Object.defineProperty(this, "currentStringComposer", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: this.stringComposer
      });
      Object.defineProperty(this, "integer", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 0
      });
      Object.defineProperty(this, "isNegativeInteger", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: undefined
      });
      Object.defineProperty(this, "bulkStringRemainingLength", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: undefined
      });
      Object.defineProperty(this, "arraysInProcess", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: []
      });
      Object.defineProperty(this, "initializeArray", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: false
      });
      Object.defineProperty(this, "arrayItemType", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: undefined
      });
    }
    reset() {
      this.cursor = 0;
      this.type = undefined;
      this.bufferComposer.reset();
      this.stringComposer.reset();
      this.currentStringComposer = this.stringComposer;
    }
    write(chunk) {
      while (this.cursor < chunk.length) {
        if (!this.type) {
          this.currentStringComposer = this.options.returnStringsAsBuffers() ? this.bufferComposer : this.stringComposer;
          this.type = chunk[this.cursor];
          if (++this.cursor >= chunk.length)
            break;
        }
        const reply = this.parseType(chunk, this.type);
        if (reply === undefined)
          break;
        this.type = undefined;
        this.options.onReply(reply);
      }
      this.cursor -= chunk.length;
    }
    parseType(chunk, type, arraysToKeep) {
      switch (type) {
        case Types.SIMPLE_STRING:
          return this.parseSimpleString(chunk);
        case Types.ERROR:
          return this.parseError(chunk);
        case Types.INTEGER:
          return this.parseInteger(chunk);
        case Types.BULK_STRING:
          return this.parseBulkString(chunk);
        case Types.ARRAY:
          return this.parseArray(chunk, arraysToKeep);
      }
    }
    compose(chunk, composer) {
      for (let i = this.cursor;i < chunk.length; i++) {
        if (chunk[i] === ASCII.CR) {
          const reply = composer.end(chunk.subarray(this.cursor, i));
          this.cursor = i + 2;
          return reply;
        }
      }
      const toWrite = chunk.subarray(this.cursor);
      composer.write(toWrite);
      this.cursor = chunk.length;
    }
    parseSimpleString(chunk) {
      return this.compose(chunk, this.currentStringComposer);
    }
    parseError(chunk) {
      const message = this.compose(chunk, this.stringComposer);
      if (message !== undefined) {
        return new errors_1.ErrorReply(message);
      }
    }
    parseInteger(chunk) {
      if (this.isNegativeInteger === undefined) {
        this.isNegativeInteger = chunk[this.cursor] === ASCII.MINUS;
        if (this.isNegativeInteger && ++this.cursor === chunk.length)
          return;
      }
      do {
        const byte = chunk[this.cursor];
        if (byte === ASCII.CR) {
          const integer = this.isNegativeInteger ? -this.integer : this.integer;
          this.integer = 0;
          this.isNegativeInteger = undefined;
          this.cursor += 2;
          return integer;
        }
        this.integer = this.integer * 10 + byte - ASCII.ZERO;
      } while (++this.cursor < chunk.length);
    }
    parseBulkString(chunk) {
      if (this.bulkStringRemainingLength === undefined) {
        const length = this.parseInteger(chunk);
        if (length === undefined)
          return;
        if (length === -1)
          return null;
        this.bulkStringRemainingLength = length;
        if (this.cursor >= chunk.length)
          return;
      }
      const end = this.cursor + this.bulkStringRemainingLength;
      if (chunk.length >= end) {
        const reply = this.currentStringComposer.end(chunk.subarray(this.cursor, end));
        this.bulkStringRemainingLength = undefined;
        this.cursor = end + 2;
        return reply;
      }
      const toWrite = chunk.subarray(this.cursor);
      this.currentStringComposer.write(toWrite);
      this.bulkStringRemainingLength -= toWrite.length;
      this.cursor = chunk.length;
    }
    parseArray(chunk, arraysToKeep = 0) {
      if (this.initializeArray || this.arraysInProcess.length === arraysToKeep) {
        const length = this.parseInteger(chunk);
        if (length === undefined) {
          this.initializeArray = true;
          return;
        }
        this.initializeArray = false;
        this.arrayItemType = undefined;
        if (length === -1) {
          return this.returnArrayReply(null, arraysToKeep, chunk);
        } else if (length === 0) {
          return this.returnArrayReply([], arraysToKeep, chunk);
        }
        this.arraysInProcess.push({
          array: new Array(length),
          pushCounter: 0
        });
      }
      while (this.cursor < chunk.length) {
        if (!this.arrayItemType) {
          this.arrayItemType = chunk[this.cursor];
          if (++this.cursor >= chunk.length)
            break;
        }
        const item = this.parseType(chunk, this.arrayItemType, arraysToKeep + 1);
        if (item === undefined)
          break;
        this.arrayItemType = undefined;
        const reply = this.pushArrayItem(item, arraysToKeep);
        if (reply !== undefined)
          return reply;
      }
    }
    returnArrayReply(reply, arraysToKeep, chunk) {
      if (this.arraysInProcess.length <= arraysToKeep)
        return reply;
      return this.pushArrayItem(reply, arraysToKeep, chunk);
    }
    pushArrayItem(item, arraysToKeep, chunk) {
      const to = this.arraysInProcess[this.arraysInProcess.length - 1];
      to.array[to.pushCounter] = item;
      if (++to.pushCounter === to.array.length) {
        return this.returnArrayReply(this.arraysInProcess.pop().array, arraysToKeep, chunk);
      } else if (chunk && chunk.length > this.cursor) {
        return this.parseArray(chunk, arraysToKeep);
      }
    }
  }
  exports.default = RESP2Decoder;
});

// node_modules/@redis/client/dist/lib/client/RESP2/encoder.js
var require_encoder = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var CRLF = `\r
`;
  function encodeCommand(args) {
    const toWrite = [];
    let strings = "*" + args.length + CRLF;
    for (let i = 0;i < args.length; i++) {
      const arg = args[i];
      if (typeof arg === "string") {
        strings += "$" + Buffer.byteLength(arg) + CRLF + arg + CRLF;
      } else if (arg instanceof Buffer) {
        toWrite.push(strings + "$" + arg.length.toString() + CRLF, arg);
        strings = CRLF;
      } else {
        throw new TypeError("Invalid argument type");
      }
    }
    toWrite.push(strings);
    return toWrite;
  }
  exports.default = encodeCommand;
});

// node_modules/@redis/client/dist/lib/client/pub-sub.js
var require_pub_sub = __commonJS((exports) => {
  var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m")
      throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var _PubSub_instances;
  var _a;
  var _PubSub_channelsArray;
  var _PubSub_listenersSet;
  var _PubSub_subscribing;
  var _PubSub_isActive;
  var _PubSub_listeners;
  var _PubSub_extendChannelListeners;
  var _PubSub_unsubscribeCommand;
  var _PubSub_updateIsActive;
  var _PubSub_emitPubSubMessage;
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.PubSub = exports.PubSubType = undefined;
  var PubSubType;
  (function(PubSubType2) {
    PubSubType2["CHANNELS"] = "CHANNELS";
    PubSubType2["PATTERNS"] = "PATTERNS";
    PubSubType2["SHARDED"] = "SHARDED";
  })(PubSubType || (exports.PubSubType = PubSubType = {}));
  var COMMANDS = {
    [PubSubType.CHANNELS]: {
      subscribe: Buffer.from("subscribe"),
      unsubscribe: Buffer.from("unsubscribe"),
      message: Buffer.from("message")
    },
    [PubSubType.PATTERNS]: {
      subscribe: Buffer.from("psubscribe"),
      unsubscribe: Buffer.from("punsubscribe"),
      message: Buffer.from("pmessage")
    },
    [PubSubType.SHARDED]: {
      subscribe: Buffer.from("ssubscribe"),
      unsubscribe: Buffer.from("sunsubscribe"),
      message: Buffer.from("smessage")
    }
  };

  class PubSub {
    constructor() {
      _PubSub_instances.add(this);
      _PubSub_subscribing.set(this, 0);
      _PubSub_isActive.set(this, false);
      _PubSub_listeners.set(this, {
        [PubSubType.CHANNELS]: new Map,
        [PubSubType.PATTERNS]: new Map,
        [PubSubType.SHARDED]: new Map
      });
    }
    static isStatusReply(reply) {
      return COMMANDS[PubSubType.CHANNELS].subscribe.equals(reply[0]) || COMMANDS[PubSubType.CHANNELS].unsubscribe.equals(reply[0]) || COMMANDS[PubSubType.PATTERNS].subscribe.equals(reply[0]) || COMMANDS[PubSubType.PATTERNS].unsubscribe.equals(reply[0]) || COMMANDS[PubSubType.SHARDED].subscribe.equals(reply[0]);
    }
    static isShardedUnsubscribe(reply) {
      return COMMANDS[PubSubType.SHARDED].unsubscribe.equals(reply[0]);
    }
    get isActive() {
      return __classPrivateFieldGet(this, _PubSub_isActive, "f");
    }
    subscribe(type, channels, listener, returnBuffers) {
      var _b;
      const args = [COMMANDS[type].subscribe], channelsArray = __classPrivateFieldGet(_a, _a, "m", _PubSub_channelsArray).call(_a, channels);
      for (const channel of channelsArray) {
        let channelListeners = __classPrivateFieldGet(this, _PubSub_listeners, "f")[type].get(channel);
        if (!channelListeners || channelListeners.unsubscribing) {
          args.push(channel);
        }
      }
      if (args.length === 1) {
        for (const channel of channelsArray) {
          __classPrivateFieldGet(_a, _a, "m", _PubSub_listenersSet).call(_a, __classPrivateFieldGet(this, _PubSub_listeners, "f")[type].get(channel), returnBuffers).add(listener);
        }
        return;
      }
      __classPrivateFieldSet(this, _PubSub_isActive, true, "f");
      __classPrivateFieldSet(this, _PubSub_subscribing, (_b = __classPrivateFieldGet(this, _PubSub_subscribing, "f"), _b++, _b), "f");
      return {
        args,
        channelsCounter: args.length - 1,
        resolve: () => {
          var _b2;
          __classPrivateFieldSet(this, _PubSub_subscribing, (_b2 = __classPrivateFieldGet(this, _PubSub_subscribing, "f"), _b2--, _b2), "f");
          for (const channel of channelsArray) {
            let listeners = __classPrivateFieldGet(this, _PubSub_listeners, "f")[type].get(channel);
            if (!listeners) {
              listeners = {
                unsubscribing: false,
                buffers: new Set,
                strings: new Set
              };
              __classPrivateFieldGet(this, _PubSub_listeners, "f")[type].set(channel, listeners);
            }
            __classPrivateFieldGet(_a, _a, "m", _PubSub_listenersSet).call(_a, listeners, returnBuffers).add(listener);
          }
        },
        reject: () => {
          var _b2;
          __classPrivateFieldSet(this, _PubSub_subscribing, (_b2 = __classPrivateFieldGet(this, _PubSub_subscribing, "f"), _b2--, _b2), "f");
          __classPrivateFieldGet(this, _PubSub_instances, "m", _PubSub_updateIsActive).call(this);
        }
      };
    }
    extendChannelListeners(type, channel, listeners) {
      var _b;
      if (!__classPrivateFieldGet(this, _PubSub_instances, "m", _PubSub_extendChannelListeners).call(this, type, channel, listeners))
        return;
      __classPrivateFieldSet(this, _PubSub_isActive, true, "f");
      __classPrivateFieldSet(this, _PubSub_subscribing, (_b = __classPrivateFieldGet(this, _PubSub_subscribing, "f"), _b++, _b), "f");
      return {
        args: [
          COMMANDS[type].subscribe,
          channel
        ],
        channelsCounter: 1,
        resolve: () => {
          var _b2, _c;
          return __classPrivateFieldSet(this, _PubSub_subscribing, (_c = __classPrivateFieldGet(this, _PubSub_subscribing, "f"), _b2 = _c--, _c), "f"), _b2;
        },
        reject: () => {
          var _b2;
          __classPrivateFieldSet(this, _PubSub_subscribing, (_b2 = __classPrivateFieldGet(this, _PubSub_subscribing, "f"), _b2--, _b2), "f");
          __classPrivateFieldGet(this, _PubSub_instances, "m", _PubSub_updateIsActive).call(this);
        }
      };
    }
    extendTypeListeners(type, listeners) {
      var _b;
      const args = [COMMANDS[type].subscribe];
      for (const [channel, channelListeners] of listeners) {
        if (__classPrivateFieldGet(this, _PubSub_instances, "m", _PubSub_extendChannelListeners).call(this, type, channel, channelListeners)) {
          args.push(channel);
        }
      }
      if (args.length === 1)
        return;
      __classPrivateFieldSet(this, _PubSub_isActive, true, "f");
      __classPrivateFieldSet(this, _PubSub_subscribing, (_b = __classPrivateFieldGet(this, _PubSub_subscribing, "f"), _b++, _b), "f");
      return {
        args,
        channelsCounter: args.length - 1,
        resolve: () => {
          var _b2, _c;
          return __classPrivateFieldSet(this, _PubSub_subscribing, (_c = __classPrivateFieldGet(this, _PubSub_subscribing, "f"), _b2 = _c--, _c), "f"), _b2;
        },
        reject: () => {
          var _b2;
          __classPrivateFieldSet(this, _PubSub_subscribing, (_b2 = __classPrivateFieldGet(this, _PubSub_subscribing, "f"), _b2--, _b2), "f");
          __classPrivateFieldGet(this, _PubSub_instances, "m", _PubSub_updateIsActive).call(this);
        }
      };
    }
    unsubscribe(type, channels, listener, returnBuffers) {
      const listeners = __classPrivateFieldGet(this, _PubSub_listeners, "f")[type];
      if (!channels) {
        return __classPrivateFieldGet(this, _PubSub_instances, "m", _PubSub_unsubscribeCommand).call(this, [COMMANDS[type].unsubscribe], NaN, () => listeners.clear());
      }
      const channelsArray = __classPrivateFieldGet(_a, _a, "m", _PubSub_channelsArray).call(_a, channels);
      if (!listener) {
        return __classPrivateFieldGet(this, _PubSub_instances, "m", _PubSub_unsubscribeCommand).call(this, [COMMANDS[type].unsubscribe, ...channelsArray], channelsArray.length, () => {
          for (const channel of channelsArray) {
            listeners.delete(channel);
          }
        });
      }
      const args = [COMMANDS[type].unsubscribe];
      for (const channel of channelsArray) {
        const sets = listeners.get(channel);
        if (sets) {
          let current, other;
          if (returnBuffers) {
            current = sets.buffers;
            other = sets.strings;
          } else {
            current = sets.strings;
            other = sets.buffers;
          }
          const currentSize = current.has(listener) ? current.size - 1 : current.size;
          if (currentSize !== 0 || other.size !== 0)
            continue;
          sets.unsubscribing = true;
        }
        args.push(channel);
      }
      if (args.length === 1) {
        for (const channel of channelsArray) {
          __classPrivateFieldGet(_a, _a, "m", _PubSub_listenersSet).call(_a, listeners.get(channel), returnBuffers).delete(listener);
        }
        return;
      }
      return __classPrivateFieldGet(this, _PubSub_instances, "m", _PubSub_unsubscribeCommand).call(this, args, args.length - 1, () => {
        for (const channel of channelsArray) {
          const sets = listeners.get(channel);
          if (!sets)
            continue;
          (returnBuffers ? sets.buffers : sets.strings).delete(listener);
          if (sets.buffers.size === 0 && sets.strings.size === 0) {
            listeners.delete(channel);
          }
        }
      });
    }
    reset() {
      __classPrivateFieldSet(this, _PubSub_isActive, false, "f");
      __classPrivateFieldSet(this, _PubSub_subscribing, 0, "f");
    }
    resubscribe() {
      var _b;
      const commands = [];
      for (const [type, listeners] of Object.entries(__classPrivateFieldGet(this, _PubSub_listeners, "f"))) {
        if (!listeners.size)
          continue;
        __classPrivateFieldSet(this, _PubSub_isActive, true, "f");
        __classPrivateFieldSet(this, _PubSub_subscribing, (_b = __classPrivateFieldGet(this, _PubSub_subscribing, "f"), _b++, _b), "f");
        const callback = () => {
          var _b2, _c;
          return __classPrivateFieldSet(this, _PubSub_subscribing, (_c = __classPrivateFieldGet(this, _PubSub_subscribing, "f"), _b2 = _c--, _c), "f"), _b2;
        };
        commands.push({
          args: [
            COMMANDS[type].subscribe,
            ...listeners.keys()
          ],
          channelsCounter: listeners.size,
          resolve: callback,
          reject: callback
        });
      }
      return commands;
    }
    handleMessageReply(reply) {
      if (COMMANDS[PubSubType.CHANNELS].message.equals(reply[0])) {
        __classPrivateFieldGet(this, _PubSub_instances, "m", _PubSub_emitPubSubMessage).call(this, PubSubType.CHANNELS, reply[2], reply[1]);
        return true;
      } else if (COMMANDS[PubSubType.PATTERNS].message.equals(reply[0])) {
        __classPrivateFieldGet(this, _PubSub_instances, "m", _PubSub_emitPubSubMessage).call(this, PubSubType.PATTERNS, reply[3], reply[2], reply[1]);
        return true;
      } else if (COMMANDS[PubSubType.SHARDED].message.equals(reply[0])) {
        __classPrivateFieldGet(this, _PubSub_instances, "m", _PubSub_emitPubSubMessage).call(this, PubSubType.SHARDED, reply[2], reply[1]);
        return true;
      }
      return false;
    }
    removeShardedListeners(channel) {
      const listeners = __classPrivateFieldGet(this, _PubSub_listeners, "f")[PubSubType.SHARDED].get(channel);
      __classPrivateFieldGet(this, _PubSub_listeners, "f")[PubSubType.SHARDED].delete(channel);
      __classPrivateFieldGet(this, _PubSub_instances, "m", _PubSub_updateIsActive).call(this);
      return listeners;
    }
    getTypeListeners(type) {
      return __classPrivateFieldGet(this, _PubSub_listeners, "f")[type];
    }
  }
  exports.PubSub = PubSub;
  _a = PubSub, _PubSub_subscribing = new WeakMap, _PubSub_isActive = new WeakMap, _PubSub_listeners = new WeakMap, _PubSub_instances = new WeakSet, _PubSub_channelsArray = function _PubSub_channelsArray(channels) {
    return Array.isArray(channels) ? channels : [channels];
  }, _PubSub_listenersSet = function _PubSub_listenersSet(listeners, returnBuffers) {
    return returnBuffers ? listeners.buffers : listeners.strings;
  }, _PubSub_extendChannelListeners = function _PubSub_extendChannelListeners(type, channel, listeners) {
    const existingListeners = __classPrivateFieldGet(this, _PubSub_listeners, "f")[type].get(channel);
    if (!existingListeners) {
      __classPrivateFieldGet(this, _PubSub_listeners, "f")[type].set(channel, listeners);
      return true;
    }
    for (const listener of listeners.buffers) {
      existingListeners.buffers.add(listener);
    }
    for (const listener of listeners.strings) {
      existingListeners.strings.add(listener);
    }
    return false;
  }, _PubSub_unsubscribeCommand = function _PubSub_unsubscribeCommand(args, channelsCounter, removeListeners) {
    return {
      args,
      channelsCounter,
      resolve: () => {
        removeListeners();
        __classPrivateFieldGet(this, _PubSub_instances, "m", _PubSub_updateIsActive).call(this);
      },
      reject: undefined
    };
  }, _PubSub_updateIsActive = function _PubSub_updateIsActive() {
    __classPrivateFieldSet(this, _PubSub_isActive, __classPrivateFieldGet(this, _PubSub_listeners, "f")[PubSubType.CHANNELS].size !== 0 || __classPrivateFieldGet(this, _PubSub_listeners, "f")[PubSubType.PATTERNS].size !== 0 || __classPrivateFieldGet(this, _PubSub_listeners, "f")[PubSubType.SHARDED].size !== 0 || __classPrivateFieldGet(this, _PubSub_subscribing, "f") !== 0, "f");
  }, _PubSub_emitPubSubMessage = function _PubSub_emitPubSubMessage(type, message, channel, pattern) {
    const keyString = (pattern ?? channel).toString(), listeners = __classPrivateFieldGet(this, _PubSub_listeners, "f")[type].get(keyString);
    if (!listeners)
      return;
    for (const listener of listeners.buffers) {
      listener(message, channel);
    }
    if (!listeners.strings.size)
      return;
    const channelString = pattern ? channel.toString() : keyString, messageString = channelString === "__redis__:invalidate" ? message === null ? null : message.map((x) => x.toString()) : message.toString();
    for (const listener of listeners.strings) {
      listener(messageString, channelString);
    }
  };
});

// node_modules/@redis/client/dist/lib/client/commands-queue.js
var require_commands_queue = __commonJS((exports) => {
  var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m")
      throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var _RedisCommandsQueue_instances;
  var _a;
  var _RedisCommandsQueue_flushQueue;
  var _RedisCommandsQueue_maxLength;
  var _RedisCommandsQueue_waitingToBeSent;
  var _RedisCommandsQueue_waitingForReply;
  var _RedisCommandsQueue_onShardedChannelMoved;
  var _RedisCommandsQueue_pubSub;
  var _RedisCommandsQueue_chainInExecution;
  var _RedisCommandsQueue_decoder;
  var _RedisCommandsQueue_pushPubSubCommand;
  Object.defineProperty(exports, "__esModule", { value: true });
  var LinkedList = require_yallist();
  var errors_1 = require_errors();
  var decoder_1 = require_decoder();
  var encoder_1 = require_encoder();
  var pub_sub_1 = require_pub_sub();
  var PONG = Buffer.from("pong");

  class RedisCommandsQueue {
    get isPubSubActive() {
      return __classPrivateFieldGet(this, _RedisCommandsQueue_pubSub, "f").isActive;
    }
    constructor(maxLength, onShardedChannelMoved) {
      _RedisCommandsQueue_instances.add(this);
      _RedisCommandsQueue_maxLength.set(this, undefined);
      _RedisCommandsQueue_waitingToBeSent.set(this, new LinkedList);
      _RedisCommandsQueue_waitingForReply.set(this, new LinkedList);
      _RedisCommandsQueue_onShardedChannelMoved.set(this, undefined);
      _RedisCommandsQueue_pubSub.set(this, new pub_sub_1.PubSub);
      _RedisCommandsQueue_chainInExecution.set(this, undefined);
      _RedisCommandsQueue_decoder.set(this, new decoder_1.default({
        returnStringsAsBuffers: () => {
          return !!__classPrivateFieldGet(this, _RedisCommandsQueue_waitingForReply, "f").head?.value.returnBuffers || __classPrivateFieldGet(this, _RedisCommandsQueue_pubSub, "f").isActive;
        },
        onReply: (reply) => {
          if (__classPrivateFieldGet(this, _RedisCommandsQueue_pubSub, "f").isActive && Array.isArray(reply)) {
            if (__classPrivateFieldGet(this, _RedisCommandsQueue_pubSub, "f").handleMessageReply(reply))
              return;
            const isShardedUnsubscribe = pub_sub_1.PubSub.isShardedUnsubscribe(reply);
            if (isShardedUnsubscribe && !__classPrivateFieldGet(this, _RedisCommandsQueue_waitingForReply, "f").length) {
              const channel = reply[1].toString();
              __classPrivateFieldGet(this, _RedisCommandsQueue_onShardedChannelMoved, "f").call(this, channel, __classPrivateFieldGet(this, _RedisCommandsQueue_pubSub, "f").removeShardedListeners(channel));
              return;
            } else if (isShardedUnsubscribe || pub_sub_1.PubSub.isStatusReply(reply)) {
              const head = __classPrivateFieldGet(this, _RedisCommandsQueue_waitingForReply, "f").head.value;
              if (Number.isNaN(head.channelsCounter) && reply[2] === 0 || --head.channelsCounter === 0) {
                __classPrivateFieldGet(this, _RedisCommandsQueue_waitingForReply, "f").shift().resolve();
              }
              return;
            }
            if (PONG.equals(reply[0])) {
              const { resolve: resolve2, returnBuffers } = __classPrivateFieldGet(this, _RedisCommandsQueue_waitingForReply, "f").shift(), buffer = reply[1].length === 0 ? reply[0] : reply[1];
              resolve2(returnBuffers ? buffer : buffer.toString());
              return;
            }
          }
          const { resolve, reject } = __classPrivateFieldGet(this, _RedisCommandsQueue_waitingForReply, "f").shift();
          if (reply instanceof errors_1.ErrorReply) {
            reject(reply);
          } else {
            resolve(reply);
          }
        }
      }));
      __classPrivateFieldSet(this, _RedisCommandsQueue_maxLength, maxLength, "f");
      __classPrivateFieldSet(this, _RedisCommandsQueue_onShardedChannelMoved, onShardedChannelMoved, "f");
    }
    addCommand(args, options) {
      if (__classPrivateFieldGet(this, _RedisCommandsQueue_maxLength, "f") && __classPrivateFieldGet(this, _RedisCommandsQueue_waitingToBeSent, "f").length + __classPrivateFieldGet(this, _RedisCommandsQueue_waitingForReply, "f").length >= __classPrivateFieldGet(this, _RedisCommandsQueue_maxLength, "f")) {
        return Promise.reject(new Error("The queue is full"));
      } else if (options?.signal?.aborted) {
        return Promise.reject(new errors_1.AbortError);
      }
      return new Promise((resolve, reject) => {
        const node = new LinkedList.Node({
          args,
          chainId: options?.chainId,
          returnBuffers: options?.returnBuffers,
          resolve,
          reject
        });
        if (options?.signal) {
          const listener = () => {
            __classPrivateFieldGet(this, _RedisCommandsQueue_waitingToBeSent, "f").removeNode(node);
            node.value.reject(new errors_1.AbortError);
          };
          node.value.abort = {
            signal: options.signal,
            listener
          };
          options.signal.addEventListener("abort", listener, {
            once: true
          });
        }
        if (options?.asap) {
          __classPrivateFieldGet(this, _RedisCommandsQueue_waitingToBeSent, "f").unshiftNode(node);
        } else {
          __classPrivateFieldGet(this, _RedisCommandsQueue_waitingToBeSent, "f").pushNode(node);
        }
      });
    }
    subscribe(type, channels, listener, returnBuffers) {
      return __classPrivateFieldGet(this, _RedisCommandsQueue_instances, "m", _RedisCommandsQueue_pushPubSubCommand).call(this, __classPrivateFieldGet(this, _RedisCommandsQueue_pubSub, "f").subscribe(type, channels, listener, returnBuffers));
    }
    unsubscribe(type, channels, listener, returnBuffers) {
      return __classPrivateFieldGet(this, _RedisCommandsQueue_instances, "m", _RedisCommandsQueue_pushPubSubCommand).call(this, __classPrivateFieldGet(this, _RedisCommandsQueue_pubSub, "f").unsubscribe(type, channels, listener, returnBuffers));
    }
    resubscribe() {
      const commands = __classPrivateFieldGet(this, _RedisCommandsQueue_pubSub, "f").resubscribe();
      if (!commands.length)
        return;
      return Promise.all(commands.map((command) => __classPrivateFieldGet(this, _RedisCommandsQueue_instances, "m", _RedisCommandsQueue_pushPubSubCommand).call(this, command)));
    }
    extendPubSubChannelListeners(type, channel, listeners) {
      return __classPrivateFieldGet(this, _RedisCommandsQueue_instances, "m", _RedisCommandsQueue_pushPubSubCommand).call(this, __classPrivateFieldGet(this, _RedisCommandsQueue_pubSub, "f").extendChannelListeners(type, channel, listeners));
    }
    extendPubSubListeners(type, listeners) {
      return __classPrivateFieldGet(this, _RedisCommandsQueue_instances, "m", _RedisCommandsQueue_pushPubSubCommand).call(this, __classPrivateFieldGet(this, _RedisCommandsQueue_pubSub, "f").extendTypeListeners(type, listeners));
    }
    getPubSubListeners(type) {
      return __classPrivateFieldGet(this, _RedisCommandsQueue_pubSub, "f").getTypeListeners(type);
    }
    getCommandToSend() {
      const toSend = __classPrivateFieldGet(this, _RedisCommandsQueue_waitingToBeSent, "f").shift();
      if (!toSend)
        return;
      let encoded;
      try {
        encoded = (0, encoder_1.default)(toSend.args);
      } catch (err) {
        toSend.reject(err);
        return;
      }
      __classPrivateFieldGet(this, _RedisCommandsQueue_waitingForReply, "f").push({
        resolve: toSend.resolve,
        reject: toSend.reject,
        channelsCounter: toSend.channelsCounter,
        returnBuffers: toSend.returnBuffers
      });
      __classPrivateFieldSet(this, _RedisCommandsQueue_chainInExecution, toSend.chainId, "f");
      return encoded;
    }
    onReplyChunk(chunk) {
      __classPrivateFieldGet(this, _RedisCommandsQueue_decoder, "f").write(chunk);
    }
    flushWaitingForReply(err) {
      __classPrivateFieldGet(this, _RedisCommandsQueue_decoder, "f").reset();
      __classPrivateFieldGet(this, _RedisCommandsQueue_pubSub, "f").reset();
      __classPrivateFieldGet(_a, _a, "m", _RedisCommandsQueue_flushQueue).call(_a, __classPrivateFieldGet(this, _RedisCommandsQueue_waitingForReply, "f"), err);
      if (!__classPrivateFieldGet(this, _RedisCommandsQueue_chainInExecution, "f"))
        return;
      while (__classPrivateFieldGet(this, _RedisCommandsQueue_waitingToBeSent, "f").head?.value.chainId === __classPrivateFieldGet(this, _RedisCommandsQueue_chainInExecution, "f")) {
        __classPrivateFieldGet(this, _RedisCommandsQueue_waitingToBeSent, "f").shift();
      }
      __classPrivateFieldSet(this, _RedisCommandsQueue_chainInExecution, undefined, "f");
    }
    flushAll(err) {
      __classPrivateFieldGet(this, _RedisCommandsQueue_decoder, "f").reset();
      __classPrivateFieldGet(this, _RedisCommandsQueue_pubSub, "f").reset();
      __classPrivateFieldGet(_a, _a, "m", _RedisCommandsQueue_flushQueue).call(_a, __classPrivateFieldGet(this, _RedisCommandsQueue_waitingForReply, "f"), err);
      __classPrivateFieldGet(_a, _a, "m", _RedisCommandsQueue_flushQueue).call(_a, __classPrivateFieldGet(this, _RedisCommandsQueue_waitingToBeSent, "f"), err);
    }
  }
  _a = RedisCommandsQueue, _RedisCommandsQueue_maxLength = new WeakMap, _RedisCommandsQueue_waitingToBeSent = new WeakMap, _RedisCommandsQueue_waitingForReply = new WeakMap, _RedisCommandsQueue_onShardedChannelMoved = new WeakMap, _RedisCommandsQueue_pubSub = new WeakMap, _RedisCommandsQueue_chainInExecution = new WeakMap, _RedisCommandsQueue_decoder = new WeakMap, _RedisCommandsQueue_instances = new WeakSet, _RedisCommandsQueue_flushQueue = function _RedisCommandsQueue_flushQueue(queue, err) {
    while (queue.length) {
      queue.shift().reject(err);
    }
  }, _RedisCommandsQueue_pushPubSubCommand = function _RedisCommandsQueue_pushPubSubCommand(command) {
    if (command === undefined)
      return;
    return new Promise((resolve, reject) => {
      __classPrivateFieldGet(this, _RedisCommandsQueue_waitingToBeSent, "f").push({
        args: command.args,
        channelsCounter: command.channelsCounter,
        returnBuffers: true,
        resolve: () => {
          command.resolve();
          resolve();
        },
        reject: (err) => {
          command.reject?.();
          reject(err);
        }
      });
    });
  };
  exports.default = RedisCommandsQueue;
});

// node_modules/@redis/client/dist/lib/command-options.js
var require_command_options = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.isCommandOptions = exports.commandOptions = undefined;
  var symbol = Symbol("Command Options");
  function commandOptions(options) {
    options[symbol] = true;
    return options;
  }
  exports.commandOptions = commandOptions;
  function isCommandOptions(options) {
    return options?.[symbol] === true;
  }
  exports.isCommandOptions = isCommandOptions;
});

// node_modules/@redis/client/dist/lib/commander.js
var require_commander = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.fCallArguments = exports.transformCommandReply = exports.transformLegacyCommandArguments = exports.transformCommandArguments = exports.attachExtensions = exports.attachCommands = undefined;
  var command_options_1 = require_command_options();
  function attachCommands({ BaseClass, commands, executor }) {
    for (const [name, command] of Object.entries(commands)) {
      BaseClass.prototype[name] = function(...args) {
        return executor.call(this, command, args, name);
      };
    }
  }
  exports.attachCommands = attachCommands;
  function attachExtensions(config) {
    let Commander;
    if (config.modules) {
      Commander = attachWithNamespaces({
        BaseClass: config.BaseClass,
        namespaces: config.modules,
        executor: config.modulesExecutor
      });
    }
    if (config.functions) {
      Commander = attachWithNamespaces({
        BaseClass: Commander ?? config.BaseClass,
        namespaces: config.functions,
        executor: config.functionsExecutor
      });
    }
    if (config.scripts) {
      Commander ?? (Commander = class extends config.BaseClass {
      });
      attachCommands({
        BaseClass: Commander,
        commands: config.scripts,
        executor: config.scriptsExecutor
      });
    }
    return Commander ?? config.BaseClass;
  }
  exports.attachExtensions = attachExtensions;
  function attachWithNamespaces({ BaseClass, namespaces, executor }) {
    const Commander = class extends BaseClass {
      constructor(...args) {
        super(...args);
        for (const namespace of Object.keys(namespaces)) {
          this[namespace] = Object.create(this[namespace], {
            self: {
              value: this
            }
          });
        }
      }
    };
    for (const [namespace, commands] of Object.entries(namespaces)) {
      Commander.prototype[namespace] = {};
      for (const [name, command] of Object.entries(commands)) {
        Commander.prototype[namespace][name] = function(...args) {
          return executor.call(this.self, command, args, name);
        };
      }
    }
    return Commander;
  }
  function transformCommandArguments(command, args) {
    let options;
    if ((0, command_options_1.isCommandOptions)(args[0])) {
      options = args[0];
      args = args.slice(1);
    }
    return {
      jsArgs: args,
      args: command.transformArguments(...args),
      options
    };
  }
  exports.transformCommandArguments = transformCommandArguments;
  function transformLegacyCommandArguments(args) {
    return args.flat().map((arg) => {
      return typeof arg === "number" || arg instanceof Date ? arg.toString() : arg;
    });
  }
  exports.transformLegacyCommandArguments = transformLegacyCommandArguments;
  function transformCommandReply(command, rawReply, preserved) {
    if (!command.transformReply) {
      return rawReply;
    }
    return command.transformReply(rawReply, preserved);
  }
  exports.transformCommandReply = transformCommandReply;
  function fCallArguments(name, fn, args) {
    const actualArgs = [
      fn.IS_READ_ONLY ? "FCALL_RO" : "FCALL",
      name
    ];
    if (fn.NUMBER_OF_KEYS !== undefined) {
      actualArgs.push(fn.NUMBER_OF_KEYS.toString());
    }
    actualArgs.push(...args);
    return actualArgs;
  }
  exports.fCallArguments = fCallArguments;
});

// node_modules/@redis/client/dist/lib/multi-command.js
var require_multi_command = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var commander_1 = require_commander();
  var errors_1 = require_errors();

  class RedisMultiCommand {
    constructor() {
      Object.defineProperty(this, "queue", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: []
      });
      Object.defineProperty(this, "scriptsInUse", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: new Set
      });
    }
    static generateChainId() {
      return Symbol("RedisMultiCommand Chain Id");
    }
    addCommand(args, transformReply) {
      this.queue.push({
        args,
        transformReply
      });
    }
    addFunction(name, fn, args) {
      const transformedArguments = (0, commander_1.fCallArguments)(name, fn, fn.transformArguments(...args));
      this.queue.push({
        args: transformedArguments,
        transformReply: fn.transformReply
      });
      return transformedArguments;
    }
    addScript(script, args) {
      const transformedArguments = [];
      if (this.scriptsInUse.has(script.SHA1)) {
        transformedArguments.push("EVALSHA", script.SHA1);
      } else {
        this.scriptsInUse.add(script.SHA1);
        transformedArguments.push("EVAL", script.SCRIPT);
      }
      if (script.NUMBER_OF_KEYS !== undefined) {
        transformedArguments.push(script.NUMBER_OF_KEYS.toString());
      }
      const scriptArguments = script.transformArguments(...args);
      transformedArguments.push(...scriptArguments);
      if (scriptArguments.preserve) {
        transformedArguments.preserve = scriptArguments.preserve;
      }
      this.addCommand(transformedArguments, script.transformReply);
      return transformedArguments;
    }
    handleExecReplies(rawReplies) {
      const execReply = rawReplies[rawReplies.length - 1];
      if (execReply === null) {
        throw new errors_1.WatchError;
      }
      return this.transformReplies(execReply);
    }
    transformReplies(rawReplies) {
      const errorIndexes = [], replies = rawReplies.map((reply, i) => {
        if (reply instanceof errors_1.ErrorReply) {
          errorIndexes.push(i);
          return reply;
        }
        const { transformReply, args } = this.queue[i];
        return transformReply ? transformReply(reply, args.preserve) : reply;
      });
      if (errorIndexes.length)
        throw new errors_1.MultiErrorReply(replies, errorIndexes);
      return replies;
    }
  }
  exports.default = RedisMultiCommand;
});

// node_modules/@redis/client/dist/lib/client/multi-command.js
var require_multi_command2 = __commonJS((exports) => {
  var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m")
      throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _RedisClientMultiCommand_instances;
  var _RedisClientMultiCommand_multi;
  var _RedisClientMultiCommand_executor;
  var _RedisClientMultiCommand_selectedDB;
  var _RedisClientMultiCommand_legacyMode;
  var _RedisClientMultiCommand_defineLegacyCommand;
  Object.defineProperty(exports, "__esModule", { value: true });
  var commands_1 = require_commands2();
  var multi_command_1 = require_multi_command();
  var commander_1 = require_commander();

  class RedisClientMultiCommand {
    static extend(extensions) {
      return (0, commander_1.attachExtensions)({
        BaseClass: RedisClientMultiCommand,
        modulesExecutor: RedisClientMultiCommand.prototype.commandsExecutor,
        modules: extensions?.modules,
        functionsExecutor: RedisClientMultiCommand.prototype.functionsExecutor,
        functions: extensions?.functions,
        scriptsExecutor: RedisClientMultiCommand.prototype.scriptsExecutor,
        scripts: extensions?.scripts
      });
    }
    constructor(executor, legacyMode = false) {
      _RedisClientMultiCommand_instances.add(this);
      _RedisClientMultiCommand_multi.set(this, new multi_command_1.default);
      _RedisClientMultiCommand_executor.set(this, undefined);
      Object.defineProperty(this, "v4", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: {}
      });
      _RedisClientMultiCommand_selectedDB.set(this, undefined);
      Object.defineProperty(this, "select", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: this.SELECT
      });
      Object.defineProperty(this, "EXEC", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: this.exec
      });
      __classPrivateFieldSet(this, _RedisClientMultiCommand_executor, executor, "f");
      if (legacyMode) {
        __classPrivateFieldGet(this, _RedisClientMultiCommand_instances, "m", _RedisClientMultiCommand_legacyMode).call(this);
      }
    }
    commandsExecutor(command, args) {
      return this.addCommand(command.transformArguments(...args), command.transformReply);
    }
    SELECT(db, transformReply) {
      __classPrivateFieldSet(this, _RedisClientMultiCommand_selectedDB, db, "f");
      return this.addCommand(["SELECT", db.toString()], transformReply);
    }
    addCommand(args, transformReply) {
      __classPrivateFieldGet(this, _RedisClientMultiCommand_multi, "f").addCommand(args, transformReply);
      return this;
    }
    functionsExecutor(fn, args, name) {
      __classPrivateFieldGet(this, _RedisClientMultiCommand_multi, "f").addFunction(name, fn, args);
      return this;
    }
    scriptsExecutor(script, args) {
      __classPrivateFieldGet(this, _RedisClientMultiCommand_multi, "f").addScript(script, args);
      return this;
    }
    async exec(execAsPipeline = false) {
      if (execAsPipeline) {
        return this.execAsPipeline();
      }
      return __classPrivateFieldGet(this, _RedisClientMultiCommand_multi, "f").handleExecReplies(await __classPrivateFieldGet(this, _RedisClientMultiCommand_executor, "f").call(this, __classPrivateFieldGet(this, _RedisClientMultiCommand_multi, "f").queue, __classPrivateFieldGet(this, _RedisClientMultiCommand_selectedDB, "f"), multi_command_1.default.generateChainId()));
    }
    async execAsPipeline() {
      if (__classPrivateFieldGet(this, _RedisClientMultiCommand_multi, "f").queue.length === 0)
        return [];
      return __classPrivateFieldGet(this, _RedisClientMultiCommand_multi, "f").transformReplies(await __classPrivateFieldGet(this, _RedisClientMultiCommand_executor, "f").call(this, __classPrivateFieldGet(this, _RedisClientMultiCommand_multi, "f").queue, __classPrivateFieldGet(this, _RedisClientMultiCommand_selectedDB, "f")));
    }
  }
  _RedisClientMultiCommand_multi = new WeakMap, _RedisClientMultiCommand_executor = new WeakMap, _RedisClientMultiCommand_selectedDB = new WeakMap, _RedisClientMultiCommand_instances = new WeakSet, _RedisClientMultiCommand_legacyMode = function _RedisClientMultiCommand_legacyMode() {
    var _a, _b;
    this.v4.addCommand = this.addCommand.bind(this);
    this.addCommand = (...args) => {
      __classPrivateFieldGet(this, _RedisClientMultiCommand_multi, "f").addCommand((0, commander_1.transformLegacyCommandArguments)(args));
      return this;
    };
    this.v4.exec = this.exec.bind(this);
    this.exec = (callback) => {
      this.v4.exec().then((reply) => {
        if (!callback)
          return;
        callback(null, reply);
      }).catch((err) => {
        if (!callback) {
          return;
        }
        callback(err);
      });
    };
    for (const [name, command] of Object.entries(commands_1.default)) {
      __classPrivateFieldGet(this, _RedisClientMultiCommand_instances, "m", _RedisClientMultiCommand_defineLegacyCommand).call(this, name, command);
      (_a = this)[_b = name.toLowerCase()] ?? (_a[_b] = this[name]);
    }
  }, _RedisClientMultiCommand_defineLegacyCommand = function _RedisClientMultiCommand_defineLegacyCommand(name, command) {
    this.v4[name] = this[name].bind(this.v4);
    this[name] = command && command.TRANSFORM_LEGACY_REPLY && command.transformReply ? (...args) => {
      __classPrivateFieldGet(this, _RedisClientMultiCommand_multi, "f").addCommand([name, ...(0, commander_1.transformLegacyCommandArguments)(args)], command.transformReply);
      return this;
    } : (...args) => this.addCommand(name, ...args);
  };
  exports.default = RedisClientMultiCommand;
  (0, commander_1.attachCommands)({
    BaseClass: RedisClientMultiCommand,
    commands: commands_1.default,
    executor: RedisClientMultiCommand.prototype.commandsExecutor
  });
});

// node_modules/generic-pool/lib/factoryValidator.js
var require_factoryValidator = __commonJS((exports, module) => {
  module.exports = function(factory) {
    if (typeof factory.create !== "function") {
      throw new TypeError("factory.create must be a function");
    }
    if (typeof factory.destroy !== "function") {
      throw new TypeError("factory.destroy must be a function");
    }
    if (typeof factory.validate !== "undefined" && typeof factory.validate !== "function") {
      throw new TypeError("factory.validate must be a function");
    }
  };
});

// node_modules/generic-pool/lib/PoolDefaults.js
var require_PoolDefaults = __commonJS((exports, module) => {
  class PoolDefaults {
    constructor() {
      this.fifo = true;
      this.priorityRange = 1;
      this.testOnBorrow = false;
      this.testOnReturn = false;
      this.autostart = true;
      this.evictionRunIntervalMillis = 0;
      this.numTestsPerEvictionRun = 3;
      this.softIdleTimeoutMillis = -1;
      this.idleTimeoutMillis = 30000;
      this.acquireTimeoutMillis = null;
      this.destroyTimeoutMillis = null;
      this.maxWaitingClients = null;
      this.min = null;
      this.max = null;
      this.Promise = Promise;
    }
  }
  module.exports = PoolDefaults;
});

// node_modules/generic-pool/lib/PoolOptions.js
var require_PoolOptions = __commonJS((exports, module) => {
  var PoolDefaults = require_PoolDefaults();

  class PoolOptions {
    constructor(opts) {
      const poolDefaults = new PoolDefaults;
      opts = opts || {};
      this.fifo = typeof opts.fifo === "boolean" ? opts.fifo : poolDefaults.fifo;
      this.priorityRange = opts.priorityRange || poolDefaults.priorityRange;
      this.testOnBorrow = typeof opts.testOnBorrow === "boolean" ? opts.testOnBorrow : poolDefaults.testOnBorrow;
      this.testOnReturn = typeof opts.testOnReturn === "boolean" ? opts.testOnReturn : poolDefaults.testOnReturn;
      this.autostart = typeof opts.autostart === "boolean" ? opts.autostart : poolDefaults.autostart;
      if (opts.acquireTimeoutMillis) {
        this.acquireTimeoutMillis = parseInt(opts.acquireTimeoutMillis, 10);
      }
      if (opts.destroyTimeoutMillis) {
        this.destroyTimeoutMillis = parseInt(opts.destroyTimeoutMillis, 10);
      }
      if (opts.maxWaitingClients !== undefined) {
        this.maxWaitingClients = parseInt(opts.maxWaitingClients, 10);
      }
      this.max = parseInt(opts.max, 10);
      this.min = parseInt(opts.min, 10);
      this.max = Math.max(isNaN(this.max) ? 1 : this.max, 1);
      this.min = Math.min(isNaN(this.min) ? 0 : this.min, this.max);
      this.evictionRunIntervalMillis = opts.evictionRunIntervalMillis || poolDefaults.evictionRunIntervalMillis;
      this.numTestsPerEvictionRun = opts.numTestsPerEvictionRun || poolDefaults.numTestsPerEvictionRun;
      this.softIdleTimeoutMillis = opts.softIdleTimeoutMillis || poolDefaults.softIdleTimeoutMillis;
      this.idleTimeoutMillis = opts.idleTimeoutMillis || poolDefaults.idleTimeoutMillis;
      this.Promise = opts.Promise != null ? opts.Promise : poolDefaults.Promise;
    }
  }
  module.exports = PoolOptions;
});

// node_modules/generic-pool/lib/Deferred.js
var require_Deferred = __commonJS((exports, module) => {
  class Deferred {
    constructor(Promise2) {
      this._state = Deferred.PENDING;
      this._resolve = undefined;
      this._reject = undefined;
      this._promise = new Promise2((resolve, reject) => {
        this._resolve = resolve;
        this._reject = reject;
      });
    }
    get state() {
      return this._state;
    }
    get promise() {
      return this._promise;
    }
    reject(reason) {
      if (this._state !== Deferred.PENDING) {
        return;
      }
      this._state = Deferred.REJECTED;
      this._reject(reason);
    }
    resolve(value) {
      if (this._state !== Deferred.PENDING) {
        return;
      }
      this._state = Deferred.FULFILLED;
      this._resolve(value);
    }
  }
  Deferred.PENDING = "PENDING";
  Deferred.FULFILLED = "FULFILLED";
  Deferred.REJECTED = "REJECTED";
  module.exports = Deferred;
});

// node_modules/generic-pool/lib/errors.js
var require_errors2 = __commonJS((exports, module) => {
  class ExtendableError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
      this.message = message;
      if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error(message).stack;
      }
    }
  }

  class TimeoutError extends ExtendableError {
    constructor(m) {
      super(m);
    }
  }
  module.exports = {
    TimeoutError
  };
});

// node_modules/generic-pool/lib/ResourceRequest.js
var require_ResourceRequest = __commonJS((exports, module) => {
  var Deferred = require_Deferred();
  var errors = require_errors2();
  function fbind(fn, ctx) {
    return function bound() {
      return fn.apply(ctx, arguments);
    };
  }

  class ResourceRequest extends Deferred {
    constructor(ttl, Promise2) {
      super(Promise2);
      this._creationTimestamp = Date.now();
      this._timeout = null;
      if (ttl !== undefined) {
        this.setTimeout(ttl);
      }
    }
    setTimeout(delay) {
      if (this._state !== ResourceRequest.PENDING) {
        return;
      }
      const ttl = parseInt(delay, 10);
      if (isNaN(ttl) || ttl <= 0) {
        throw new Error("delay must be a positive int");
      }
      const age = Date.now() - this._creationTimestamp;
      if (this._timeout) {
        this.removeTimeout();
      }
      this._timeout = setTimeout(fbind(this._fireTimeout, this), Math.max(ttl - age, 0));
    }
    removeTimeout() {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      this._timeout = null;
    }
    _fireTimeout() {
      this.reject(new errors.TimeoutError("ResourceRequest timed out"));
    }
    reject(reason) {
      this.removeTimeout();
      super.reject(reason);
    }
    resolve(value) {
      this.removeTimeout();
      super.resolve(value);
    }
  }
  module.exports = ResourceRequest;
});

// node_modules/generic-pool/lib/ResourceLoan.js
var require_ResourceLoan = __commonJS((exports, module) => {
  var Deferred = require_Deferred();

  class ResourceLoan extends Deferred {
    constructor(pooledResource, Promise2) {
      super(Promise2);
      this._creationTimestamp = Date.now();
      this.pooledResource = pooledResource;
    }
    reject() {}
  }
  module.exports = ResourceLoan;
});

// node_modules/generic-pool/lib/PooledResourceStateEnum.js
var require_PooledResourceStateEnum = __commonJS((exports, module) => {
  var PooledResourceStateEnum = {
    ALLOCATED: "ALLOCATED",
    IDLE: "IDLE",
    INVALID: "INVALID",
    RETURNING: "RETURNING",
    VALIDATION: "VALIDATION"
  };
  module.exports = PooledResourceStateEnum;
});

// node_modules/generic-pool/lib/PooledResource.js
var require_PooledResource = __commonJS((exports, module) => {
  var PooledResourceStateEnum = require_PooledResourceStateEnum();

  class PooledResource {
    constructor(resource) {
      this.creationTime = Date.now();
      this.lastReturnTime = null;
      this.lastBorrowTime = null;
      this.lastIdleTime = null;
      this.obj = resource;
      this.state = PooledResourceStateEnum.IDLE;
    }
    allocate() {
      this.lastBorrowTime = Date.now();
      this.state = PooledResourceStateEnum.ALLOCATED;
    }
    deallocate() {
      this.lastReturnTime = Date.now();
      this.state = PooledResourceStateEnum.IDLE;
    }
    invalidate() {
      this.state = PooledResourceStateEnum.INVALID;
    }
    test() {
      this.state = PooledResourceStateEnum.VALIDATION;
    }
    idle() {
      this.lastIdleTime = Date.now();
      this.state = PooledResourceStateEnum.IDLE;
    }
    returning() {
      this.state = PooledResourceStateEnum.RETURNING;
    }
  }
  module.exports = PooledResource;
});

// node_modules/generic-pool/lib/DefaultEvictor.js
var require_DefaultEvictor = __commonJS((exports, module) => {
  class DefaultEvictor {
    evict(config, pooledResource, availableObjectsCount) {
      const idleTime = Date.now() - pooledResource.lastIdleTime;
      if (config.softIdleTimeoutMillis > 0 && config.softIdleTimeoutMillis < idleTime && config.min < availableObjectsCount) {
        return true;
      }
      if (config.idleTimeoutMillis < idleTime) {
        return true;
      }
      return false;
    }
  }
  module.exports = DefaultEvictor;
});

// node_modules/generic-pool/lib/DoublyLinkedList.js
var require_DoublyLinkedList = __commonJS((exports, module) => {
  class DoublyLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
    insertBeginning(node) {
      if (this.head === null) {
        this.head = node;
        this.tail = node;
        node.prev = null;
        node.next = null;
        this.length++;
      } else {
        this.insertBefore(this.head, node);
      }
    }
    insertEnd(node) {
      if (this.tail === null) {
        this.insertBeginning(node);
      } else {
        this.insertAfter(this.tail, node);
      }
    }
    insertAfter(node, newNode) {
      newNode.prev = node;
      newNode.next = node.next;
      if (node.next === null) {
        this.tail = newNode;
      } else {
        node.next.prev = newNode;
      }
      node.next = newNode;
      this.length++;
    }
    insertBefore(node, newNode) {
      newNode.prev = node.prev;
      newNode.next = node;
      if (node.prev === null) {
        this.head = newNode;
      } else {
        node.prev.next = newNode;
      }
      node.prev = newNode;
      this.length++;
    }
    remove(node) {
      if (node.prev === null) {
        this.head = node.next;
      } else {
        node.prev.next = node.next;
      }
      if (node.next === null) {
        this.tail = node.prev;
      } else {
        node.next.prev = node.prev;
      }
      node.prev = null;
      node.next = null;
      this.length--;
    }
    static createNode(data) {
      return {
        prev: null,
        next: null,
        data
      };
    }
  }
  module.exports = DoublyLinkedList;
});

// node_modules/generic-pool/lib/DoublyLinkedListIterator.js
var require_DoublyLinkedListIterator = __commonJS((exports, module) => {
  class DoublyLinkedListIterator {
    constructor(doublyLinkedList, reverse) {
      this._list = doublyLinkedList;
      this._direction = reverse === true ? "prev" : "next";
      this._startPosition = reverse === true ? "tail" : "head";
      this._started = false;
      this._cursor = null;
      this._done = false;
    }
    _start() {
      this._cursor = this._list[this._startPosition];
      this._started = true;
    }
    _advanceCursor() {
      if (this._started === false) {
        this._started = true;
        this._cursor = this._list[this._startPosition];
        return;
      }
      this._cursor = this._cursor[this._direction];
    }
    reset() {
      this._done = false;
      this._started = false;
      this._cursor = null;
    }
    remove() {
      if (this._started === false || this._done === true || this._isCursorDetached()) {
        return false;
      }
      this._list.remove(this._cursor);
    }
    next() {
      if (this._done === true) {
        return { done: true };
      }
      this._advanceCursor();
      if (this._cursor === null || this._isCursorDetached()) {
        this._done = true;
        return { done: true };
      }
      return {
        value: this._cursor,
        done: false
      };
    }
    _isCursorDetached() {
      return this._cursor.prev === null && this._cursor.next === null && this._list.tail !== this._cursor && this._list.head !== this._cursor;
    }
  }
  module.exports = DoublyLinkedListIterator;
});

// node_modules/generic-pool/lib/DequeIterator.js
var require_DequeIterator = __commonJS((exports, module) => {
  var DoublyLinkedListIterator = require_DoublyLinkedListIterator();

  class DequeIterator extends DoublyLinkedListIterator {
    next() {
      const result = super.next();
      if (result.value) {
        result.value = result.value.data;
      }
      return result;
    }
  }
  module.exports = DequeIterator;
});

// node_modules/generic-pool/lib/Deque.js
var require_Deque = __commonJS((exports, module) => {
  var DoublyLinkedList = require_DoublyLinkedList();
  var DequeIterator = require_DequeIterator();

  class Deque {
    constructor() {
      this._list = new DoublyLinkedList;
    }
    shift() {
      if (this.length === 0) {
        return;
      }
      const node = this._list.head;
      this._list.remove(node);
      return node.data;
    }
    unshift(element) {
      const node = DoublyLinkedList.createNode(element);
      this._list.insertBeginning(node);
    }
    push(element) {
      const node = DoublyLinkedList.createNode(element);
      this._list.insertEnd(node);
    }
    pop() {
      if (this.length === 0) {
        return;
      }
      const node = this._list.tail;
      this._list.remove(node);
      return node.data;
    }
    [Symbol.iterator]() {
      return new DequeIterator(this._list);
    }
    iterator() {
      return new DequeIterator(this._list);
    }
    reverseIterator() {
      return new DequeIterator(this._list, true);
    }
    get head() {
      if (this.length === 0) {
        return;
      }
      const node = this._list.head;
      return node.data;
    }
    get tail() {
      if (this.length === 0) {
        return;
      }
      const node = this._list.tail;
      return node.data;
    }
    get length() {
      return this._list.length;
    }
  }
  module.exports = Deque;
});

// node_modules/generic-pool/lib/Queue.js
var require_Queue = __commonJS((exports, module) => {
  var DoublyLinkedList = require_DoublyLinkedList();
  var Deque = require_Deque();

  class Queue extends Deque {
    push(resourceRequest) {
      const node = DoublyLinkedList.createNode(resourceRequest);
      resourceRequest.promise.catch(this._createTimeoutRejectionHandler(node));
      this._list.insertEnd(node);
    }
    _createTimeoutRejectionHandler(node) {
      return (reason) => {
        if (reason.name === "TimeoutError") {
          this._list.remove(node);
        }
      };
    }
  }
  module.exports = Queue;
});

// node_modules/generic-pool/lib/PriorityQueue.js
var require_PriorityQueue = __commonJS((exports, module) => {
  var Queue = require_Queue();

  class PriorityQueue {
    constructor(size) {
      this._size = Math.max(+size | 0, 1);
      this._slots = [];
      for (let i = 0;i < this._size; i++) {
        this._slots.push(new Queue);
      }
    }
    get length() {
      let _length = 0;
      for (let i = 0, slots = this._slots.length;i < slots; i++) {
        _length += this._slots[i].length;
      }
      return _length;
    }
    enqueue(obj, priority) {
      priority = priority && +priority | 0 || 0;
      if (priority) {
        if (priority < 0 || priority >= this._size) {
          priority = this._size - 1;
        }
      }
      this._slots[priority].push(obj);
    }
    dequeue() {
      for (let i = 0, sl = this._slots.length;i < sl; i += 1) {
        if (this._slots[i].length) {
          return this._slots[i].shift();
        }
      }
      return;
    }
    get head() {
      for (let i = 0, sl = this._slots.length;i < sl; i += 1) {
        if (this._slots[i].length > 0) {
          return this._slots[i].head;
        }
      }
      return;
    }
    get tail() {
      for (let i = this._slots.length - 1;i >= 0; i--) {
        if (this._slots[i].length > 0) {
          return this._slots[i].tail;
        }
      }
      return;
    }
  }
  module.exports = PriorityQueue;
});

// node_modules/generic-pool/lib/utils.js
var require_utils2 = __commonJS((exports) => {
  function noop() {}
  exports.reflector = function(promise) {
    return promise.then(noop, noop);
  };
});

// node_modules/generic-pool/lib/Pool.js
var require_Pool = __commonJS((exports, module) => {
  var EventEmitter = __require("node:events").EventEmitter;
  var factoryValidator = require_factoryValidator();
  var PoolOptions = require_PoolOptions();
  var ResourceRequest = require_ResourceRequest();
  var ResourceLoan = require_ResourceLoan();
  var PooledResource = require_PooledResource();
  var DefaultEvictor = require_DefaultEvictor();
  var Deque = require_Deque();
  var Deferred = require_Deferred();
  var PriorityQueue = require_PriorityQueue();
  var DequeIterator = require_DequeIterator();
  var reflector = require_utils2().reflector;
  var FACTORY_CREATE_ERROR = "factoryCreateError";
  var FACTORY_DESTROY_ERROR = "factoryDestroyError";

  class Pool extends EventEmitter {
    constructor(Evictor, Deque2, PriorityQueue2, factory, options) {
      super();
      factoryValidator(factory);
      this._config = new PoolOptions(options);
      this._Promise = this._config.Promise;
      this._factory = factory;
      this._draining = false;
      this._started = false;
      this._waitingClientsQueue = new PriorityQueue2(this._config.priorityRange);
      this._factoryCreateOperations = new Set;
      this._factoryDestroyOperations = new Set;
      this._availableObjects = new Deque2;
      this._testOnBorrowResources = new Set;
      this._testOnReturnResources = new Set;
      this._validationOperations = new Set;
      this._allObjects = new Set;
      this._resourceLoans = new Map;
      this._evictionIterator = this._availableObjects.iterator();
      this._evictor = new Evictor;
      this._scheduledEviction = null;
      if (this._config.autostart === true) {
        this.start();
      }
    }
    _destroy(pooledResource) {
      pooledResource.invalidate();
      this._allObjects.delete(pooledResource);
      const destroyPromise = this._factory.destroy(pooledResource.obj);
      const wrappedDestroyPromise = this._config.destroyTimeoutMillis ? this._Promise.resolve(this._applyDestroyTimeout(destroyPromise)) : this._Promise.resolve(destroyPromise);
      this._trackOperation(wrappedDestroyPromise, this._factoryDestroyOperations).catch((reason) => {
        this.emit(FACTORY_DESTROY_ERROR, reason);
      });
      this._ensureMinimum();
    }
    _applyDestroyTimeout(promise) {
      const timeoutPromise = new this._Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("destroy timed out"));
        }, this._config.destroyTimeoutMillis).unref();
      });
      return this._Promise.race([timeoutPromise, promise]);
    }
    _testOnBorrow() {
      if (this._availableObjects.length < 1) {
        return false;
      }
      const pooledResource = this._availableObjects.shift();
      pooledResource.test();
      this._testOnBorrowResources.add(pooledResource);
      const validationPromise = this._factory.validate(pooledResource.obj);
      const wrappedValidationPromise = this._Promise.resolve(validationPromise);
      this._trackOperation(wrappedValidationPromise, this._validationOperations).then((isValid) => {
        this._testOnBorrowResources.delete(pooledResource);
        if (isValid === false) {
          pooledResource.invalidate();
          this._destroy(pooledResource);
          this._dispense();
          return;
        }
        this._dispatchPooledResourceToNextWaitingClient(pooledResource);
      });
      return true;
    }
    _dispatchResource() {
      if (this._availableObjects.length < 1) {
        return false;
      }
      const pooledResource = this._availableObjects.shift();
      this._dispatchPooledResourceToNextWaitingClient(pooledResource);
      return false;
    }
    _dispense() {
      const numWaitingClients = this._waitingClientsQueue.length;
      if (numWaitingClients < 1) {
        return;
      }
      const resourceShortfall = numWaitingClients - this._potentiallyAllocableResourceCount;
      const actualNumberOfResourcesToCreate = Math.min(this.spareResourceCapacity, resourceShortfall);
      for (let i = 0;actualNumberOfResourcesToCreate > i; i++) {
        this._createResource();
      }
      if (this._config.testOnBorrow === true) {
        const desiredNumberOfResourcesToMoveIntoTest = numWaitingClients - this._testOnBorrowResources.size;
        const actualNumberOfResourcesToMoveIntoTest = Math.min(this._availableObjects.length, desiredNumberOfResourcesToMoveIntoTest);
        for (let i = 0;actualNumberOfResourcesToMoveIntoTest > i; i++) {
          this._testOnBorrow();
        }
      }
      if (this._config.testOnBorrow === false) {
        const actualNumberOfResourcesToDispatch = Math.min(this._availableObjects.length, numWaitingClients);
        for (let i = 0;actualNumberOfResourcesToDispatch > i; i++) {
          this._dispatchResource();
        }
      }
    }
    _dispatchPooledResourceToNextWaitingClient(pooledResource) {
      const clientResourceRequest = this._waitingClientsQueue.dequeue();
      if (clientResourceRequest === undefined || clientResourceRequest.state !== Deferred.PENDING) {
        this._addPooledResourceToAvailableObjects(pooledResource);
        return false;
      }
      const loan = new ResourceLoan(pooledResource, this._Promise);
      this._resourceLoans.set(pooledResource.obj, loan);
      pooledResource.allocate();
      clientResourceRequest.resolve(pooledResource.obj);
      return true;
    }
    _trackOperation(operation, set) {
      set.add(operation);
      return operation.then((v) => {
        set.delete(operation);
        return this._Promise.resolve(v);
      }, (e) => {
        set.delete(operation);
        return this._Promise.reject(e);
      });
    }
    _createResource() {
      const factoryPromise = this._factory.create();
      const wrappedFactoryPromise = this._Promise.resolve(factoryPromise).then((resource) => {
        const pooledResource = new PooledResource(resource);
        this._allObjects.add(pooledResource);
        this._addPooledResourceToAvailableObjects(pooledResource);
      });
      this._trackOperation(wrappedFactoryPromise, this._factoryCreateOperations).then(() => {
        this._dispense();
        return null;
      }).catch((reason) => {
        this.emit(FACTORY_CREATE_ERROR, reason);
        this._dispense();
      });
    }
    _ensureMinimum() {
      if (this._draining === true) {
        return;
      }
      const minShortfall = this._config.min - this._count;
      for (let i = 0;i < minShortfall; i++) {
        this._createResource();
      }
    }
    _evict() {
      const testsToRun = Math.min(this._config.numTestsPerEvictionRun, this._availableObjects.length);
      const evictionConfig = {
        softIdleTimeoutMillis: this._config.softIdleTimeoutMillis,
        idleTimeoutMillis: this._config.idleTimeoutMillis,
        min: this._config.min
      };
      for (let testsHaveRun = 0;testsHaveRun < testsToRun; ) {
        const iterationResult = this._evictionIterator.next();
        if (iterationResult.done === true && this._availableObjects.length < 1) {
          this._evictionIterator.reset();
          return;
        }
        if (iterationResult.done === true && this._availableObjects.length > 0) {
          this._evictionIterator.reset();
          continue;
        }
        const resource = iterationResult.value;
        const shouldEvict = this._evictor.evict(evictionConfig, resource, this._availableObjects.length);
        testsHaveRun++;
        if (shouldEvict === true) {
          this._evictionIterator.remove();
          this._destroy(resource);
        }
      }
    }
    _scheduleEvictorRun() {
      if (this._config.evictionRunIntervalMillis > 0) {
        this._scheduledEviction = setTimeout(() => {
          this._evict();
          this._scheduleEvictorRun();
        }, this._config.evictionRunIntervalMillis).unref();
      }
    }
    _descheduleEvictorRun() {
      if (this._scheduledEviction) {
        clearTimeout(this._scheduledEviction);
      }
      this._scheduledEviction = null;
    }
    start() {
      if (this._draining === true) {
        return;
      }
      if (this._started === true) {
        return;
      }
      this._started = true;
      this._scheduleEvictorRun();
      this._ensureMinimum();
    }
    acquire(priority) {
      if (this._started === false && this._config.autostart === false) {
        this.start();
      }
      if (this._draining) {
        return this._Promise.reject(new Error("pool is draining and cannot accept work"));
      }
      if (this.spareResourceCapacity < 1 && this._availableObjects.length < 1 && this._config.maxWaitingClients !== undefined && this._waitingClientsQueue.length >= this._config.maxWaitingClients) {
        return this._Promise.reject(new Error("max waitingClients count exceeded"));
      }
      const resourceRequest = new ResourceRequest(this._config.acquireTimeoutMillis, this._Promise);
      this._waitingClientsQueue.enqueue(resourceRequest, priority);
      this._dispense();
      return resourceRequest.promise;
    }
    use(fn, priority) {
      return this.acquire(priority).then((resource) => {
        return fn(resource).then((result) => {
          this.release(resource);
          return result;
        }, (err) => {
          this.destroy(resource);
          throw err;
        });
      });
    }
    isBorrowedResource(resource) {
      return this._resourceLoans.has(resource);
    }
    release(resource) {
      const loan = this._resourceLoans.get(resource);
      if (loan === undefined) {
        return this._Promise.reject(new Error("Resource not currently part of this pool"));
      }
      this._resourceLoans.delete(resource);
      loan.resolve();
      const pooledResource = loan.pooledResource;
      pooledResource.deallocate();
      this._addPooledResourceToAvailableObjects(pooledResource);
      this._dispense();
      return this._Promise.resolve();
    }
    destroy(resource) {
      const loan = this._resourceLoans.get(resource);
      if (loan === undefined) {
        return this._Promise.reject(new Error("Resource not currently part of this pool"));
      }
      this._resourceLoans.delete(resource);
      loan.resolve();
      const pooledResource = loan.pooledResource;
      pooledResource.deallocate();
      this._destroy(pooledResource);
      this._dispense();
      return this._Promise.resolve();
    }
    _addPooledResourceToAvailableObjects(pooledResource) {
      pooledResource.idle();
      if (this._config.fifo === true) {
        this._availableObjects.push(pooledResource);
      } else {
        this._availableObjects.unshift(pooledResource);
      }
    }
    drain() {
      this._draining = true;
      return this.__allResourceRequestsSettled().then(() => {
        return this.__allResourcesReturned();
      }).then(() => {
        this._descheduleEvictorRun();
      });
    }
    __allResourceRequestsSettled() {
      if (this._waitingClientsQueue.length > 0) {
        return reflector(this._waitingClientsQueue.tail.promise);
      }
      return this._Promise.resolve();
    }
    __allResourcesReturned() {
      const ps = Array.from(this._resourceLoans.values()).map((loan) => loan.promise).map(reflector);
      return this._Promise.all(ps);
    }
    clear() {
      const reflectedCreatePromises = Array.from(this._factoryCreateOperations).map(reflector);
      return this._Promise.all(reflectedCreatePromises).then(() => {
        for (const resource of this._availableObjects) {
          this._destroy(resource);
        }
        const reflectedDestroyPromises = Array.from(this._factoryDestroyOperations).map(reflector);
        return reflector(this._Promise.all(reflectedDestroyPromises));
      });
    }
    ready() {
      return new this._Promise((resolve) => {
        const isReady = () => {
          if (this.available >= this.min) {
            resolve();
          } else {
            setTimeout(isReady, 100);
          }
        };
        isReady();
      });
    }
    get _potentiallyAllocableResourceCount() {
      return this._availableObjects.length + this._testOnBorrowResources.size + this._testOnReturnResources.size + this._factoryCreateOperations.size;
    }
    get _count() {
      return this._allObjects.size + this._factoryCreateOperations.size;
    }
    get spareResourceCapacity() {
      return this._config.max - (this._allObjects.size + this._factoryCreateOperations.size);
    }
    get size() {
      return this._count;
    }
    get available() {
      return this._availableObjects.length;
    }
    get borrowed() {
      return this._resourceLoans.size;
    }
    get pending() {
      return this._waitingClientsQueue.length;
    }
    get max() {
      return this._config.max;
    }
    get min() {
      return this._config.min;
    }
  }
  module.exports = Pool;
});

// node_modules/generic-pool/index.js
var require_generic_pool = __commonJS((exports, module) => {
  var Pool = require_Pool();
  var Deque = require_Deque();
  var PriorityQueue = require_PriorityQueue();
  var DefaultEvictor = require_DefaultEvictor();
  module.exports = {
    Pool,
    Deque,
    PriorityQueue,
    DefaultEvictor,
    createPool: function(factory, config) {
      return new Pool(DefaultEvictor, Deque, PriorityQueue, factory, config);
    }
  };
});

// node_modules/@redis/client/dist/package.json
var require_package = __commonJS((exports, module) => {
  module.exports = {
    name: "@redis/client",
    version: "1.5.17",
    license: "MIT",
    main: "./dist/index.js",
    types: "./dist/index.d.ts",
    files: [
      "dist/"
    ],
    scripts: {
      test: "nyc -r text-summary -r lcov mocha -r source-map-support/register -r ts-node/register './lib/**/*.spec.ts'",
      build: "tsc",
      lint: "eslint ./*.ts ./lib/**/*.ts",
      documentation: "typedoc"
    },
    dependencies: {
      "cluster-key-slot": "1.1.2",
      "generic-pool": "3.9.0",
      yallist: "4.0.0"
    },
    devDependencies: {
      "@istanbuljs/nyc-config-typescript": "^1.0.2",
      "@redis/test-utils": "*",
      "@types/node": "^20.6.2",
      "@types/sinon": "^10.0.16",
      "@types/yallist": "^4.0.1",
      "@typescript-eslint/eslint-plugin": "^6.7.2",
      "@typescript-eslint/parser": "^6.7.2",
      eslint: "^8.49.0",
      nyc: "^15.1.0",
      "release-it": "^16.1.5",
      sinon: "^16.0.0",
      "source-map-support": "^0.5.21",
      "ts-node": "^10.9.1",
      typedoc: "^0.25.1",
      typescript: "^5.2.2"
    },
    engines: {
      node: ">=14"
    },
    repository: {
      type: "git",
      url: "git://github.com/redis/node-redis.git"
    },
    bugs: {
      url: "https://github.com/redis/node-redis/issues"
    },
    homepage: "https://github.com/redis/node-redis/tree/master/packages/client",
    keywords: [
      "redis"
    ]
  };
});

// node_modules/@redis/client/dist/lib/client/index.js
var require_client = __commonJS((exports) => {
  var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m")
      throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var _RedisClient_instances;
  var _a;
  var _RedisClient_options;
  var _RedisClient_socket;
  var _RedisClient_queue;
  var _RedisClient_isolationPool;
  var _RedisClient_v4;
  var _RedisClient_selectedDB;
  var _RedisClient_initiateOptions;
  var _RedisClient_initiateQueue;
  var _RedisClient_initiateSocket;
  var _RedisClient_initiateIsolationPool;
  var _RedisClient_legacyMode;
  var _RedisClient_legacySendCommand;
  var _RedisClient_defineLegacyCommand;
  var _RedisClient_pingTimer;
  var _RedisClient_setPingTimer;
  var _RedisClient_sendCommand;
  var _RedisClient_pubSubCommand;
  var _RedisClient_tick;
  var _RedisClient_addMultiCommands;
  var _RedisClient_destroyIsolationPool;
  Object.defineProperty(exports, "__esModule", { value: true });
  var commands_1 = require_commands2();
  var socket_1 = require_socket();
  var commands_queue_1 = require_commands_queue();
  var multi_command_1 = require_multi_command2();
  var events_1 = __require("node:events");
  var command_options_1 = require_command_options();
  var commander_1 = require_commander();
  var generic_pool_1 = require_generic_pool();
  var errors_1 = require_errors();
  var url_1 = __require("node:url");
  var pub_sub_1 = require_pub_sub();
  var package_json_1 = require_package();

  class RedisClient extends events_1.EventEmitter {
    static commandOptions(options) {
      return (0, command_options_1.commandOptions)(options);
    }
    static extend(extensions) {
      const Client = (0, commander_1.attachExtensions)({
        BaseClass: _a,
        modulesExecutor: _a.prototype.commandsExecutor,
        modules: extensions?.modules,
        functionsExecutor: _a.prototype.functionsExecuter,
        functions: extensions?.functions,
        scriptsExecutor: _a.prototype.scriptsExecuter,
        scripts: extensions?.scripts
      });
      if (Client !== _a) {
        Client.prototype.Multi = multi_command_1.default.extend(extensions);
      }
      return Client;
    }
    static create(options) {
      return new (_a.extend(options))(options);
    }
    static parseURL(url) {
      const { hostname, port, protocol, username, password, pathname } = new url_1.URL(url), parsed = {
        socket: {
          host: hostname
        }
      };
      if (protocol === "rediss:") {
        parsed.socket.tls = true;
      } else if (protocol !== "redis:") {
        throw new TypeError("Invalid protocol");
      }
      if (port) {
        parsed.socket.port = Number(port);
      }
      if (username) {
        parsed.username = decodeURIComponent(username);
      }
      if (password) {
        parsed.password = decodeURIComponent(password);
      }
      if (pathname.length > 1) {
        const database = Number(pathname.substring(1));
        if (isNaN(database)) {
          throw new TypeError("Invalid pathname");
        }
        parsed.database = database;
      }
      return parsed;
    }
    get options() {
      return __classPrivateFieldGet(this, _RedisClient_options, "f");
    }
    get isOpen() {
      return __classPrivateFieldGet(this, _RedisClient_socket, "f").isOpen;
    }
    get isReady() {
      return __classPrivateFieldGet(this, _RedisClient_socket, "f").isReady;
    }
    get isPubSubActive() {
      return __classPrivateFieldGet(this, _RedisClient_queue, "f").isPubSubActive;
    }
    get v4() {
      if (!__classPrivateFieldGet(this, _RedisClient_options, "f")?.legacyMode) {
        throw new Error('the client is not in "legacy mode"');
      }
      return __classPrivateFieldGet(this, _RedisClient_v4, "f");
    }
    constructor(options) {
      super();
      _RedisClient_instances.add(this);
      Object.defineProperty(this, "commandOptions", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _a.commandOptions
      });
      _RedisClient_options.set(this, undefined);
      _RedisClient_socket.set(this, undefined);
      _RedisClient_queue.set(this, undefined);
      _RedisClient_isolationPool.set(this, undefined);
      _RedisClient_v4.set(this, {});
      _RedisClient_selectedDB.set(this, 0);
      _RedisClient_pingTimer.set(this, undefined);
      Object.defineProperty(this, "select", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: this.SELECT
      });
      Object.defineProperty(this, "subscribe", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: this.SUBSCRIBE
      });
      Object.defineProperty(this, "unsubscribe", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: this.UNSUBSCRIBE
      });
      Object.defineProperty(this, "pSubscribe", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: this.PSUBSCRIBE
      });
      Object.defineProperty(this, "pUnsubscribe", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: this.PUNSUBSCRIBE
      });
      Object.defineProperty(this, "sSubscribe", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: this.SSUBSCRIBE
      });
      Object.defineProperty(this, "sUnsubscribe", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: this.SUNSUBSCRIBE
      });
      Object.defineProperty(this, "quit", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: this.QUIT
      });
      Object.defineProperty(this, "multi", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: this.MULTI
      });
      __classPrivateFieldSet(this, _RedisClient_options, __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_initiateOptions).call(this, options), "f");
      __classPrivateFieldSet(this, _RedisClient_queue, __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_initiateQueue).call(this), "f");
      __classPrivateFieldSet(this, _RedisClient_socket, __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_initiateSocket).call(this), "f");
      __classPrivateFieldSet(this, _RedisClient_isolationPool, __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_initiateIsolationPool).call(this), "f");
      __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_legacyMode).call(this);
    }
    duplicate(overrides) {
      return new (Object.getPrototypeOf(this)).constructor({
        ...__classPrivateFieldGet(this, _RedisClient_options, "f"),
        ...overrides
      });
    }
    async connect() {
      __classPrivateFieldSet(this, _RedisClient_isolationPool, __classPrivateFieldGet(this, _RedisClient_isolationPool, "f") ?? __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_initiateIsolationPool).call(this), "f");
      await __classPrivateFieldGet(this, _RedisClient_socket, "f").connect();
      return this;
    }
    async commandsExecutor(command, args) {
      const { args: redisArgs, options } = (0, commander_1.transformCommandArguments)(command, args);
      return (0, commander_1.transformCommandReply)(command, await __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_sendCommand).call(this, redisArgs, options), redisArgs.preserve);
    }
    sendCommand(args, options) {
      return __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_sendCommand).call(this, args, options);
    }
    async functionsExecuter(fn, args, name) {
      const { args: redisArgs, options } = (0, commander_1.transformCommandArguments)(fn, args);
      return (0, commander_1.transformCommandReply)(fn, await this.executeFunction(name, fn, redisArgs, options), redisArgs.preserve);
    }
    executeFunction(name, fn, args, options) {
      return __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_sendCommand).call(this, (0, commander_1.fCallArguments)(name, fn, args), options);
    }
    async scriptsExecuter(script, args) {
      const { args: redisArgs, options } = (0, commander_1.transformCommandArguments)(script, args);
      return (0, commander_1.transformCommandReply)(script, await this.executeScript(script, redisArgs, options), redisArgs.preserve);
    }
    async executeScript(script, args, options) {
      const redisArgs = ["EVALSHA", script.SHA1];
      if (script.NUMBER_OF_KEYS !== undefined) {
        redisArgs.push(script.NUMBER_OF_KEYS.toString());
      }
      redisArgs.push(...args);
      try {
        return await __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_sendCommand).call(this, redisArgs, options);
      } catch (err) {
        if (!err?.message?.startsWith?.("NOSCRIPT")) {
          throw err;
        }
        redisArgs[0] = "EVAL";
        redisArgs[1] = script.SCRIPT;
        return __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_sendCommand).call(this, redisArgs, options);
      }
    }
    async SELECT(options, db) {
      if (!(0, command_options_1.isCommandOptions)(options)) {
        db = options;
        options = null;
      }
      await __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_sendCommand).call(this, ["SELECT", db.toString()], options);
      __classPrivateFieldSet(this, _RedisClient_selectedDB, db, "f");
    }
    SUBSCRIBE(channels, listener, bufferMode) {
      return __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_pubSubCommand).call(this, __classPrivateFieldGet(this, _RedisClient_queue, "f").subscribe(pub_sub_1.PubSubType.CHANNELS, channels, listener, bufferMode));
    }
    UNSUBSCRIBE(channels, listener, bufferMode) {
      return __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_pubSubCommand).call(this, __classPrivateFieldGet(this, _RedisClient_queue, "f").unsubscribe(pub_sub_1.PubSubType.CHANNELS, channels, listener, bufferMode));
    }
    PSUBSCRIBE(patterns, listener, bufferMode) {
      return __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_pubSubCommand).call(this, __classPrivateFieldGet(this, _RedisClient_queue, "f").subscribe(pub_sub_1.PubSubType.PATTERNS, patterns, listener, bufferMode));
    }
    PUNSUBSCRIBE(patterns, listener, bufferMode) {
      return __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_pubSubCommand).call(this, __classPrivateFieldGet(this, _RedisClient_queue, "f").unsubscribe(pub_sub_1.PubSubType.PATTERNS, patterns, listener, bufferMode));
    }
    SSUBSCRIBE(channels, listener, bufferMode) {
      return __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_pubSubCommand).call(this, __classPrivateFieldGet(this, _RedisClient_queue, "f").subscribe(pub_sub_1.PubSubType.SHARDED, channels, listener, bufferMode));
    }
    SUNSUBSCRIBE(channels, listener, bufferMode) {
      return __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_pubSubCommand).call(this, __classPrivateFieldGet(this, _RedisClient_queue, "f").unsubscribe(pub_sub_1.PubSubType.SHARDED, channels, listener, bufferMode));
    }
    getPubSubListeners(type) {
      return __classPrivateFieldGet(this, _RedisClient_queue, "f").getPubSubListeners(type);
    }
    extendPubSubChannelListeners(type, channel, listeners) {
      return __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_pubSubCommand).call(this, __classPrivateFieldGet(this, _RedisClient_queue, "f").extendPubSubChannelListeners(type, channel, listeners));
    }
    extendPubSubListeners(type, listeners) {
      return __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_pubSubCommand).call(this, __classPrivateFieldGet(this, _RedisClient_queue, "f").extendPubSubListeners(type, listeners));
    }
    QUIT() {
      return __classPrivateFieldGet(this, _RedisClient_socket, "f").quit(async () => {
        if (__classPrivateFieldGet(this, _RedisClient_pingTimer, "f"))
          clearTimeout(__classPrivateFieldGet(this, _RedisClient_pingTimer, "f"));
        const quitPromise = __classPrivateFieldGet(this, _RedisClient_queue, "f").addCommand(["QUIT"]);
        __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_tick).call(this);
        const [reply] = await Promise.all([
          quitPromise,
          __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_destroyIsolationPool).call(this)
        ]);
        return reply;
      });
    }
    executeIsolated(fn) {
      if (!__classPrivateFieldGet(this, _RedisClient_isolationPool, "f"))
        return Promise.reject(new errors_1.ClientClosedError);
      return __classPrivateFieldGet(this, _RedisClient_isolationPool, "f").use(fn);
    }
    MULTI() {
      return new this.Multi(this.multiExecutor.bind(this), __classPrivateFieldGet(this, _RedisClient_options, "f")?.legacyMode);
    }
    async multiExecutor(commands, selectedDB, chainId) {
      if (!__classPrivateFieldGet(this, _RedisClient_socket, "f").isOpen) {
        return Promise.reject(new errors_1.ClientClosedError);
      }
      const promise = chainId ? Promise.all([
        __classPrivateFieldGet(this, _RedisClient_queue, "f").addCommand(["MULTI"], { chainId }),
        __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_addMultiCommands).call(this, commands, chainId),
        __classPrivateFieldGet(this, _RedisClient_queue, "f").addCommand(["EXEC"], { chainId })
      ]) : __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_addMultiCommands).call(this, commands);
      __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_tick).call(this);
      const results = await promise;
      if (selectedDB !== undefined) {
        __classPrivateFieldSet(this, _RedisClient_selectedDB, selectedDB, "f");
      }
      return results;
    }
    async* scanIterator(options) {
      let cursor = 0;
      do {
        const reply = await this.scan(cursor, options);
        cursor = reply.cursor;
        for (const key of reply.keys) {
          yield key;
        }
      } while (cursor !== 0);
    }
    async* hScanIterator(key, options) {
      let cursor = 0;
      do {
        const reply = await this.hScan(key, cursor, options);
        cursor = reply.cursor;
        for (const tuple of reply.tuples) {
          yield tuple;
        }
      } while (cursor !== 0);
    }
    async* hScanNoValuesIterator(key, options) {
      let cursor = 0;
      do {
        const reply = await this.hScanNoValues(key, cursor, options);
        cursor = reply.cursor;
        for (const k of reply.keys) {
          yield k;
        }
      } while (cursor !== 0);
    }
    async* sScanIterator(key, options) {
      let cursor = 0;
      do {
        const reply = await this.sScan(key, cursor, options);
        cursor = reply.cursor;
        for (const member of reply.members) {
          yield member;
        }
      } while (cursor !== 0);
    }
    async* zScanIterator(key, options) {
      let cursor = 0;
      do {
        const reply = await this.zScan(key, cursor, options);
        cursor = reply.cursor;
        for (const member of reply.members) {
          yield member;
        }
      } while (cursor !== 0);
    }
    async disconnect() {
      if (__classPrivateFieldGet(this, _RedisClient_pingTimer, "f"))
        clearTimeout(__classPrivateFieldGet(this, _RedisClient_pingTimer, "f"));
      __classPrivateFieldGet(this, _RedisClient_queue, "f").flushAll(new errors_1.DisconnectsClientError);
      __classPrivateFieldGet(this, _RedisClient_socket, "f").disconnect();
      await __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_destroyIsolationPool).call(this);
    }
    ref() {
      __classPrivateFieldGet(this, _RedisClient_socket, "f").ref();
    }
    unref() {
      __classPrivateFieldGet(this, _RedisClient_socket, "f").unref();
    }
  }
  _a = RedisClient, _RedisClient_options = new WeakMap, _RedisClient_socket = new WeakMap, _RedisClient_queue = new WeakMap, _RedisClient_isolationPool = new WeakMap, _RedisClient_v4 = new WeakMap, _RedisClient_selectedDB = new WeakMap, _RedisClient_pingTimer = new WeakMap, _RedisClient_instances = new WeakSet, _RedisClient_initiateOptions = function _RedisClient_initiateOptions(options) {
    if (options?.url) {
      const parsed = _a.parseURL(options.url);
      if (options.socket) {
        parsed.socket = Object.assign(options.socket, parsed.socket);
      }
      Object.assign(options, parsed);
    }
    if (options?.database) {
      __classPrivateFieldSet(this, _RedisClient_selectedDB, options.database, "f");
    }
    return options;
  }, _RedisClient_initiateQueue = function _RedisClient_initiateQueue() {
    return new commands_queue_1.default(__classPrivateFieldGet(this, _RedisClient_options, "f")?.commandsQueueMaxLength, (channel, listeners) => this.emit("sharded-channel-moved", channel, listeners));
  }, _RedisClient_initiateSocket = function _RedisClient_initiateSocket() {
    const socketInitiator = async () => {
      const promises = [];
      if (__classPrivateFieldGet(this, _RedisClient_selectedDB, "f") !== 0) {
        promises.push(__classPrivateFieldGet(this, _RedisClient_queue, "f").addCommand(["SELECT", __classPrivateFieldGet(this, _RedisClient_selectedDB, "f").toString()], { asap: true }));
      }
      if (__classPrivateFieldGet(this, _RedisClient_options, "f")?.readonly) {
        promises.push(__classPrivateFieldGet(this, _RedisClient_queue, "f").addCommand(commands_1.default.READONLY.transformArguments(), { asap: true }));
      }
      if (!__classPrivateFieldGet(this, _RedisClient_options, "f")?.disableClientInfo) {
        promises.push(__classPrivateFieldGet(this, _RedisClient_queue, "f").addCommand(["CLIENT", "SETINFO", "LIB-VER", package_json_1.version], { asap: true }).catch((err) => {
          if (!(err instanceof errors_1.ErrorReply)) {
            throw err;
          }
        }));
        promises.push(__classPrivateFieldGet(this, _RedisClient_queue, "f").addCommand([
          "CLIENT",
          "SETINFO",
          "LIB-NAME",
          __classPrivateFieldGet(this, _RedisClient_options, "f")?.clientInfoTag ? `node-redis(${__classPrivateFieldGet(this, _RedisClient_options, "f").clientInfoTag})` : "node-redis"
        ], { asap: true }).catch((err) => {
          if (!(err instanceof errors_1.ErrorReply)) {
            throw err;
          }
        }));
      }
      if (__classPrivateFieldGet(this, _RedisClient_options, "f")?.name) {
        promises.push(__classPrivateFieldGet(this, _RedisClient_queue, "f").addCommand(commands_1.default.CLIENT_SETNAME.transformArguments(__classPrivateFieldGet(this, _RedisClient_options, "f").name), { asap: true }));
      }
      if (__classPrivateFieldGet(this, _RedisClient_options, "f")?.username || __classPrivateFieldGet(this, _RedisClient_options, "f")?.password) {
        promises.push(__classPrivateFieldGet(this, _RedisClient_queue, "f").addCommand(commands_1.default.AUTH.transformArguments({
          username: __classPrivateFieldGet(this, _RedisClient_options, "f").username,
          password: __classPrivateFieldGet(this, _RedisClient_options, "f").password ?? ""
        }), { asap: true }));
      }
      const resubscribePromise = __classPrivateFieldGet(this, _RedisClient_queue, "f").resubscribe();
      if (resubscribePromise) {
        promises.push(resubscribePromise);
      }
      if (promises.length) {
        __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_tick).call(this, true);
        await Promise.all(promises);
      }
    };
    return new socket_1.default(socketInitiator, __classPrivateFieldGet(this, _RedisClient_options, "f")?.socket).on("data", (chunk) => __classPrivateFieldGet(this, _RedisClient_queue, "f").onReplyChunk(chunk)).on("error", (err) => {
      this.emit("error", err);
      if (__classPrivateFieldGet(this, _RedisClient_socket, "f").isOpen && !__classPrivateFieldGet(this, _RedisClient_options, "f")?.disableOfflineQueue) {
        __classPrivateFieldGet(this, _RedisClient_queue, "f").flushWaitingForReply(err);
      } else {
        __classPrivateFieldGet(this, _RedisClient_queue, "f").flushAll(err);
      }
    }).on("connect", () => {
      this.emit("connect");
    }).on("ready", () => {
      this.emit("ready");
      __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_setPingTimer).call(this);
      __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_tick).call(this);
    }).on("reconnecting", () => this.emit("reconnecting")).on("drain", () => __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_tick).call(this)).on("end", () => this.emit("end"));
  }, _RedisClient_initiateIsolationPool = function _RedisClient_initiateIsolationPool() {
    return (0, generic_pool_1.createPool)({
      create: async () => {
        const duplicate = this.duplicate({
          isolationPoolOptions: undefined
        }).on("error", (err) => this.emit("error", err));
        await duplicate.connect();
        return duplicate;
      },
      destroy: (client) => client.disconnect()
    }, __classPrivateFieldGet(this, _RedisClient_options, "f")?.isolationPoolOptions);
  }, _RedisClient_legacyMode = function _RedisClient_legacyMode() {
    var _b, _c;
    if (!__classPrivateFieldGet(this, _RedisClient_options, "f")?.legacyMode)
      return;
    __classPrivateFieldGet(this, _RedisClient_v4, "f").sendCommand = __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_sendCommand).bind(this);
    this.sendCommand = (...args) => {
      const result = __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_legacySendCommand).call(this, ...args);
      if (result) {
        result.promise.then((reply) => result.callback(null, reply)).catch((err) => result.callback(err));
      }
    };
    for (const [name, command] of Object.entries(commands_1.default)) {
      __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, name, command);
      (_b = this)[_c = name.toLowerCase()] ?? (_b[_c] = this[name]);
    }
    __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "SELECT");
    __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "select");
    __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "SUBSCRIBE");
    __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "subscribe");
    __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "PSUBSCRIBE");
    __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "pSubscribe");
    __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "UNSUBSCRIBE");
    __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "unsubscribe");
    __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "PUNSUBSCRIBE");
    __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "pUnsubscribe");
    __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "QUIT");
    __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_defineLegacyCommand).call(this, "quit");
  }, _RedisClient_legacySendCommand = function _RedisClient_legacySendCommand(...args) {
    const callback = typeof args[args.length - 1] === "function" ? args.pop() : undefined;
    const promise = __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_sendCommand).call(this, (0, commander_1.transformLegacyCommandArguments)(args));
    if (callback)
      return {
        promise,
        callback
      };
    promise.catch((err) => this.emit("error", err));
  }, _RedisClient_defineLegacyCommand = function _RedisClient_defineLegacyCommand(name, command) {
    __classPrivateFieldGet(this, _RedisClient_v4, "f")[name] = this[name].bind(this);
    this[name] = command && command.TRANSFORM_LEGACY_REPLY && command.transformReply ? (...args) => {
      const result = __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_legacySendCommand).call(this, name, ...args);
      if (result) {
        result.promise.then((reply) => result.callback(null, command.transformReply(reply))).catch((err) => result.callback(err));
      }
    } : (...args) => this.sendCommand(name, ...args);
  }, _RedisClient_setPingTimer = function _RedisClient_setPingTimer() {
    if (!__classPrivateFieldGet(this, _RedisClient_options, "f")?.pingInterval || !__classPrivateFieldGet(this, _RedisClient_socket, "f").isReady)
      return;
    clearTimeout(__classPrivateFieldGet(this, _RedisClient_pingTimer, "f"));
    __classPrivateFieldSet(this, _RedisClient_pingTimer, setTimeout(() => {
      if (!__classPrivateFieldGet(this, _RedisClient_socket, "f").isReady)
        return;
      __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_sendCommand).call(this, ["PING"]).then((reply) => this.emit("ping-interval", reply)).catch((err) => this.emit("error", err)).finally(() => __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_setPingTimer).call(this));
    }, __classPrivateFieldGet(this, _RedisClient_options, "f").pingInterval), "f");
  }, _RedisClient_sendCommand = function _RedisClient_sendCommand(args, options) {
    if (!__classPrivateFieldGet(this, _RedisClient_socket, "f").isOpen) {
      return Promise.reject(new errors_1.ClientClosedError);
    } else if (options?.isolated) {
      return this.executeIsolated((isolatedClient) => isolatedClient.sendCommand(args, {
        ...options,
        isolated: false
      }));
    } else if (!__classPrivateFieldGet(this, _RedisClient_socket, "f").isReady && __classPrivateFieldGet(this, _RedisClient_options, "f")?.disableOfflineQueue) {
      return Promise.reject(new errors_1.ClientOfflineError);
    }
    const promise = __classPrivateFieldGet(this, _RedisClient_queue, "f").addCommand(args, options);
    __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_tick).call(this);
    return promise;
  }, _RedisClient_pubSubCommand = function _RedisClient_pubSubCommand(promise) {
    if (promise === undefined)
      return Promise.resolve();
    __classPrivateFieldGet(this, _RedisClient_instances, "m", _RedisClient_tick).call(this);
    return promise;
  }, _RedisClient_tick = function _RedisClient_tick(force = false) {
    if (__classPrivateFieldGet(this, _RedisClient_socket, "f").writableNeedDrain || !force && !__classPrivateFieldGet(this, _RedisClient_socket, "f").isReady) {
      return;
    }
    __classPrivateFieldGet(this, _RedisClient_socket, "f").cork();
    while (!__classPrivateFieldGet(this, _RedisClient_socket, "f").writableNeedDrain) {
      const args = __classPrivateFieldGet(this, _RedisClient_queue, "f").getCommandToSend();
      if (args === undefined)
        break;
      __classPrivateFieldGet(this, _RedisClient_socket, "f").writeCommand(args);
    }
  }, _RedisClient_addMultiCommands = function _RedisClient_addMultiCommands(commands, chainId) {
    return Promise.all(commands.map(({ args }) => __classPrivateFieldGet(this, _RedisClient_queue, "f").addCommand(args, { chainId })));
  }, _RedisClient_destroyIsolationPool = async function _RedisClient_destroyIsolationPool() {
    await __classPrivateFieldGet(this, _RedisClient_isolationPool, "f").drain();
    await __classPrivateFieldGet(this, _RedisClient_isolationPool, "f").clear();
    __classPrivateFieldSet(this, _RedisClient_isolationPool, undefined, "f");
  };
  exports.default = RedisClient;
  (0, commander_1.attachCommands)({
    BaseClass: RedisClient,
    commands: commands_1.default,
    executor: RedisClient.prototype.commandsExecutor
  });
  RedisClient.prototype.Multi = multi_command_1.default;
});

// node_modules/cluster-key-slot/lib/index.js
var require_lib = __commonJS((exports, module) => {
  var lookup = [
    0,
    4129,
    8258,
    12387,
    16516,
    20645,
    24774,
    28903,
    33032,
    37161,
    41290,
    45419,
    49548,
    53677,
    57806,
    61935,
    4657,
    528,
    12915,
    8786,
    21173,
    17044,
    29431,
    25302,
    37689,
    33560,
    45947,
    41818,
    54205,
    50076,
    62463,
    58334,
    9314,
    13379,
    1056,
    5121,
    25830,
    29895,
    17572,
    21637,
    42346,
    46411,
    34088,
    38153,
    58862,
    62927,
    50604,
    54669,
    13907,
    9842,
    5649,
    1584,
    30423,
    26358,
    22165,
    18100,
    46939,
    42874,
    38681,
    34616,
    63455,
    59390,
    55197,
    51132,
    18628,
    22757,
    26758,
    30887,
    2112,
    6241,
    10242,
    14371,
    51660,
    55789,
    59790,
    63919,
    35144,
    39273,
    43274,
    47403,
    23285,
    19156,
    31415,
    27286,
    6769,
    2640,
    14899,
    10770,
    56317,
    52188,
    64447,
    60318,
    39801,
    35672,
    47931,
    43802,
    27814,
    31879,
    19684,
    23749,
    11298,
    15363,
    3168,
    7233,
    60846,
    64911,
    52716,
    56781,
    44330,
    48395,
    36200,
    40265,
    32407,
    28342,
    24277,
    20212,
    15891,
    11826,
    7761,
    3696,
    65439,
    61374,
    57309,
    53244,
    48923,
    44858,
    40793,
    36728,
    37256,
    33193,
    45514,
    41451,
    53516,
    49453,
    61774,
    57711,
    4224,
    161,
    12482,
    8419,
    20484,
    16421,
    28742,
    24679,
    33721,
    37784,
    41979,
    46042,
    49981,
    54044,
    58239,
    62302,
    689,
    4752,
    8947,
    13010,
    16949,
    21012,
    25207,
    29270,
    46570,
    42443,
    38312,
    34185,
    62830,
    58703,
    54572,
    50445,
    13538,
    9411,
    5280,
    1153,
    29798,
    25671,
    21540,
    17413,
    42971,
    47098,
    34713,
    38840,
    59231,
    63358,
    50973,
    55100,
    9939,
    14066,
    1681,
    5808,
    26199,
    30326,
    17941,
    22068,
    55628,
    51565,
    63758,
    59695,
    39368,
    35305,
    47498,
    43435,
    22596,
    18533,
    30726,
    26663,
    6336,
    2273,
    14466,
    10403,
    52093,
    56156,
    60223,
    64286,
    35833,
    39896,
    43963,
    48026,
    19061,
    23124,
    27191,
    31254,
    2801,
    6864,
    10931,
    14994,
    64814,
    60687,
    56684,
    52557,
    48554,
    44427,
    40424,
    36297,
    31782,
    27655,
    23652,
    19525,
    15522,
    11395,
    7392,
    3265,
    61215,
    65342,
    53085,
    57212,
    44955,
    49082,
    36825,
    40952,
    28183,
    32310,
    20053,
    24180,
    11923,
    16050,
    3793,
    7920
  ];
  var toUTF8Array = function toUTF8Array(str) {
    var char;
    var i = 0;
    var p = 0;
    var utf8 = [];
    var len = str.length;
    for (;i < len; i++) {
      char = str.charCodeAt(i);
      if (char < 128) {
        utf8[p++] = char;
      } else if (char < 2048) {
        utf8[p++] = char >> 6 | 192;
        utf8[p++] = char & 63 | 128;
      } else if ((char & 64512) === 55296 && i + 1 < str.length && (str.charCodeAt(i + 1) & 64512) === 56320) {
        char = 65536 + ((char & 1023) << 10) + (str.charCodeAt(++i) & 1023);
        utf8[p++] = char >> 18 | 240;
        utf8[p++] = char >> 12 & 63 | 128;
        utf8[p++] = char >> 6 & 63 | 128;
        utf8[p++] = char & 63 | 128;
      } else {
        utf8[p++] = char >> 12 | 224;
        utf8[p++] = char >> 6 & 63 | 128;
        utf8[p++] = char & 63 | 128;
      }
    }
    return utf8;
  };
  var generate = module.exports = function generate(str) {
    var char;
    var i = 0;
    var start = -1;
    var result = 0;
    var resultHash = 0;
    var utf8 = typeof str === "string" ? toUTF8Array(str) : str;
    var len = utf8.length;
    while (i < len) {
      char = utf8[i++];
      if (start === -1) {
        if (char === 123) {
          start = i;
        }
      } else if (char !== 125) {
        resultHash = lookup[(char ^ resultHash >> 8) & 255] ^ resultHash << 8;
      } else if (i - 1 !== start) {
        return resultHash & 16383;
      }
      result = lookup[(char ^ result >> 8) & 255] ^ result << 8;
    }
    return result & 16383;
  };
  module.exports.generateMulti = function generateMulti(keys) {
    var i = 1;
    var len = keys.length;
    var base = generate(keys[0]);
    while (i < len) {
      if (generate(keys[i++]) !== base)
        return -1;
    }
    return base;
  };
});

// node_modules/@redis/client/dist/lib/cluster/cluster-slots.js
var require_cluster_slots = __commonJS((exports) => {
  var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m")
      throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var _RedisClusterSlots_instances;
  var _a;
  var _RedisClusterSlots_SLOTS;
  var _RedisClusterSlots_options;
  var _RedisClusterSlots_Client;
  var _RedisClusterSlots_emit;
  var _RedisClusterSlots_isOpen;
  var _RedisClusterSlots_discoverWithRootNodes;
  var _RedisClusterSlots_resetSlots;
  var _RedisClusterSlots_discover;
  var _RedisClusterSlots_getShards;
  var _RedisClusterSlots_getNodeAddress;
  var _RedisClusterSlots_clientOptionsDefaults;
  var _RedisClusterSlots_initiateSlotNode;
  var _RedisClusterSlots_createClient;
  var _RedisClusterSlots_createNodeClient;
  var _RedisClusterSlots_runningRediscoverPromise;
  var _RedisClusterSlots_rediscover;
  var _RedisClusterSlots_destroy;
  var _RedisClusterSlots_execOnNodeClient;
  var _RedisClusterSlots_iterateAllNodes;
  var _RedisClusterSlots_randomNodeIterator;
  var _RedisClusterSlots_slotNodesIterator;
  var _RedisClusterSlots_initiatePubSubClient;
  var _RedisClusterSlots_initiateShardedPubSubClient;
  Object.defineProperty(exports, "__esModule", { value: true });
  var client_1 = require_client();
  var errors_1 = require_errors();
  var util_1 = __require("node:util");
  var pub_sub_1 = require_pub_sub();
  var calculateSlot = require_lib();

  class RedisClusterSlots {
    get isOpen() {
      return __classPrivateFieldGet(this, _RedisClusterSlots_isOpen, "f");
    }
    constructor(options, emit) {
      _RedisClusterSlots_instances.add(this);
      _RedisClusterSlots_options.set(this, undefined);
      _RedisClusterSlots_Client.set(this, undefined);
      _RedisClusterSlots_emit.set(this, undefined);
      Object.defineProperty(this, "slots", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: new Array(__classPrivateFieldGet(_a, _a, "f", _RedisClusterSlots_SLOTS))
      });
      Object.defineProperty(this, "shards", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: new Array
      });
      Object.defineProperty(this, "masters", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: new Array
      });
      Object.defineProperty(this, "replicas", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: new Array
      });
      Object.defineProperty(this, "nodeByAddress", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: new Map
      });
      Object.defineProperty(this, "pubSubNode", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: undefined
      });
      _RedisClusterSlots_isOpen.set(this, false);
      _RedisClusterSlots_runningRediscoverPromise.set(this, undefined);
      _RedisClusterSlots_randomNodeIterator.set(this, undefined);
      __classPrivateFieldSet(this, _RedisClusterSlots_options, options, "f");
      __classPrivateFieldSet(this, _RedisClusterSlots_Client, client_1.default.extend(options), "f");
      __classPrivateFieldSet(this, _RedisClusterSlots_emit, emit, "f");
    }
    async connect() {
      if (__classPrivateFieldGet(this, _RedisClusterSlots_isOpen, "f")) {
        throw new Error("Cluster already open");
      }
      __classPrivateFieldSet(this, _RedisClusterSlots_isOpen, true, "f");
      try {
        await __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_discoverWithRootNodes).call(this);
      } catch (err) {
        __classPrivateFieldSet(this, _RedisClusterSlots_isOpen, false, "f");
        throw err;
      }
    }
    nodeClient(node) {
      return node.client ?? __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_createNodeClient).call(this, node);
    }
    async rediscover(startWith) {
      __classPrivateFieldSet(this, _RedisClusterSlots_runningRediscoverPromise, __classPrivateFieldGet(this, _RedisClusterSlots_runningRediscoverPromise, "f") ?? __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_rediscover).call(this, startWith).finally(() => __classPrivateFieldSet(this, _RedisClusterSlots_runningRediscoverPromise, undefined, "f")), "f");
      return __classPrivateFieldGet(this, _RedisClusterSlots_runningRediscoverPromise, "f");
    }
    quit() {
      return __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_destroy).call(this, (client) => client.quit());
    }
    disconnect() {
      return __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_destroy).call(this, (client) => client.disconnect());
    }
    getClient(firstKey, isReadonly) {
      if (!firstKey) {
        return this.nodeClient(this.getRandomNode());
      }
      const slotNumber = calculateSlot(firstKey);
      if (!isReadonly) {
        return this.nodeClient(this.slots[slotNumber].master);
      }
      return this.nodeClient(this.getSlotRandomNode(slotNumber));
    }
    getRandomNode() {
      __classPrivateFieldSet(this, _RedisClusterSlots_randomNodeIterator, __classPrivateFieldGet(this, _RedisClusterSlots_randomNodeIterator, "f") ?? __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_iterateAllNodes).call(this), "f");
      return __classPrivateFieldGet(this, _RedisClusterSlots_randomNodeIterator, "f").next().value;
    }
    getSlotRandomNode(slotNumber) {
      const slot = this.slots[slotNumber];
      if (!slot.replicas?.length) {
        return slot.master;
      }
      slot.nodesIterator ?? (slot.nodesIterator = __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_slotNodesIterator).call(this, slot));
      return slot.nodesIterator.next().value;
    }
    getMasterByAddress(address) {
      const master = this.nodeByAddress.get(address);
      if (!master)
        return;
      return this.nodeClient(master);
    }
    getPubSubClient() {
      return this.pubSubNode ? this.pubSubNode.client : __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_initiatePubSubClient).call(this);
    }
    async executeUnsubscribeCommand(unsubscribe) {
      const client = await this.getPubSubClient();
      await unsubscribe(client);
      if (!client.isPubSubActive && client.isOpen) {
        await client.disconnect();
        this.pubSubNode = undefined;
      }
    }
    getShardedPubSubClient(channel) {
      const { master } = this.slots[calculateSlot(channel)];
      return master.pubSubClient ?? __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_initiateShardedPubSubClient).call(this, master);
    }
    async executeShardedUnsubscribeCommand(channel, unsubscribe) {
      const { master } = this.slots[calculateSlot(channel)];
      if (!master.pubSubClient)
        return Promise.resolve();
      const client = await master.pubSubClient;
      await unsubscribe(client);
      if (!client.isPubSubActive && client.isOpen) {
        await client.disconnect();
        master.pubSubClient = undefined;
      }
    }
  }
  _a = RedisClusterSlots, _RedisClusterSlots_options = new WeakMap, _RedisClusterSlots_Client = new WeakMap, _RedisClusterSlots_emit = new WeakMap, _RedisClusterSlots_isOpen = new WeakMap, _RedisClusterSlots_runningRediscoverPromise = new WeakMap, _RedisClusterSlots_randomNodeIterator = new WeakMap, _RedisClusterSlots_instances = new WeakSet, _RedisClusterSlots_discoverWithRootNodes = async function _RedisClusterSlots_discoverWithRootNodes() {
    let start = Math.floor(Math.random() * __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").rootNodes.length);
    for (let i = start;i < __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").rootNodes.length; i++) {
      if (await __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_discover).call(this, __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").rootNodes[i]))
        return;
    }
    for (let i = 0;i < start; i++) {
      if (await __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_discover).call(this, __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").rootNodes[i]))
        return;
    }
    throw new errors_1.RootNodesUnavailableError;
  }, _RedisClusterSlots_resetSlots = function _RedisClusterSlots_resetSlots() {
    this.slots = new Array(__classPrivateFieldGet(_a, _a, "f", _RedisClusterSlots_SLOTS));
    this.shards = [];
    this.masters = [];
    this.replicas = [];
    __classPrivateFieldSet(this, _RedisClusterSlots_randomNodeIterator, undefined, "f");
  }, _RedisClusterSlots_discover = async function _RedisClusterSlots_discover(rootNode) {
    const addressesInUse = new Set;
    try {
      const shards = await __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_getShards).call(this, rootNode), promises = [], eagerConnect = __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").minimizeConnections !== true;
      __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_resetSlots).call(this);
      for (const { from, to, master, replicas } of shards) {
        const shard = {
          master: __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_initiateSlotNode).call(this, master, false, eagerConnect, addressesInUse, promises)
        };
        if (__classPrivateFieldGet(this, _RedisClusterSlots_options, "f").useReplicas) {
          shard.replicas = replicas.map((replica) => __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_initiateSlotNode).call(this, replica, true, eagerConnect, addressesInUse, promises));
        }
        this.shards.push(shard);
        for (let i = from;i <= to; i++) {
          this.slots[i] = shard;
        }
      }
      if (this.pubSubNode && !addressesInUse.has(this.pubSubNode.address)) {
        if (util_1.types.isPromise(this.pubSubNode.client)) {
          promises.push(this.pubSubNode.client.then((client) => client.disconnect()));
          this.pubSubNode = undefined;
        } else {
          promises.push(this.pubSubNode.client.disconnect());
          const channelsListeners = this.pubSubNode.client.getPubSubListeners(pub_sub_1.PubSubType.CHANNELS), patternsListeners = this.pubSubNode.client.getPubSubListeners(pub_sub_1.PubSubType.PATTERNS);
          if (channelsListeners.size || patternsListeners.size) {
            promises.push(__classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_initiatePubSubClient).call(this, {
              [pub_sub_1.PubSubType.CHANNELS]: channelsListeners,
              [pub_sub_1.PubSubType.PATTERNS]: patternsListeners
            }));
          }
        }
      }
      for (const [address, node] of this.nodeByAddress.entries()) {
        if (addressesInUse.has(address))
          continue;
        if (node.client) {
          promises.push(__classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_execOnNodeClient).call(this, node.client, (client) => client.disconnect()));
        }
        const { pubSubClient } = node;
        if (pubSubClient) {
          promises.push(__classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_execOnNodeClient).call(this, pubSubClient, (client) => client.disconnect()));
        }
        this.nodeByAddress.delete(address);
      }
      await Promise.all(promises);
      return true;
    } catch (err) {
      __classPrivateFieldGet(this, _RedisClusterSlots_emit, "f").call(this, "error", err);
      return false;
    }
  }, _RedisClusterSlots_getShards = async function _RedisClusterSlots_getShards(rootNode) {
    const client = new (__classPrivateFieldGet(this, _RedisClusterSlots_Client, "f"))(__classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_clientOptionsDefaults).call(this, rootNode, true));
    client.on("error", (err) => __classPrivateFieldGet(this, _RedisClusterSlots_emit, "f").call(this, "error", err));
    await client.connect();
    try {
      return await client.clusterSlots();
    } finally {
      await client.disconnect();
    }
  }, _RedisClusterSlots_getNodeAddress = function _RedisClusterSlots_getNodeAddress(address) {
    switch (typeof __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").nodeAddressMap) {
      case "object":
        return __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").nodeAddressMap[address];
      case "function":
        return __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").nodeAddressMap(address);
    }
  }, _RedisClusterSlots_clientOptionsDefaults = function _RedisClusterSlots_clientOptionsDefaults(options, disableReconnect) {
    let result;
    if (__classPrivateFieldGet(this, _RedisClusterSlots_options, "f").defaults) {
      let socket;
      if (__classPrivateFieldGet(this, _RedisClusterSlots_options, "f").defaults.socket) {
        socket = {
          ...__classPrivateFieldGet(this, _RedisClusterSlots_options, "f").defaults.socket,
          ...options?.socket
        };
      } else {
        socket = options?.socket;
      }
      result = {
        ...__classPrivateFieldGet(this, _RedisClusterSlots_options, "f").defaults,
        ...options,
        socket
      };
    } else {
      result = options;
    }
    if (disableReconnect) {
      result ?? (result = {});
      result.socket ?? (result.socket = {});
      result.socket.reconnectStrategy = false;
    }
    return result;
  }, _RedisClusterSlots_initiateSlotNode = function _RedisClusterSlots_initiateSlotNode({ id, ip, port }, readonly, eagerConnent, addressesInUse, promises) {
    const address = `${ip}:${port}`;
    addressesInUse.add(address);
    let node = this.nodeByAddress.get(address);
    if (!node) {
      node = {
        id,
        host: ip,
        port,
        address,
        readonly,
        client: undefined
      };
      if (eagerConnent) {
        promises.push(__classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_createNodeClient).call(this, node));
      }
      this.nodeByAddress.set(address, node);
    }
    (readonly ? this.replicas : this.masters).push(node);
    return node;
  }, _RedisClusterSlots_createClient = async function _RedisClusterSlots_createClient(node, readonly = node.readonly) {
    const client = new (__classPrivateFieldGet(this, _RedisClusterSlots_Client, "f"))(__classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_clientOptionsDefaults).call(this, {
      socket: __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_getNodeAddress).call(this, node.address) ?? {
        host: node.host,
        port: node.port
      },
      readonly
    }));
    client.on("error", (err) => __classPrivateFieldGet(this, _RedisClusterSlots_emit, "f").call(this, "error", err));
    await client.connect();
    return client;
  }, _RedisClusterSlots_createNodeClient = function _RedisClusterSlots_createNodeClient(node) {
    const promise = __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_createClient).call(this, node).then((client) => {
      node.client = client;
      return client;
    }).catch((err) => {
      node.client = undefined;
      throw err;
    });
    node.client = promise;
    return promise;
  }, _RedisClusterSlots_rediscover = async function _RedisClusterSlots_rediscover(startWith) {
    if (await __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_discover).call(this, startWith.options))
      return;
    return __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_discoverWithRootNodes).call(this);
  }, _RedisClusterSlots_destroy = async function _RedisClusterSlots_destroy(fn) {
    __classPrivateFieldSet(this, _RedisClusterSlots_isOpen, false, "f");
    const promises = [];
    for (const { master, replicas } of this.shards) {
      if (master.client) {
        promises.push(__classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_execOnNodeClient).call(this, master.client, fn));
      }
      if (master.pubSubClient) {
        promises.push(__classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_execOnNodeClient).call(this, master.pubSubClient, fn));
      }
      if (replicas) {
        for (const { client } of replicas) {
          if (client) {
            promises.push(__classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_execOnNodeClient).call(this, client, fn));
          }
        }
      }
    }
    if (this.pubSubNode) {
      promises.push(__classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_execOnNodeClient).call(this, this.pubSubNode.client, fn));
      this.pubSubNode = undefined;
    }
    __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_resetSlots).call(this);
    this.nodeByAddress.clear();
    await Promise.allSettled(promises);
  }, _RedisClusterSlots_execOnNodeClient = function _RedisClusterSlots_execOnNodeClient(client, fn) {
    return util_1.types.isPromise(client) ? client.then(fn) : fn(client);
  }, _RedisClusterSlots_iterateAllNodes = function* _RedisClusterSlots_iterateAllNodes() {
    let i = Math.floor(Math.random() * (this.masters.length + this.replicas.length));
    if (i < this.masters.length) {
      do {
        yield this.masters[i];
      } while (++i < this.masters.length);
      for (const replica of this.replicas) {
        yield replica;
      }
    } else {
      i -= this.masters.length;
      do {
        yield this.replicas[i];
      } while (++i < this.replicas.length);
    }
    while (true) {
      for (const master of this.masters) {
        yield master;
      }
      for (const replica of this.replicas) {
        yield replica;
      }
    }
  }, _RedisClusterSlots_slotNodesIterator = function* _RedisClusterSlots_slotNodesIterator(slot) {
    let i = Math.floor(Math.random() * (1 + slot.replicas.length));
    if (i < slot.replicas.length) {
      do {
        yield slot.replicas[i];
      } while (++i < slot.replicas.length);
    }
    while (true) {
      yield slot.master;
      for (const replica of slot.replicas) {
        yield replica;
      }
    }
  }, _RedisClusterSlots_initiatePubSubClient = async function _RedisClusterSlots_initiatePubSubClient(toResubscribe) {
    const index = Math.floor(Math.random() * (this.masters.length + this.replicas.length)), node = index < this.masters.length ? this.masters[index] : this.replicas[index - this.masters.length];
    this.pubSubNode = {
      address: node.address,
      client: __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_createClient).call(this, node, true).then(async (client) => {
        if (toResubscribe) {
          await Promise.all([
            client.extendPubSubListeners(pub_sub_1.PubSubType.CHANNELS, toResubscribe[pub_sub_1.PubSubType.CHANNELS]),
            client.extendPubSubListeners(pub_sub_1.PubSubType.PATTERNS, toResubscribe[pub_sub_1.PubSubType.PATTERNS])
          ]);
        }
        this.pubSubNode.client = client;
        return client;
      }).catch((err) => {
        this.pubSubNode = undefined;
        throw err;
      })
    };
    return this.pubSubNode.client;
  }, _RedisClusterSlots_initiateShardedPubSubClient = function _RedisClusterSlots_initiateShardedPubSubClient(master) {
    const promise = __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_createClient).call(this, master, true).then((client) => {
      client.on("server-sunsubscribe", async (channel, listeners) => {
        try {
          await this.rediscover(client);
          const redirectTo = await this.getShardedPubSubClient(channel);
          redirectTo.extendPubSubChannelListeners(pub_sub_1.PubSubType.SHARDED, channel, listeners);
        } catch (err) {
          __classPrivateFieldGet(this, _RedisClusterSlots_emit, "f").call(this, "sharded-shannel-moved-error", err, channel, listeners);
        }
      });
      master.pubSubClient = client;
      return client;
    }).catch((err) => {
      master.pubSubClient = undefined;
      throw err;
    });
    master.pubSubClient = promise;
    return promise;
  };
  _RedisClusterSlots_SLOTS = { value: 16384 };
  exports.default = RedisClusterSlots;
});

// node_modules/@redis/client/dist/lib/cluster/multi-command.js
var require_multi_command3 = __commonJS((exports) => {
  var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m")
      throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _RedisClusterMultiCommand_multi;
  var _RedisClusterMultiCommand_executor;
  var _RedisClusterMultiCommand_firstKey;
  Object.defineProperty(exports, "__esModule", { value: true });
  var commands_1 = require_commands();
  var multi_command_1 = require_multi_command();
  var commander_1 = require_commander();
  var _1 = require_cluster();

  class RedisClusterMultiCommand {
    static extend(extensions) {
      return (0, commander_1.attachExtensions)({
        BaseClass: RedisClusterMultiCommand,
        modulesExecutor: RedisClusterMultiCommand.prototype.commandsExecutor,
        modules: extensions?.modules,
        functionsExecutor: RedisClusterMultiCommand.prototype.functionsExecutor,
        functions: extensions?.functions,
        scriptsExecutor: RedisClusterMultiCommand.prototype.scriptsExecutor,
        scripts: extensions?.scripts
      });
    }
    constructor(executor, firstKey) {
      _RedisClusterMultiCommand_multi.set(this, new multi_command_1.default);
      _RedisClusterMultiCommand_executor.set(this, undefined);
      _RedisClusterMultiCommand_firstKey.set(this, undefined);
      Object.defineProperty(this, "EXEC", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: this.exec
      });
      __classPrivateFieldSet(this, _RedisClusterMultiCommand_executor, executor, "f");
      __classPrivateFieldSet(this, _RedisClusterMultiCommand_firstKey, firstKey, "f");
    }
    commandsExecutor(command, args) {
      const transformedArguments = command.transformArguments(...args);
      __classPrivateFieldSet(this, _RedisClusterMultiCommand_firstKey, __classPrivateFieldGet(this, _RedisClusterMultiCommand_firstKey, "f") ?? _1.default.extractFirstKey(command, args, transformedArguments), "f");
      return this.addCommand(undefined, transformedArguments, command.transformReply);
    }
    addCommand(firstKey, args, transformReply) {
      __classPrivateFieldSet(this, _RedisClusterMultiCommand_firstKey, __classPrivateFieldGet(this, _RedisClusterMultiCommand_firstKey, "f") ?? firstKey, "f");
      __classPrivateFieldGet(this, _RedisClusterMultiCommand_multi, "f").addCommand(args, transformReply);
      return this;
    }
    functionsExecutor(fn, args, name) {
      const transformedArguments = __classPrivateFieldGet(this, _RedisClusterMultiCommand_multi, "f").addFunction(name, fn, args);
      __classPrivateFieldSet(this, _RedisClusterMultiCommand_firstKey, __classPrivateFieldGet(this, _RedisClusterMultiCommand_firstKey, "f") ?? _1.default.extractFirstKey(fn, args, transformedArguments), "f");
      return this;
    }
    scriptsExecutor(script, args) {
      const transformedArguments = __classPrivateFieldGet(this, _RedisClusterMultiCommand_multi, "f").addScript(script, args);
      __classPrivateFieldSet(this, _RedisClusterMultiCommand_firstKey, __classPrivateFieldGet(this, _RedisClusterMultiCommand_firstKey, "f") ?? _1.default.extractFirstKey(script, args, transformedArguments), "f");
      return this;
    }
    async exec(execAsPipeline = false) {
      if (execAsPipeline) {
        return this.execAsPipeline();
      }
      return __classPrivateFieldGet(this, _RedisClusterMultiCommand_multi, "f").handleExecReplies(await __classPrivateFieldGet(this, _RedisClusterMultiCommand_executor, "f").call(this, __classPrivateFieldGet(this, _RedisClusterMultiCommand_multi, "f").queue, __classPrivateFieldGet(this, _RedisClusterMultiCommand_firstKey, "f"), multi_command_1.default.generateChainId()));
    }
    async execAsPipeline() {
      return __classPrivateFieldGet(this, _RedisClusterMultiCommand_multi, "f").transformReplies(await __classPrivateFieldGet(this, _RedisClusterMultiCommand_executor, "f").call(this, __classPrivateFieldGet(this, _RedisClusterMultiCommand_multi, "f").queue, __classPrivateFieldGet(this, _RedisClusterMultiCommand_firstKey, "f")));
    }
  }
  _RedisClusterMultiCommand_multi = new WeakMap, _RedisClusterMultiCommand_executor = new WeakMap, _RedisClusterMultiCommand_firstKey = new WeakMap;
  exports.default = RedisClusterMultiCommand;
  (0, commander_1.attachCommands)({
    BaseClass: RedisClusterMultiCommand,
    commands: commands_1.default,
    executor: RedisClusterMultiCommand.prototype.commandsExecutor
  });
});

// node_modules/@redis/client/dist/lib/cluster/index.js
var require_cluster = __commonJS((exports) => {
  var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m")
      throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var _RedisCluster_instances;
  var _RedisCluster_options;
  var _RedisCluster_slots;
  var _RedisCluster_Multi;
  var _RedisCluster_execute;
  Object.defineProperty(exports, "__esModule", { value: true });
  var commands_1 = require_commands();
  var cluster_slots_1 = require_cluster_slots();
  var commander_1 = require_commander();
  var events_1 = __require("node:events");
  var multi_command_1 = require_multi_command3();
  var errors_1 = require_errors();

  class RedisCluster extends events_1.EventEmitter {
    static extractFirstKey(command, originalArgs, redisArgs) {
      if (command.FIRST_KEY_INDEX === undefined) {
        return;
      } else if (typeof command.FIRST_KEY_INDEX === "number") {
        return redisArgs[command.FIRST_KEY_INDEX];
      }
      return command.FIRST_KEY_INDEX(...originalArgs);
    }
    static create(options) {
      return new ((0, commander_1.attachExtensions)({
        BaseClass: RedisCluster,
        modulesExecutor: RedisCluster.prototype.commandsExecutor,
        modules: options?.modules,
        functionsExecutor: RedisCluster.prototype.functionsExecutor,
        functions: options?.functions,
        scriptsExecutor: RedisCluster.prototype.scriptsExecutor,
        scripts: options?.scripts
      }))(options);
    }
    get slots() {
      return __classPrivateFieldGet(this, _RedisCluster_slots, "f").slots;
    }
    get shards() {
      return __classPrivateFieldGet(this, _RedisCluster_slots, "f").shards;
    }
    get masters() {
      return __classPrivateFieldGet(this, _RedisCluster_slots, "f").masters;
    }
    get replicas() {
      return __classPrivateFieldGet(this, _RedisCluster_slots, "f").replicas;
    }
    get nodeByAddress() {
      return __classPrivateFieldGet(this, _RedisCluster_slots, "f").nodeByAddress;
    }
    get pubSubNode() {
      return __classPrivateFieldGet(this, _RedisCluster_slots, "f").pubSubNode;
    }
    get isOpen() {
      return __classPrivateFieldGet(this, _RedisCluster_slots, "f").isOpen;
    }
    constructor(options) {
      super();
      _RedisCluster_instances.add(this);
      _RedisCluster_options.set(this, undefined);
      _RedisCluster_slots.set(this, undefined);
      _RedisCluster_Multi.set(this, undefined);
      Object.defineProperty(this, "multi", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: this.MULTI
      });
      Object.defineProperty(this, "subscribe", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: this.SUBSCRIBE
      });
      Object.defineProperty(this, "unsubscribe", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: this.UNSUBSCRIBE
      });
      Object.defineProperty(this, "pSubscribe", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: this.PSUBSCRIBE
      });
      Object.defineProperty(this, "pUnsubscribe", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: this.PUNSUBSCRIBE
      });
      Object.defineProperty(this, "sSubscribe", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: this.SSUBSCRIBE
      });
      Object.defineProperty(this, "sUnsubscribe", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: this.SUNSUBSCRIBE
      });
      __classPrivateFieldSet(this, _RedisCluster_options, options, "f");
      __classPrivateFieldSet(this, _RedisCluster_slots, new cluster_slots_1.default(options, this.emit.bind(this)), "f");
      __classPrivateFieldSet(this, _RedisCluster_Multi, multi_command_1.default.extend(options), "f");
    }
    duplicate(overrides) {
      return new (Object.getPrototypeOf(this)).constructor({
        ...__classPrivateFieldGet(this, _RedisCluster_options, "f"),
        ...overrides
      });
    }
    connect() {
      return __classPrivateFieldGet(this, _RedisCluster_slots, "f").connect();
    }
    async commandsExecutor(command, args) {
      const { jsArgs, args: redisArgs, options } = (0, commander_1.transformCommandArguments)(command, args);
      return (0, commander_1.transformCommandReply)(command, await this.sendCommand(RedisCluster.extractFirstKey(command, jsArgs, redisArgs), command.IS_READ_ONLY, redisArgs, options), redisArgs.preserve);
    }
    async sendCommand(firstKey, isReadonly, args, options) {
      return __classPrivateFieldGet(this, _RedisCluster_instances, "m", _RedisCluster_execute).call(this, firstKey, isReadonly, (client) => client.sendCommand(args, options));
    }
    async functionsExecutor(fn, args, name) {
      const { args: redisArgs, options } = (0, commander_1.transformCommandArguments)(fn, args);
      return (0, commander_1.transformCommandReply)(fn, await this.executeFunction(name, fn, args, redisArgs, options), redisArgs.preserve);
    }
    async executeFunction(name, fn, originalArgs, redisArgs, options) {
      return __classPrivateFieldGet(this, _RedisCluster_instances, "m", _RedisCluster_execute).call(this, RedisCluster.extractFirstKey(fn, originalArgs, redisArgs), fn.IS_READ_ONLY, (client) => client.executeFunction(name, fn, redisArgs, options));
    }
    async scriptsExecutor(script, args) {
      const { args: redisArgs, options } = (0, commander_1.transformCommandArguments)(script, args);
      return (0, commander_1.transformCommandReply)(script, await this.executeScript(script, args, redisArgs, options), redisArgs.preserve);
    }
    async executeScript(script, originalArgs, redisArgs, options) {
      return __classPrivateFieldGet(this, _RedisCluster_instances, "m", _RedisCluster_execute).call(this, RedisCluster.extractFirstKey(script, originalArgs, redisArgs), script.IS_READ_ONLY, (client) => client.executeScript(script, redisArgs, options));
    }
    MULTI(routing) {
      return new (__classPrivateFieldGet(this, _RedisCluster_Multi, "f"))((commands, firstKey, chainId) => {
        return __classPrivateFieldGet(this, _RedisCluster_instances, "m", _RedisCluster_execute).call(this, firstKey, false, (client) => client.multiExecutor(commands, undefined, chainId));
      }, routing);
    }
    async SUBSCRIBE(channels, listener, bufferMode) {
      return (await __classPrivateFieldGet(this, _RedisCluster_slots, "f").getPubSubClient()).SUBSCRIBE(channels, listener, bufferMode);
    }
    async UNSUBSCRIBE(channels, listener, bufferMode) {
      return __classPrivateFieldGet(this, _RedisCluster_slots, "f").executeUnsubscribeCommand((client) => client.UNSUBSCRIBE(channels, listener, bufferMode));
    }
    async PSUBSCRIBE(patterns, listener, bufferMode) {
      return (await __classPrivateFieldGet(this, _RedisCluster_slots, "f").getPubSubClient()).PSUBSCRIBE(patterns, listener, bufferMode);
    }
    async PUNSUBSCRIBE(patterns, listener, bufferMode) {
      return __classPrivateFieldGet(this, _RedisCluster_slots, "f").executeUnsubscribeCommand((client) => client.PUNSUBSCRIBE(patterns, listener, bufferMode));
    }
    async SSUBSCRIBE(channels, listener, bufferMode) {
      const maxCommandRedirections = __classPrivateFieldGet(this, _RedisCluster_options, "f").maxCommandRedirections ?? 16, firstChannel = Array.isArray(channels) ? channels[0] : channels;
      let client = await __classPrivateFieldGet(this, _RedisCluster_slots, "f").getShardedPubSubClient(firstChannel);
      for (let i = 0;; i++) {
        try {
          return await client.SSUBSCRIBE(channels, listener, bufferMode);
        } catch (err) {
          if (++i > maxCommandRedirections || !(err instanceof errors_1.ErrorReply)) {
            throw err;
          }
          if (err.message.startsWith("MOVED")) {
            await __classPrivateFieldGet(this, _RedisCluster_slots, "f").rediscover(client);
            client = await __classPrivateFieldGet(this, _RedisCluster_slots, "f").getShardedPubSubClient(firstChannel);
            continue;
          }
          throw err;
        }
      }
    }
    SUNSUBSCRIBE(channels, listener, bufferMode) {
      return __classPrivateFieldGet(this, _RedisCluster_slots, "f").executeShardedUnsubscribeCommand(Array.isArray(channels) ? channels[0] : channels, (client) => client.SUNSUBSCRIBE(channels, listener, bufferMode));
    }
    quit() {
      return __classPrivateFieldGet(this, _RedisCluster_slots, "f").quit();
    }
    disconnect() {
      return __classPrivateFieldGet(this, _RedisCluster_slots, "f").disconnect();
    }
    nodeClient(node) {
      return __classPrivateFieldGet(this, _RedisCluster_slots, "f").nodeClient(node);
    }
    getRandomNode() {
      return __classPrivateFieldGet(this, _RedisCluster_slots, "f").getRandomNode();
    }
    getSlotRandomNode(slot) {
      return __classPrivateFieldGet(this, _RedisCluster_slots, "f").getSlotRandomNode(slot);
    }
    getMasters() {
      return this.masters;
    }
    getSlotMaster(slot) {
      return this.slots[slot].master;
    }
  }
  _RedisCluster_options = new WeakMap, _RedisCluster_slots = new WeakMap, _RedisCluster_Multi = new WeakMap, _RedisCluster_instances = new WeakSet, _RedisCluster_execute = async function _RedisCluster_execute(firstKey, isReadonly, executor) {
    const maxCommandRedirections = __classPrivateFieldGet(this, _RedisCluster_options, "f").maxCommandRedirections ?? 16;
    let client = await __classPrivateFieldGet(this, _RedisCluster_slots, "f").getClient(firstKey, isReadonly);
    for (let i = 0;; i++) {
      try {
        return await executor(client);
      } catch (err) {
        if (++i > maxCommandRedirections || !(err instanceof errors_1.ErrorReply)) {
          throw err;
        }
        if (err.message.startsWith("ASK")) {
          const address = err.message.substring(err.message.lastIndexOf(" ") + 1);
          let redirectTo = await __classPrivateFieldGet(this, _RedisCluster_slots, "f").getMasterByAddress(address);
          if (!redirectTo) {
            await __classPrivateFieldGet(this, _RedisCluster_slots, "f").rediscover(client);
            redirectTo = await __classPrivateFieldGet(this, _RedisCluster_slots, "f").getMasterByAddress(address);
          }
          if (!redirectTo) {
            throw new Error(`Cannot find node ${address}`);
          }
          await redirectTo.asking();
          client = redirectTo;
          continue;
        } else if (err.message.startsWith("MOVED")) {
          await __classPrivateFieldGet(this, _RedisCluster_slots, "f").rediscover(client);
          client = await __classPrivateFieldGet(this, _RedisCluster_slots, "f").getClient(firstKey, isReadonly);
          continue;
        }
        throw err;
      }
    }
  };
  exports.default = RedisCluster;
  (0, commander_1.attachCommands)({
    BaseClass: RedisCluster,
    commands: commands_1.default,
    executor: RedisCluster.prototype.commandsExecutor
  });
});

// node_modules/@redis/client/dist/lib/lua-script.js
var require_lua_script = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.scriptSha1 = exports.defineScript = undefined;
  var crypto_1 = __require("node:crypto");
  function defineScript(script) {
    return {
      ...script,
      SHA1: scriptSha1(script.SCRIPT)
    };
  }
  exports.defineScript = defineScript;
  function scriptSha1(script) {
    return (0, crypto_1.createHash)("sha1").update(script).digest("hex");
  }
  exports.scriptSha1 = scriptSha1;
});

// node_modules/@redis/client/dist/index.js
var require_dist = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.RedisFlushModes = exports.GeoReplyWith = exports.defineScript = exports.createCluster = exports.commandOptions = exports.createClient = undefined;
  var client_1 = require_client();
  var cluster_1 = require_cluster();
  exports.createClient = client_1.default.create;
  exports.commandOptions = client_1.default.commandOptions;
  exports.createCluster = cluster_1.default.create;
  var lua_script_1 = require_lua_script();
  Object.defineProperty(exports, "defineScript", { enumerable: true, get: function() {
    return lua_script_1.defineScript;
  } });
  __exportStar(require_errors(), exports);
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "GeoReplyWith", { enumerable: true, get: function() {
    return generic_transformers_1.GeoReplyWith;
  } });
  var FLUSHALL_1 = require_FLUSHALL();
  Object.defineProperty(exports, "RedisFlushModes", { enumerable: true, get: function() {
    return FLUSHALL_1.RedisFlushModes;
  } });
});

// node_modules/@redis/bloom/dist/commands/bloom/ADD.js
var require_ADD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, item) {
    return ["BF.ADD", key, item];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanReply;
  } });
});

// node_modules/@redis/bloom/dist/commands/bloom/CARD.js
var require_CARD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["BF.CARD", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/bloom/dist/commands/bloom/EXISTS.js
var require_EXISTS2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, item) {
    return ["BF.EXISTS", key, item];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanReply;
  } });
});

// node_modules/@redis/bloom/dist/commands/bloom/INFO.js
var require_INFO2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["BF.INFO", key];
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return {
      capacity: reply[1],
      size: reply[3],
      numberOfFilters: reply[5],
      numberOfInsertedItems: reply[7],
      expansionRate: reply[9]
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/bloom/dist/commands/bloom/INSERT.js
var require_INSERT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, items, options) {
    const args = ["BF.INSERT", key];
    if (options?.CAPACITY) {
      args.push("CAPACITY", options.CAPACITY.toString());
    }
    if (options?.ERROR) {
      args.push("ERROR", options.ERROR.toString());
    }
    if (options?.EXPANSION) {
      args.push("EXPANSION", options.EXPANSION.toString());
    }
    if (options?.NOCREATE) {
      args.push("NOCREATE");
    }
    if (options?.NONSCALING) {
      args.push("NONSCALING");
    }
    args.push("ITEMS");
    return (0, generic_transformers_1.pushVerdictArguments)(args, items);
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_2 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_2.transformBooleanArrayReply;
  } });
});

// node_modules/@redis/bloom/dist/commands/bloom/LOADCHUNK.js
var require_LOADCHUNK = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, iteretor, chunk) {
    return ["BF.LOADCHUNK", key, iteretor.toString(), chunk];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/bloom/dist/commands/bloom/MADD.js
var require_MADD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, items) {
    return ["BF.MADD", key, ...items];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanArrayReply;
  } });
});

// node_modules/@redis/bloom/dist/commands/bloom/MEXISTS.js
var require_MEXISTS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, items) {
    return ["BF.MEXISTS", key, ...items];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanArrayReply;
  } });
});

// node_modules/@redis/bloom/dist/commands/bloom/RESERVE.js
var require_RESERVE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, errorRate, capacity, options) {
    const args = ["BF.RESERVE", key, errorRate.toString(), capacity.toString()];
    if (options?.EXPANSION) {
      args.push("EXPANSION", options.EXPANSION.toString());
    }
    if (options?.NONSCALING) {
      args.push("NONSCALING");
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/bloom/dist/commands/bloom/SCANDUMP.js
var require_SCANDUMP = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, iterator) {
    return ["BF.SCANDUMP", key, iterator.toString()];
  }
  exports.transformArguments = transformArguments;
  function transformReply([iterator, chunk]) {
    return {
      iterator,
      chunk
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/bloom/dist/commands/bloom/index.js
var require_bloom = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var ADD = require_ADD();
  var CARD = require_CARD();
  var EXISTS = require_EXISTS2();
  var INFO = require_INFO2();
  var INSERT = require_INSERT();
  var LOADCHUNK = require_LOADCHUNK();
  var MADD = require_MADD();
  var MEXISTS = require_MEXISTS();
  var RESERVE = require_RESERVE();
  var SCANDUMP = require_SCANDUMP();
  exports.default = {
    ADD,
    add: ADD,
    CARD,
    card: CARD,
    EXISTS,
    exists: EXISTS,
    INFO,
    info: INFO,
    INSERT,
    insert: INSERT,
    LOADCHUNK,
    loadChunk: LOADCHUNK,
    MADD,
    mAdd: MADD,
    MEXISTS,
    mExists: MEXISTS,
    RESERVE,
    reserve: RESERVE,
    SCANDUMP,
    scanDump: SCANDUMP
  };
});

// node_modules/@redis/bloom/dist/commands/count-min-sketch/INCRBY.js
var require_INCRBY2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, items) {
    const args = ["CMS.INCRBY", key];
    if (Array.isArray(items)) {
      for (const item of items) {
        pushIncrByItem(args, item);
      }
    } else {
      pushIncrByItem(args, items);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  function pushIncrByItem(args, { item, incrementBy }) {
    args.push(item, incrementBy.toString());
  }
});

// node_modules/@redis/bloom/dist/commands/count-min-sketch/INFO.js
var require_INFO3 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["CMS.INFO", key];
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return {
      width: reply[1],
      depth: reply[3],
      count: reply[5]
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/bloom/dist/commands/count-min-sketch/INITBYDIM.js
var require_INITBYDIM = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, width, depth) {
    return ["CMS.INITBYDIM", key, width.toString(), depth.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/bloom/dist/commands/count-min-sketch/INITBYPROB.js
var require_INITBYPROB = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, error, probability) {
    return ["CMS.INITBYPROB", key, error.toString(), probability.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/bloom/dist/commands/count-min-sketch/MERGE.js
var require_MERGE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(dest, src) {
    const args = [
      "CMS.MERGE",
      dest,
      src.length.toString()
    ];
    if (isStringSketches(src)) {
      args.push(...src);
    } else {
      for (const sketch of src) {
        args.push(sketch.name);
      }
      args.push("WEIGHTS");
      for (const sketch of src) {
        args.push(sketch.weight.toString());
      }
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  function isStringSketches(src) {
    return typeof src[0] === "string";
  }
});

// node_modules/@redis/bloom/dist/commands/count-min-sketch/QUERY.js
var require_QUERY = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, items) {
    return (0, generic_transformers_1.pushVerdictArguments)(["CMS.QUERY", key], items);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/bloom/dist/commands/count-min-sketch/index.js
var require_count_min_sketch = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var INCRBY = require_INCRBY2();
  var INFO = require_INFO3();
  var INITBYDIM = require_INITBYDIM();
  var INITBYPROB = require_INITBYPROB();
  var MERGE = require_MERGE();
  var QUERY = require_QUERY();
  exports.default = {
    INCRBY,
    incrBy: INCRBY,
    INFO,
    info: INFO,
    INITBYDIM,
    initByDim: INITBYDIM,
    INITBYPROB,
    initByProb: INITBYPROB,
    MERGE,
    merge: MERGE,
    QUERY,
    query: QUERY
  };
});

// node_modules/@redis/bloom/dist/commands/cuckoo/ADD.js
var require_ADD2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, item) {
    return ["CF.ADD", key, item];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanReply;
  } });
});

// node_modules/@redis/bloom/dist/commands/cuckoo/ADDNX.js
var require_ADDNX = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, item) {
    return ["CF.ADDNX", key, item];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanReply;
  } });
});

// node_modules/@redis/bloom/dist/commands/cuckoo/COUNT.js
var require_COUNT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, item) {
    return ["CF.COUNT", key, item];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/bloom/dist/commands/cuckoo/DEL.js
var require_DEL2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, item) {
    return ["CF.DEL", key, item];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanReply;
  } });
});

// node_modules/@redis/bloom/dist/commands/cuckoo/EXISTS.js
var require_EXISTS3 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, item) {
    return ["CF.EXISTS", key, item];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanReply;
  } });
});

// node_modules/@redis/bloom/dist/commands/cuckoo/INFO.js
var require_INFO4 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["CF.INFO", key];
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return {
      size: reply[1],
      numberOfBuckets: reply[3],
      numberOfFilters: reply[5],
      numberOfInsertedItems: reply[7],
      numberOfDeletedItems: reply[9],
      bucketSize: reply[11],
      expansionRate: reply[13],
      maxIteration: reply[15]
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/bloom/dist/commands/cuckoo/INSERT.js
var require_INSERT2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_cuckoo();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, items, options) {
    return (0, _1.pushInsertOptions)(["CF.INSERT", key], items, options);
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanArrayReply;
  } });
});

// node_modules/@redis/bloom/dist/commands/cuckoo/INSERTNX.js
var require_INSERTNX = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_cuckoo();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, items, options) {
    return (0, _1.pushInsertOptions)(["CF.INSERTNX", key], items, options);
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanArrayReply;
  } });
});

// node_modules/@redis/bloom/dist/commands/cuckoo/LOADCHUNK.js
var require_LOADCHUNK2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, iterator, chunk) {
    return ["CF.LOADCHUNK", key, iterator.toString(), chunk];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/bloom/dist/commands/cuckoo/RESERVE.js
var require_RESERVE2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, capacity, options) {
    const args = ["CF.RESERVE", key, capacity.toString()];
    if (options?.BUCKETSIZE) {
      args.push("BUCKETSIZE", options.BUCKETSIZE.toString());
    }
    if (options?.MAXITERATIONS) {
      args.push("MAXITERATIONS", options.MAXITERATIONS.toString());
    }
    if (options?.EXPANSION) {
      args.push("EXPANSION", options.EXPANSION.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/bloom/dist/commands/cuckoo/SCANDUMP.js
var require_SCANDUMP2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, iterator) {
    return ["CF.SCANDUMP", key, iterator.toString()];
  }
  exports.transformArguments = transformArguments;
  function transformReply([iterator, chunk]) {
    return {
      iterator,
      chunk
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/bloom/dist/commands/cuckoo/index.js
var require_cuckoo = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.pushInsertOptions = undefined;
  var ADD = require_ADD2();
  var ADDNX = require_ADDNX();
  var COUNT = require_COUNT();
  var DEL = require_DEL2();
  var EXISTS = require_EXISTS3();
  var INFO = require_INFO4();
  var INSERT = require_INSERT2();
  var INSERTNX = require_INSERTNX();
  var LOADCHUNK = require_LOADCHUNK2();
  var RESERVE = require_RESERVE2();
  var SCANDUMP = require_SCANDUMP2();
  var generic_transformers_1 = require_generic_transformers();
  exports.default = {
    ADD,
    add: ADD,
    ADDNX,
    addNX: ADDNX,
    COUNT,
    count: COUNT,
    DEL,
    del: DEL,
    EXISTS,
    exists: EXISTS,
    INFO,
    info: INFO,
    INSERT,
    insert: INSERT,
    INSERTNX,
    insertNX: INSERTNX,
    LOADCHUNK,
    loadChunk: LOADCHUNK,
    RESERVE,
    reserve: RESERVE,
    SCANDUMP,
    scanDump: SCANDUMP
  };
  function pushInsertOptions(args, items, options) {
    if (options?.CAPACITY) {
      args.push("CAPACITY");
      args.push(options.CAPACITY.toString());
    }
    if (options?.NOCREATE) {
      args.push("NOCREATE");
    }
    args.push("ITEMS");
    return (0, generic_transformers_1.pushVerdictArguments)(args, items);
  }
  exports.pushInsertOptions = pushInsertOptions;
});

// node_modules/@redis/bloom/dist/commands/t-digest/ADD.js
var require_ADD3 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, values) {
    const args = ["TDIGEST.ADD", key];
    for (const item of values) {
      args.push(item.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/bloom/dist/commands/t-digest/BYRANK.js
var require_BYRANK = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, ranks) {
    const args = ["TDIGEST.BYRANK", key];
    for (const rank of ranks) {
      args.push(rank.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  var _1 = require_t_digest();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return _1.transformDoublesReply;
  } });
});

// node_modules/@redis/bloom/dist/commands/t-digest/BYREVRANK.js
var require_BYREVRANK = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, ranks) {
    const args = ["TDIGEST.BYREVRANK", key];
    for (const rank of ranks) {
      args.push(rank.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  var _1 = require_t_digest();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return _1.transformDoublesReply;
  } });
});

// node_modules/@redis/bloom/dist/commands/t-digest/CDF.js
var require_CDF = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, values) {
    const args = ["TDIGEST.CDF", key];
    for (const item of values) {
      args.push(item.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  var _1 = require_t_digest();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return _1.transformDoublesReply;
  } });
});

// node_modules/@redis/bloom/dist/commands/t-digest/CREATE.js
var require_CREATE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_t_digest();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, options) {
    return (0, _1.pushCompressionArgument)(["TDIGEST.CREATE", key], options);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/bloom/dist/commands/t-digest/INFO.js
var require_INFO5 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return [
      "TDIGEST.INFO",
      key
    ];
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return {
      comperssion: reply[1],
      capacity: reply[3],
      mergedNodes: reply[5],
      unmergedNodes: reply[7],
      mergedWeight: Number(reply[9]),
      unmergedWeight: Number(reply[11]),
      totalCompression: reply[13]
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/bloom/dist/commands/t-digest/MAX.js
var require_MAX = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return [
      "TDIGEST.MAX",
      key
    ];
  }
  exports.transformArguments = transformArguments;
  var _1 = require_t_digest();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return _1.transformDoubleReply;
  } });
});

// node_modules/@redis/bloom/dist/commands/t-digest/MERGE.js
var require_MERGE2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  var _1 = require_t_digest();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(destKey, srcKeys, options) {
    const args = (0, generic_transformers_1.pushVerdictArgument)(["TDIGEST.MERGE", destKey], srcKeys);
    (0, _1.pushCompressionArgument)(args, options);
    if (options?.OVERRIDE) {
      args.push("OVERRIDE");
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/bloom/dist/commands/t-digest/MIN.js
var require_MIN = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return [
      "TDIGEST.MIN",
      key
    ];
  }
  exports.transformArguments = transformArguments;
  var _1 = require_t_digest();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return _1.transformDoubleReply;
  } });
});

// node_modules/@redis/bloom/dist/commands/t-digest/QUANTILE.js
var require_QUANTILE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, quantiles) {
    const args = [
      "TDIGEST.QUANTILE",
      key
    ];
    for (const quantile of quantiles) {
      args.push(quantile.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  var _1 = require_t_digest();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return _1.transformDoublesReply;
  } });
});

// node_modules/@redis/bloom/dist/commands/t-digest/RANK.js
var require_RANK = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, values) {
    const args = ["TDIGEST.RANK", key];
    for (const item of values) {
      args.push(item.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/bloom/dist/commands/t-digest/RESET.js
var require_RESET = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return ["TDIGEST.RESET", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/bloom/dist/commands/t-digest/REVRANK.js
var require_REVRANK = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, values) {
    const args = ["TDIGEST.REVRANK", key];
    for (const item of values) {
      args.push(item.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/bloom/dist/commands/t-digest/TRIMMED_MEAN.js
var require_TRIMMED_MEAN = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, lowCutPercentile, highCutPercentile) {
    return [
      "TDIGEST.TRIMMED_MEAN",
      key,
      lowCutPercentile.toString(),
      highCutPercentile.toString()
    ];
  }
  exports.transformArguments = transformArguments;
  var _1 = require_t_digest();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return _1.transformDoubleReply;
  } });
});

// node_modules/@redis/bloom/dist/commands/t-digest/index.js
var require_t_digest = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformDoublesReply = exports.transformDoubleReply = exports.pushCompressionArgument = undefined;
  var ADD = require_ADD3();
  var BYRANK = require_BYRANK();
  var BYREVRANK = require_BYREVRANK();
  var CDF = require_CDF();
  var CREATE = require_CREATE();
  var INFO = require_INFO5();
  var MAX = require_MAX();
  var MERGE = require_MERGE2();
  var MIN = require_MIN();
  var QUANTILE = require_QUANTILE();
  var RANK = require_RANK();
  var RESET = require_RESET();
  var REVRANK = require_REVRANK();
  var TRIMMED_MEAN = require_TRIMMED_MEAN();
  exports.default = {
    ADD,
    add: ADD,
    BYRANK,
    byRank: BYRANK,
    BYREVRANK,
    byRevRank: BYREVRANK,
    CDF,
    cdf: CDF,
    CREATE,
    create: CREATE,
    INFO,
    info: INFO,
    MAX,
    max: MAX,
    MERGE,
    merge: MERGE,
    MIN,
    min: MIN,
    QUANTILE,
    quantile: QUANTILE,
    RANK,
    rank: RANK,
    RESET,
    reset: RESET,
    REVRANK,
    revRank: REVRANK,
    TRIMMED_MEAN,
    trimmedMean: TRIMMED_MEAN
  };
  function pushCompressionArgument(args, options) {
    if (options?.COMPRESSION) {
      args.push("COMPRESSION", options.COMPRESSION.toString());
    }
    return args;
  }
  exports.pushCompressionArgument = pushCompressionArgument;
  function transformDoubleReply(reply) {
    switch (reply) {
      case "inf":
        return Infinity;
      case "-inf":
        return -Infinity;
      case "nan":
        return NaN;
      default:
        return parseFloat(reply);
    }
  }
  exports.transformDoubleReply = transformDoubleReply;
  function transformDoublesReply(reply) {
    return reply.map(transformDoubleReply);
  }
  exports.transformDoublesReply = transformDoublesReply;
});

// node_modules/@redis/bloom/dist/commands/top-k/ADD.js
var require_ADD4 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, items) {
    return (0, generic_transformers_1.pushVerdictArguments)(["TOPK.ADD", key], items);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/bloom/dist/commands/top-k/COUNT.js
var require_COUNT2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, items) {
    return (0, generic_transformers_1.pushVerdictArguments)(["TOPK.COUNT", key], items);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/bloom/dist/commands/top-k/INCRBY.js
var require_INCRBY3 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, items) {
    const args = ["TOPK.INCRBY", key];
    if (Array.isArray(items)) {
      for (const item of items) {
        pushIncrByItem(args, item);
      }
    } else {
      pushIncrByItem(args, items);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  function pushIncrByItem(args, { item, incrementBy }) {
    args.push(item, incrementBy.toString());
  }
});

// node_modules/@redis/bloom/dist/commands/top-k/INFO.js
var require_INFO6 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["TOPK.INFO", key];
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return {
      k: reply[1],
      width: reply[3],
      depth: reply[5],
      decay: Number(reply[7])
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/bloom/dist/commands/top-k/LIST_WITHCOUNT.js
var require_LIST_WITHCOUNT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["TOPK.LIST", key, "WITHCOUNT"];
  }
  exports.transformArguments = transformArguments;
  function transformReply(rawReply) {
    const reply = [];
    for (let i = 0;i < rawReply.length; i++) {
      reply.push({
        item: rawReply[i],
        count: rawReply[++i]
      });
    }
    return reply;
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/bloom/dist/commands/top-k/LIST.js
var require_LIST = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["TOPK.LIST", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/bloom/dist/commands/top-k/QUERY.js
var require_QUERY2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, items) {
    return (0, generic_transformers_1.pushVerdictArguments)(["TOPK.QUERY", key], items);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/bloom/dist/commands/top-k/RESERVE.js
var require_RESERVE3 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, topK, options) {
    const args = ["TOPK.RESERVE", key, topK.toString()];
    if (options) {
      args.push(options.width.toString(), options.depth.toString(), options.decay.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/bloom/dist/commands/top-k/index.js
var require_top_k = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var ADD = require_ADD4();
  var COUNT = require_COUNT2();
  var INCRBY = require_INCRBY3();
  var INFO = require_INFO6();
  var LIST_WITHCOUNT = require_LIST_WITHCOUNT();
  var LIST = require_LIST();
  var QUERY = require_QUERY2();
  var RESERVE = require_RESERVE3();
  exports.default = {
    ADD,
    add: ADD,
    COUNT,
    count: COUNT,
    INCRBY,
    incrBy: INCRBY,
    INFO,
    info: INFO,
    LIST_WITHCOUNT,
    listWithCount: LIST_WITHCOUNT,
    LIST,
    list: LIST,
    QUERY,
    query: QUERY,
    RESERVE,
    reserve: RESERVE
  };
});

// node_modules/@redis/bloom/dist/commands/index.js
var require_commands3 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var bloom_1 = require_bloom();
  var count_min_sketch_1 = require_count_min_sketch();
  var cuckoo_1 = require_cuckoo();
  var t_digest_1 = require_t_digest();
  var top_k_1 = require_top_k();
  exports.default = {
    bf: bloom_1.default,
    cms: count_min_sketch_1.default,
    cf: cuckoo_1.default,
    tDigest: t_digest_1.default,
    topK: top_k_1.default
  };
});

// node_modules/@redis/bloom/dist/index.js
var require_dist2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = undefined;
  var commands_1 = require_commands3();
  Object.defineProperty(exports, "default", { enumerable: true, get: function() {
    return commands_1.default;
  } });
});

// node_modules/@redis/graph/dist/commands/CONFIG_GET.js
var require_CONFIG_GET2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments(configKey) {
    return ["GRAPH.CONFIG", "GET", configKey];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/graph/dist/commands/CONFIG_SET.js
var require_CONFIG_SET2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(configKey, value) {
    return [
      "GRAPH.CONFIG",
      "SET",
      configKey,
      value.toString()
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/graph/dist/commands/DELETE.js
var require_DELETE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return ["GRAPH.DELETE", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/graph/dist/commands/EXPLAIN.js
var require_EXPLAIN = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, query) {
    return ["GRAPH.EXPLAIN", key, query];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/graph/dist/commands/LIST.js
var require_LIST2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments() {
    return ["GRAPH.LIST"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/graph/dist/commands/PROFILE.js
var require_PROFILE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, query) {
    return ["GRAPH.PROFILE", key, query];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/graph/dist/commands/QUERY.js
var require_QUERY3 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_commands4();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(graph, query, options, compact) {
    return (0, _1.pushQueryArguments)(["GRAPH.QUERY"], graph, query, options, compact);
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return reply.length === 1 ? {
      headers: undefined,
      data: undefined,
      metadata: reply[0]
    } : {
      headers: reply[0],
      data: reply[1],
      metadata: reply[2]
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/graph/dist/commands/RO_QUERY.js
var require_RO_QUERY = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_commands4();
  var QUERY_1 = require_QUERY3();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return QUERY_1.FIRST_KEY_INDEX;
  } });
  exports.IS_READ_ONLY = true;
  function transformArguments(graph, query, options, compact) {
    return (0, _1.pushQueryArguments)(["GRAPH.RO_QUERY"], graph, query, options, compact);
  }
  exports.transformArguments = transformArguments;
  var QUERY_2 = require_QUERY3();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return QUERY_2.transformReply;
  } });
});

// node_modules/@redis/graph/dist/commands/SLOWLOG.js
var require_SLOWLOG = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key) {
    return ["GRAPH.SLOWLOG", key];
  }
  exports.transformArguments = transformArguments;
  function transformReply(logs) {
    return logs.map(([timestamp, command, query, took]) => ({
      timestamp: new Date(Number(timestamp) * 1000),
      command,
      query,
      took: Number(took)
    }));
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/graph/dist/commands/index.js
var require_commands4 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.pushQueryArguments = undefined;
  var CONFIG_GET = require_CONFIG_GET2();
  var CONFIG_SET = require_CONFIG_SET2();
  var DELETE = require_DELETE();
  var EXPLAIN = require_EXPLAIN();
  var LIST = require_LIST2();
  var PROFILE = require_PROFILE();
  var QUERY = require_QUERY3();
  var RO_QUERY = require_RO_QUERY();
  var SLOWLOG = require_SLOWLOG();
  exports.default = {
    CONFIG_GET,
    configGet: CONFIG_GET,
    CONFIG_SET,
    configSet: CONFIG_SET,
    DELETE,
    delete: DELETE,
    EXPLAIN,
    explain: EXPLAIN,
    LIST,
    list: LIST,
    PROFILE,
    profile: PROFILE,
    QUERY,
    query: QUERY,
    RO_QUERY,
    roQuery: RO_QUERY,
    SLOWLOG,
    slowLog: SLOWLOG
  };
  function pushQueryArguments(args, graph, query, options, compact) {
    args.push(graph);
    if (typeof options === "number") {
      args.push(query);
      pushTimeout(args, options);
    } else {
      args.push(options?.params ? `CYPHER ${queryParamsToString(options.params)} ${query}` : query);
      if (options?.TIMEOUT !== undefined) {
        pushTimeout(args, options.TIMEOUT);
      }
    }
    if (compact) {
      args.push("--compact");
    }
    return args;
  }
  exports.pushQueryArguments = pushQueryArguments;
  function pushTimeout(args, timeout) {
    args.push("TIMEOUT", timeout.toString());
  }
  function queryParamsToString(params) {
    const parts = [];
    for (const [key, value] of Object.entries(params)) {
      parts.push(`${key}=${queryParamToString(value)}`);
    }
    return parts.join(" ");
  }
  function queryParamToString(param) {
    if (param === null) {
      return "null";
    }
    switch (typeof param) {
      case "string":
        return `"${param.replace(/["\\]/g, "\\$&")}"`;
      case "number":
      case "boolean":
        return param.toString();
    }
    if (Array.isArray(param)) {
      return `[${param.map(queryParamToString).join(",")}]`;
    } else if (typeof param === "object") {
      const body = [];
      for (const [key, value] of Object.entries(param)) {
        body.push(`${key}:${queryParamToString(value)}`);
      }
      return `{${body.join(",")}}`;
    } else {
      throw new TypeError(`Unexpected param type ${typeof param} ${param}`);
    }
  }
});

// node_modules/@redis/graph/dist/graph.js
var require_graph = __commonJS((exports) => {
  var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m")
      throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _Graph_instances;
  var _Graph_client;
  var _Graph_name;
  var _Graph_metadata;
  var _Graph_setMetadataPromise;
  var _Graph_updateMetadata;
  var _Graph_setMetadata;
  var _Graph_cleanMetadataArray;
  var _Graph_getMetadata;
  var _Graph_getMetadataAsync;
  var _Graph_parseReply;
  var _Graph_parseValue;
  var _Graph_parseEdge;
  var _Graph_parseNode;
  var _Graph_parseProperties;
  Object.defineProperty(exports, "__esModule", { value: true });
  var GraphValueTypes;
  (function(GraphValueTypes2) {
    GraphValueTypes2[GraphValueTypes2["UNKNOWN"] = 0] = "UNKNOWN";
    GraphValueTypes2[GraphValueTypes2["NULL"] = 1] = "NULL";
    GraphValueTypes2[GraphValueTypes2["STRING"] = 2] = "STRING";
    GraphValueTypes2[GraphValueTypes2["INTEGER"] = 3] = "INTEGER";
    GraphValueTypes2[GraphValueTypes2["BOOLEAN"] = 4] = "BOOLEAN";
    GraphValueTypes2[GraphValueTypes2["DOUBLE"] = 5] = "DOUBLE";
    GraphValueTypes2[GraphValueTypes2["ARRAY"] = 6] = "ARRAY";
    GraphValueTypes2[GraphValueTypes2["EDGE"] = 7] = "EDGE";
    GraphValueTypes2[GraphValueTypes2["NODE"] = 8] = "NODE";
    GraphValueTypes2[GraphValueTypes2["PATH"] = 9] = "PATH";
    GraphValueTypes2[GraphValueTypes2["MAP"] = 10] = "MAP";
    GraphValueTypes2[GraphValueTypes2["POINT"] = 11] = "POINT";
  })(GraphValueTypes || (GraphValueTypes = {}));

  class Graph {
    constructor(client, name) {
      _Graph_instances.add(this);
      _Graph_client.set(this, undefined);
      _Graph_name.set(this, undefined);
      _Graph_metadata.set(this, undefined);
      _Graph_setMetadataPromise.set(this, undefined);
      __classPrivateFieldSet(this, _Graph_client, client, "f");
      __classPrivateFieldSet(this, _Graph_name, name, "f");
    }
    async query(query, options) {
      return __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseReply).call(this, await __classPrivateFieldGet(this, _Graph_client, "f").graph.query(__classPrivateFieldGet(this, _Graph_name, "f"), query, options, true));
    }
    async roQuery(query, options) {
      return __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseReply).call(this, await __classPrivateFieldGet(this, _Graph_client, "f").graph.roQuery(__classPrivateFieldGet(this, _Graph_name, "f"), query, options, true));
    }
  }
  _Graph_client = new WeakMap, _Graph_name = new WeakMap, _Graph_metadata = new WeakMap, _Graph_setMetadataPromise = new WeakMap, _Graph_instances = new WeakSet, _Graph_updateMetadata = function _Graph_updateMetadata() {
    __classPrivateFieldSet(this, _Graph_setMetadataPromise, __classPrivateFieldGet(this, _Graph_setMetadataPromise, "f") ?? __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_setMetadata).call(this).finally(() => __classPrivateFieldSet(this, _Graph_setMetadataPromise, undefined, "f")), "f");
    return __classPrivateFieldGet(this, _Graph_setMetadataPromise, "f");
  }, _Graph_setMetadata = async function _Graph_setMetadata() {
    const [labels, relationshipTypes, propertyKeys] = await Promise.all([
      __classPrivateFieldGet(this, _Graph_client, "f").graph.roQuery(__classPrivateFieldGet(this, _Graph_name, "f"), "CALL db.labels()"),
      __classPrivateFieldGet(this, _Graph_client, "f").graph.roQuery(__classPrivateFieldGet(this, _Graph_name, "f"), "CALL db.relationshipTypes()"),
      __classPrivateFieldGet(this, _Graph_client, "f").graph.roQuery(__classPrivateFieldGet(this, _Graph_name, "f"), "CALL db.propertyKeys()")
    ]);
    __classPrivateFieldSet(this, _Graph_metadata, {
      labels: __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_cleanMetadataArray).call(this, labels.data),
      relationshipTypes: __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_cleanMetadataArray).call(this, relationshipTypes.data),
      propertyKeys: __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_cleanMetadataArray).call(this, propertyKeys.data)
    }, "f");
    return __classPrivateFieldGet(this, _Graph_metadata, "f");
  }, _Graph_cleanMetadataArray = function _Graph_cleanMetadataArray(arr) {
    return arr.map(([value]) => value);
  }, _Graph_getMetadata = function _Graph_getMetadata(key, id) {
    return __classPrivateFieldGet(this, _Graph_metadata, "f")?.[key][id] ?? __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_getMetadataAsync).call(this, key, id);
  }, _Graph_getMetadataAsync = async function _Graph_getMetadataAsync(key, id) {
    const value = (await __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_updateMetadata).call(this))[key][id];
    if (value === undefined)
      throw new Error(`Cannot find value from ${key}[${id}]`);
    return value;
  }, _Graph_parseReply = async function _Graph_parseReply(reply) {
    if (!reply.data)
      return reply;
    const promises = [], parsed = {
      metadata: reply.metadata,
      data: reply.data.map((row) => {
        const data = {};
        for (let i = 0;i < row.length; i++) {
          data[reply.headers[i][1]] = __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseValue).call(this, row[i], promises);
        }
        return data;
      })
    };
    if (promises.length)
      await Promise.all(promises);
    return parsed;
  }, _Graph_parseValue = function _Graph_parseValue([valueType, value], promises) {
    switch (valueType) {
      case GraphValueTypes.NULL:
        return null;
      case GraphValueTypes.STRING:
      case GraphValueTypes.INTEGER:
        return value;
      case GraphValueTypes.BOOLEAN:
        return value === "true";
      case GraphValueTypes.DOUBLE:
        return parseFloat(value);
      case GraphValueTypes.ARRAY:
        return value.map((x) => __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseValue).call(this, x, promises));
      case GraphValueTypes.EDGE:
        return __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseEdge).call(this, value, promises);
      case GraphValueTypes.NODE:
        return __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseNode).call(this, value, promises);
      case GraphValueTypes.PATH:
        return {
          nodes: value[0][1].map(([, node]) => __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseNode).call(this, node, promises)),
          edges: value[1][1].map(([, edge]) => __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseEdge).call(this, edge, promises))
        };
      case GraphValueTypes.MAP:
        const map = {};
        for (let i = 0;i < value.length; i++) {
          map[value[i++]] = __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseValue).call(this, value[i], promises);
        }
        return map;
      case GraphValueTypes.POINT:
        return {
          latitude: parseFloat(value[0]),
          longitude: parseFloat(value[1])
        };
      default:
        throw new Error(`unknown scalar type: ${valueType}`);
    }
  }, _Graph_parseEdge = function _Graph_parseEdge([id, relationshipTypeId, sourceId, destinationId, properties], promises) {
    const edge = {
      id,
      sourceId,
      destinationId,
      properties: __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseProperties).call(this, properties, promises)
    };
    const relationshipType = __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_getMetadata).call(this, "relationshipTypes", relationshipTypeId);
    if (relationshipType instanceof Promise) {
      promises.push(relationshipType.then((value) => edge.relationshipType = value));
    } else {
      edge.relationshipType = relationshipType;
    }
    return edge;
  }, _Graph_parseNode = function _Graph_parseNode([id, labelIds, properties], promises) {
    const labels = new Array(labelIds.length);
    for (let i = 0;i < labelIds.length; i++) {
      const value = __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_getMetadata).call(this, "labels", labelIds[i]);
      if (value instanceof Promise) {
        promises.push(value.then((value2) => labels[i] = value2));
      } else {
        labels[i] = value;
      }
    }
    return {
      id,
      labels,
      properties: __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseProperties).call(this, properties, promises)
    };
  }, _Graph_parseProperties = function _Graph_parseProperties(raw2, promises) {
    const parsed = {};
    for (const [id, type, value] of raw2) {
      const parsedValue = __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_parseValue).call(this, [type, value], promises), key = __classPrivateFieldGet(this, _Graph_instances, "m", _Graph_getMetadata).call(this, "propertyKeys", id);
      if (key instanceof Promise) {
        promises.push(key.then((key2) => parsed[key2] = parsedValue));
      } else {
        parsed[key] = parsedValue;
      }
    }
    return parsed;
  };
  exports.default = Graph;
});

// node_modules/@redis/graph/dist/index.js
var require_dist3 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Graph = exports.default = undefined;
  var commands_1 = require_commands4();
  Object.defineProperty(exports, "default", { enumerable: true, get: function() {
    return commands_1.default;
  } });
  var graph_1 = require_graph();
  Object.defineProperty(exports, "Graph", { enumerable: true, get: function() {
    return graph_1.default;
  } });
});

// node_modules/@redis/json/dist/commands/ARRAPPEND.js
var require_ARRAPPEND = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_commands5();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, path, ...jsons) {
    const args = ["JSON.ARRAPPEND", key, path];
    for (const json of jsons) {
      args.push((0, _1.transformRedisJsonArgument)(json));
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/json/dist/commands/ARRINDEX.js
var require_ARRINDEX = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_commands5();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, path, json, start, stop) {
    const args = ["JSON.ARRINDEX", key, path, (0, _1.transformRedisJsonArgument)(json)];
    if (start !== undefined && start !== null) {
      args.push(start.toString());
      if (stop !== undefined && stop !== null) {
        args.push(stop.toString());
      }
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/json/dist/commands/ARRINSERT.js
var require_ARRINSERT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_commands5();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, path, index, ...jsons) {
    const args = ["JSON.ARRINSERT", key, path, index.toString()];
    for (const json of jsons) {
      args.push((0, _1.transformRedisJsonArgument)(json));
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/json/dist/commands/ARRLEN.js
var require_ARRLEN = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, path) {
    const args = ["JSON.ARRLEN", key];
    if (path) {
      args.push(path);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/json/dist/commands/ARRPOP.js
var require_ARRPOP = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_commands5();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, path, index) {
    const args = ["JSON.ARRPOP", key];
    if (path) {
      args.push(path);
      if (index !== undefined && index !== null) {
        args.push(index.toString());
      }
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    if (reply === null)
      return null;
    if (Array.isArray(reply)) {
      return reply.map(_1.transformRedisJsonNullReply);
    }
    return (0, _1.transformRedisJsonNullReply)(reply);
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/json/dist/commands/ARRTRIM.js
var require_ARRTRIM = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, path, start, stop) {
    return ["JSON.ARRTRIM", key, path, start.toString(), stop.toString()];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/json/dist/commands/DEBUG_MEMORY.js
var require_DEBUG_MEMORY = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 2;
  function transformArguments(key, path) {
    const args = ["JSON.DEBUG", "MEMORY", key];
    if (path) {
      args.push(path);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/json/dist/commands/DEL.js
var require_DEL3 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, path) {
    const args = ["JSON.DEL", key];
    if (path) {
      args.push(path);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/json/dist/commands/FORGET.js
var require_FORGET = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, path) {
    const args = ["JSON.FORGET", key];
    if (path) {
      args.push(path);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/json/dist/commands/GET.js
var require_GET2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, options) {
    let args = ["JSON.GET", key];
    if (options?.path) {
      args = (0, generic_transformers_1.pushVerdictArguments)(args, options.path);
    }
    if (options?.INDENT) {
      args.push("INDENT", options.INDENT);
    }
    if (options?.NEWLINE) {
      args.push("NEWLINE", options.NEWLINE);
    }
    if (options?.SPACE) {
      args.push("SPACE", options.SPACE);
    }
    if (options?.NOESCAPE) {
      args.push("NOESCAPE");
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  var _1 = require_commands5();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return _1.transformRedisJsonNullReply;
  } });
});

// node_modules/@redis/json/dist/commands/MERGE.js
var require_MERGE3 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_commands5();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, path, json) {
    return ["JSON.MERGE", key, path, (0, _1.transformRedisJsonArgument)(json)];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/json/dist/commands/MGET.js
var require_MGET2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_commands5();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(keys, path) {
    return [
      "JSON.MGET",
      ...keys,
      path
    ];
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return reply.map(_1.transformRedisJsonNullReply);
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/json/dist/commands/MSET.js
var require_MSET2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_commands5();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(items) {
    const args = new Array(1 + items.length * 3);
    args[0] = "JSON.MSET";
    let argsIndex = 1;
    for (let i = 0;i < items.length; i++) {
      const item = items[i];
      args[argsIndex++] = item.key;
      args[argsIndex++] = item.path;
      args[argsIndex++] = (0, _1.transformRedisJsonArgument)(item.value);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/json/dist/commands/NUMINCRBY.js
var require_NUMINCRBY = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, path, by) {
    return ["JSON.NUMINCRBY", key, path, by.toString()];
  }
  exports.transformArguments = transformArguments;
  var _1 = require_commands5();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return _1.transformNumbersReply;
  } });
});

// node_modules/@redis/json/dist/commands/NUMMULTBY.js
var require_NUMMULTBY = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, path, by) {
    return ["JSON.NUMMULTBY", key, path, by.toString()];
  }
  exports.transformArguments = transformArguments;
  var _1 = require_commands5();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return _1.transformNumbersReply;
  } });
});

// node_modules/@redis/json/dist/commands/OBJKEYS.js
var require_OBJKEYS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, path) {
    const args = ["JSON.OBJKEYS", key];
    if (path) {
      args.push(path);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/json/dist/commands/OBJLEN.js
var require_OBJLEN = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, path) {
    const args = ["JSON.OBJLEN", key];
    if (path) {
      args.push(path);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/json/dist/commands/RESP.js
var require_RESP = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, path) {
    const args = ["JSON.RESP", key];
    if (path) {
      args.push(path);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/json/dist/commands/SET.js
var require_SET2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_commands5();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, path, json, options) {
    const args = ["JSON.SET", key, path, (0, _1.transformRedisJsonArgument)(json)];
    if (options?.NX) {
      args.push("NX");
    } else if (options?.XX) {
      args.push("XX");
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/json/dist/commands/STRAPPEND.js
var require_STRAPPEND = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_commands5();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(...[key, pathOrAppend, append]) {
    const args = ["JSON.STRAPPEND", key];
    if (append !== undefined && append !== null) {
      args.push(pathOrAppend, (0, _1.transformRedisJsonArgument)(append));
    } else {
      args.push((0, _1.transformRedisJsonArgument)(pathOrAppend));
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/json/dist/commands/STRLEN.js
var require_STRLEN2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, path) {
    const args = ["JSON.STRLEN", key];
    if (path) {
      args.push(path);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/json/dist/commands/TYPE.js
var require_TYPE2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, path) {
    const args = ["JSON.TYPE", key];
    if (path) {
      args.push(path);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/json/dist/commands/index.js
var require_commands5 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformNumbersReply = exports.transformRedisJsonNullReply = exports.transformRedisJsonReply = exports.transformRedisJsonArgument = undefined;
  var ARRAPPEND = require_ARRAPPEND();
  var ARRINDEX = require_ARRINDEX();
  var ARRINSERT = require_ARRINSERT();
  var ARRLEN = require_ARRLEN();
  var ARRPOP = require_ARRPOP();
  var ARRTRIM = require_ARRTRIM();
  var DEBUG_MEMORY = require_DEBUG_MEMORY();
  var DEL = require_DEL3();
  var FORGET = require_FORGET();
  var GET = require_GET2();
  var MERGE = require_MERGE3();
  var MGET = require_MGET2();
  var MSET = require_MSET2();
  var NUMINCRBY = require_NUMINCRBY();
  var NUMMULTBY = require_NUMMULTBY();
  var OBJKEYS = require_OBJKEYS();
  var OBJLEN = require_OBJLEN();
  var RESP = require_RESP();
  var SET = require_SET2();
  var STRAPPEND = require_STRAPPEND();
  var STRLEN = require_STRLEN2();
  var TYPE = require_TYPE2();
  exports.default = {
    ARRAPPEND,
    arrAppend: ARRAPPEND,
    ARRINDEX,
    arrIndex: ARRINDEX,
    ARRINSERT,
    arrInsert: ARRINSERT,
    ARRLEN,
    arrLen: ARRLEN,
    ARRPOP,
    arrPop: ARRPOP,
    ARRTRIM,
    arrTrim: ARRTRIM,
    DEBUG_MEMORY,
    debugMemory: DEBUG_MEMORY,
    DEL,
    del: DEL,
    FORGET,
    forget: FORGET,
    GET,
    get: GET,
    MERGE,
    merge: MERGE,
    MGET,
    mGet: MGET,
    MSET,
    mSet: MSET,
    NUMINCRBY,
    numIncrBy: NUMINCRBY,
    NUMMULTBY,
    numMultBy: NUMMULTBY,
    OBJKEYS,
    objKeys: OBJKEYS,
    OBJLEN,
    objLen: OBJLEN,
    RESP,
    resp: RESP,
    SET,
    set: SET,
    STRAPPEND,
    strAppend: STRAPPEND,
    STRLEN,
    strLen: STRLEN,
    TYPE,
    type: TYPE
  };
  function transformRedisJsonArgument(json) {
    return JSON.stringify(json);
  }
  exports.transformRedisJsonArgument = transformRedisJsonArgument;
  function transformRedisJsonReply(json) {
    return JSON.parse(json);
  }
  exports.transformRedisJsonReply = transformRedisJsonReply;
  function transformRedisJsonNullReply(json) {
    if (json === null)
      return null;
    return transformRedisJsonReply(json);
  }
  exports.transformRedisJsonNullReply = transformRedisJsonNullReply;
  function transformNumbersReply(reply) {
    return JSON.parse(reply);
  }
  exports.transformNumbersReply = transformNumbersReply;
});

// node_modules/@redis/json/dist/index.js
var require_dist4 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = undefined;
  var commands_1 = require_commands5();
  Object.defineProperty(exports, "default", { enumerable: true, get: function() {
    return commands_1.default;
  } });
});

// node_modules/@redis/search/dist/commands/_LIST.js
var require__LIST = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments() {
    return ["FT._LIST"];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/search/dist/commands/ALTER.js
var require_ALTER = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  var _1 = require_commands6();
  function transformArguments(index, schema) {
    const args = ["FT.ALTER", index, "SCHEMA", "ADD"];
    (0, _1.pushSchema)(args, schema);
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/search/dist/commands/AGGREGATE.js
var require_AGGREGATE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.pushAggregatehOptions = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = exports.AggregateGroupByReducers = exports.AggregateSteps = undefined;
  var generic_transformers_1 = require_generic_transformers();
  var _1 = require_commands6();
  var AggregateSteps;
  (function(AggregateSteps2) {
    AggregateSteps2["GROUPBY"] = "GROUPBY";
    AggregateSteps2["SORTBY"] = "SORTBY";
    AggregateSteps2["APPLY"] = "APPLY";
    AggregateSteps2["LIMIT"] = "LIMIT";
    AggregateSteps2["FILTER"] = "FILTER";
  })(AggregateSteps || (exports.AggregateSteps = AggregateSteps = {}));
  var AggregateGroupByReducers;
  (function(AggregateGroupByReducers2) {
    AggregateGroupByReducers2["COUNT"] = "COUNT";
    AggregateGroupByReducers2["COUNT_DISTINCT"] = "COUNT_DISTINCT";
    AggregateGroupByReducers2["COUNT_DISTINCTISH"] = "COUNT_DISTINCTISH";
    AggregateGroupByReducers2["SUM"] = "SUM";
    AggregateGroupByReducers2["MIN"] = "MIN";
    AggregateGroupByReducers2["MAX"] = "MAX";
    AggregateGroupByReducers2["AVG"] = "AVG";
    AggregateGroupByReducers2["STDDEV"] = "STDDEV";
    AggregateGroupByReducers2["QUANTILE"] = "QUANTILE";
    AggregateGroupByReducers2["TOLIST"] = "TOLIST";
    AggregateGroupByReducers2["TO_LIST"] = "TOLIST";
    AggregateGroupByReducers2["FIRST_VALUE"] = "FIRST_VALUE";
    AggregateGroupByReducers2["RANDOM_SAMPLE"] = "RANDOM_SAMPLE";
  })(AggregateGroupByReducers || (exports.AggregateGroupByReducers = AggregateGroupByReducers = {}));
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(index, query, options) {
    return pushAggregatehOptions(["FT.AGGREGATE", index, query], options);
  }
  exports.transformArguments = transformArguments;
  function pushAggregatehOptions(args, options) {
    if (options?.VERBATIM) {
      args.push("VERBATIM");
    }
    if (options?.ADDSCORES) {
      args.push("ADDSCORES");
    }
    if (options?.LOAD) {
      args.push("LOAD");
      (0, _1.pushArgumentsWithLength)(args, () => {
        if (Array.isArray(options.LOAD)) {
          for (const load of options.LOAD) {
            pushLoadField(args, load);
          }
        } else {
          pushLoadField(args, options.LOAD);
        }
      });
    }
    if (options?.STEPS) {
      for (const step of options.STEPS) {
        switch (step.type) {
          case AggregateSteps.GROUPBY:
            args.push("GROUPBY");
            if (!step.properties) {
              args.push("0");
            } else {
              (0, generic_transformers_1.pushVerdictArgument)(args, step.properties);
            }
            if (Array.isArray(step.REDUCE)) {
              for (const reducer of step.REDUCE) {
                pushGroupByReducer(args, reducer);
              }
            } else {
              pushGroupByReducer(args, step.REDUCE);
            }
            break;
          case AggregateSteps.SORTBY:
            (0, _1.pushSortByArguments)(args, "SORTBY", step.BY);
            if (step.MAX) {
              args.push("MAX", step.MAX.toString());
            }
            break;
          case AggregateSteps.APPLY:
            args.push("APPLY", step.expression, "AS", step.AS);
            break;
          case AggregateSteps.LIMIT:
            args.push("LIMIT", step.from.toString(), step.size.toString());
            break;
          case AggregateSteps.FILTER:
            args.push("FILTER", step.expression);
            break;
        }
      }
    }
    (0, _1.pushParamsArgs)(args, options?.PARAMS);
    if (options?.DIALECT) {
      args.push("DIALECT", options.DIALECT.toString());
    }
    if (options?.TIMEOUT !== undefined) {
      args.push("TIMEOUT", options.TIMEOUT.toString());
    }
    return args;
  }
  exports.pushAggregatehOptions = pushAggregatehOptions;
  function pushLoadField(args, toLoad) {
    if (typeof toLoad === "string") {
      args.push(toLoad);
    } else {
      args.push(toLoad.identifier);
      if (toLoad.AS) {
        args.push("AS", toLoad.AS);
      }
    }
  }
  function pushGroupByReducer(args, reducer) {
    args.push("REDUCE", reducer.type);
    switch (reducer.type) {
      case AggregateGroupByReducers.COUNT:
        args.push("0");
        break;
      case AggregateGroupByReducers.COUNT_DISTINCT:
      case AggregateGroupByReducers.COUNT_DISTINCTISH:
      case AggregateGroupByReducers.SUM:
      case AggregateGroupByReducers.MIN:
      case AggregateGroupByReducers.MAX:
      case AggregateGroupByReducers.AVG:
      case AggregateGroupByReducers.STDDEV:
      case AggregateGroupByReducers.TOLIST:
        args.push("1", reducer.property);
        break;
      case AggregateGroupByReducers.QUANTILE:
        args.push("2", reducer.property, reducer.quantile.toString());
        break;
      case AggregateGroupByReducers.FIRST_VALUE: {
        (0, _1.pushArgumentsWithLength)(args, () => {
          args.push(reducer.property);
          if (reducer.BY) {
            args.push("BY");
            if (typeof reducer.BY === "string") {
              args.push(reducer.BY);
            } else {
              args.push(reducer.BY.property);
              if (reducer.BY.direction) {
                args.push(reducer.BY.direction);
              }
            }
          }
        });
        break;
      }
      case AggregateGroupByReducers.RANDOM_SAMPLE:
        args.push("2", reducer.property, reducer.sampleSize.toString());
        break;
    }
    if (reducer.AS) {
      args.push("AS", reducer.AS);
    }
  }
  function transformReply(rawReply) {
    const results = [];
    for (let i = 1;i < rawReply.length; i++) {
      results.push((0, generic_transformers_1.transformTuplesReply)(rawReply[i]));
    }
    return {
      total: rawReply[0],
      results
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/search/dist/commands/AGGREGATE_WITHCURSOR.js
var require_AGGREGATE_WITHCURSOR = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var AGGREGATE_1 = require_AGGREGATE();
  var AGGREGATE_2 = require_AGGREGATE();
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return AGGREGATE_2.FIRST_KEY_INDEX;
  } });
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return AGGREGATE_2.IS_READ_ONLY;
  } });
  function transformArguments(index, query, options) {
    const args = (0, AGGREGATE_1.transformArguments)(index, query, options);
    args.push("WITHCURSOR");
    if (options?.COUNT) {
      args.push("COUNT", options.COUNT.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return {
      ...(0, AGGREGATE_1.transformReply)(reply[0]),
      cursor: reply[1]
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/search/dist/commands/ALIASADD.js
var require_ALIASADD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(name, index) {
    return ["FT.ALIASADD", name, index];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/search/dist/commands/ALIASDEL.js
var require_ALIASDEL = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(name, index) {
    return ["FT.ALIASDEL", name, index];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/search/dist/commands/ALIASUPDATE.js
var require_ALIASUPDATE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(name, index) {
    return ["FT.ALIASUPDATE", name, index];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/search/dist/commands/CONFIG_GET.js
var require_CONFIG_GET3 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = undefined;
  function transformArguments(option) {
    return ["FT.CONFIG", "GET", option];
  }
  exports.transformArguments = transformArguments;
  function transformReply(rawReply) {
    const transformedReply = Object.create(null);
    for (const [key, value] of rawReply) {
      transformedReply[key] = value;
    }
    return transformedReply;
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/search/dist/commands/CONFIG_SET.js
var require_CONFIG_SET3 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(option, value) {
    return ["FT.CONFIG", "SET", option, value];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/search/dist/commands/CREATE.js
var require_CREATE2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  var generic_transformers_1 = require_generic_transformers();
  var _1 = require_commands6();
  function transformArguments(index, schema, options) {
    const args = ["FT.CREATE", index];
    if (options?.ON) {
      args.push("ON", options.ON);
    }
    (0, generic_transformers_1.pushOptionalVerdictArgument)(args, "PREFIX", options?.PREFIX);
    if (options?.FILTER) {
      args.push("FILTER", options.FILTER);
    }
    if (options?.LANGUAGE) {
      args.push("LANGUAGE", options.LANGUAGE);
    }
    if (options?.LANGUAGE_FIELD) {
      args.push("LANGUAGE_FIELD", options.LANGUAGE_FIELD);
    }
    if (options?.SCORE) {
      args.push("SCORE", options.SCORE.toString());
    }
    if (options?.SCORE_FIELD) {
      args.push("SCORE_FIELD", options.SCORE_FIELD);
    }
    if (options?.MAXTEXTFIELDS) {
      args.push("MAXTEXTFIELDS");
    }
    if (options?.TEMPORARY) {
      args.push("TEMPORARY", options.TEMPORARY.toString());
    }
    if (options?.NOOFFSETS) {
      args.push("NOOFFSETS");
    }
    if (options?.NOHL) {
      args.push("NOHL");
    }
    if (options?.NOFIELDS) {
      args.push("NOFIELDS");
    }
    if (options?.NOFREQS) {
      args.push("NOFREQS");
    }
    if (options?.SKIPINITIALSCAN) {
      args.push("SKIPINITIALSCAN");
    }
    (0, generic_transformers_1.pushOptionalVerdictArgument)(args, "STOPWORDS", options?.STOPWORDS);
    args.push("SCHEMA");
    (0, _1.pushSchema)(args, schema);
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/search/dist/commands/CURSOR_DEL.js
var require_CURSOR_DEL = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(index, cursorId) {
    return [
      "FT.CURSOR",
      "DEL",
      index,
      cursorId.toString()
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/search/dist/commands/CURSOR_READ.js
var require_CURSOR_READ = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(index, cursor, options) {
    const args = [
      "FT.CURSOR",
      "READ",
      index,
      cursor.toString()
    ];
    if (options?.COUNT) {
      args.push("COUNT", options.COUNT.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  var AGGREGATE_WITHCURSOR_1 = require_AGGREGATE_WITHCURSOR();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return AGGREGATE_WITHCURSOR_1.transformReply;
  } });
});

// node_modules/@redis/search/dist/commands/DICTADD.js
var require_DICTADD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  var generic_transformers_1 = require_generic_transformers();
  function transformArguments(dictionary, term) {
    return (0, generic_transformers_1.pushVerdictArguments)(["FT.DICTADD", dictionary], term);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/search/dist/commands/DICTDEL.js
var require_DICTDEL = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  var generic_transformers_1 = require_generic_transformers();
  function transformArguments(dictionary, term) {
    return (0, generic_transformers_1.pushVerdictArguments)(["FT.DICTDEL", dictionary], term);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/search/dist/commands/DICTDUMP.js
var require_DICTDUMP = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(dictionary) {
    return ["FT.DICTDUMP", dictionary];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/search/dist/commands/DROPINDEX.js
var require_DROPINDEX = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(index, options) {
    const args = ["FT.DROPINDEX", index];
    if (options?.DD) {
      args.push("DD");
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/search/dist/commands/EXPLAIN.js
var require_EXPLAIN2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = undefined;
  var _1 = require_commands6();
  exports.IS_READ_ONLY = true;
  function transformArguments(index, query, options) {
    const args = ["FT.EXPLAIN", index, query];
    (0, _1.pushParamsArgs)(args, options?.PARAMS);
    if (options?.DIALECT) {
      args.push("DIALECT", options.DIALECT.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/search/dist/commands/EXPLAINCLI.js
var require_EXPLAINCLI = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments(index, query) {
    return ["FT.EXPLAINCLI", index, query];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/search/dist/commands/INFO.js
var require_INFO7 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = undefined;
  var generic_transformers_1 = require_generic_transformers();
  function transformArguments(index) {
    return ["FT.INFO", index];
  }
  exports.transformArguments = transformArguments;
  function transformReply(rawReply) {
    return {
      indexName: rawReply[1],
      indexOptions: rawReply[3],
      indexDefinition: (0, generic_transformers_1.transformTuplesReply)(rawReply[5]),
      attributes: rawReply[7].map((attribute) => (0, generic_transformers_1.transformTuplesReply)(attribute)),
      numDocs: rawReply[9],
      maxDocId: rawReply[11],
      numTerms: rawReply[13],
      numRecords: rawReply[15],
      invertedSzMb: rawReply[17],
      vectorIndexSzMb: rawReply[19],
      totalInvertedIndexBlocks: rawReply[21],
      offsetVectorsSzMb: rawReply[23],
      docTableSizeMb: rawReply[25],
      sortableValuesSizeMb: rawReply[27],
      keyTableSizeMb: rawReply[29],
      recordsPerDocAvg: rawReply[31],
      bytesPerRecordAvg: rawReply[33],
      offsetsPerTermAvg: rawReply[35],
      offsetBitsPerRecordAvg: rawReply[37],
      hashIndexingFailures: rawReply[39],
      indexing: rawReply[41],
      percentIndexed: rawReply[43],
      gcStats: {
        bytesCollected: rawReply[45][1],
        totalMsRun: rawReply[45][3],
        totalCycles: rawReply[45][5],
        averageCycleTimeMs: rawReply[45][7],
        lastRunTimeMs: rawReply[45][9],
        gcNumericTreesMissed: rawReply[45][11],
        gcBlocksDenied: rawReply[45][13]
      },
      cursorStats: {
        globalIdle: rawReply[47][1],
        globalTotal: rawReply[47][3],
        indexCapacity: rawReply[47][5],
        idnexTotal: rawReply[47][7]
      },
      stopWords: rawReply[49]
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/search/dist/commands/SEARCH.js
var require_SEARCH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_commands6();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(index, query, options) {
    return (0, _1.pushSearchOptions)(["FT.SEARCH", index, query], options);
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply, withoutDocuments) {
    const documents = [];
    let i = 1;
    while (i < reply.length) {
      documents.push({
        id: reply[i++],
        value: withoutDocuments ? Object.create(null) : documentValue(reply[i++])
      });
    }
    return {
      total: reply[0],
      documents
    };
  }
  exports.transformReply = transformReply;
  function documentValue(tuples) {
    const message = Object.create(null);
    let i = 0;
    while (i < tuples.length) {
      const key = tuples[i++], value = tuples[i++];
      if (key === "$") {
        try {
          Object.assign(message, JSON.parse(value));
          continue;
        } catch {}
      }
      message[key] = value;
    }
    return message;
  }
});

// node_modules/@redis/search/dist/commands/PROFILE_SEARCH.js
var require_PROFILE_SEARCH = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = undefined;
  var SEARCH_1 = require_SEARCH();
  var _1 = require_commands6();
  exports.IS_READ_ONLY = true;
  function transformArguments(index, query, options) {
    let args = ["FT.PROFILE", index, "SEARCH"];
    if (options?.LIMITED) {
      args.push("LIMITED");
    }
    args.push("QUERY", query);
    return (0, _1.pushSearchOptions)(args, options);
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply, withoutDocuments) {
    return {
      results: (0, SEARCH_1.transformReply)(reply[0], withoutDocuments),
      profile: (0, _1.transformProfile)(reply[1])
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/search/dist/commands/PROFILE_AGGREGATE.js
var require_PROFILE_AGGREGATE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = undefined;
  var AGGREGATE_1 = require_AGGREGATE();
  var _1 = require_commands6();
  exports.IS_READ_ONLY = true;
  function transformArguments(index, query, options) {
    const args = ["FT.PROFILE", index, "AGGREGATE"];
    if (options?.LIMITED) {
      args.push("LIMITED");
    }
    args.push("QUERY", query);
    (0, AGGREGATE_1.pushAggregatehOptions)(args, options);
    return args;
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return {
      results: (0, AGGREGATE_1.transformReply)(reply[0]),
      profile: (0, _1.transformProfile)(reply[1])
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/search/dist/commands/SEARCH_NOCONTENT.js
var require_SEARCH_NOCONTENT = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_commands6();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(index, query, options) {
    return (0, _1.pushSearchOptions)(["FT.SEARCH", index, query, "NOCONTENT"], options);
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return {
      total: reply[0],
      documents: reply.slice(1)
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/search/dist/commands/SPELLCHECK.js
var require_SPELLCHECK = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = undefined;
  function transformArguments(index, query, options) {
    const args = ["FT.SPELLCHECK", index, query];
    if (options?.DISTANCE) {
      args.push("DISTANCE", options.DISTANCE.toString());
    }
    if (options?.TERMS) {
      if (Array.isArray(options.TERMS)) {
        for (const term of options.TERMS) {
          pushTerms(args, term);
        }
      } else {
        pushTerms(args, options.TERMS);
      }
    }
    if (options?.DIALECT) {
      args.push("DIALECT", options.DIALECT.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
  function pushTerms(args, { mode, dictionary }) {
    args.push("TERMS", mode, dictionary);
  }
  function transformReply(rawReply) {
    return rawReply.map(([, term, suggestions]) => ({
      term,
      suggestions: suggestions.map(([score, suggestion]) => ({
        score: Number(score),
        suggestion
      }))
    }));
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/search/dist/commands/SUGADD.js
var require_SUGADD = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(key, string, score, options) {
    const args = ["FT.SUGADD", key, string, score.toString()];
    if (options?.INCR) {
      args.push("INCR");
    }
    if (options?.PAYLOAD) {
      args.push("PAYLOAD", options.PAYLOAD);
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/search/dist/commands/SUGDEL.js
var require_SUGDEL = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = undefined;
  function transformArguments(key, string) {
    return ["FT.SUGDEL", key, string];
  }
  exports.transformArguments = transformArguments;
  var generic_transformers_1 = require_generic_transformers();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return generic_transformers_1.transformBooleanReply;
  } });
});

// node_modules/@redis/search/dist/commands/SUGGET.js
var require_SUGGET = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, prefix, options) {
    const args = ["FT.SUGGET", key, prefix];
    if (options?.FUZZY) {
      args.push("FUZZY");
    }
    if (options?.MAX) {
      args.push("MAX", options.MAX.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/search/dist/commands/SUGGET_WITHPAYLOADS.js
var require_SUGGET_WITHPAYLOADS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = undefined;
  var SUGGET_1 = require_SUGGET();
  var SUGGET_2 = require_SUGGET();
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return SUGGET_2.IS_READ_ONLY;
  } });
  function transformArguments(key, prefix, options) {
    return [
      ...(0, SUGGET_1.transformArguments)(key, prefix, options),
      "WITHPAYLOADS"
    ];
  }
  exports.transformArguments = transformArguments;
  function transformReply(rawReply) {
    if (rawReply === null)
      return null;
    const transformedReply = [];
    for (let i = 0;i < rawReply.length; i += 2) {
      transformedReply.push({
        suggestion: rawReply[i],
        payload: rawReply[i + 1]
      });
    }
    return transformedReply;
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/search/dist/commands/SUGGET_WITHSCORES_WITHPAYLOADS.js
var require_SUGGET_WITHSCORES_WITHPAYLOADS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = undefined;
  var SUGGET_1 = require_SUGGET();
  var SUGGET_2 = require_SUGGET();
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return SUGGET_2.IS_READ_ONLY;
  } });
  function transformArguments(key, prefix, options) {
    return [
      ...(0, SUGGET_1.transformArguments)(key, prefix, options),
      "WITHSCORES",
      "WITHPAYLOADS"
    ];
  }
  exports.transformArguments = transformArguments;
  function transformReply(rawReply) {
    if (rawReply === null)
      return null;
    const transformedReply = [];
    for (let i = 0;i < rawReply.length; i += 3) {
      transformedReply.push({
        suggestion: rawReply[i],
        score: Number(rawReply[i + 1]),
        payload: rawReply[i + 2]
      });
    }
    return transformedReply;
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/search/dist/commands/SUGGET_WITHSCORES.js
var require_SUGGET_WITHSCORES = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = undefined;
  var SUGGET_1 = require_SUGGET();
  var SUGGET_2 = require_SUGGET();
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return SUGGET_2.IS_READ_ONLY;
  } });
  function transformArguments(key, prefix, options) {
    return [
      ...(0, SUGGET_1.transformArguments)(key, prefix, options),
      "WITHSCORES"
    ];
  }
  exports.transformArguments = transformArguments;
  function transformReply(rawReply) {
    if (rawReply === null)
      return null;
    const transformedReply = [];
    for (let i = 0;i < rawReply.length; i += 2) {
      transformedReply.push({
        suggestion: rawReply[i],
        score: Number(rawReply[i + 1])
      });
    }
    return transformedReply;
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/search/dist/commands/SUGLEN.js
var require_SUGLEN = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = undefined;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["FT.SUGLEN", key];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/search/dist/commands/SYNDUMP.js
var require_SYNDUMP = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(index) {
    return ["FT.SYNDUMP", index];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/search/dist/commands/SYNUPDATE.js
var require_SYNUPDATE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  var generic_transformers_1 = require_generic_transformers();
  function transformArguments(index, groupId, terms, options) {
    const args = ["FT.SYNUPDATE", index, groupId];
    if (options?.SKIPINITIALSCAN) {
      args.push("SKIPINITIALSCAN");
    }
    return (0, generic_transformers_1.pushVerdictArguments)(args, terms);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/search/dist/commands/TAGVALS.js
var require_TAGVALS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = undefined;
  function transformArguments(index, fieldName) {
    return ["FT.TAGVALS", index, fieldName];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/search/dist/commands/index.js
var require_commands6 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformProfile = exports.pushSearchOptions = exports.pushParamsArgs = exports.pushSchema = exports.SCHEMA_GEO_SHAPE_COORD_SYSTEM = exports.VectorAlgorithms = exports.SchemaTextFieldPhonetics = exports.SchemaFieldTypes = exports.pushArgumentsWithLength = exports.pushSortByArguments = exports.pushSortByProperty = exports.RedisSearchLanguages = undefined;
  var _LIST = require__LIST();
  var ALTER = require_ALTER();
  var AGGREGATE_WITHCURSOR = require_AGGREGATE_WITHCURSOR();
  var AGGREGATE = require_AGGREGATE();
  var ALIASADD = require_ALIASADD();
  var ALIASDEL = require_ALIASDEL();
  var ALIASUPDATE = require_ALIASUPDATE();
  var CONFIG_GET = require_CONFIG_GET3();
  var CONFIG_SET = require_CONFIG_SET3();
  var CREATE = require_CREATE2();
  var CURSOR_DEL = require_CURSOR_DEL();
  var CURSOR_READ = require_CURSOR_READ();
  var DICTADD = require_DICTADD();
  var DICTDEL = require_DICTDEL();
  var DICTDUMP = require_DICTDUMP();
  var DROPINDEX = require_DROPINDEX();
  var EXPLAIN = require_EXPLAIN2();
  var EXPLAINCLI = require_EXPLAINCLI();
  var INFO = require_INFO7();
  var PROFILESEARCH = require_PROFILE_SEARCH();
  var PROFILEAGGREGATE = require_PROFILE_AGGREGATE();
  var SEARCH = require_SEARCH();
  var SEARCH_NOCONTENT = require_SEARCH_NOCONTENT();
  var SPELLCHECK = require_SPELLCHECK();
  var SUGADD = require_SUGADD();
  var SUGDEL = require_SUGDEL();
  var SUGGET_WITHPAYLOADS = require_SUGGET_WITHPAYLOADS();
  var SUGGET_WITHSCORES_WITHPAYLOADS = require_SUGGET_WITHSCORES_WITHPAYLOADS();
  var SUGGET_WITHSCORES = require_SUGGET_WITHSCORES();
  var SUGGET = require_SUGGET();
  var SUGLEN = require_SUGLEN();
  var SYNDUMP = require_SYNDUMP();
  var SYNUPDATE = require_SYNUPDATE();
  var TAGVALS = require_TAGVALS();
  var generic_transformers_1 = require_generic_transformers();
  exports.default = {
    _LIST,
    _list: _LIST,
    ALTER,
    alter: ALTER,
    AGGREGATE_WITHCURSOR,
    aggregateWithCursor: AGGREGATE_WITHCURSOR,
    AGGREGATE,
    aggregate: AGGREGATE,
    ALIASADD,
    aliasAdd: ALIASADD,
    ALIASDEL,
    aliasDel: ALIASDEL,
    ALIASUPDATE,
    aliasUpdate: ALIASUPDATE,
    CONFIG_GET,
    configGet: CONFIG_GET,
    CONFIG_SET,
    configSet: CONFIG_SET,
    CREATE,
    create: CREATE,
    CURSOR_DEL,
    cursorDel: CURSOR_DEL,
    CURSOR_READ,
    cursorRead: CURSOR_READ,
    DICTADD,
    dictAdd: DICTADD,
    DICTDEL,
    dictDel: DICTDEL,
    DICTDUMP,
    dictDump: DICTDUMP,
    DROPINDEX,
    dropIndex: DROPINDEX,
    EXPLAIN,
    explain: EXPLAIN,
    EXPLAINCLI,
    explainCli: EXPLAINCLI,
    INFO,
    info: INFO,
    PROFILESEARCH,
    profileSearch: PROFILESEARCH,
    PROFILEAGGREGATE,
    profileAggregate: PROFILEAGGREGATE,
    SEARCH,
    search: SEARCH,
    SEARCH_NOCONTENT,
    searchNoContent: SEARCH_NOCONTENT,
    SPELLCHECK,
    spellCheck: SPELLCHECK,
    SUGADD,
    sugAdd: SUGADD,
    SUGDEL,
    sugDel: SUGDEL,
    SUGGET_WITHPAYLOADS,
    sugGetWithPayloads: SUGGET_WITHPAYLOADS,
    SUGGET_WITHSCORES_WITHPAYLOADS,
    sugGetWithScoresWithPayloads: SUGGET_WITHSCORES_WITHPAYLOADS,
    SUGGET_WITHSCORES,
    sugGetWithScores: SUGGET_WITHSCORES,
    SUGGET,
    sugGet: SUGGET,
    SUGLEN,
    sugLen: SUGLEN,
    SYNDUMP,
    synDump: SYNDUMP,
    SYNUPDATE,
    synUpdate: SYNUPDATE,
    TAGVALS,
    tagVals: TAGVALS
  };
  var RedisSearchLanguages;
  (function(RedisSearchLanguages2) {
    RedisSearchLanguages2["ARABIC"] = "Arabic";
    RedisSearchLanguages2["BASQUE"] = "Basque";
    RedisSearchLanguages2["CATALANA"] = "Catalan";
    RedisSearchLanguages2["DANISH"] = "Danish";
    RedisSearchLanguages2["DUTCH"] = "Dutch";
    RedisSearchLanguages2["ENGLISH"] = "English";
    RedisSearchLanguages2["FINNISH"] = "Finnish";
    RedisSearchLanguages2["FRENCH"] = "French";
    RedisSearchLanguages2["GERMAN"] = "German";
    RedisSearchLanguages2["GREEK"] = "Greek";
    RedisSearchLanguages2["HUNGARIAN"] = "Hungarian";
    RedisSearchLanguages2["INDONESAIN"] = "Indonesian";
    RedisSearchLanguages2["IRISH"] = "Irish";
    RedisSearchLanguages2["ITALIAN"] = "Italian";
    RedisSearchLanguages2["LITHUANIAN"] = "Lithuanian";
    RedisSearchLanguages2["NEPALI"] = "Nepali";
    RedisSearchLanguages2["NORWEIGAN"] = "Norwegian";
    RedisSearchLanguages2["PORTUGUESE"] = "Portuguese";
    RedisSearchLanguages2["ROMANIAN"] = "Romanian";
    RedisSearchLanguages2["RUSSIAN"] = "Russian";
    RedisSearchLanguages2["SPANISH"] = "Spanish";
    RedisSearchLanguages2["SWEDISH"] = "Swedish";
    RedisSearchLanguages2["TAMIL"] = "Tamil";
    RedisSearchLanguages2["TURKISH"] = "Turkish";
    RedisSearchLanguages2["CHINESE"] = "Chinese";
  })(RedisSearchLanguages || (exports.RedisSearchLanguages = RedisSearchLanguages = {}));
  function pushSortByProperty(args, sortBy) {
    if (typeof sortBy === "string") {
      args.push(sortBy);
    } else {
      args.push(sortBy.BY);
      if (sortBy.DIRECTION) {
        args.push(sortBy.DIRECTION);
      }
    }
  }
  exports.pushSortByProperty = pushSortByProperty;
  function pushSortByArguments(args, name, sortBy) {
    const lengthBefore = args.push(name, "");
    if (Array.isArray(sortBy)) {
      for (const field of sortBy) {
        pushSortByProperty(args, field);
      }
    } else {
      pushSortByProperty(args, sortBy);
    }
    args[lengthBefore - 1] = (args.length - lengthBefore).toString();
    return args;
  }
  exports.pushSortByArguments = pushSortByArguments;
  function pushArgumentsWithLength(args, fn) {
    const lengthIndex = args.push("") - 1;
    fn(args);
    args[lengthIndex] = (args.length - lengthIndex - 1).toString();
    return args;
  }
  exports.pushArgumentsWithLength = pushArgumentsWithLength;
  var SchemaFieldTypes;
  (function(SchemaFieldTypes2) {
    SchemaFieldTypes2["TEXT"] = "TEXT";
    SchemaFieldTypes2["NUMERIC"] = "NUMERIC";
    SchemaFieldTypes2["GEO"] = "GEO";
    SchemaFieldTypes2["TAG"] = "TAG";
    SchemaFieldTypes2["VECTOR"] = "VECTOR";
    SchemaFieldTypes2["GEOSHAPE"] = "GEOSHAPE";
  })(SchemaFieldTypes || (exports.SchemaFieldTypes = SchemaFieldTypes = {}));
  function pushCommonFieldArguments(args, fieldOptions) {
    if (fieldOptions.SORTABLE) {
      args.push("SORTABLE");
      if (fieldOptions.SORTABLE === "UNF") {
        args.push("UNF");
      }
    }
    if (fieldOptions.NOINDEX) {
      args.push("NOINDEX");
    }
  }
  var SchemaTextFieldPhonetics;
  (function(SchemaTextFieldPhonetics2) {
    SchemaTextFieldPhonetics2["DM_EN"] = "dm:en";
    SchemaTextFieldPhonetics2["DM_FR"] = "dm:fr";
    SchemaTextFieldPhonetics2["FM_PT"] = "dm:pt";
    SchemaTextFieldPhonetics2["DM_ES"] = "dm:es";
  })(SchemaTextFieldPhonetics || (exports.SchemaTextFieldPhonetics = SchemaTextFieldPhonetics = {}));
  var VectorAlgorithms;
  (function(VectorAlgorithms2) {
    VectorAlgorithms2["FLAT"] = "FLAT";
    VectorAlgorithms2["HNSW"] = "HNSW";
  })(VectorAlgorithms || (exports.VectorAlgorithms = VectorAlgorithms = {}));
  exports.SCHEMA_GEO_SHAPE_COORD_SYSTEM = {
    SPHERICAL: "SPHERICAL",
    FLAT: "FLAT"
  };
  function pushSchema(args, schema) {
    for (const [field, fieldOptions] of Object.entries(schema)) {
      args.push(field);
      if (typeof fieldOptions === "string") {
        args.push(fieldOptions);
        continue;
      }
      if (fieldOptions.AS) {
        args.push("AS", fieldOptions.AS);
      }
      args.push(fieldOptions.type);
      switch (fieldOptions.type) {
        case SchemaFieldTypes.TEXT:
          if (fieldOptions.NOSTEM) {
            args.push("NOSTEM");
          }
          if (fieldOptions.WEIGHT) {
            args.push("WEIGHT", fieldOptions.WEIGHT.toString());
          }
          if (fieldOptions.PHONETIC) {
            args.push("PHONETIC", fieldOptions.PHONETIC);
          }
          if (fieldOptions.WITHSUFFIXTRIE) {
            args.push("WITHSUFFIXTRIE");
          }
          pushCommonFieldArguments(args, fieldOptions);
          if (fieldOptions.INDEXEMPTY) {
            args.push("INDEXEMPTY");
          }
          break;
        case SchemaFieldTypes.NUMERIC:
        case SchemaFieldTypes.GEO:
          pushCommonFieldArguments(args, fieldOptions);
          break;
        case SchemaFieldTypes.TAG:
          if (fieldOptions.SEPARATOR) {
            args.push("SEPARATOR", fieldOptions.SEPARATOR);
          }
          if (fieldOptions.CASESENSITIVE) {
            args.push("CASESENSITIVE");
          }
          if (fieldOptions.WITHSUFFIXTRIE) {
            args.push("WITHSUFFIXTRIE");
          }
          pushCommonFieldArguments(args, fieldOptions);
          if (fieldOptions.INDEXEMPTY) {
            args.push("INDEXEMPTY");
          }
          break;
        case SchemaFieldTypes.VECTOR:
          args.push(fieldOptions.ALGORITHM);
          pushArgumentsWithLength(args, () => {
            args.push("TYPE", fieldOptions.TYPE, "DIM", fieldOptions.DIM.toString(), "DISTANCE_METRIC", fieldOptions.DISTANCE_METRIC);
            if (fieldOptions.INITIAL_CAP) {
              args.push("INITIAL_CAP", fieldOptions.INITIAL_CAP.toString());
            }
            switch (fieldOptions.ALGORITHM) {
              case VectorAlgorithms.FLAT:
                if (fieldOptions.BLOCK_SIZE) {
                  args.push("BLOCK_SIZE", fieldOptions.BLOCK_SIZE.toString());
                }
                break;
              case VectorAlgorithms.HNSW:
                if (fieldOptions.M) {
                  args.push("M", fieldOptions.M.toString());
                }
                if (fieldOptions.EF_CONSTRUCTION) {
                  args.push("EF_CONSTRUCTION", fieldOptions.EF_CONSTRUCTION.toString());
                }
                if (fieldOptions.EF_RUNTIME) {
                  args.push("EF_RUNTIME", fieldOptions.EF_RUNTIME.toString());
                }
                break;
            }
          });
          break;
        case SchemaFieldTypes.GEOSHAPE:
          if (fieldOptions.COORD_SYSTEM !== undefined) {
            args.push("COORD_SYSTEM", fieldOptions.COORD_SYSTEM);
          }
          pushCommonFieldArguments(args, fieldOptions);
          break;
      }
      if (fieldOptions.INDEXMISSING) {
        args.push("INDEXMISSING");
      }
    }
  }
  exports.pushSchema = pushSchema;
  function pushParamsArgs(args, params) {
    if (params) {
      const enrties = Object.entries(params);
      args.push("PARAMS", (enrties.length * 2).toString());
      for (const [key, value] of enrties) {
        args.push(key, typeof value === "number" ? value.toString() : value);
      }
    }
    return args;
  }
  exports.pushParamsArgs = pushParamsArgs;
  function pushSearchOptions(args, options) {
    if (options?.VERBATIM) {
      args.push("VERBATIM");
    }
    if (options?.NOSTOPWORDS) {
      args.push("NOSTOPWORDS");
    }
    (0, generic_transformers_1.pushOptionalVerdictArgument)(args, "INKEYS", options?.INKEYS);
    (0, generic_transformers_1.pushOptionalVerdictArgument)(args, "INFIELDS", options?.INFIELDS);
    (0, generic_transformers_1.pushOptionalVerdictArgument)(args, "RETURN", options?.RETURN);
    if (options?.SUMMARIZE) {
      args.push("SUMMARIZE");
      if (typeof options.SUMMARIZE === "object") {
        if (options.SUMMARIZE.FIELDS) {
          args.push("FIELDS");
          (0, generic_transformers_1.pushVerdictArgument)(args, options.SUMMARIZE.FIELDS);
        }
        if (options.SUMMARIZE.FRAGS) {
          args.push("FRAGS", options.SUMMARIZE.FRAGS.toString());
        }
        if (options.SUMMARIZE.LEN) {
          args.push("LEN", options.SUMMARIZE.LEN.toString());
        }
        if (options.SUMMARIZE.SEPARATOR) {
          args.push("SEPARATOR", options.SUMMARIZE.SEPARATOR);
        }
      }
    }
    if (options?.HIGHLIGHT) {
      args.push("HIGHLIGHT");
      if (typeof options.HIGHLIGHT === "object") {
        if (options.HIGHLIGHT.FIELDS) {
          args.push("FIELDS");
          (0, generic_transformers_1.pushVerdictArgument)(args, options.HIGHLIGHT.FIELDS);
        }
        if (options.HIGHLIGHT.TAGS) {
          args.push("TAGS", options.HIGHLIGHT.TAGS.open, options.HIGHLIGHT.TAGS.close);
        }
      }
    }
    if (options?.SLOP) {
      args.push("SLOP", options.SLOP.toString());
    }
    if (options?.INORDER) {
      args.push("INORDER");
    }
    if (options?.LANGUAGE) {
      args.push("LANGUAGE", options.LANGUAGE);
    }
    if (options?.EXPANDER) {
      args.push("EXPANDER", options.EXPANDER);
    }
    if (options?.SCORER) {
      args.push("SCORER", options.SCORER);
    }
    if (options?.SORTBY) {
      args.push("SORTBY");
      pushSortByProperty(args, options.SORTBY);
    }
    if (options?.LIMIT) {
      args.push("LIMIT", options.LIMIT.from.toString(), options.LIMIT.size.toString());
    }
    if (options?.PARAMS) {
      pushParamsArgs(args, options.PARAMS);
    }
    if (options?.DIALECT) {
      args.push("DIALECT", options.DIALECT.toString());
    }
    if (options?.RETURN?.length === 0) {
      args.preserve = true;
    }
    if (options?.TIMEOUT !== undefined) {
      args.push("TIMEOUT", options.TIMEOUT.toString());
    }
    return args;
  }
  exports.pushSearchOptions = pushSearchOptions;
  function transformProfile(reply) {
    return {
      totalProfileTime: reply[0][1],
      parsingTime: reply[1][1],
      pipelineCreationTime: reply[2][1],
      iteratorsProfile: transformIterators(reply[3][1])
    };
  }
  exports.transformProfile = transformProfile;
  function transformIterators(IteratorsProfile) {
    var res = {};
    for (let i = 0;i < IteratorsProfile.length; i += 2) {
      const value = IteratorsProfile[i + 1];
      switch (IteratorsProfile[i]) {
        case "Type":
          res.type = value;
          break;
        case "Counter":
          res.counter = value;
          break;
        case "Time":
          res.time = value;
          break;
        case "Query type":
          res.queryType = value;
          break;
        case "Child iterators":
          res.childIterators = value.map(transformChildIterators);
          break;
      }
    }
    return res;
  }
  function transformChildIterators(IteratorsProfile) {
    var res = {};
    for (let i = 1;i < IteratorsProfile.length; i += 2) {
      const value = IteratorsProfile[i + 1];
      switch (IteratorsProfile[i]) {
        case "Type":
          res.type = value;
          break;
        case "Counter":
          res.counter = value;
          break;
        case "Time":
          res.time = value;
          break;
        case "Size":
          res.size = value;
          break;
        case "Term":
          res.term = value;
          break;
        case "Child iterators":
          res.childIterators = value.map(transformChildIterators);
          break;
      }
    }
    return res;
  }
});

// node_modules/@redis/search/dist/index.js
var require_dist5 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.AggregateSteps = exports.AggregateGroupByReducers = exports.VectorAlgorithms = exports.SchemaTextFieldPhonetics = exports.SchemaFieldTypes = exports.RedisSearchLanguages = exports.default = undefined;
  var commands_1 = require_commands6();
  Object.defineProperty(exports, "default", { enumerable: true, get: function() {
    return commands_1.default;
  } });
  var commands_2 = require_commands6();
  Object.defineProperty(exports, "RedisSearchLanguages", { enumerable: true, get: function() {
    return commands_2.RedisSearchLanguages;
  } });
  Object.defineProperty(exports, "SchemaFieldTypes", { enumerable: true, get: function() {
    return commands_2.SchemaFieldTypes;
  } });
  Object.defineProperty(exports, "SchemaTextFieldPhonetics", { enumerable: true, get: function() {
    return commands_2.SchemaTextFieldPhonetics;
  } });
  Object.defineProperty(exports, "VectorAlgorithms", { enumerable: true, get: function() {
    return commands_2.VectorAlgorithms;
  } });
  var AGGREGATE_1 = require_AGGREGATE();
  Object.defineProperty(exports, "AggregateGroupByReducers", { enumerable: true, get: function() {
    return AGGREGATE_1.AggregateGroupByReducers;
  } });
  Object.defineProperty(exports, "AggregateSteps", { enumerable: true, get: function() {
    return AGGREGATE_1.AggregateSteps;
  } });
});

// node_modules/@redis/time-series/dist/commands/ADD.js
var require_ADD5 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_commands7();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, timestamp, value, options) {
    const args = [
      "TS.ADD",
      key,
      (0, _1.transformTimestampArgument)(timestamp),
      value.toString()
    ];
    (0, _1.pushRetentionArgument)(args, options?.RETENTION);
    (0, _1.pushEncodingArgument)(args, options?.ENCODING);
    (0, _1.pushChunkSizeArgument)(args, options?.CHUNK_SIZE);
    if (options?.ON_DUPLICATE) {
      args.push("ON_DUPLICATE", options.ON_DUPLICATE);
    }
    (0, _1.pushLabelsArgument)(args, options?.LABELS);
    (0, _1.pushIgnoreArgument)(args, options?.IGNORE);
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/time-series/dist/commands/ALTER.js
var require_ALTER2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_commands7();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, options) {
    const args = ["TS.ALTER", key];
    (0, _1.pushRetentionArgument)(args, options?.RETENTION);
    (0, _1.pushChunkSizeArgument)(args, options?.CHUNK_SIZE);
    (0, _1.pushDuplicatePolicy)(args, options?.DUPLICATE_POLICY);
    (0, _1.pushLabelsArgument)(args, options?.LABELS);
    (0, _1.pushIgnoreArgument)(args, options?.IGNORE);
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/time-series/dist/commands/CREATE.js
var require_CREATE3 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_commands7();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, options) {
    const args = ["TS.CREATE", key];
    (0, _1.pushRetentionArgument)(args, options?.RETENTION);
    (0, _1.pushEncodingArgument)(args, options?.ENCODING);
    (0, _1.pushChunkSizeArgument)(args, options?.CHUNK_SIZE);
    (0, _1.pushDuplicatePolicy)(args, options?.DUPLICATE_POLICY);
    (0, _1.pushLabelsArgument)(args, options?.LABELS);
    (0, _1.pushIgnoreArgument)(args, options?.IGNORE);
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/time-series/dist/commands/CREATERULE.js
var require_CREATERULE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(sourceKey, destinationKey, aggregationType, bucketDuration, alignTimestamp) {
    const args = [
      "TS.CREATERULE",
      sourceKey,
      destinationKey,
      "AGGREGATION",
      aggregationType,
      bucketDuration.toString()
    ];
    if (alignTimestamp) {
      args.push(alignTimestamp.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/time-series/dist/commands/DECRBY.js
var require_DECRBY2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_commands7();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, value, options) {
    return (0, _1.transformIncrDecrArguments)("TS.DECRBY", key, value, options);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/time-series/dist/commands/DEL.js
var require_DEL4 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRTS_KEY_INDEX = undefined;
  var _1 = require_commands7();
  exports.FIRTS_KEY_INDEX = 1;
  function transformArguments(key, fromTimestamp, toTimestamp) {
    return [
      "TS.DEL",
      key,
      (0, _1.transformTimestampArgument)(fromTimestamp),
      (0, _1.transformTimestampArgument)(toTimestamp)
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/time-series/dist/commands/DELETERULE.js
var require_DELETERULE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(sourceKey, destinationKey) {
    return [
      "TS.DELETERULE",
      sourceKey,
      destinationKey
    ];
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/time-series/dist/commands/GET.js
var require_GET3 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_commands7();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, options) {
    return (0, _1.pushLatestArgument)(["TS.GET", key], options?.LATEST);
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    if (reply.length === 0)
      return null;
    return (0, _1.transformSampleReply)(reply);
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/time-series/dist/commands/INCRBY.js
var require_INCRBY4 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_commands7();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(key, value, options) {
    return (0, _1.transformIncrDecrArguments)("TS.INCRBY", key, value, options);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/time-series/dist/commands/INFO.js
var require_INFO8 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key) {
    return ["TS.INFO", key];
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return {
      totalSamples: reply[1],
      memoryUsage: reply[3],
      firstTimestamp: reply[5],
      lastTimestamp: reply[7],
      retentionTime: reply[9],
      chunkCount: reply[11],
      chunkSize: reply[13],
      chunkType: reply[15],
      duplicatePolicy: reply[17],
      labels: reply[19].map(([name, value]) => ({
        name,
        value
      })),
      sourceKey: reply[21],
      rules: reply[23].map(([key, timeBucket, aggregationType]) => ({
        key,
        timeBucket,
        aggregationType
      }))
    };
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/time-series/dist/commands/INFO_DEBUG.js
var require_INFO_DEBUG = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = exports.IS_READ_ONLY = undefined;
  var INFO_1 = require_INFO8();
  var INFO_2 = require_INFO8();
  Object.defineProperty(exports, "IS_READ_ONLY", { enumerable: true, get: function() {
    return INFO_2.IS_READ_ONLY;
  } });
  Object.defineProperty(exports, "FIRST_KEY_INDEX", { enumerable: true, get: function() {
    return INFO_2.FIRST_KEY_INDEX;
  } });
  function transformArguments(key) {
    const args = (0, INFO_1.transformArguments)(key);
    args.push("DEBUG");
    return args;
  }
  exports.transformArguments = transformArguments;
  function transformReply(rawReply) {
    const reply = (0, INFO_1.transformReply)(rawReply);
    reply.keySelfName = rawReply[25];
    reply.chunks = rawReply[27].map((chunk) => ({
      startTimestamp: chunk[1],
      endTimestamp: chunk[3],
      samples: chunk[5],
      size: chunk[7],
      bytesPerSample: chunk[9]
    }));
    return reply;
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/time-series/dist/commands/MADD.js
var require_MADD2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_commands7();
  exports.FIRST_KEY_INDEX = 1;
  function transformArguments(toAdd) {
    const args = ["TS.MADD"];
    for (const { key, timestamp, value } of toAdd) {
      args.push(key, (0, _1.transformTimestampArgument)(timestamp), value.toString());
    }
    return args;
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/time-series/dist/commands/MGET.js
var require_MGET3 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = undefined;
  var _1 = require_commands7();
  exports.IS_READ_ONLY = true;
  function transformArguments(filter, options) {
    const args = (0, _1.pushLatestArgument)(["TS.MGET"], options?.LATEST);
    return (0, _1.pushFilterArgument)(args, filter);
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return reply.map(([key, _, sample]) => ({
      key,
      sample: (0, _1.transformSampleReply)(sample)
    }));
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/time-series/dist/commands/MGET_WITHLABELS.js
var require_MGET_WITHLABELS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = undefined;
  var _1 = require_commands7();
  exports.IS_READ_ONLY = true;
  function transformArguments(filter, options) {
    const args = (0, _1.pushWithLabelsArgument)(["TS.MGET"], options?.SELECTED_LABELS);
    return (0, _1.pushFilterArgument)(args, filter);
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return reply.map(([key, labels, sample]) => ({
      key,
      labels: (0, _1.transformLablesReply)(labels),
      sample: (0, _1.transformSampleReply)(sample)
    }));
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/time-series/dist/commands/QUERYINDEX.js
var require_QUERYINDEX = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformArguments = exports.IS_READ_ONLY = undefined;
  var generic_transformers_1 = require_generic_transformers();
  exports.IS_READ_ONLY = true;
  function transformArguments(filter) {
    return (0, generic_transformers_1.pushVerdictArguments)(["TS.QUERYINDEX"], filter);
  }
  exports.transformArguments = transformArguments;
});

// node_modules/@redis/time-series/dist/commands/RANGE.js
var require_RANGE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_commands7();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, fromTimestamp, toTimestamp, options) {
    return (0, _1.pushRangeArguments)(["TS.RANGE", key], fromTimestamp, toTimestamp, options);
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return (0, _1.transformRangeReply)(reply);
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/time-series/dist/commands/REVRANGE.js
var require_REVRANGE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = undefined;
  var _1 = require_commands7();
  exports.FIRST_KEY_INDEX = 1;
  exports.IS_READ_ONLY = true;
  function transformArguments(key, fromTimestamp, toTimestamp, options) {
    return (0, _1.pushRangeArguments)(["TS.REVRANGE", key], fromTimestamp, toTimestamp, options);
  }
  exports.transformArguments = transformArguments;
  function transformReply(reply) {
    return (0, _1.transformRangeReply)(reply);
  }
  exports.transformReply = transformReply;
});

// node_modules/@redis/time-series/dist/commands/MRANGE.js
var require_MRANGE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = undefined;
  var _1 = require_commands7();
  exports.IS_READ_ONLY = true;
  function transformArguments(fromTimestamp, toTimestamp, filters, options) {
    return (0, _1.pushMRangeArguments)(["TS.MRANGE"], fromTimestamp, toTimestamp, filters, options);
  }
  exports.transformArguments = transformArguments;
  var _2 = require_commands7();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return _2.transformMRangeReply;
  } });
});

// node_modules/@redis/time-series/dist/commands/MRANGE_WITHLABELS.js
var require_MRANGE_WITHLABELS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = undefined;
  var _1 = require_commands7();
  exports.IS_READ_ONLY = true;
  function transformArguments(fromTimestamp, toTimestamp, filters, options) {
    return (0, _1.pushMRangeWithLabelsArguments)(["TS.MRANGE"], fromTimestamp, toTimestamp, filters, options);
  }
  exports.transformArguments = transformArguments;
  var _2 = require_commands7();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return _2.transformMRangeWithLabelsReply;
  } });
});

// node_modules/@redis/time-series/dist/commands/MREVRANGE.js
var require_MREVRANGE = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = undefined;
  var _1 = require_commands7();
  exports.IS_READ_ONLY = true;
  function transformArguments(fromTimestamp, toTimestamp, filters, options) {
    return (0, _1.pushMRangeArguments)(["TS.MREVRANGE"], fromTimestamp, toTimestamp, filters, options);
  }
  exports.transformArguments = transformArguments;
  var _2 = require_commands7();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return _2.transformMRangeReply;
  } });
});

// node_modules/@redis/time-series/dist/commands/MREVRANGE_WITHLABELS.js
var require_MREVRANGE_WITHLABELS = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = undefined;
  var _1 = require_commands7();
  exports.IS_READ_ONLY = true;
  function transformArguments(fromTimestamp, toTimestamp, filters, options) {
    return (0, _1.pushMRangeWithLabelsArguments)(["TS.MREVRANGE"], fromTimestamp, toTimestamp, filters, options);
  }
  exports.transformArguments = transformArguments;
  var _2 = require_commands7();
  Object.defineProperty(exports, "transformReply", { enumerable: true, get: function() {
    return _2.transformMRangeWithLabelsReply;
  } });
});

// node_modules/@redis/time-series/dist/commands/index.js
var require_commands7 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.pushLatestArgument = exports.transformMRangeWithLabelsReply = exports.transformMRangeReply = exports.transformRangeReply = exports.pushMRangeWithLabelsArguments = exports.pushWithLabelsArgument = exports.pushMRangeArguments = exports.pushFilterArgument = exports.pushMRangeGroupByArguments = exports.pushRangeArguments = exports.TimeSeriesBucketTimestamp = exports.transformSampleReply = exports.transformIncrDecrArguments = exports.pushLabelsArgument = exports.transformLablesReply = exports.pushDuplicatePolicy = exports.pushChunkSizeArgument = exports.pushEncodingArgument = exports.TimeSeriesEncoding = exports.pushRetentionArgument = exports.pushIgnoreArgument = exports.transformTimestampArgument = exports.TimeSeriesReducers = exports.TimeSeriesDuplicatePolicies = exports.TimeSeriesAggregationType = undefined;
  var ADD = require_ADD5();
  var ALTER = require_ALTER2();
  var CREATE = require_CREATE3();
  var CREATERULE = require_CREATERULE();
  var DECRBY = require_DECRBY2();
  var DEL = require_DEL4();
  var DELETERULE = require_DELETERULE();
  var GET = require_GET3();
  var INCRBY = require_INCRBY4();
  var INFO_DEBUG = require_INFO_DEBUG();
  var INFO = require_INFO8();
  var MADD = require_MADD2();
  var MGET = require_MGET3();
  var MGET_WITHLABELS = require_MGET_WITHLABELS();
  var QUERYINDEX = require_QUERYINDEX();
  var RANGE = require_RANGE();
  var REVRANGE = require_REVRANGE();
  var MRANGE = require_MRANGE();
  var MRANGE_WITHLABELS = require_MRANGE_WITHLABELS();
  var MREVRANGE = require_MREVRANGE();
  var MREVRANGE_WITHLABELS = require_MREVRANGE_WITHLABELS();
  var generic_transformers_1 = require_generic_transformers();
  exports.default = {
    ADD,
    add: ADD,
    ALTER,
    alter: ALTER,
    CREATE,
    create: CREATE,
    CREATERULE,
    createRule: CREATERULE,
    DECRBY,
    decrBy: DECRBY,
    DEL,
    del: DEL,
    DELETERULE,
    deleteRule: DELETERULE,
    GET,
    get: GET,
    INCRBY,
    incrBy: INCRBY,
    INFO_DEBUG,
    infoDebug: INFO_DEBUG,
    INFO,
    info: INFO,
    MADD,
    mAdd: MADD,
    MGET,
    mGet: MGET,
    MGET_WITHLABELS,
    mGetWithLabels: MGET_WITHLABELS,
    QUERYINDEX,
    queryIndex: QUERYINDEX,
    RANGE,
    range: RANGE,
    REVRANGE,
    revRange: REVRANGE,
    MRANGE,
    mRange: MRANGE,
    MRANGE_WITHLABELS,
    mRangeWithLabels: MRANGE_WITHLABELS,
    MREVRANGE,
    mRevRange: MREVRANGE,
    MREVRANGE_WITHLABELS,
    mRevRangeWithLabels: MREVRANGE_WITHLABELS
  };
  var TimeSeriesAggregationType;
  (function(TimeSeriesAggregationType2) {
    TimeSeriesAggregationType2["AVG"] = "AVG";
    TimeSeriesAggregationType2["AVERAGE"] = "AVG";
    TimeSeriesAggregationType2["FIRST"] = "FIRST";
    TimeSeriesAggregationType2["LAST"] = "LAST";
    TimeSeriesAggregationType2["MIN"] = "MIN";
    TimeSeriesAggregationType2["MINIMUM"] = "MIN";
    TimeSeriesAggregationType2["MAX"] = "MAX";
    TimeSeriesAggregationType2["MAXIMUM"] = "MAX";
    TimeSeriesAggregationType2["SUM"] = "SUM";
    TimeSeriesAggregationType2["RANGE"] = "RANGE";
    TimeSeriesAggregationType2["COUNT"] = "COUNT";
    TimeSeriesAggregationType2["STD_P"] = "STD.P";
    TimeSeriesAggregationType2["STD_S"] = "STD.S";
    TimeSeriesAggregationType2["VAR_P"] = "VAR.P";
    TimeSeriesAggregationType2["VAR_S"] = "VAR.S";
    TimeSeriesAggregationType2["TWA"] = "TWA";
  })(TimeSeriesAggregationType || (exports.TimeSeriesAggregationType = TimeSeriesAggregationType = {}));
  var TimeSeriesDuplicatePolicies;
  (function(TimeSeriesDuplicatePolicies2) {
    TimeSeriesDuplicatePolicies2["BLOCK"] = "BLOCK";
    TimeSeriesDuplicatePolicies2["FIRST"] = "FIRST";
    TimeSeriesDuplicatePolicies2["LAST"] = "LAST";
    TimeSeriesDuplicatePolicies2["MIN"] = "MIN";
    TimeSeriesDuplicatePolicies2["MAX"] = "MAX";
    TimeSeriesDuplicatePolicies2["SUM"] = "SUM";
  })(TimeSeriesDuplicatePolicies || (exports.TimeSeriesDuplicatePolicies = TimeSeriesDuplicatePolicies = {}));
  var TimeSeriesReducers;
  (function(TimeSeriesReducers2) {
    TimeSeriesReducers2["AVG"] = "AVG";
    TimeSeriesReducers2["SUM"] = "SUM";
    TimeSeriesReducers2["MIN"] = "MIN";
    TimeSeriesReducers2["MINIMUM"] = "MIN";
    TimeSeriesReducers2["MAX"] = "MAX";
    TimeSeriesReducers2["MAXIMUM"] = "MAX";
    TimeSeriesReducers2["RANGE"] = "range";
    TimeSeriesReducers2["COUNT"] = "COUNT";
    TimeSeriesReducers2["STD_P"] = "STD.P";
    TimeSeriesReducers2["STD_S"] = "STD.S";
    TimeSeriesReducers2["VAR_P"] = "VAR.P";
    TimeSeriesReducers2["VAR_S"] = "VAR.S";
  })(TimeSeriesReducers || (exports.TimeSeriesReducers = TimeSeriesReducers = {}));
  function transformTimestampArgument(timestamp) {
    if (typeof timestamp === "string")
      return timestamp;
    return (typeof timestamp === "number" ? timestamp : timestamp.getTime()).toString();
  }
  exports.transformTimestampArgument = transformTimestampArgument;
  function pushIgnoreArgument(args, ignore) {
    if (ignore !== undefined) {
      args.push("IGNORE", ignore.MAX_TIME_DIFF.toString(), ignore.MAX_VAL_DIFF.toString());
    }
  }
  exports.pushIgnoreArgument = pushIgnoreArgument;
  function pushRetentionArgument(args, retention) {
    if (retention !== undefined) {
      args.push("RETENTION", retention.toString());
    }
    return args;
  }
  exports.pushRetentionArgument = pushRetentionArgument;
  var TimeSeriesEncoding;
  (function(TimeSeriesEncoding2) {
    TimeSeriesEncoding2["COMPRESSED"] = "COMPRESSED";
    TimeSeriesEncoding2["UNCOMPRESSED"] = "UNCOMPRESSED";
  })(TimeSeriesEncoding || (exports.TimeSeriesEncoding = TimeSeriesEncoding = {}));
  function pushEncodingArgument(args, encoding) {
    if (encoding !== undefined) {
      args.push("ENCODING", encoding);
    }
    return args;
  }
  exports.pushEncodingArgument = pushEncodingArgument;
  function pushChunkSizeArgument(args, chunkSize) {
    if (chunkSize !== undefined) {
      args.push("CHUNK_SIZE", chunkSize.toString());
    }
    return args;
  }
  exports.pushChunkSizeArgument = pushChunkSizeArgument;
  function pushDuplicatePolicy(args, duplicatePolicy) {
    if (duplicatePolicy !== undefined) {
      args.push("DUPLICATE_POLICY", duplicatePolicy);
    }
    return args;
  }
  exports.pushDuplicatePolicy = pushDuplicatePolicy;
  function transformLablesReply(reply) {
    const labels = {};
    for (const [key, value] of reply) {
      labels[key] = value;
    }
    return labels;
  }
  exports.transformLablesReply = transformLablesReply;
  function pushLabelsArgument(args, labels) {
    if (labels) {
      args.push("LABELS");
      for (const [label, value] of Object.entries(labels)) {
        args.push(label, value);
      }
    }
    return args;
  }
  exports.pushLabelsArgument = pushLabelsArgument;
  function transformIncrDecrArguments(command, key, value, options) {
    const args = [
      command,
      key,
      value.toString()
    ];
    if (options?.TIMESTAMP !== undefined && options?.TIMESTAMP !== null) {
      args.push("TIMESTAMP", transformTimestampArgument(options.TIMESTAMP));
    }
    pushRetentionArgument(args, options?.RETENTION);
    if (options?.UNCOMPRESSED) {
      args.push("UNCOMPRESSED");
    }
    pushChunkSizeArgument(args, options?.CHUNK_SIZE);
    pushLabelsArgument(args, options?.LABELS);
    return args;
  }
  exports.transformIncrDecrArguments = transformIncrDecrArguments;
  function transformSampleReply(reply) {
    return {
      timestamp: reply[0],
      value: Number(reply[1])
    };
  }
  exports.transformSampleReply = transformSampleReply;
  var TimeSeriesBucketTimestamp;
  (function(TimeSeriesBucketTimestamp2) {
    TimeSeriesBucketTimestamp2["LOW"] = "-";
    TimeSeriesBucketTimestamp2["HIGH"] = "+";
    TimeSeriesBucketTimestamp2["MID"] = "~";
  })(TimeSeriesBucketTimestamp || (exports.TimeSeriesBucketTimestamp = TimeSeriesBucketTimestamp = {}));
  function pushRangeArguments(args, fromTimestamp, toTimestamp, options) {
    args.push(transformTimestampArgument(fromTimestamp), transformTimestampArgument(toTimestamp));
    pushLatestArgument(args, options?.LATEST);
    if (options?.FILTER_BY_TS) {
      args.push("FILTER_BY_TS");
      for (const ts of options.FILTER_BY_TS) {
        args.push(transformTimestampArgument(ts));
      }
    }
    if (options?.FILTER_BY_VALUE) {
      args.push("FILTER_BY_VALUE", options.FILTER_BY_VALUE.min.toString(), options.FILTER_BY_VALUE.max.toString());
    }
    if (options?.COUNT) {
      args.push("COUNT", options.COUNT.toString());
    }
    if (options?.ALIGN) {
      args.push("ALIGN", transformTimestampArgument(options.ALIGN));
    }
    if (options?.AGGREGATION) {
      args.push("AGGREGATION", options.AGGREGATION.type, transformTimestampArgument(options.AGGREGATION.timeBucket));
      if (options.AGGREGATION.BUCKETTIMESTAMP) {
        args.push("BUCKETTIMESTAMP", options.AGGREGATION.BUCKETTIMESTAMP);
      }
      if (options.AGGREGATION.EMPTY) {
        args.push("EMPTY");
      }
    }
    return args;
  }
  exports.pushRangeArguments = pushRangeArguments;
  function pushMRangeGroupByArguments(args, groupBy) {
    if (groupBy) {
      args.push("GROUPBY", groupBy.label, "REDUCE", groupBy.reducer);
    }
    return args;
  }
  exports.pushMRangeGroupByArguments = pushMRangeGroupByArguments;
  function pushFilterArgument(args, filter) {
    args.push("FILTER");
    return (0, generic_transformers_1.pushVerdictArguments)(args, filter);
  }
  exports.pushFilterArgument = pushFilterArgument;
  function pushMRangeArguments(args, fromTimestamp, toTimestamp, filter, options) {
    args = pushRangeArguments(args, fromTimestamp, toTimestamp, options);
    args = pushFilterArgument(args, filter);
    return pushMRangeGroupByArguments(args, options?.GROUPBY);
  }
  exports.pushMRangeArguments = pushMRangeArguments;
  function pushWithLabelsArgument(args, selectedLabels) {
    if (!selectedLabels) {
      args.push("WITHLABELS");
    } else {
      args.push("SELECTED_LABELS");
      args = (0, generic_transformers_1.pushVerdictArguments)(args, selectedLabels);
    }
    return args;
  }
  exports.pushWithLabelsArgument = pushWithLabelsArgument;
  function pushMRangeWithLabelsArguments(args, fromTimestamp, toTimestamp, filter, options) {
    args = pushRangeArguments(args, fromTimestamp, toTimestamp, options);
    args = pushWithLabelsArgument(args, options?.SELECTED_LABELS);
    args = pushFilterArgument(args, filter);
    return pushMRangeGroupByArguments(args, options?.GROUPBY);
  }
  exports.pushMRangeWithLabelsArguments = pushMRangeWithLabelsArguments;
  function transformRangeReply(reply) {
    return reply.map(transformSampleReply);
  }
  exports.transformRangeReply = transformRangeReply;
  function transformMRangeReply(reply) {
    const args = [];
    for (const [key, _, sample] of reply) {
      args.push({
        key,
        samples: sample.map(transformSampleReply)
      });
    }
    return args;
  }
  exports.transformMRangeReply = transformMRangeReply;
  function transformMRangeWithLabelsReply(reply) {
    const args = [];
    for (const [key, labels, samples] of reply) {
      args.push({
        key,
        labels: transformLablesReply(labels),
        samples: samples.map(transformSampleReply)
      });
    }
    return args;
  }
  exports.transformMRangeWithLabelsReply = transformMRangeWithLabelsReply;
  function pushLatestArgument(args, latest) {
    if (latest) {
      args.push("LATEST");
    }
    return args;
  }
  exports.pushLatestArgument = pushLatestArgument;
});

// node_modules/@redis/time-series/dist/index.js
var require_dist6 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TimeSeriesBucketTimestamp = exports.TimeSeriesReducers = exports.TimeSeriesAggregationType = exports.TimeSeriesEncoding = exports.TimeSeriesDuplicatePolicies = exports.default = undefined;
  var commands_1 = require_commands7();
  Object.defineProperty(exports, "default", { enumerable: true, get: function() {
    return commands_1.default;
  } });
  var commands_2 = require_commands7();
  Object.defineProperty(exports, "TimeSeriesDuplicatePolicies", { enumerable: true, get: function() {
    return commands_2.TimeSeriesDuplicatePolicies;
  } });
  Object.defineProperty(exports, "TimeSeriesEncoding", { enumerable: true, get: function() {
    return commands_2.TimeSeriesEncoding;
  } });
  Object.defineProperty(exports, "TimeSeriesAggregationType", { enumerable: true, get: function() {
    return commands_2.TimeSeriesAggregationType;
  } });
  Object.defineProperty(exports, "TimeSeriesReducers", { enumerable: true, get: function() {
    return commands_2.TimeSeriesReducers;
  } });
  Object.defineProperty(exports, "TimeSeriesBucketTimestamp", { enumerable: true, get: function() {
    return commands_2.TimeSeriesBucketTimestamp;
  } });
});

// node_modules/redis/dist/index.js
var require_dist7 = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.createCluster = exports.createClient = undefined;
  var client_1 = require_dist();
  var bloom_1 = require_dist2();
  var graph_1 = require_dist3();
  var json_1 = require_dist4();
  var search_1 = require_dist5();
  var time_series_1 = require_dist6();
  __exportStar(require_dist(), exports);
  __exportStar(require_dist2(), exports);
  __exportStar(require_dist3(), exports);
  __exportStar(require_dist4(), exports);
  __exportStar(require_dist5(), exports);
  __exportStar(require_dist6(), exports);
  var modules = {
    ...bloom_1.default,
    graph: graph_1.default,
    json: json_1.default,
    ft: search_1.default,
    ts: time_series_1.default
  };
  function createClient(options) {
    return (0, client_1.createClient)({
      ...options,
      modules: {
        ...modules,
        ...options?.modules
      }
    });
  }
  exports.createClient = createClient;
  function createCluster(options) {
    return (0, client_1.createCluster)({
      ...options,
      modules: {
        ...modules,
        ...options?.modules
      }
    });
  }
  exports.createCluster = createCluster;
});

// node_modules/nodemailer/lib/fetch/cookies.js
var require_cookies = __commonJS((exports, module) => {
  var urllib = __require("node:url");
  var SESSION_TIMEOUT = 1800;

  class Cookies {
    constructor(options) {
      this.options = options || {};
      this.cookies = [];
    }
    set(cookieStr, url) {
      let urlparts = urllib.parse(url || "");
      let cookie = this.parse(cookieStr);
      let domain;
      if (cookie.domain) {
        domain = cookie.domain.replace(/^\./, "");
        if (urlparts.hostname.length < domain.length || ("." + urlparts.hostname).substr(-domain.length + 1) !== "." + domain) {
          cookie.domain = urlparts.hostname;
        }
      } else {
        cookie.domain = urlparts.hostname;
      }
      if (!cookie.path) {
        cookie.path = this.getPath(urlparts.pathname);
      }
      if (!cookie.expires) {
        cookie.expires = new Date(Date.now() + (Number(this.options.sessionTimeout || SESSION_TIMEOUT) || SESSION_TIMEOUT) * 1000);
      }
      return this.add(cookie);
    }
    get(url) {
      return this.list(url).map((cookie) => cookie.name + "=" + cookie.value).join("; ");
    }
    list(url) {
      let result = [];
      let i;
      let cookie;
      for (i = this.cookies.length - 1;i >= 0; i--) {
        cookie = this.cookies[i];
        if (this.isExpired(cookie)) {
          this.cookies.splice(i, i);
          continue;
        }
        if (this.match(cookie, url)) {
          result.unshift(cookie);
        }
      }
      return result;
    }
    parse(cookieStr) {
      let cookie = {};
      (cookieStr || "").toString().split(";").forEach((cookiePart) => {
        let valueParts = cookiePart.split("=");
        let key = valueParts.shift().trim().toLowerCase();
        let value = valueParts.join("=").trim();
        let domain;
        if (!key) {
          return;
        }
        switch (key) {
          case "expires":
            value = new Date(value);
            if (value.toString() !== "Invalid Date") {
              cookie.expires = value;
            }
            break;
          case "path":
            cookie.path = value;
            break;
          case "domain":
            domain = value.toLowerCase();
            if (domain.length && domain.charAt(0) !== ".") {
              domain = "." + domain;
            }
            cookie.domain = domain;
            break;
          case "max-age":
            cookie.expires = new Date(Date.now() + (Number(value) || 0) * 1000);
            break;
          case "secure":
            cookie.secure = true;
            break;
          case "httponly":
            cookie.httponly = true;
            break;
          default:
            if (!cookie.name) {
              cookie.name = key;
              cookie.value = value;
            }
        }
      });
      return cookie;
    }
    match(cookie, url) {
      let urlparts = urllib.parse(url || "");
      if (urlparts.hostname !== cookie.domain && (cookie.domain.charAt(0) !== "." || ("." + urlparts.hostname).substr(-cookie.domain.length) !== cookie.domain)) {
        return false;
      }
      let path = this.getPath(urlparts.pathname);
      if (path.substr(0, cookie.path.length) !== cookie.path) {
        return false;
      }
      if (cookie.secure && urlparts.protocol !== "https:") {
        return false;
      }
      return true;
    }
    add(cookie) {
      let i;
      let len;
      if (!cookie || !cookie.name) {
        return false;
      }
      for (i = 0, len = this.cookies.length;i < len; i++) {
        if (this.compare(this.cookies[i], cookie)) {
          if (this.isExpired(cookie)) {
            this.cookies.splice(i, 1);
            return false;
          }
          this.cookies[i] = cookie;
          return true;
        }
      }
      if (!this.isExpired(cookie)) {
        this.cookies.push(cookie);
      }
      return true;
    }
    compare(a, b) {
      return a.name === b.name && a.path === b.path && a.domain === b.domain && a.secure === b.secure && a.httponly === a.httponly;
    }
    isExpired(cookie) {
      return cookie.expires && cookie.expires < new Date || !cookie.value;
    }
    getPath(pathname) {
      let path = (pathname || "/").split("/");
      path.pop();
      path = path.join("/").trim();
      if (path.charAt(0) !== "/") {
        path = "/" + path;
      }
      if (path.substr(-1) !== "/") {
        path += "/";
      }
      return path;
    }
  }
  module.exports = Cookies;
});

// node_modules/nodemailer/package.json
var require_package2 = __commonJS((exports, module) => {
  module.exports = {
    name: "nodemailer",
    version: "6.10.0",
    description: "Easy as cake e-mail sending from your Node.js applications",
    main: "lib/nodemailer.js",
    scripts: {
      test: "node --test --test-concurrency=1 test/**/*.test.js test/**/*-test.js",
      "test:coverage": "c8 node --test --test-concurrency=1 test/**/*.test.js test/**/*-test.js",
      lint: "eslint .",
      update: "rm -rf node_modules/ package-lock.json && ncu -u && npm install"
    },
    repository: {
      type: "git",
      url: "https://github.com/nodemailer/nodemailer.git"
    },
    keywords: [
      "Nodemailer"
    ],
    author: "Andris Reinman",
    license: "MIT-0",
    bugs: {
      url: "https://github.com/nodemailer/nodemailer/issues"
    },
    homepage: "https://nodemailer.com/",
    devDependencies: {
      "@aws-sdk/client-ses": "3.731.1",
      bunyan: "1.8.15",
      c8: "10.1.3",
      eslint: "8.57.0",
      "eslint-config-nodemailer": "1.2.0",
      "eslint-config-prettier": "9.1.0",
      libbase64: "1.3.0",
      libmime: "5.3.6",
      libqp: "2.1.1",
      "nodemailer-ntlm-auth": "1.0.4",
      proxy: "1.0.2",
      "proxy-test-server": "1.0.0",
      "smtp-server": "3.13.6"
    },
    engines: {
      node: ">=6.0.0"
    }
  };
});

// node_modules/nodemailer/lib/fetch/index.js
var require_fetch = __commonJS((exports, module) => {
  var http = __require("node:http");
  var https = __require("node:https");
  var urllib = __require("node:url");
  var zlib = __require("node:zlib");
  var PassThrough = __require("node:stream").PassThrough;
  var Cookies = require_cookies();
  var packageData = require_package2();
  var net = __require("node:net");
  var MAX_REDIRECTS = 5;
  module.exports = function(url, options) {
    return nmfetch(url, options);
  };
  module.exports.Cookies = Cookies;
  function nmfetch(url, options) {
    options = options || {};
    options.fetchRes = options.fetchRes || new PassThrough;
    options.cookies = options.cookies || new Cookies;
    options.redirects = options.redirects || 0;
    options.maxRedirects = isNaN(options.maxRedirects) ? MAX_REDIRECTS : options.maxRedirects;
    if (options.cookie) {
      [].concat(options.cookie || []).forEach((cookie) => {
        options.cookies.set(cookie, url);
      });
      options.cookie = false;
    }
    let fetchRes = options.fetchRes;
    let parsed = urllib.parse(url);
    let method = (options.method || "").toString().trim().toUpperCase() || "GET";
    let finished = false;
    let cookies;
    let body;
    let handler = parsed.protocol === "https:" ? https : http;
    let headers = {
      "accept-encoding": "gzip,deflate",
      "user-agent": "nodemailer/" + packageData.version
    };
    Object.keys(options.headers || {}).forEach((key) => {
      headers[key.toLowerCase().trim()] = options.headers[key];
    });
    if (options.userAgent) {
      headers["user-agent"] = options.userAgent;
    }
    if (parsed.auth) {
      headers.Authorization = "Basic " + Buffer.from(parsed.auth).toString("base64");
    }
    if (cookies = options.cookies.get(url)) {
      headers.cookie = cookies;
    }
    if (options.body) {
      if (options.contentType !== false) {
        headers["Content-Type"] = options.contentType || "application/x-www-form-urlencoded";
      }
      if (typeof options.body.pipe === "function") {
        headers["Transfer-Encoding"] = "chunked";
        body = options.body;
        body.on("error", (err) => {
          if (finished) {
            return;
          }
          finished = true;
          err.type = "FETCH";
          err.sourceUrl = url;
          fetchRes.emit("error", err);
        });
      } else {
        if (options.body instanceof Buffer) {
          body = options.body;
        } else if (typeof options.body === "object") {
          try {
            body = Buffer.from(Object.keys(options.body).map((key) => {
              let value = options.body[key].toString().trim();
              return encodeURIComponent(key) + "=" + encodeURIComponent(value);
            }).join("&"));
          } catch (E) {
            if (finished) {
              return;
            }
            finished = true;
            E.type = "FETCH";
            E.sourceUrl = url;
            fetchRes.emit("error", E);
            return;
          }
        } else {
          body = Buffer.from(options.body.toString().trim());
        }
        headers["Content-Type"] = options.contentType || "application/x-www-form-urlencoded";
        headers["Content-Length"] = body.length;
      }
      method = (options.method || "").toString().trim().toUpperCase() || "POST";
    }
    let req;
    let reqOptions = {
      method,
      host: parsed.hostname,
      path: parsed.path,
      port: parsed.port ? parsed.port : parsed.protocol === "https:" ? 443 : 80,
      headers,
      rejectUnauthorized: false,
      agent: false
    };
    if (options.tls) {
      Object.keys(options.tls).forEach((key) => {
        reqOptions[key] = options.tls[key];
      });
    }
    if (parsed.protocol === "https:" && parsed.hostname && parsed.hostname !== reqOptions.host && !net.isIP(parsed.hostname) && !reqOptions.servername) {
      reqOptions.servername = parsed.hostname;
    }
    try {
      req = handler.request(reqOptions);
    } catch (E) {
      finished = true;
      setImmediate(() => {
        E.type = "FETCH";
        E.sourceUrl = url;
        fetchRes.emit("error", E);
      });
      return fetchRes;
    }
    if (options.timeout) {
      req.setTimeout(options.timeout, () => {
        if (finished) {
          return;
        }
        finished = true;
        req.abort();
        let err = new Error("Request Timeout");
        err.type = "FETCH";
        err.sourceUrl = url;
        fetchRes.emit("error", err);
      });
    }
    req.on("error", (err) => {
      if (finished) {
        return;
      }
      finished = true;
      err.type = "FETCH";
      err.sourceUrl = url;
      fetchRes.emit("error", err);
    });
    req.on("response", (res) => {
      let inflate;
      if (finished) {
        return;
      }
      switch (res.headers["content-encoding"]) {
        case "gzip":
        case "deflate":
          inflate = zlib.createUnzip();
          break;
      }
      if (res.headers["set-cookie"]) {
        [].concat(res.headers["set-cookie"] || []).forEach((cookie) => {
          options.cookies.set(cookie, url);
        });
      }
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        options.redirects++;
        if (options.redirects > options.maxRedirects) {
          finished = true;
          let err = new Error("Maximum redirect count exceeded");
          err.type = "FETCH";
          err.sourceUrl = url;
          fetchRes.emit("error", err);
          req.abort();
          return;
        }
        options.method = "GET";
        options.body = false;
        return nmfetch(urllib.resolve(url, res.headers.location), options);
      }
      fetchRes.statusCode = res.statusCode;
      fetchRes.headers = res.headers;
      if (res.statusCode >= 300 && !options.allowErrorResponse) {
        finished = true;
        let err = new Error("Invalid status code " + res.statusCode);
        err.type = "FETCH";
        err.sourceUrl = url;
        fetchRes.emit("error", err);
        req.abort();
        return;
      }
      res.on("error", (err) => {
        if (finished) {
          return;
        }
        finished = true;
        err.type = "FETCH";
        err.sourceUrl = url;
        fetchRes.emit("error", err);
        req.abort();
      });
      if (inflate) {
        res.pipe(inflate).pipe(fetchRes);
        inflate.on("error", (err) => {
          if (finished) {
            return;
          }
          finished = true;
          err.type = "FETCH";
          err.sourceUrl = url;
          fetchRes.emit("error", err);
          req.abort();
        });
      } else {
        res.pipe(fetchRes);
      }
    });
    setImmediate(() => {
      if (body) {
        try {
          if (typeof body.pipe === "function") {
            return body.pipe(req);
          } else {
            req.write(body);
          }
        } catch (err) {
          finished = true;
          err.type = "FETCH";
          err.sourceUrl = url;
          fetchRes.emit("error", err);
          return;
        }
      }
      req.end();
    });
    return fetchRes;
  }
});

// node_modules/nodemailer/lib/shared/index.js
var require_shared = __commonJS((exports, module) => {
  var urllib = __require("node:url");
  var util = __require("node:util");
  var fs = __require("node:fs");
  var nmfetch = require_fetch();
  var dns = __require("node:dns");
  var net = __require("node:net");
  var os = __require("node:os");
  var DNS_TTL = 5 * 60 * 1000;
  var networkInterfaces;
  try {
    networkInterfaces = os.networkInterfaces();
  } catch (err) {}
  exports.networkInterfaces = networkInterfaces;
  var isFamilySupported = (family, allowInternal) => {
    let networkInterfaces2 = exports.networkInterfaces;
    if (!networkInterfaces2) {
      return true;
    }
    const familySupported = Object.keys(networkInterfaces2).map((key) => networkInterfaces2[key]).reduce((acc, val) => acc.concat(val), []).filter((i) => !i.internal || allowInternal).filter((i) => i.family === "IPv" + family || i.family === family).length > 0;
    return familySupported;
  };
  var resolver = (family, hostname, options, callback) => {
    options = options || {};
    const familySupported = isFamilySupported(family, options.allowInternalNetworkInterfaces);
    if (!familySupported) {
      return callback(null, []);
    }
    const resolver2 = dns.Resolver ? new dns.Resolver(options) : dns;
    resolver2["resolve" + family](hostname, (err, addresses) => {
      if (err) {
        switch (err.code) {
          case dns.NODATA:
          case dns.NOTFOUND:
          case dns.NOTIMP:
          case dns.SERVFAIL:
          case dns.CONNREFUSED:
          case dns.REFUSED:
          case "EAI_AGAIN":
            return callback(null, []);
        }
        return callback(err);
      }
      return callback(null, Array.isArray(addresses) ? addresses : [].concat(addresses || []));
    });
  };
  var dnsCache = exports.dnsCache = new Map;
  var formatDNSValue = (value, extra) => {
    if (!value) {
      return Object.assign({}, extra || {});
    }
    return Object.assign({
      servername: value.servername,
      host: !value.addresses || !value.addresses.length ? null : value.addresses.length === 1 ? value.addresses[0] : value.addresses[Math.floor(Math.random() * value.addresses.length)]
    }, extra || {});
  };
  exports.resolveHostname = (options, callback) => {
    options = options || {};
    if (!options.host && options.servername) {
      options.host = options.servername;
    }
    if (!options.host || net.isIP(options.host)) {
      let value = {
        addresses: [options.host],
        servername: options.servername || false
      };
      return callback(null, formatDNSValue(value, {
        cached: false
      }));
    }
    let cached;
    if (dnsCache.has(options.host)) {
      cached = dnsCache.get(options.host);
      if (!cached.expires || cached.expires >= Date.now()) {
        return callback(null, formatDNSValue(cached.value, {
          cached: true
        }));
      }
    }
    resolver(4, options.host, options, (err, addresses) => {
      if (err) {
        if (cached) {
          return callback(null, formatDNSValue(cached.value, {
            cached: true,
            error: err
          }));
        }
        return callback(err);
      }
      if (addresses && addresses.length) {
        let value = {
          addresses,
          servername: options.servername || options.host
        };
        dnsCache.set(options.host, {
          value,
          expires: Date.now() + (options.dnsTtl || DNS_TTL)
        });
        return callback(null, formatDNSValue(value, {
          cached: false
        }));
      }
      resolver(6, options.host, options, (err2, addresses2) => {
        if (err2) {
          if (cached) {
            return callback(null, formatDNSValue(cached.value, {
              cached: true,
              error: err2
            }));
          }
          return callback(err2);
        }
        if (addresses2 && addresses2.length) {
          let value = {
            addresses: addresses2,
            servername: options.servername || options.host
          };
          dnsCache.set(options.host, {
            value,
            expires: Date.now() + (options.dnsTtl || DNS_TTL)
          });
          return callback(null, formatDNSValue(value, {
            cached: false
          }));
        }
        try {
          dns.lookup(options.host, { all: true }, (err3, addresses3) => {
            if (err3) {
              if (cached) {
                return callback(null, formatDNSValue(cached.value, {
                  cached: true,
                  error: err3
                }));
              }
              return callback(err3);
            }
            let address = addresses3 ? addresses3.filter((addr) => isFamilySupported(addr.family)).map((addr) => addr.address).shift() : false;
            if (addresses3 && addresses3.length && !address) {
              console.warn(`Failed to resolve IPv${addresses3[0].family} addresses with current network`);
            }
            if (!address && cached) {
              return callback(null, formatDNSValue(cached.value, {
                cached: true
              }));
            }
            let value = {
              addresses: address ? [address] : [options.host],
              servername: options.servername || options.host
            };
            dnsCache.set(options.host, {
              value,
              expires: Date.now() + (options.dnsTtl || DNS_TTL)
            });
            return callback(null, formatDNSValue(value, {
              cached: false
            }));
          });
        } catch (err3) {
          if (cached) {
            return callback(null, formatDNSValue(cached.value, {
              cached: true,
              error: err3
            }));
          }
          return callback(err3);
        }
      });
    });
  };
  exports.parseConnectionUrl = (str) => {
    str = str || "";
    let options = {};
    [urllib.parse(str, true)].forEach((url) => {
      let auth;
      switch (url.protocol) {
        case "smtp:":
          options.secure = false;
          break;
        case "smtps:":
          options.secure = true;
          break;
        case "direct:":
          options.direct = true;
          break;
      }
      if (!isNaN(url.port) && Number(url.port)) {
        options.port = Number(url.port);
      }
      if (url.hostname) {
        options.host = url.hostname;
      }
      if (url.auth) {
        auth = url.auth.split(":");
        if (!options.auth) {
          options.auth = {};
        }
        options.auth.user = auth.shift();
        options.auth.pass = auth.join(":");
      }
      Object.keys(url.query || {}).forEach((key) => {
        let obj = options;
        let lKey = key;
        let value = url.query[key];
        if (!isNaN(value)) {
          value = Number(value);
        }
        switch (value) {
          case "true":
            value = true;
            break;
          case "false":
            value = false;
            break;
        }
        if (key.indexOf("tls.") === 0) {
          lKey = key.substr(4);
          if (!options.tls) {
            options.tls = {};
          }
          obj = options.tls;
        } else if (key.indexOf(".") >= 0) {
          return;
        }
        if (!(lKey in obj)) {
          obj[lKey] = value;
        }
      });
    });
    return options;
  };
  exports._logFunc = (logger2, level, defaults, data, message, ...args) => {
    let entry = {};
    Object.keys(defaults || {}).forEach((key) => {
      if (key !== "level") {
        entry[key] = defaults[key];
      }
    });
    Object.keys(data || {}).forEach((key) => {
      if (key !== "level") {
        entry[key] = data[key];
      }
    });
    logger2[level](entry, message, ...args);
  };
  exports.getLogger = (options, defaults) => {
    options = options || {};
    let response = {};
    let levels = ["trace", "debug", "info", "warn", "error", "fatal"];
    if (!options.logger) {
      levels.forEach((level) => {
        response[level] = () => false;
      });
      return response;
    }
    let logger2 = options.logger;
    if (options.logger === true) {
      logger2 = createDefaultLogger(levels);
    }
    levels.forEach((level) => {
      response[level] = (data, message, ...args) => {
        exports._logFunc(logger2, level, defaults, data, message, ...args);
      };
    });
    return response;
  };
  exports.callbackPromise = (resolve, reject) => function() {
    let args = Array.from(arguments);
    let err = args.shift();
    if (err) {
      reject(err);
    } else {
      resolve(...args);
    }
  };
  exports.parseDataURI = (uri) => {
    let input = uri;
    let commaPos = input.indexOf(",");
    if (!commaPos) {
      return uri;
    }
    let data = input.substring(commaPos + 1);
    let metaStr = input.substring("data:".length, commaPos);
    let encoding;
    let metaEntries = metaStr.split(";");
    let lastMetaEntry = metaEntries.length > 1 ? metaEntries[metaEntries.length - 1] : false;
    if (lastMetaEntry && lastMetaEntry.indexOf("=") < 0) {
      encoding = lastMetaEntry.toLowerCase();
      metaEntries.pop();
    }
    let contentType = metaEntries.shift() || "application/octet-stream";
    let params = {};
    for (let entry of metaEntries) {
      let sep = entry.indexOf("=");
      if (sep >= 0) {
        let key = entry.substring(0, sep);
        let value = entry.substring(sep + 1);
        params[key] = value;
      }
    }
    switch (encoding) {
      case "base64":
        data = Buffer.from(data, "base64");
        break;
      case "utf8":
        data = Buffer.from(data);
        break;
      default:
        try {
          data = Buffer.from(decodeURIComponent(data));
        } catch (err) {
          data = Buffer.from(data);
        }
        data = Buffer.from(data);
    }
    return { data, encoding, contentType, params };
  };
  exports.resolveContent = (data, key, callback) => {
    let promise;
    if (!callback) {
      promise = new Promise((resolve, reject) => {
        callback = exports.callbackPromise(resolve, reject);
      });
    }
    let content = data && data[key] && data[key].content || data[key];
    let contentStream;
    let encoding = (typeof data[key] === "object" && data[key].encoding || "utf8").toString().toLowerCase().replace(/[-_\s]/g, "");
    if (!content) {
      return callback(null, content);
    }
    if (typeof content === "object") {
      if (typeof content.pipe === "function") {
        return resolveStream(content, (err, value) => {
          if (err) {
            return callback(err);
          }
          if (data[key].content) {
            data[key].content = value;
          } else {
            data[key] = value;
          }
          callback(null, value);
        });
      } else if (/^https?:\/\//i.test(content.path || content.href)) {
        contentStream = nmfetch(content.path || content.href);
        return resolveStream(contentStream, callback);
      } else if (/^data:/i.test(content.path || content.href)) {
        let parsedDataUri = exports.parseDataURI(content.path || content.href);
        if (!parsedDataUri || !parsedDataUri.data) {
          return callback(null, Buffer.from(0));
        }
        return callback(null, parsedDataUri.data);
      } else if (content.path) {
        return resolveStream(fs.createReadStream(content.path), callback);
      }
    }
    if (typeof data[key].content === "string" && !["utf8", "usascii", "ascii"].includes(encoding)) {
      content = Buffer.from(data[key].content, encoding);
    }
    setImmediate(() => callback(null, content));
    return promise;
  };
  exports.assign = function() {
    let args = Array.from(arguments);
    let target = args.shift() || {};
    args.forEach((source) => {
      Object.keys(source || {}).forEach((key) => {
        if (["tls", "auth"].includes(key) && source[key] && typeof source[key] === "object") {
          if (!target[key]) {
            target[key] = {};
          }
          Object.keys(source[key]).forEach((subKey) => {
            target[key][subKey] = source[key][subKey];
          });
        } else {
          target[key] = source[key];
        }
      });
    });
    return target;
  };
  exports.encodeXText = (str) => {
    if (!/[^\x21-\x2A\x2C-\x3C\x3E-\x7E]/.test(str)) {
      return str;
    }
    let buf = Buffer.from(str);
    let result = "";
    for (let i = 0, len = buf.length;i < len; i++) {
      let c = buf[i];
      if (c < 33 || c > 126 || c === 43 || c === 61) {
        result += "+" + (c < 16 ? "0" : "") + c.toString(16).toUpperCase();
      } else {
        result += String.fromCharCode(c);
      }
    }
    return result;
  };
  function resolveStream(stream, callback) {
    let responded = false;
    let chunks = [];
    let chunklen = 0;
    stream.on("error", (err) => {
      if (responded) {
        return;
      }
      responded = true;
      callback(err);
    });
    stream.on("readable", () => {
      let chunk;
      while ((chunk = stream.read()) !== null) {
        chunks.push(chunk);
        chunklen += chunk.length;
      }
    });
    stream.on("end", () => {
      if (responded) {
        return;
      }
      responded = true;
      let value;
      try {
        value = Buffer.concat(chunks, chunklen);
      } catch (E) {
        return callback(E);
      }
      callback(null, value);
    });
  }
  function createDefaultLogger(levels) {
    let levelMaxLen = 0;
    let levelNames = new Map;
    levels.forEach((level) => {
      if (level.length > levelMaxLen) {
        levelMaxLen = level.length;
      }
    });
    levels.forEach((level) => {
      let levelName = level.toUpperCase();
      if (levelName.length < levelMaxLen) {
        levelName += " ".repeat(levelMaxLen - levelName.length);
      }
      levelNames.set(level, levelName);
    });
    let print = (level, entry, message, ...args) => {
      let prefix = "";
      if (entry) {
        if (entry.tnx === "server") {
          prefix = "S: ";
        } else if (entry.tnx === "client") {
          prefix = "C: ";
        }
        if (entry.sid) {
          prefix = "[" + entry.sid + "] " + prefix;
        }
        if (entry.cid) {
          prefix = "[#" + entry.cid + "] " + prefix;
        }
      }
      message = util.format(message, ...args);
      message.split(/\r?\n/).forEach((line) => {
        console.log("[%s] %s %s", new Date().toISOString().substr(0, 19).replace(/T/, " "), levelNames.get(level), prefix + line);
      });
    };
    let logger2 = {};
    levels.forEach((level) => {
      logger2[level] = print.bind(null, level);
    });
    return logger2;
  }
});

// node_modules/nodemailer/lib/mime-funcs/mime-types.js
var require_mime_types = __commonJS((exports, module) => {
  var path = __require("node:path");
  var defaultMimeType = "application/octet-stream";
  var defaultExtension = "bin";
  var mimeTypes = new Map([
    ["application/acad", "dwg"],
    ["application/applixware", "aw"],
    ["application/arj", "arj"],
    ["application/atom+xml", "xml"],
    ["application/atomcat+xml", "atomcat"],
    ["application/atomsvc+xml", "atomsvc"],
    ["application/base64", ["mm", "mme"]],
    ["application/binhex", "hqx"],
    ["application/binhex4", "hqx"],
    ["application/book", ["book", "boo"]],
    ["application/ccxml+xml,", "ccxml"],
    ["application/cdf", "cdf"],
    ["application/cdmi-capability", "cdmia"],
    ["application/cdmi-container", "cdmic"],
    ["application/cdmi-domain", "cdmid"],
    ["application/cdmi-object", "cdmio"],
    ["application/cdmi-queue", "cdmiq"],
    ["application/clariscad", "ccad"],
    ["application/commonground", "dp"],
    ["application/cu-seeme", "cu"],
    ["application/davmount+xml", "davmount"],
    ["application/drafting", "drw"],
    ["application/dsptype", "tsp"],
    ["application/dssc+der", "dssc"],
    ["application/dssc+xml", "xdssc"],
    ["application/dxf", "dxf"],
    ["application/ecmascript", ["js", "es"]],
    ["application/emma+xml", "emma"],
    ["application/envoy", "evy"],
    ["application/epub+zip", "epub"],
    ["application/excel", ["xls", "xl", "xla", "xlb", "xlc", "xld", "xlk", "xll", "xlm", "xlt", "xlv", "xlw"]],
    ["application/exi", "exi"],
    ["application/font-tdpfr", "pfr"],
    ["application/fractals", "fif"],
    ["application/freeloader", "frl"],
    ["application/futuresplash", "spl"],
    ["application/geo+json", "geojson"],
    ["application/gnutar", "tgz"],
    ["application/groupwise", "vew"],
    ["application/hlp", "hlp"],
    ["application/hta", "hta"],
    ["application/hyperstudio", "stk"],
    ["application/i-deas", "unv"],
    ["application/iges", ["iges", "igs"]],
    ["application/inf", "inf"],
    ["application/internet-property-stream", "acx"],
    ["application/ipfix", "ipfix"],
    ["application/java", "class"],
    ["application/java-archive", "jar"],
    ["application/java-byte-code", "class"],
    ["application/java-serialized-object", "ser"],
    ["application/java-vm", "class"],
    ["application/javascript", "js"],
    ["application/json", "json"],
    ["application/lha", "lha"],
    ["application/lzx", "lzx"],
    ["application/mac-binary", "bin"],
    ["application/mac-binhex", "hqx"],
    ["application/mac-binhex40", "hqx"],
    ["application/mac-compactpro", "cpt"],
    ["application/macbinary", "bin"],
    ["application/mads+xml", "mads"],
    ["application/marc", "mrc"],
    ["application/marcxml+xml", "mrcx"],
    ["application/mathematica", "ma"],
    ["application/mathml+xml", "mathml"],
    ["application/mbedlet", "mbd"],
    ["application/mbox", "mbox"],
    ["application/mcad", "mcd"],
    ["application/mediaservercontrol+xml", "mscml"],
    ["application/metalink4+xml", "meta4"],
    ["application/mets+xml", "mets"],
    ["application/mime", "aps"],
    ["application/mods+xml", "mods"],
    ["application/mp21", "m21"],
    ["application/mp4", "mp4"],
    ["application/mspowerpoint", ["ppt", "pot", "pps", "ppz"]],
    ["application/msword", ["doc", "dot", "w6w", "wiz", "word"]],
    ["application/mswrite", "wri"],
    ["application/mxf", "mxf"],
    ["application/netmc", "mcp"],
    ["application/octet-stream", ["*"]],
    ["application/oda", "oda"],
    ["application/oebps-package+xml", "opf"],
    ["application/ogg", "ogx"],
    ["application/olescript", "axs"],
    ["application/onenote", "onetoc"],
    ["application/patch-ops-error+xml", "xer"],
    ["application/pdf", "pdf"],
    ["application/pgp-encrypted", "asc"],
    ["application/pgp-signature", "pgp"],
    ["application/pics-rules", "prf"],
    ["application/pkcs-12", "p12"],
    ["application/pkcs-crl", "crl"],
    ["application/pkcs10", "p10"],
    ["application/pkcs7-mime", ["p7c", "p7m"]],
    ["application/pkcs7-signature", "p7s"],
    ["application/pkcs8", "p8"],
    ["application/pkix-attr-cert", "ac"],
    ["application/pkix-cert", ["cer", "crt"]],
    ["application/pkix-crl", "crl"],
    ["application/pkix-pkipath", "pkipath"],
    ["application/pkixcmp", "pki"],
    ["application/plain", "text"],
    ["application/pls+xml", "pls"],
    ["application/postscript", ["ps", "ai", "eps"]],
    ["application/powerpoint", "ppt"],
    ["application/pro_eng", ["part", "prt"]],
    ["application/prs.cww", "cww"],
    ["application/pskc+xml", "pskcxml"],
    ["application/rdf+xml", "rdf"],
    ["application/reginfo+xml", "rif"],
    ["application/relax-ng-compact-syntax", "rnc"],
    ["application/resource-lists+xml", "rl"],
    ["application/resource-lists-diff+xml", "rld"],
    ["application/ringing-tones", "rng"],
    ["application/rls-services+xml", "rs"],
    ["application/rsd+xml", "rsd"],
    ["application/rss+xml", "xml"],
    ["application/rtf", ["rtf", "rtx"]],
    ["application/sbml+xml", "sbml"],
    ["application/scvp-cv-request", "scq"],
    ["application/scvp-cv-response", "scs"],
    ["application/scvp-vp-request", "spq"],
    ["application/scvp-vp-response", "spp"],
    ["application/sdp", "sdp"],
    ["application/sea", "sea"],
    ["application/set", "set"],
    ["application/set-payment-initiation", "setpay"],
    ["application/set-registration-initiation", "setreg"],
    ["application/shf+xml", "shf"],
    ["application/sla", "stl"],
    ["application/smil", ["smi", "smil"]],
    ["application/smil+xml", "smi"],
    ["application/solids", "sol"],
    ["application/sounder", "sdr"],
    ["application/sparql-query", "rq"],
    ["application/sparql-results+xml", "srx"],
    ["application/srgs", "gram"],
    ["application/srgs+xml", "grxml"],
    ["application/sru+xml", "sru"],
    ["application/ssml+xml", "ssml"],
    ["application/step", ["step", "stp"]],
    ["application/streamingmedia", "ssm"],
    ["application/tei+xml", "tei"],
    ["application/thraud+xml", "tfi"],
    ["application/timestamped-data", "tsd"],
    ["application/toolbook", "tbk"],
    ["application/vda", "vda"],
    ["application/vnd.3gpp.pic-bw-large", "plb"],
    ["application/vnd.3gpp.pic-bw-small", "psb"],
    ["application/vnd.3gpp.pic-bw-var", "pvb"],
    ["application/vnd.3gpp2.tcap", "tcap"],
    ["application/vnd.3m.post-it-notes", "pwn"],
    ["application/vnd.accpac.simply.aso", "aso"],
    ["application/vnd.accpac.simply.imp", "imp"],
    ["application/vnd.acucobol", "acu"],
    ["application/vnd.acucorp", "atc"],
    ["application/vnd.adobe.air-application-installer-package+zip", "air"],
    ["application/vnd.adobe.fxp", "fxp"],
    ["application/vnd.adobe.xdp+xml", "xdp"],
    ["application/vnd.adobe.xfdf", "xfdf"],
    ["application/vnd.ahead.space", "ahead"],
    ["application/vnd.airzip.filesecure.azf", "azf"],
    ["application/vnd.airzip.filesecure.azs", "azs"],
    ["application/vnd.amazon.ebook", "azw"],
    ["application/vnd.americandynamics.acc", "acc"],
    ["application/vnd.amiga.ami", "ami"],
    ["application/vnd.android.package-archive", "apk"],
    ["application/vnd.anser-web-certificate-issue-initiation", "cii"],
    ["application/vnd.anser-web-funds-transfer-initiation", "fti"],
    ["application/vnd.antix.game-component", "atx"],
    ["application/vnd.apple.installer+xml", "mpkg"],
    ["application/vnd.apple.mpegurl", "m3u8"],
    ["application/vnd.aristanetworks.swi", "swi"],
    ["application/vnd.audiograph", "aep"],
    ["application/vnd.blueice.multipass", "mpm"],
    ["application/vnd.bmi", "bmi"],
    ["application/vnd.businessobjects", "rep"],
    ["application/vnd.chemdraw+xml", "cdxml"],
    ["application/vnd.chipnuts.karaoke-mmd", "mmd"],
    ["application/vnd.cinderella", "cdy"],
    ["application/vnd.claymore", "cla"],
    ["application/vnd.cloanto.rp9", "rp9"],
    ["application/vnd.clonk.c4group", "c4g"],
    ["application/vnd.cluetrust.cartomobile-config", "c11amc"],
    ["application/vnd.cluetrust.cartomobile-config-pkg", "c11amz"],
    ["application/vnd.commonspace", "csp"],
    ["application/vnd.contact.cmsg", "cdbcmsg"],
    ["application/vnd.cosmocaller", "cmc"],
    ["application/vnd.crick.clicker", "clkx"],
    ["application/vnd.crick.clicker.keyboard", "clkk"],
    ["application/vnd.crick.clicker.palette", "clkp"],
    ["application/vnd.crick.clicker.template", "clkt"],
    ["application/vnd.crick.clicker.wordbank", "clkw"],
    ["application/vnd.criticaltools.wbs+xml", "wbs"],
    ["application/vnd.ctc-posml", "pml"],
    ["application/vnd.cups-ppd", "ppd"],
    ["application/vnd.curl.car", "car"],
    ["application/vnd.curl.pcurl", "pcurl"],
    ["application/vnd.data-vision.rdz", "rdz"],
    ["application/vnd.denovo.fcselayout-link", "fe_launch"],
    ["application/vnd.dna", "dna"],
    ["application/vnd.dolby.mlp", "mlp"],
    ["application/vnd.dpgraph", "dpg"],
    ["application/vnd.dreamfactory", "dfac"],
    ["application/vnd.dvb.ait", "ait"],
    ["application/vnd.dvb.service", "svc"],
    ["application/vnd.dynageo", "geo"],
    ["application/vnd.ecowin.chart", "mag"],
    ["application/vnd.enliven", "nml"],
    ["application/vnd.epson.esf", "esf"],
    ["application/vnd.epson.msf", "msf"],
    ["application/vnd.epson.quickanime", "qam"],
    ["application/vnd.epson.salt", "slt"],
    ["application/vnd.epson.ssf", "ssf"],
    ["application/vnd.eszigno3+xml", "es3"],
    ["application/vnd.ezpix-album", "ez2"],
    ["application/vnd.ezpix-package", "ez3"],
    ["application/vnd.fdf", "fdf"],
    ["application/vnd.fdsn.seed", "seed"],
    ["application/vnd.flographit", "gph"],
    ["application/vnd.fluxtime.clip", "ftc"],
    ["application/vnd.framemaker", "fm"],
    ["application/vnd.frogans.fnc", "fnc"],
    ["application/vnd.frogans.ltf", "ltf"],
    ["application/vnd.fsc.weblaunch", "fsc"],
    ["application/vnd.fujitsu.oasys", "oas"],
    ["application/vnd.fujitsu.oasys2", "oa2"],
    ["application/vnd.fujitsu.oasys3", "oa3"],
    ["application/vnd.fujitsu.oasysgp", "fg5"],
    ["application/vnd.fujitsu.oasysprs", "bh2"],
    ["application/vnd.fujixerox.ddd", "ddd"],
    ["application/vnd.fujixerox.docuworks", "xdw"],
    ["application/vnd.fujixerox.docuworks.binder", "xbd"],
    ["application/vnd.fuzzysheet", "fzs"],
    ["application/vnd.genomatix.tuxedo", "txd"],
    ["application/vnd.geogebra.file", "ggb"],
    ["application/vnd.geogebra.tool", "ggt"],
    ["application/vnd.geometry-explorer", "gex"],
    ["application/vnd.geonext", "gxt"],
    ["application/vnd.geoplan", "g2w"],
    ["application/vnd.geospace", "g3w"],
    ["application/vnd.gmx", "gmx"],
    ["application/vnd.google-earth.kml+xml", "kml"],
    ["application/vnd.google-earth.kmz", "kmz"],
    ["application/vnd.grafeq", "gqf"],
    ["application/vnd.groove-account", "gac"],
    ["application/vnd.groove-help", "ghf"],
    ["application/vnd.groove-identity-message", "gim"],
    ["application/vnd.groove-injector", "grv"],
    ["application/vnd.groove-tool-message", "gtm"],
    ["application/vnd.groove-tool-template", "tpl"],
    ["application/vnd.groove-vcard", "vcg"],
    ["application/vnd.hal+xml", "hal"],
    ["application/vnd.handheld-entertainment+xml", "zmm"],
    ["application/vnd.hbci", "hbci"],
    ["application/vnd.hhe.lesson-player", "les"],
    ["application/vnd.hp-hpgl", ["hgl", "hpg", "hpgl"]],
    ["application/vnd.hp-hpid", "hpid"],
    ["application/vnd.hp-hps", "hps"],
    ["application/vnd.hp-jlyt", "jlt"],
    ["application/vnd.hp-pcl", "pcl"],
    ["application/vnd.hp-pclxl", "pclxl"],
    ["application/vnd.hydrostatix.sof-data", "sfd-hdstx"],
    ["application/vnd.hzn-3d-crossword", "x3d"],
    ["application/vnd.ibm.minipay", "mpy"],
    ["application/vnd.ibm.modcap", "afp"],
    ["application/vnd.ibm.rights-management", "irm"],
    ["application/vnd.ibm.secure-container", "sc"],
    ["application/vnd.iccprofile", "icc"],
    ["application/vnd.igloader", "igl"],
    ["application/vnd.immervision-ivp", "ivp"],
    ["application/vnd.immervision-ivu", "ivu"],
    ["application/vnd.insors.igm", "igm"],
    ["application/vnd.intercon.formnet", "xpw"],
    ["application/vnd.intergeo", "i2g"],
    ["application/vnd.intu.qbo", "qbo"],
    ["application/vnd.intu.qfx", "qfx"],
    ["application/vnd.ipunplugged.rcprofile", "rcprofile"],
    ["application/vnd.irepository.package+xml", "irp"],
    ["application/vnd.is-xpr", "xpr"],
    ["application/vnd.isac.fcs", "fcs"],
    ["application/vnd.jam", "jam"],
    ["application/vnd.jcp.javame.midlet-rms", "rms"],
    ["application/vnd.jisp", "jisp"],
    ["application/vnd.joost.joda-archive", "joda"],
    ["application/vnd.kahootz", "ktz"],
    ["application/vnd.kde.karbon", "karbon"],
    ["application/vnd.kde.kchart", "chrt"],
    ["application/vnd.kde.kformula", "kfo"],
    ["application/vnd.kde.kivio", "flw"],
    ["application/vnd.kde.kontour", "kon"],
    ["application/vnd.kde.kpresenter", "kpr"],
    ["application/vnd.kde.kspread", "ksp"],
    ["application/vnd.kde.kword", "kwd"],
    ["application/vnd.kenameaapp", "htke"],
    ["application/vnd.kidspiration", "kia"],
    ["application/vnd.kinar", "kne"],
    ["application/vnd.koan", "skp"],
    ["application/vnd.kodak-descriptor", "sse"],
    ["application/vnd.las.las+xml", "lasxml"],
    ["application/vnd.llamagraphics.life-balance.desktop", "lbd"],
    ["application/vnd.llamagraphics.life-balance.exchange+xml", "lbe"],
    ["application/vnd.lotus-1-2-3", "123"],
    ["application/vnd.lotus-approach", "apr"],
    ["application/vnd.lotus-freelance", "pre"],
    ["application/vnd.lotus-notes", "nsf"],
    ["application/vnd.lotus-organizer", "org"],
    ["application/vnd.lotus-screencam", "scm"],
    ["application/vnd.lotus-wordpro", "lwp"],
    ["application/vnd.macports.portpkg", "portpkg"],
    ["application/vnd.mcd", "mcd"],
    ["application/vnd.medcalcdata", "mc1"],
    ["application/vnd.mediastation.cdkey", "cdkey"],
    ["application/vnd.mfer", "mwf"],
    ["application/vnd.mfmp", "mfm"],
    ["application/vnd.micrografx.flo", "flo"],
    ["application/vnd.micrografx.igx", "igx"],
    ["application/vnd.mif", "mif"],
    ["application/vnd.mobius.daf", "daf"],
    ["application/vnd.mobius.dis", "dis"],
    ["application/vnd.mobius.mbk", "mbk"],
    ["application/vnd.mobius.mqy", "mqy"],
    ["application/vnd.mobius.msl", "msl"],
    ["application/vnd.mobius.plc", "plc"],
    ["application/vnd.mobius.txf", "txf"],
    ["application/vnd.mophun.application", "mpn"],
    ["application/vnd.mophun.certificate", "mpc"],
    ["application/vnd.mozilla.xul+xml", "xul"],
    ["application/vnd.ms-artgalry", "cil"],
    ["application/vnd.ms-cab-compressed", "cab"],
    ["application/vnd.ms-excel", ["xls", "xla", "xlc", "xlm", "xlt", "xlw", "xlb", "xll"]],
    ["application/vnd.ms-excel.addin.macroenabled.12", "xlam"],
    ["application/vnd.ms-excel.sheet.binary.macroenabled.12", "xlsb"],
    ["application/vnd.ms-excel.sheet.macroenabled.12", "xlsm"],
    ["application/vnd.ms-excel.template.macroenabled.12", "xltm"],
    ["application/vnd.ms-fontobject", "eot"],
    ["application/vnd.ms-htmlhelp", "chm"],
    ["application/vnd.ms-ims", "ims"],
    ["application/vnd.ms-lrm", "lrm"],
    ["application/vnd.ms-officetheme", "thmx"],
    ["application/vnd.ms-outlook", "msg"],
    ["application/vnd.ms-pki.certstore", "sst"],
    ["application/vnd.ms-pki.pko", "pko"],
    ["application/vnd.ms-pki.seccat", "cat"],
    ["application/vnd.ms-pki.stl", "stl"],
    ["application/vnd.ms-pkicertstore", "sst"],
    ["application/vnd.ms-pkiseccat", "cat"],
    ["application/vnd.ms-pkistl", "stl"],
    ["application/vnd.ms-powerpoint", ["ppt", "pot", "pps", "ppa", "pwz"]],
    ["application/vnd.ms-powerpoint.addin.macroenabled.12", "ppam"],
    ["application/vnd.ms-powerpoint.presentation.macroenabled.12", "pptm"],
    ["application/vnd.ms-powerpoint.slide.macroenabled.12", "sldm"],
    ["application/vnd.ms-powerpoint.slideshow.macroenabled.12", "ppsm"],
    ["application/vnd.ms-powerpoint.template.macroenabled.12", "potm"],
    ["application/vnd.ms-project", "mpp"],
    ["application/vnd.ms-word.document.macroenabled.12", "docm"],
    ["application/vnd.ms-word.template.macroenabled.12", "dotm"],
    ["application/vnd.ms-works", ["wks", "wcm", "wdb", "wps"]],
    ["application/vnd.ms-wpl", "wpl"],
    ["application/vnd.ms-xpsdocument", "xps"],
    ["application/vnd.mseq", "mseq"],
    ["application/vnd.musician", "mus"],
    ["application/vnd.muvee.style", "msty"],
    ["application/vnd.neurolanguage.nlu", "nlu"],
    ["application/vnd.noblenet-directory", "nnd"],
    ["application/vnd.noblenet-sealer", "nns"],
    ["application/vnd.noblenet-web", "nnw"],
    ["application/vnd.nokia.configuration-message", "ncm"],
    ["application/vnd.nokia.n-gage.data", "ngdat"],
    ["application/vnd.nokia.n-gage.symbian.install", "n-gage"],
    ["application/vnd.nokia.radio-preset", "rpst"],
    ["application/vnd.nokia.radio-presets", "rpss"],
    ["application/vnd.nokia.ringing-tone", "rng"],
    ["application/vnd.novadigm.edm", "edm"],
    ["application/vnd.novadigm.edx", "edx"],
    ["application/vnd.novadigm.ext", "ext"],
    ["application/vnd.oasis.opendocument.chart", "odc"],
    ["application/vnd.oasis.opendocument.chart-template", "otc"],
    ["application/vnd.oasis.opendocument.database", "odb"],
    ["application/vnd.oasis.opendocument.formula", "odf"],
    ["application/vnd.oasis.opendocument.formula-template", "odft"],
    ["application/vnd.oasis.opendocument.graphics", "odg"],
    ["application/vnd.oasis.opendocument.graphics-template", "otg"],
    ["application/vnd.oasis.opendocument.image", "odi"],
    ["application/vnd.oasis.opendocument.image-template", "oti"],
    ["application/vnd.oasis.opendocument.presentation", "odp"],
    ["application/vnd.oasis.opendocument.presentation-template", "otp"],
    ["application/vnd.oasis.opendocument.spreadsheet", "ods"],
    ["application/vnd.oasis.opendocument.spreadsheet-template", "ots"],
    ["application/vnd.oasis.opendocument.text", "odt"],
    ["application/vnd.oasis.opendocument.text-master", "odm"],
    ["application/vnd.oasis.opendocument.text-template", "ott"],
    ["application/vnd.oasis.opendocument.text-web", "oth"],
    ["application/vnd.olpc-sugar", "xo"],
    ["application/vnd.oma.dd2+xml", "dd2"],
    ["application/vnd.openofficeorg.extension", "oxt"],
    ["application/vnd.openxmlformats-officedocument.presentationml.presentation", "pptx"],
    ["application/vnd.openxmlformats-officedocument.presentationml.slide", "sldx"],
    ["application/vnd.openxmlformats-officedocument.presentationml.slideshow", "ppsx"],
    ["application/vnd.openxmlformats-officedocument.presentationml.template", "potx"],
    ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "xlsx"],
    ["application/vnd.openxmlformats-officedocument.spreadsheetml.template", "xltx"],
    ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "docx"],
    ["application/vnd.openxmlformats-officedocument.wordprocessingml.template", "dotx"],
    ["application/vnd.osgeo.mapguide.package", "mgp"],
    ["application/vnd.osgi.dp", "dp"],
    ["application/vnd.palm", "pdb"],
    ["application/vnd.pawaafile", "paw"],
    ["application/vnd.pg.format", "str"],
    ["application/vnd.pg.osasli", "ei6"],
    ["application/vnd.picsel", "efif"],
    ["application/vnd.pmi.widget", "wg"],
    ["application/vnd.pocketlearn", "plf"],
    ["application/vnd.powerbuilder6", "pbd"],
    ["application/vnd.previewsystems.box", "box"],
    ["application/vnd.proteus.magazine", "mgz"],
    ["application/vnd.publishare-delta-tree", "qps"],
    ["application/vnd.pvi.ptid1", "ptid"],
    ["application/vnd.quark.quarkxpress", "qxd"],
    ["application/vnd.realvnc.bed", "bed"],
    ["application/vnd.recordare.musicxml", "mxl"],
    ["application/vnd.recordare.musicxml+xml", "musicxml"],
    ["application/vnd.rig.cryptonote", "cryptonote"],
    ["application/vnd.rim.cod", "cod"],
    ["application/vnd.rn-realmedia", "rm"],
    ["application/vnd.rn-realplayer", "rnx"],
    ["application/vnd.route66.link66+xml", "link66"],
    ["application/vnd.sailingtracker.track", "st"],
    ["application/vnd.seemail", "see"],
    ["application/vnd.sema", "sema"],
    ["application/vnd.semd", "semd"],
    ["application/vnd.semf", "semf"],
    ["application/vnd.shana.informed.formdata", "ifm"],
    ["application/vnd.shana.informed.formtemplate", "itp"],
    ["application/vnd.shana.informed.interchange", "iif"],
    ["application/vnd.shana.informed.package", "ipk"],
    ["application/vnd.simtech-mindmapper", "twd"],
    ["application/vnd.smaf", "mmf"],
    ["application/vnd.smart.teacher", "teacher"],
    ["application/vnd.solent.sdkm+xml", "sdkm"],
    ["application/vnd.spotfire.dxp", "dxp"],
    ["application/vnd.spotfire.sfs", "sfs"],
    ["application/vnd.stardivision.calc", "sdc"],
    ["application/vnd.stardivision.draw", "sda"],
    ["application/vnd.stardivision.impress", "sdd"],
    ["application/vnd.stardivision.math", "smf"],
    ["application/vnd.stardivision.writer", "sdw"],
    ["application/vnd.stardivision.writer-global", "sgl"],
    ["application/vnd.stepmania.stepchart", "sm"],
    ["application/vnd.sun.xml.calc", "sxc"],
    ["application/vnd.sun.xml.calc.template", "stc"],
    ["application/vnd.sun.xml.draw", "sxd"],
    ["application/vnd.sun.xml.draw.template", "std"],
    ["application/vnd.sun.xml.impress", "sxi"],
    ["application/vnd.sun.xml.impress.template", "sti"],
    ["application/vnd.sun.xml.math", "sxm"],
    ["application/vnd.sun.xml.writer", "sxw"],
    ["application/vnd.sun.xml.writer.global", "sxg"],
    ["application/vnd.sun.xml.writer.template", "stw"],
    ["application/vnd.sus-calendar", "sus"],
    ["application/vnd.svd", "svd"],
    ["application/vnd.symbian.install", "sis"],
    ["application/vnd.syncml+xml", "xsm"],
    ["application/vnd.syncml.dm+wbxml", "bdm"],
    ["application/vnd.syncml.dm+xml", "xdm"],
    ["application/vnd.tao.intent-module-archive", "tao"],
    ["application/vnd.tmobile-livetv", "tmo"],
    ["application/vnd.trid.tpt", "tpt"],
    ["application/vnd.triscape.mxs", "mxs"],
    ["application/vnd.trueapp", "tra"],
    ["application/vnd.ufdl", "ufd"],
    ["application/vnd.uiq.theme", "utz"],
    ["application/vnd.umajin", "umj"],
    ["application/vnd.unity", "unityweb"],
    ["application/vnd.uoml+xml", "uoml"],
    ["application/vnd.vcx", "vcx"],
    ["application/vnd.visio", "vsd"],
    ["application/vnd.visionary", "vis"],
    ["application/vnd.vsf", "vsf"],
    ["application/vnd.wap.wbxml", "wbxml"],
    ["application/vnd.wap.wmlc", "wmlc"],
    ["application/vnd.wap.wmlscriptc", "wmlsc"],
    ["application/vnd.webturbo", "wtb"],
    ["application/vnd.wolfram.player", "nbp"],
    ["application/vnd.wordperfect", "wpd"],
    ["application/vnd.wqd", "wqd"],
    ["application/vnd.wt.stf", "stf"],
    ["application/vnd.xara", ["web", "xar"]],
    ["application/vnd.xfdl", "xfdl"],
    ["application/vnd.yamaha.hv-dic", "hvd"],
    ["application/vnd.yamaha.hv-script", "hvs"],
    ["application/vnd.yamaha.hv-voice", "hvp"],
    ["application/vnd.yamaha.openscoreformat", "osf"],
    ["application/vnd.yamaha.openscoreformat.osfpvg+xml", "osfpvg"],
    ["application/vnd.yamaha.smaf-audio", "saf"],
    ["application/vnd.yamaha.smaf-phrase", "spf"],
    ["application/vnd.yellowriver-custom-menu", "cmp"],
    ["application/vnd.zul", "zir"],
    ["application/vnd.zzazz.deck+xml", "zaz"],
    ["application/vocaltec-media-desc", "vmd"],
    ["application/vocaltec-media-file", "vmf"],
    ["application/voicexml+xml", "vxml"],
    ["application/widget", "wgt"],
    ["application/winhlp", "hlp"],
    ["application/wordperfect", ["wp", "wp5", "wp6", "wpd"]],
    ["application/wordperfect6.0", ["w60", "wp5"]],
    ["application/wordperfect6.1", "w61"],
    ["application/wsdl+xml", "wsdl"],
    ["application/wspolicy+xml", "wspolicy"],
    ["application/x-123", "wk1"],
    ["application/x-7z-compressed", "7z"],
    ["application/x-abiword", "abw"],
    ["application/x-ace-compressed", "ace"],
    ["application/x-aim", "aim"],
    ["application/x-authorware-bin", "aab"],
    ["application/x-authorware-map", "aam"],
    ["application/x-authorware-seg", "aas"],
    ["application/x-bcpio", "bcpio"],
    ["application/x-binary", "bin"],
    ["application/x-binhex40", "hqx"],
    ["application/x-bittorrent", "torrent"],
    ["application/x-bsh", ["bsh", "sh", "shar"]],
    ["application/x-bytecode.elisp", "elc"],
    ["application/x-bytecode.python", "pyc"],
    ["application/x-bzip", "bz"],
    ["application/x-bzip2", ["boz", "bz2"]],
    ["application/x-cdf", "cdf"],
    ["application/x-cdlink", "vcd"],
    ["application/x-chat", ["cha", "chat"]],
    ["application/x-chess-pgn", "pgn"],
    ["application/x-cmu-raster", "ras"],
    ["application/x-cocoa", "cco"],
    ["application/x-compactpro", "cpt"],
    ["application/x-compress", "z"],
    ["application/x-compressed", ["tgz", "gz", "z", "zip"]],
    ["application/x-conference", "nsc"],
    ["application/x-cpio", "cpio"],
    ["application/x-cpt", "cpt"],
    ["application/x-csh", "csh"],
    ["application/x-debian-package", "deb"],
    ["application/x-deepv", "deepv"],
    ["application/x-director", ["dir", "dcr", "dxr"]],
    ["application/x-doom", "wad"],
    ["application/x-dtbncx+xml", "ncx"],
    ["application/x-dtbook+xml", "dtb"],
    ["application/x-dtbresource+xml", "res"],
    ["application/x-dvi", "dvi"],
    ["application/x-elc", "elc"],
    ["application/x-envoy", ["env", "evy"]],
    ["application/x-esrehber", "es"],
    ["application/x-excel", ["xls", "xla", "xlb", "xlc", "xld", "xlk", "xll", "xlm", "xlt", "xlv", "xlw"]],
    ["application/x-font-bdf", "bdf"],
    ["application/x-font-ghostscript", "gsf"],
    ["application/x-font-linux-psf", "psf"],
    ["application/x-font-otf", "otf"],
    ["application/x-font-pcf", "pcf"],
    ["application/x-font-snf", "snf"],
    ["application/x-font-ttf", "ttf"],
    ["application/x-font-type1", "pfa"],
    ["application/x-font-woff", "woff"],
    ["application/x-frame", "mif"],
    ["application/x-freelance", "pre"],
    ["application/x-futuresplash", "spl"],
    ["application/x-gnumeric", "gnumeric"],
    ["application/x-gsp", "gsp"],
    ["application/x-gss", "gss"],
    ["application/x-gtar", "gtar"],
    ["application/x-gzip", ["gz", "gzip"]],
    ["application/x-hdf", "hdf"],
    ["application/x-helpfile", ["help", "hlp"]],
    ["application/x-httpd-imap", "imap"],
    ["application/x-ima", "ima"],
    ["application/x-internet-signup", ["ins", "isp"]],
    ["application/x-internett-signup", "ins"],
    ["application/x-inventor", "iv"],
    ["application/x-ip2", "ip"],
    ["application/x-iphone", "iii"],
    ["application/x-java-class", "class"],
    ["application/x-java-commerce", "jcm"],
    ["application/x-java-jnlp-file", "jnlp"],
    ["application/x-javascript", "js"],
    ["application/x-koan", ["skd", "skm", "skp", "skt"]],
    ["application/x-ksh", "ksh"],
    ["application/x-latex", ["latex", "ltx"]],
    ["application/x-lha", "lha"],
    ["application/x-lisp", "lsp"],
    ["application/x-livescreen", "ivy"],
    ["application/x-lotus", "wq1"],
    ["application/x-lotusscreencam", "scm"],
    ["application/x-lzh", "lzh"],
    ["application/x-lzx", "lzx"],
    ["application/x-mac-binhex40", "hqx"],
    ["application/x-macbinary", "bin"],
    ["application/x-magic-cap-package-1.0", "mc$"],
    ["application/x-mathcad", "mcd"],
    ["application/x-meme", "mm"],
    ["application/x-midi", ["mid", "midi"]],
    ["application/x-mif", "mif"],
    ["application/x-mix-transfer", "nix"],
    ["application/x-mobipocket-ebook", "prc"],
    ["application/x-mplayer2", "asx"],
    ["application/x-ms-application", "application"],
    ["application/x-ms-wmd", "wmd"],
    ["application/x-ms-wmz", "wmz"],
    ["application/x-ms-xbap", "xbap"],
    ["application/x-msaccess", "mdb"],
    ["application/x-msbinder", "obd"],
    ["application/x-mscardfile", "crd"],
    ["application/x-msclip", "clp"],
    ["application/x-msdownload", ["exe", "dll"]],
    ["application/x-msexcel", ["xls", "xla", "xlw"]],
    ["application/x-msmediaview", ["mvb", "m13", "m14"]],
    ["application/x-msmetafile", "wmf"],
    ["application/x-msmoney", "mny"],
    ["application/x-mspowerpoint", "ppt"],
    ["application/x-mspublisher", "pub"],
    ["application/x-msschedule", "scd"],
    ["application/x-msterminal", "trm"],
    ["application/x-mswrite", "wri"],
    ["application/x-navi-animation", "ani"],
    ["application/x-navidoc", "nvd"],
    ["application/x-navimap", "map"],
    ["application/x-navistyle", "stl"],
    ["application/x-netcdf", ["cdf", "nc"]],
    ["application/x-newton-compatible-pkg", "pkg"],
    ["application/x-nokia-9000-communicator-add-on-software", "aos"],
    ["application/x-omc", "omc"],
    ["application/x-omcdatamaker", "omcd"],
    ["application/x-omcregerator", "omcr"],
    ["application/x-pagemaker", ["pm4", "pm5"]],
    ["application/x-pcl", "pcl"],
    ["application/x-perfmon", ["pma", "pmc", "pml", "pmr", "pmw"]],
    ["application/x-pixclscript", "plx"],
    ["application/x-pkcs10", "p10"],
    ["application/x-pkcs12", ["p12", "pfx"]],
    ["application/x-pkcs7-certificates", ["p7b", "spc"]],
    ["application/x-pkcs7-certreqresp", "p7r"],
    ["application/x-pkcs7-mime", ["p7m", "p7c"]],
    ["application/x-pkcs7-signature", ["p7s", "p7a"]],
    ["application/x-pointplus", "css"],
    ["application/x-portable-anymap", "pnm"],
    ["application/x-project", ["mpc", "mpt", "mpv", "mpx"]],
    ["application/x-qpro", "wb1"],
    ["application/x-rar-compressed", "rar"],
    ["application/x-rtf", "rtf"],
    ["application/x-sdp", "sdp"],
    ["application/x-sea", "sea"],
    ["application/x-seelogo", "sl"],
    ["application/x-sh", "sh"],
    ["application/x-shar", ["shar", "sh"]],
    ["application/x-shockwave-flash", "swf"],
    ["application/x-silverlight-app", "xap"],
    ["application/x-sit", "sit"],
    ["application/x-sprite", ["spr", "sprite"]],
    ["application/x-stuffit", "sit"],
    ["application/x-stuffitx", "sitx"],
    ["application/x-sv4cpio", "sv4cpio"],
    ["application/x-sv4crc", "sv4crc"],
    ["application/x-tar", "tar"],
    ["application/x-tbook", ["sbk", "tbk"]],
    ["application/x-tcl", "tcl"],
    ["application/x-tex", "tex"],
    ["application/x-tex-tfm", "tfm"],
    ["application/x-texinfo", ["texi", "texinfo"]],
    ["application/x-troff", ["roff", "t", "tr"]],
    ["application/x-troff-man", "man"],
    ["application/x-troff-me", "me"],
    ["application/x-troff-ms", "ms"],
    ["application/x-troff-msvideo", "avi"],
    ["application/x-ustar", "ustar"],
    ["application/x-visio", ["vsd", "vst", "vsw"]],
    ["application/x-vnd.audioexplosion.mzz", "mzz"],
    ["application/x-vnd.ls-xpix", "xpix"],
    ["application/x-vrml", "vrml"],
    ["application/x-wais-source", ["src", "wsrc"]],
    ["application/x-winhelp", "hlp"],
    ["application/x-wintalk", "wtk"],
    ["application/x-world", ["wrl", "svr"]],
    ["application/x-wpwin", "wpd"],
    ["application/x-wri", "wri"],
    ["application/x-x509-ca-cert", ["cer", "crt", "der"]],
    ["application/x-x509-user-cert", "crt"],
    ["application/x-xfig", "fig"],
    ["application/x-xpinstall", "xpi"],
    ["application/x-zip-compressed", "zip"],
    ["application/xcap-diff+xml", "xdf"],
    ["application/xenc+xml", "xenc"],
    ["application/xhtml+xml", "xhtml"],
    ["application/xml", "xml"],
    ["application/xml-dtd", "dtd"],
    ["application/xop+xml", "xop"],
    ["application/xslt+xml", "xslt"],
    ["application/xspf+xml", "xspf"],
    ["application/xv+xml", "mxml"],
    ["application/yang", "yang"],
    ["application/yin+xml", "yin"],
    ["application/ynd.ms-pkipko", "pko"],
    ["application/zip", "zip"],
    ["audio/adpcm", "adp"],
    ["audio/aiff", ["aiff", "aif", "aifc"]],
    ["audio/basic", ["snd", "au"]],
    ["audio/it", "it"],
    ["audio/make", ["funk", "my", "pfunk"]],
    ["audio/make.my.funk", "pfunk"],
    ["audio/mid", ["mid", "rmi"]],
    ["audio/midi", ["midi", "kar", "mid"]],
    ["audio/mod", "mod"],
    ["audio/mp4", "mp4a"],
    ["audio/mpeg", ["mpga", "mp3", "m2a", "mp2", "mpa", "mpg"]],
    ["audio/mpeg3", "mp3"],
    ["audio/nspaudio", ["la", "lma"]],
    ["audio/ogg", "oga"],
    ["audio/s3m", "s3m"],
    ["audio/tsp-audio", "tsi"],
    ["audio/tsplayer", "tsp"],
    ["audio/vnd.dece.audio", "uva"],
    ["audio/vnd.digital-winds", "eol"],
    ["audio/vnd.dra", "dra"],
    ["audio/vnd.dts", "dts"],
    ["audio/vnd.dts.hd", "dtshd"],
    ["audio/vnd.lucent.voice", "lvp"],
    ["audio/vnd.ms-playready.media.pya", "pya"],
    ["audio/vnd.nuera.ecelp4800", "ecelp4800"],
    ["audio/vnd.nuera.ecelp7470", "ecelp7470"],
    ["audio/vnd.nuera.ecelp9600", "ecelp9600"],
    ["audio/vnd.qcelp", "qcp"],
    ["audio/vnd.rip", "rip"],
    ["audio/voc", "voc"],
    ["audio/voxware", "vox"],
    ["audio/wav", "wav"],
    ["audio/webm", "weba"],
    ["audio/x-aac", "aac"],
    ["audio/x-adpcm", "snd"],
    ["audio/x-aiff", ["aiff", "aif", "aifc"]],
    ["audio/x-au", "au"],
    ["audio/x-gsm", ["gsd", "gsm"]],
    ["audio/x-jam", "jam"],
    ["audio/x-liveaudio", "lam"],
    ["audio/x-mid", ["mid", "midi"]],
    ["audio/x-midi", ["midi", "mid"]],
    ["audio/x-mod", "mod"],
    ["audio/x-mpeg", "mp2"],
    ["audio/x-mpeg-3", "mp3"],
    ["audio/x-mpegurl", "m3u"],
    ["audio/x-mpequrl", "m3u"],
    ["audio/x-ms-wax", "wax"],
    ["audio/x-ms-wma", "wma"],
    ["audio/x-nspaudio", ["la", "lma"]],
    ["audio/x-pn-realaudio", ["ra", "ram", "rm", "rmm", "rmp"]],
    ["audio/x-pn-realaudio-plugin", ["ra", "rmp", "rpm"]],
    ["audio/x-psid", "sid"],
    ["audio/x-realaudio", "ra"],
    ["audio/x-twinvq", "vqf"],
    ["audio/x-twinvq-plugin", ["vqe", "vql"]],
    ["audio/x-vnd.audioexplosion.mjuicemediafile", "mjf"],
    ["audio/x-voc", "voc"],
    ["audio/x-wav", "wav"],
    ["audio/xm", "xm"],
    ["chemical/x-cdx", "cdx"],
    ["chemical/x-cif", "cif"],
    ["chemical/x-cmdf", "cmdf"],
    ["chemical/x-cml", "cml"],
    ["chemical/x-csml", "csml"],
    ["chemical/x-pdb", ["pdb", "xyz"]],
    ["chemical/x-xyz", "xyz"],
    ["drawing/x-dwf", "dwf"],
    ["i-world/i-vrml", "ivr"],
    ["image/bmp", ["bmp", "bm"]],
    ["image/cgm", "cgm"],
    ["image/cis-cod", "cod"],
    ["image/cmu-raster", ["ras", "rast"]],
    ["image/fif", "fif"],
    ["image/florian", ["flo", "turbot"]],
    ["image/g3fax", "g3"],
    ["image/gif", "gif"],
    ["image/ief", ["ief", "iefs"]],
    ["image/jpeg", ["jpeg", "jpe", "jpg", "jfif", "jfif-tbnl"]],
    ["image/jutvision", "jut"],
    ["image/ktx", "ktx"],
    ["image/naplps", ["nap", "naplps"]],
    ["image/pict", ["pic", "pict"]],
    ["image/pipeg", "jfif"],
    ["image/pjpeg", ["jfif", "jpe", "jpeg", "jpg"]],
    ["image/png", ["png", "x-png"]],
    ["image/prs.btif", "btif"],
    ["image/svg+xml", "svg"],
    ["image/tiff", ["tif", "tiff"]],
    ["image/vasa", "mcf"],
    ["image/vnd.adobe.photoshop", "psd"],
    ["image/vnd.dece.graphic", "uvi"],
    ["image/vnd.djvu", "djvu"],
    ["image/vnd.dvb.subtitle", "sub"],
    ["image/vnd.dwg", ["dwg", "dxf", "svf"]],
    ["image/vnd.dxf", "dxf"],
    ["image/vnd.fastbidsheet", "fbs"],
    ["image/vnd.fpx", "fpx"],
    ["image/vnd.fst", "fst"],
    ["image/vnd.fujixerox.edmics-mmr", "mmr"],
    ["image/vnd.fujixerox.edmics-rlc", "rlc"],
    ["image/vnd.ms-modi", "mdi"],
    ["image/vnd.net-fpx", ["fpx", "npx"]],
    ["image/vnd.rn-realflash", "rf"],
    ["image/vnd.rn-realpix", "rp"],
    ["image/vnd.wap.wbmp", "wbmp"],
    ["image/vnd.xiff", "xif"],
    ["image/webp", "webp"],
    ["image/x-cmu-raster", "ras"],
    ["image/x-cmx", "cmx"],
    ["image/x-dwg", ["dwg", "dxf", "svf"]],
    ["image/x-freehand", "fh"],
    ["image/x-icon", "ico"],
    ["image/x-jg", "art"],
    ["image/x-jps", "jps"],
    ["image/x-niff", ["niff", "nif"]],
    ["image/x-pcx", "pcx"],
    ["image/x-pict", ["pct", "pic"]],
    ["image/x-portable-anymap", "pnm"],
    ["image/x-portable-bitmap", "pbm"],
    ["image/x-portable-graymap", "pgm"],
    ["image/x-portable-greymap", "pgm"],
    ["image/x-portable-pixmap", "ppm"],
    ["image/x-quicktime", ["qif", "qti", "qtif"]],
    ["image/x-rgb", "rgb"],
    ["image/x-tiff", ["tif", "tiff"]],
    ["image/x-windows-bmp", "bmp"],
    ["image/x-xbitmap", "xbm"],
    ["image/x-xbm", "xbm"],
    ["image/x-xpixmap", ["xpm", "pm"]],
    ["image/x-xwd", "xwd"],
    ["image/x-xwindowdump", "xwd"],
    ["image/xbm", "xbm"],
    ["image/xpm", "xpm"],
    ["message/rfc822", ["eml", "mht", "mhtml", "nws", "mime"]],
    ["model/iges", ["iges", "igs"]],
    ["model/mesh", "msh"],
    ["model/vnd.collada+xml", "dae"],
    ["model/vnd.dwf", "dwf"],
    ["model/vnd.gdl", "gdl"],
    ["model/vnd.gtw", "gtw"],
    ["model/vnd.mts", "mts"],
    ["model/vnd.vtu", "vtu"],
    ["model/vrml", ["vrml", "wrl", "wrz"]],
    ["model/x-pov", "pov"],
    ["multipart/x-gzip", "gzip"],
    ["multipart/x-ustar", "ustar"],
    ["multipart/x-zip", "zip"],
    ["music/crescendo", ["mid", "midi"]],
    ["music/x-karaoke", "kar"],
    ["paleovu/x-pv", "pvu"],
    ["text/asp", "asp"],
    ["text/calendar", "ics"],
    ["text/css", "css"],
    ["text/csv", "csv"],
    ["text/ecmascript", "js"],
    ["text/h323", "323"],
    ["text/html", ["html", "htm", "stm", "acgi", "htmls", "htx", "shtml"]],
    ["text/iuls", "uls"],
    ["text/javascript", "js"],
    ["text/mcf", "mcf"],
    ["text/n3", "n3"],
    ["text/pascal", "pas"],
    [
      "text/plain",
      [
        "txt",
        "bas",
        "c",
        "h",
        "c++",
        "cc",
        "com",
        "conf",
        "cxx",
        "def",
        "f",
        "f90",
        "for",
        "g",
        "hh",
        "idc",
        "jav",
        "java",
        "list",
        "log",
        "lst",
        "m",
        "mar",
        "pl",
        "sdml",
        "text"
      ]
    ],
    ["text/plain-bas", "par"],
    ["text/prs.lines.tag", "dsc"],
    ["text/richtext", ["rtx", "rt", "rtf"]],
    ["text/scriplet", "wsc"],
    ["text/scriptlet", "sct"],
    ["text/sgml", ["sgm", "sgml"]],
    ["text/tab-separated-values", "tsv"],
    ["text/troff", "t"],
    ["text/turtle", "ttl"],
    ["text/uri-list", ["uni", "unis", "uri", "uris"]],
    ["text/vnd.abc", "abc"],
    ["text/vnd.curl", "curl"],
    ["text/vnd.curl.dcurl", "dcurl"],
    ["text/vnd.curl.mcurl", "mcurl"],
    ["text/vnd.curl.scurl", "scurl"],
    ["text/vnd.fly", "fly"],
    ["text/vnd.fmi.flexstor", "flx"],
    ["text/vnd.graphviz", "gv"],
    ["text/vnd.in3d.3dml", "3dml"],
    ["text/vnd.in3d.spot", "spot"],
    ["text/vnd.rn-realtext", "rt"],
    ["text/vnd.sun.j2me.app-descriptor", "jad"],
    ["text/vnd.wap.wml", "wml"],
    ["text/vnd.wap.wmlscript", "wmls"],
    ["text/webviewhtml", "htt"],
    ["text/x-asm", ["asm", "s"]],
    ["text/x-audiosoft-intra", "aip"],
    ["text/x-c", ["c", "cc", "cpp"]],
    ["text/x-component", "htc"],
    ["text/x-fortran", ["for", "f", "f77", "f90"]],
    ["text/x-h", ["h", "hh"]],
    ["text/x-java-source", ["java", "jav"]],
    ["text/x-java-source,java", "java"],
    ["text/x-la-asf", "lsx"],
    ["text/x-m", "m"],
    ["text/x-pascal", "p"],
    ["text/x-script", "hlb"],
    ["text/x-script.csh", "csh"],
    ["text/x-script.elisp", "el"],
    ["text/x-script.guile", "scm"],
    ["text/x-script.ksh", "ksh"],
    ["text/x-script.lisp", "lsp"],
    ["text/x-script.perl", "pl"],
    ["text/x-script.perl-module", "pm"],
    ["text/x-script.phyton", "py"],
    ["text/x-script.rexx", "rexx"],
    ["text/x-script.scheme", "scm"],
    ["text/x-script.sh", "sh"],
    ["text/x-script.tcl", "tcl"],
    ["text/x-script.tcsh", "tcsh"],
    ["text/x-script.zsh", "zsh"],
    ["text/x-server-parsed-html", ["shtml", "ssi"]],
    ["text/x-setext", "etx"],
    ["text/x-sgml", ["sgm", "sgml"]],
    ["text/x-speech", ["spc", "talk"]],
    ["text/x-uil", "uil"],
    ["text/x-uuencode", ["uu", "uue"]],
    ["text/x-vcalendar", "vcs"],
    ["text/x-vcard", "vcf"],
    ["text/xml", "xml"],
    ["video/3gpp", "3gp"],
    ["video/3gpp2", "3g2"],
    ["video/animaflex", "afl"],
    ["video/avi", "avi"],
    ["video/avs-video", "avs"],
    ["video/dl", "dl"],
    ["video/fli", "fli"],
    ["video/gl", "gl"],
    ["video/h261", "h261"],
    ["video/h263", "h263"],
    ["video/h264", "h264"],
    ["video/jpeg", "jpgv"],
    ["video/jpm", "jpm"],
    ["video/mj2", "mj2"],
    ["video/mp4", "mp4"],
    ["video/mpeg", ["mpeg", "mp2", "mpa", "mpe", "mpg", "mpv2", "m1v", "m2v", "mp3"]],
    ["video/msvideo", "avi"],
    ["video/ogg", "ogv"],
    ["video/quicktime", ["mov", "qt", "moov"]],
    ["video/vdo", "vdo"],
    ["video/vivo", ["viv", "vivo"]],
    ["video/vnd.dece.hd", "uvh"],
    ["video/vnd.dece.mobile", "uvm"],
    ["video/vnd.dece.pd", "uvp"],
    ["video/vnd.dece.sd", "uvs"],
    ["video/vnd.dece.video", "uvv"],
    ["video/vnd.fvt", "fvt"],
    ["video/vnd.mpegurl", "mxu"],
    ["video/vnd.ms-playready.media.pyv", "pyv"],
    ["video/vnd.rn-realvideo", "rv"],
    ["video/vnd.uvvu.mp4", "uvu"],
    ["video/vnd.vivo", ["viv", "vivo"]],
    ["video/vosaic", "vos"],
    ["video/webm", "webm"],
    ["video/x-amt-demorun", "xdr"],
    ["video/x-amt-showrun", "xsr"],
    ["video/x-atomic3d-feature", "fmf"],
    ["video/x-dl", "dl"],
    ["video/x-dv", ["dif", "dv"]],
    ["video/x-f4v", "f4v"],
    ["video/x-fli", "fli"],
    ["video/x-flv", "flv"],
    ["video/x-gl", "gl"],
    ["video/x-isvideo", "isu"],
    ["video/x-la-asf", ["lsf", "lsx"]],
    ["video/x-m4v", "m4v"],
    ["video/x-motion-jpeg", "mjpg"],
    ["video/x-mpeg", ["mp3", "mp2"]],
    ["video/x-mpeq2a", "mp2"],
    ["video/x-ms-asf", ["asf", "asr", "asx"]],
    ["video/x-ms-asf-plugin", "asx"],
    ["video/x-ms-wm", "wm"],
    ["video/x-ms-wmv", "wmv"],
    ["video/x-ms-wmx", "wmx"],
    ["video/x-ms-wvx", "wvx"],
    ["video/x-msvideo", "avi"],
    ["video/x-qtc", "qtc"],
    ["video/x-scm", "scm"],
    ["video/x-sgi-movie", ["movie", "mv"]],
    ["windows/metafile", "wmf"],
    ["www/mime", "mime"],
    ["x-conference/x-cooltalk", "ice"],
    ["x-music/x-midi", ["mid", "midi"]],
    ["x-world/x-3dmf", ["3dm", "3dmf", "qd3", "qd3d"]],
    ["x-world/x-svr", "svr"],
    ["x-world/x-vrml", ["flr", "vrml", "wrl", "wrz", "xaf", "xof"]],
    ["x-world/x-vrt", "vrt"],
    ["xgl/drawing", "xgz"],
    ["xgl/movie", "xmz"]
  ]);
  var extensions = new Map([
    ["123", "application/vnd.lotus-1-2-3"],
    ["323", "text/h323"],
    ["*", "application/octet-stream"],
    ["3dm", "x-world/x-3dmf"],
    ["3dmf", "x-world/x-3dmf"],
    ["3dml", "text/vnd.in3d.3dml"],
    ["3g2", "video/3gpp2"],
    ["3gp", "video/3gpp"],
    ["7z", "application/x-7z-compressed"],
    ["a", "application/octet-stream"],
    ["aab", "application/x-authorware-bin"],
    ["aac", "audio/x-aac"],
    ["aam", "application/x-authorware-map"],
    ["aas", "application/x-authorware-seg"],
    ["abc", "text/vnd.abc"],
    ["abw", "application/x-abiword"],
    ["ac", "application/pkix-attr-cert"],
    ["acc", "application/vnd.americandynamics.acc"],
    ["ace", "application/x-ace-compressed"],
    ["acgi", "text/html"],
    ["acu", "application/vnd.acucobol"],
    ["acx", "application/internet-property-stream"],
    ["adp", "audio/adpcm"],
    ["aep", "application/vnd.audiograph"],
    ["afl", "video/animaflex"],
    ["afp", "application/vnd.ibm.modcap"],
    ["ahead", "application/vnd.ahead.space"],
    ["ai", "application/postscript"],
    ["aif", ["audio/aiff", "audio/x-aiff"]],
    ["aifc", ["audio/aiff", "audio/x-aiff"]],
    ["aiff", ["audio/aiff", "audio/x-aiff"]],
    ["aim", "application/x-aim"],
    ["aip", "text/x-audiosoft-intra"],
    ["air", "application/vnd.adobe.air-application-installer-package+zip"],
    ["ait", "application/vnd.dvb.ait"],
    ["ami", "application/vnd.amiga.ami"],
    ["ani", "application/x-navi-animation"],
    ["aos", "application/x-nokia-9000-communicator-add-on-software"],
    ["apk", "application/vnd.android.package-archive"],
    ["application", "application/x-ms-application"],
    ["apr", "application/vnd.lotus-approach"],
    ["aps", "application/mime"],
    ["arc", "application/octet-stream"],
    ["arj", ["application/arj", "application/octet-stream"]],
    ["art", "image/x-jg"],
    ["asf", "video/x-ms-asf"],
    ["asm", "text/x-asm"],
    ["aso", "application/vnd.accpac.simply.aso"],
    ["asp", "text/asp"],
    ["asr", "video/x-ms-asf"],
    ["asx", ["video/x-ms-asf", "application/x-mplayer2", "video/x-ms-asf-plugin"]],
    ["atc", "application/vnd.acucorp"],
    ["atomcat", "application/atomcat+xml"],
    ["atomsvc", "application/atomsvc+xml"],
    ["atx", "application/vnd.antix.game-component"],
    ["au", ["audio/basic", "audio/x-au"]],
    ["avi", ["video/avi", "video/msvideo", "application/x-troff-msvideo", "video/x-msvideo"]],
    ["avs", "video/avs-video"],
    ["aw", "application/applixware"],
    ["axs", "application/olescript"],
    ["azf", "application/vnd.airzip.filesecure.azf"],
    ["azs", "application/vnd.airzip.filesecure.azs"],
    ["azw", "application/vnd.amazon.ebook"],
    ["bas", "text/plain"],
    ["bcpio", "application/x-bcpio"],
    ["bdf", "application/x-font-bdf"],
    ["bdm", "application/vnd.syncml.dm+wbxml"],
    ["bed", "application/vnd.realvnc.bed"],
    ["bh2", "application/vnd.fujitsu.oasysprs"],
    ["bin", ["application/octet-stream", "application/mac-binary", "application/macbinary", "application/x-macbinary", "application/x-binary"]],
    ["bm", "image/bmp"],
    ["bmi", "application/vnd.bmi"],
    ["bmp", ["image/bmp", "image/x-windows-bmp"]],
    ["boo", "application/book"],
    ["book", "application/book"],
    ["box", "application/vnd.previewsystems.box"],
    ["boz", "application/x-bzip2"],
    ["bsh", "application/x-bsh"],
    ["btif", "image/prs.btif"],
    ["bz", "application/x-bzip"],
    ["bz2", "application/x-bzip2"],
    ["c", ["text/plain", "text/x-c"]],
    ["c++", "text/plain"],
    ["c11amc", "application/vnd.cluetrust.cartomobile-config"],
    ["c11amz", "application/vnd.cluetrust.cartomobile-config-pkg"],
    ["c4g", "application/vnd.clonk.c4group"],
    ["cab", "application/vnd.ms-cab-compressed"],
    ["car", "application/vnd.curl.car"],
    ["cat", ["application/vnd.ms-pkiseccat", "application/vnd.ms-pki.seccat"]],
    ["cc", ["text/plain", "text/x-c"]],
    ["ccad", "application/clariscad"],
    ["cco", "application/x-cocoa"],
    ["ccxml", "application/ccxml+xml,"],
    ["cdbcmsg", "application/vnd.contact.cmsg"],
    ["cdf", ["application/cdf", "application/x-cdf", "application/x-netcdf"]],
    ["cdkey", "application/vnd.mediastation.cdkey"],
    ["cdmia", "application/cdmi-capability"],
    ["cdmic", "application/cdmi-container"],
    ["cdmid", "application/cdmi-domain"],
    ["cdmio", "application/cdmi-object"],
    ["cdmiq", "application/cdmi-queue"],
    ["cdx", "chemical/x-cdx"],
    ["cdxml", "application/vnd.chemdraw+xml"],
    ["cdy", "application/vnd.cinderella"],
    ["cer", ["application/pkix-cert", "application/x-x509-ca-cert"]],
    ["cgm", "image/cgm"],
    ["cha", "application/x-chat"],
    ["chat", "application/x-chat"],
    ["chm", "application/vnd.ms-htmlhelp"],
    ["chrt", "application/vnd.kde.kchart"],
    ["cif", "chemical/x-cif"],
    ["cii", "application/vnd.anser-web-certificate-issue-initiation"],
    ["cil", "application/vnd.ms-artgalry"],
    ["cla", "application/vnd.claymore"],
    ["class", ["application/octet-stream", "application/java", "application/java-byte-code", "application/java-vm", "application/x-java-class"]],
    ["clkk", "application/vnd.crick.clicker.keyboard"],
    ["clkp", "application/vnd.crick.clicker.palette"],
    ["clkt", "application/vnd.crick.clicker.template"],
    ["clkw", "application/vnd.crick.clicker.wordbank"],
    ["clkx", "application/vnd.crick.clicker"],
    ["clp", "application/x-msclip"],
    ["cmc", "application/vnd.cosmocaller"],
    ["cmdf", "chemical/x-cmdf"],
    ["cml", "chemical/x-cml"],
    ["cmp", "application/vnd.yellowriver-custom-menu"],
    ["cmx", "image/x-cmx"],
    ["cod", ["image/cis-cod", "application/vnd.rim.cod"]],
    ["com", ["application/octet-stream", "text/plain"]],
    ["conf", "text/plain"],
    ["cpio", "application/x-cpio"],
    ["cpp", "text/x-c"],
    ["cpt", ["application/mac-compactpro", "application/x-compactpro", "application/x-cpt"]],
    ["crd", "application/x-mscardfile"],
    ["crl", ["application/pkix-crl", "application/pkcs-crl"]],
    ["crt", ["application/pkix-cert", "application/x-x509-user-cert", "application/x-x509-ca-cert"]],
    ["cryptonote", "application/vnd.rig.cryptonote"],
    ["csh", ["text/x-script.csh", "application/x-csh"]],
    ["csml", "chemical/x-csml"],
    ["csp", "application/vnd.commonspace"],
    ["css", ["text/css", "application/x-pointplus"]],
    ["csv", "text/csv"],
    ["cu", "application/cu-seeme"],
    ["curl", "text/vnd.curl"],
    ["cww", "application/prs.cww"],
    ["cxx", "text/plain"],
    ["dae", "model/vnd.collada+xml"],
    ["daf", "application/vnd.mobius.daf"],
    ["davmount", "application/davmount+xml"],
    ["dcr", "application/x-director"],
    ["dcurl", "text/vnd.curl.dcurl"],
    ["dd2", "application/vnd.oma.dd2+xml"],
    ["ddd", "application/vnd.fujixerox.ddd"],
    ["deb", "application/x-debian-package"],
    ["deepv", "application/x-deepv"],
    ["def", "text/plain"],
    ["der", "application/x-x509-ca-cert"],
    ["dfac", "application/vnd.dreamfactory"],
    ["dif", "video/x-dv"],
    ["dir", "application/x-director"],
    ["dis", "application/vnd.mobius.dis"],
    ["djvu", "image/vnd.djvu"],
    ["dl", ["video/dl", "video/x-dl"]],
    ["dll", "application/x-msdownload"],
    ["dms", "application/octet-stream"],
    ["dna", "application/vnd.dna"],
    ["doc", "application/msword"],
    ["docm", "application/vnd.ms-word.document.macroenabled.12"],
    ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    ["dot", "application/msword"],
    ["dotm", "application/vnd.ms-word.template.macroenabled.12"],
    ["dotx", "application/vnd.openxmlformats-officedocument.wordprocessingml.template"],
    ["dp", ["application/commonground", "application/vnd.osgi.dp"]],
    ["dpg", "application/vnd.dpgraph"],
    ["dra", "audio/vnd.dra"],
    ["drw", "application/drafting"],
    ["dsc", "text/prs.lines.tag"],
    ["dssc", "application/dssc+der"],
    ["dtb", "application/x-dtbook+xml"],
    ["dtd", "application/xml-dtd"],
    ["dts", "audio/vnd.dts"],
    ["dtshd", "audio/vnd.dts.hd"],
    ["dump", "application/octet-stream"],
    ["dv", "video/x-dv"],
    ["dvi", "application/x-dvi"],
    ["dwf", ["model/vnd.dwf", "drawing/x-dwf"]],
    ["dwg", ["application/acad", "image/vnd.dwg", "image/x-dwg"]],
    ["dxf", ["application/dxf", "image/vnd.dwg", "image/vnd.dxf", "image/x-dwg"]],
    ["dxp", "application/vnd.spotfire.dxp"],
    ["dxr", "application/x-director"],
    ["ecelp4800", "audio/vnd.nuera.ecelp4800"],
    ["ecelp7470", "audio/vnd.nuera.ecelp7470"],
    ["ecelp9600", "audio/vnd.nuera.ecelp9600"],
    ["edm", "application/vnd.novadigm.edm"],
    ["edx", "application/vnd.novadigm.edx"],
    ["efif", "application/vnd.picsel"],
    ["ei6", "application/vnd.pg.osasli"],
    ["el", "text/x-script.elisp"],
    ["elc", ["application/x-elc", "application/x-bytecode.elisp"]],
    ["eml", "message/rfc822"],
    ["emma", "application/emma+xml"],
    ["env", "application/x-envoy"],
    ["eol", "audio/vnd.digital-winds"],
    ["eot", "application/vnd.ms-fontobject"],
    ["eps", "application/postscript"],
    ["epub", "application/epub+zip"],
    ["es", ["application/ecmascript", "application/x-esrehber"]],
    ["es3", "application/vnd.eszigno3+xml"],
    ["esf", "application/vnd.epson.esf"],
    ["etx", "text/x-setext"],
    ["evy", ["application/envoy", "application/x-envoy"]],
    ["exe", ["application/octet-stream", "application/x-msdownload"]],
    ["exi", "application/exi"],
    ["ext", "application/vnd.novadigm.ext"],
    ["ez2", "application/vnd.ezpix-album"],
    ["ez3", "application/vnd.ezpix-package"],
    ["f", ["text/plain", "text/x-fortran"]],
    ["f4v", "video/x-f4v"],
    ["f77", "text/x-fortran"],
    ["f90", ["text/plain", "text/x-fortran"]],
    ["fbs", "image/vnd.fastbidsheet"],
    ["fcs", "application/vnd.isac.fcs"],
    ["fdf", "application/vnd.fdf"],
    ["fe_launch", "application/vnd.denovo.fcselayout-link"],
    ["fg5", "application/vnd.fujitsu.oasysgp"],
    ["fh", "image/x-freehand"],
    ["fif", ["application/fractals", "image/fif"]],
    ["fig", "application/x-xfig"],
    ["fli", ["video/fli", "video/x-fli"]],
    ["flo", ["image/florian", "application/vnd.micrografx.flo"]],
    ["flr", "x-world/x-vrml"],
    ["flv", "video/x-flv"],
    ["flw", "application/vnd.kde.kivio"],
    ["flx", "text/vnd.fmi.flexstor"],
    ["fly", "text/vnd.fly"],
    ["fm", "application/vnd.framemaker"],
    ["fmf", "video/x-atomic3d-feature"],
    ["fnc", "application/vnd.frogans.fnc"],
    ["for", ["text/plain", "text/x-fortran"]],
    ["fpx", ["image/vnd.fpx", "image/vnd.net-fpx"]],
    ["frl", "application/freeloader"],
    ["fsc", "application/vnd.fsc.weblaunch"],
    ["fst", "image/vnd.fst"],
    ["ftc", "application/vnd.fluxtime.clip"],
    ["fti", "application/vnd.anser-web-funds-transfer-initiation"],
    ["funk", "audio/make"],
    ["fvt", "video/vnd.fvt"],
    ["fxp", "application/vnd.adobe.fxp"],
    ["fzs", "application/vnd.fuzzysheet"],
    ["g", "text/plain"],
    ["g2w", "application/vnd.geoplan"],
    ["g3", "image/g3fax"],
    ["g3w", "application/vnd.geospace"],
    ["gac", "application/vnd.groove-account"],
    ["gdl", "model/vnd.gdl"],
    ["geo", "application/vnd.dynageo"],
    ["geojson", "application/geo+json"],
    ["gex", "application/vnd.geometry-explorer"],
    ["ggb", "application/vnd.geogebra.file"],
    ["ggt", "application/vnd.geogebra.tool"],
    ["ghf", "application/vnd.groove-help"],
    ["gif", "image/gif"],
    ["gim", "application/vnd.groove-identity-message"],
    ["gl", ["video/gl", "video/x-gl"]],
    ["gmx", "application/vnd.gmx"],
    ["gnumeric", "application/x-gnumeric"],
    ["gph", "application/vnd.flographit"],
    ["gqf", "application/vnd.grafeq"],
    ["gram", "application/srgs"],
    ["grv", "application/vnd.groove-injector"],
    ["grxml", "application/srgs+xml"],
    ["gsd", "audio/x-gsm"],
    ["gsf", "application/x-font-ghostscript"],
    ["gsm", "audio/x-gsm"],
    ["gsp", "application/x-gsp"],
    ["gss", "application/x-gss"],
    ["gtar", "application/x-gtar"],
    ["gtm", "application/vnd.groove-tool-message"],
    ["gtw", "model/vnd.gtw"],
    ["gv", "text/vnd.graphviz"],
    ["gxt", "application/vnd.geonext"],
    ["gz", ["application/x-gzip", "application/x-compressed"]],
    ["gzip", ["multipart/x-gzip", "application/x-gzip"]],
    ["h", ["text/plain", "text/x-h"]],
    ["h261", "video/h261"],
    ["h263", "video/h263"],
    ["h264", "video/h264"],
    ["hal", "application/vnd.hal+xml"],
    ["hbci", "application/vnd.hbci"],
    ["hdf", "application/x-hdf"],
    ["help", "application/x-helpfile"],
    ["hgl", "application/vnd.hp-hpgl"],
    ["hh", ["text/plain", "text/x-h"]],
    ["hlb", "text/x-script"],
    ["hlp", ["application/winhlp", "application/hlp", "application/x-helpfile", "application/x-winhelp"]],
    ["hpg", "application/vnd.hp-hpgl"],
    ["hpgl", "application/vnd.hp-hpgl"],
    ["hpid", "application/vnd.hp-hpid"],
    ["hps", "application/vnd.hp-hps"],
    [
      "hqx",
      [
        "application/mac-binhex40",
        "application/binhex",
        "application/binhex4",
        "application/mac-binhex",
        "application/x-binhex40",
        "application/x-mac-binhex40"
      ]
    ],
    ["hta", "application/hta"],
    ["htc", "text/x-component"],
    ["htke", "application/vnd.kenameaapp"],
    ["htm", "text/html"],
    ["html", "text/html"],
    ["htmls", "text/html"],
    ["htt", "text/webviewhtml"],
    ["htx", "text/html"],
    ["hvd", "application/vnd.yamaha.hv-dic"],
    ["hvp", "application/vnd.yamaha.hv-voice"],
    ["hvs", "application/vnd.yamaha.hv-script"],
    ["i2g", "application/vnd.intergeo"],
    ["icc", "application/vnd.iccprofile"],
    ["ice", "x-conference/x-cooltalk"],
    ["ico", "image/x-icon"],
    ["ics", "text/calendar"],
    ["idc", "text/plain"],
    ["ief", "image/ief"],
    ["iefs", "image/ief"],
    ["ifm", "application/vnd.shana.informed.formdata"],
    ["iges", ["application/iges", "model/iges"]],
    ["igl", "application/vnd.igloader"],
    ["igm", "application/vnd.insors.igm"],
    ["igs", ["application/iges", "model/iges"]],
    ["igx", "application/vnd.micrografx.igx"],
    ["iif", "application/vnd.shana.informed.interchange"],
    ["iii", "application/x-iphone"],
    ["ima", "application/x-ima"],
    ["imap", "application/x-httpd-imap"],
    ["imp", "application/vnd.accpac.simply.imp"],
    ["ims", "application/vnd.ms-ims"],
    ["inf", "application/inf"],
    ["ins", ["application/x-internet-signup", "application/x-internett-signup"]],
    ["ip", "application/x-ip2"],
    ["ipfix", "application/ipfix"],
    ["ipk", "application/vnd.shana.informed.package"],
    ["irm", "application/vnd.ibm.rights-management"],
    ["irp", "application/vnd.irepository.package+xml"],
    ["isp", "application/x-internet-signup"],
    ["isu", "video/x-isvideo"],
    ["it", "audio/it"],
    ["itp", "application/vnd.shana.informed.formtemplate"],
    ["iv", "application/x-inventor"],
    ["ivp", "application/vnd.immervision-ivp"],
    ["ivr", "i-world/i-vrml"],
    ["ivu", "application/vnd.immervision-ivu"],
    ["ivy", "application/x-livescreen"],
    ["jad", "text/vnd.sun.j2me.app-descriptor"],
    ["jam", ["application/vnd.jam", "audio/x-jam"]],
    ["jar", "application/java-archive"],
    ["jav", ["text/plain", "text/x-java-source"]],
    ["java", ["text/plain", "text/x-java-source,java", "text/x-java-source"]],
    ["jcm", "application/x-java-commerce"],
    ["jfif", ["image/pipeg", "image/jpeg", "image/pjpeg"]],
    ["jfif-tbnl", "image/jpeg"],
    ["jisp", "application/vnd.jisp"],
    ["jlt", "application/vnd.hp-jlyt"],
    ["jnlp", "application/x-java-jnlp-file"],
    ["joda", "application/vnd.joost.joda-archive"],
    ["jpe", ["image/jpeg", "image/pjpeg"]],
    ["jpeg", ["image/jpeg", "image/pjpeg"]],
    ["jpg", ["image/jpeg", "image/pjpeg"]],
    ["jpgv", "video/jpeg"],
    ["jpm", "video/jpm"],
    ["jps", "image/x-jps"],
    ["js", ["application/javascript", "application/ecmascript", "text/javascript", "text/ecmascript", "application/x-javascript"]],
    ["json", "application/json"],
    ["jut", "image/jutvision"],
    ["kar", ["audio/midi", "music/x-karaoke"]],
    ["karbon", "application/vnd.kde.karbon"],
    ["kfo", "application/vnd.kde.kformula"],
    ["kia", "application/vnd.kidspiration"],
    ["kml", "application/vnd.google-earth.kml+xml"],
    ["kmz", "application/vnd.google-earth.kmz"],
    ["kne", "application/vnd.kinar"],
    ["kon", "application/vnd.kde.kontour"],
    ["kpr", "application/vnd.kde.kpresenter"],
    ["ksh", ["application/x-ksh", "text/x-script.ksh"]],
    ["ksp", "application/vnd.kde.kspread"],
    ["ktx", "image/ktx"],
    ["ktz", "application/vnd.kahootz"],
    ["kwd", "application/vnd.kde.kword"],
    ["la", ["audio/nspaudio", "audio/x-nspaudio"]],
    ["lam", "audio/x-liveaudio"],
    ["lasxml", "application/vnd.las.las+xml"],
    ["latex", "application/x-latex"],
    ["lbd", "application/vnd.llamagraphics.life-balance.desktop"],
    ["lbe", "application/vnd.llamagraphics.life-balance.exchange+xml"],
    ["les", "application/vnd.hhe.lesson-player"],
    ["lha", ["application/octet-stream", "application/lha", "application/x-lha"]],
    ["lhx", "application/octet-stream"],
    ["link66", "application/vnd.route66.link66+xml"],
    ["list", "text/plain"],
    ["lma", ["audio/nspaudio", "audio/x-nspaudio"]],
    ["log", "text/plain"],
    ["lrm", "application/vnd.ms-lrm"],
    ["lsf", "video/x-la-asf"],
    ["lsp", ["application/x-lisp", "text/x-script.lisp"]],
    ["lst", "text/plain"],
    ["lsx", ["video/x-la-asf", "text/x-la-asf"]],
    ["ltf", "application/vnd.frogans.ltf"],
    ["ltx", "application/x-latex"],
    ["lvp", "audio/vnd.lucent.voice"],
    ["lwp", "application/vnd.lotus-wordpro"],
    ["lzh", ["application/octet-stream", "application/x-lzh"]],
    ["lzx", ["application/lzx", "application/octet-stream", "application/x-lzx"]],
    ["m", ["text/plain", "text/x-m"]],
    ["m13", "application/x-msmediaview"],
    ["m14", "application/x-msmediaview"],
    ["m1v", "video/mpeg"],
    ["m21", "application/mp21"],
    ["m2a", "audio/mpeg"],
    ["m2v", "video/mpeg"],
    ["m3u", ["audio/x-mpegurl", "audio/x-mpequrl"]],
    ["m3u8", "application/vnd.apple.mpegurl"],
    ["m4v", "video/x-m4v"],
    ["ma", "application/mathematica"],
    ["mads", "application/mads+xml"],
    ["mag", "application/vnd.ecowin.chart"],
    ["man", "application/x-troff-man"],
    ["map", "application/x-navimap"],
    ["mar", "text/plain"],
    ["mathml", "application/mathml+xml"],
    ["mbd", "application/mbedlet"],
    ["mbk", "application/vnd.mobius.mbk"],
    ["mbox", "application/mbox"],
    ["mc$", "application/x-magic-cap-package-1.0"],
    ["mc1", "application/vnd.medcalcdata"],
    ["mcd", ["application/mcad", "application/vnd.mcd", "application/x-mathcad"]],
    ["mcf", ["image/vasa", "text/mcf"]],
    ["mcp", "application/netmc"],
    ["mcurl", "text/vnd.curl.mcurl"],
    ["mdb", "application/x-msaccess"],
    ["mdi", "image/vnd.ms-modi"],
    ["me", "application/x-troff-me"],
    ["meta4", "application/metalink4+xml"],
    ["mets", "application/mets+xml"],
    ["mfm", "application/vnd.mfmp"],
    ["mgp", "application/vnd.osgeo.mapguide.package"],
    ["mgz", "application/vnd.proteus.magazine"],
    ["mht", "message/rfc822"],
    ["mhtml", "message/rfc822"],
    ["mid", ["audio/mid", "audio/midi", "music/crescendo", "x-music/x-midi", "audio/x-midi", "application/x-midi", "audio/x-mid"]],
    ["midi", ["audio/midi", "music/crescendo", "x-music/x-midi", "audio/x-midi", "application/x-midi", "audio/x-mid"]],
    ["mif", ["application/vnd.mif", "application/x-mif", "application/x-frame"]],
    ["mime", ["message/rfc822", "www/mime"]],
    ["mj2", "video/mj2"],
    ["mjf", "audio/x-vnd.audioexplosion.mjuicemediafile"],
    ["mjpg", "video/x-motion-jpeg"],
    ["mlp", "application/vnd.dolby.mlp"],
    ["mm", ["application/base64", "application/x-meme"]],
    ["mmd", "application/vnd.chipnuts.karaoke-mmd"],
    ["mme", "application/base64"],
    ["mmf", "application/vnd.smaf"],
    ["mmr", "image/vnd.fujixerox.edmics-mmr"],
    ["mny", "application/x-msmoney"],
    ["mod", ["audio/mod", "audio/x-mod"]],
    ["mods", "application/mods+xml"],
    ["moov", "video/quicktime"],
    ["mov", "video/quicktime"],
    ["movie", "video/x-sgi-movie"],
    ["mp2", ["video/mpeg", "audio/mpeg", "video/x-mpeg", "audio/x-mpeg", "video/x-mpeq2a"]],
    ["mp3", ["audio/mpeg", "audio/mpeg3", "video/mpeg", "audio/x-mpeg-3", "video/x-mpeg"]],
    ["mp4", ["video/mp4", "application/mp4"]],
    ["mp4a", "audio/mp4"],
    ["mpa", ["video/mpeg", "audio/mpeg"]],
    ["mpc", ["application/vnd.mophun.certificate", "application/x-project"]],
    ["mpe", "video/mpeg"],
    ["mpeg", "video/mpeg"],
    ["mpg", ["video/mpeg", "audio/mpeg"]],
    ["mpga", "audio/mpeg"],
    ["mpkg", "application/vnd.apple.installer+xml"],
    ["mpm", "application/vnd.blueice.multipass"],
    ["mpn", "application/vnd.mophun.application"],
    ["mpp", "application/vnd.ms-project"],
    ["mpt", "application/x-project"],
    ["mpv", "application/x-project"],
    ["mpv2", "video/mpeg"],
    ["mpx", "application/x-project"],
    ["mpy", "application/vnd.ibm.minipay"],
    ["mqy", "application/vnd.mobius.mqy"],
    ["mrc", "application/marc"],
    ["mrcx", "application/marcxml+xml"],
    ["ms", "application/x-troff-ms"],
    ["mscml", "application/mediaservercontrol+xml"],
    ["mseq", "application/vnd.mseq"],
    ["msf", "application/vnd.epson.msf"],
    ["msg", "application/vnd.ms-outlook"],
    ["msh", "model/mesh"],
    ["msl", "application/vnd.mobius.msl"],
    ["msty", "application/vnd.muvee.style"],
    ["mts", "model/vnd.mts"],
    ["mus", "application/vnd.musician"],
    ["musicxml", "application/vnd.recordare.musicxml+xml"],
    ["mv", "video/x-sgi-movie"],
    ["mvb", "application/x-msmediaview"],
    ["mwf", "application/vnd.mfer"],
    ["mxf", "application/mxf"],
    ["mxl", "application/vnd.recordare.musicxml"],
    ["mxml", "application/xv+xml"],
    ["mxs", "application/vnd.triscape.mxs"],
    ["mxu", "video/vnd.mpegurl"],
    ["my", "audio/make"],
    ["mzz", "application/x-vnd.audioexplosion.mzz"],
    ["n-gage", "application/vnd.nokia.n-gage.symbian.install"],
    ["n3", "text/n3"],
    ["nap", "image/naplps"],
    ["naplps", "image/naplps"],
    ["nbp", "application/vnd.wolfram.player"],
    ["nc", "application/x-netcdf"],
    ["ncm", "application/vnd.nokia.configuration-message"],
    ["ncx", "application/x-dtbncx+xml"],
    ["ngdat", "application/vnd.nokia.n-gage.data"],
    ["nif", "image/x-niff"],
    ["niff", "image/x-niff"],
    ["nix", "application/x-mix-transfer"],
    ["nlu", "application/vnd.neurolanguage.nlu"],
    ["nml", "application/vnd.enliven"],
    ["nnd", "application/vnd.noblenet-directory"],
    ["nns", "application/vnd.noblenet-sealer"],
    ["nnw", "application/vnd.noblenet-web"],
    ["npx", "image/vnd.net-fpx"],
    ["nsc", "application/x-conference"],
    ["nsf", "application/vnd.lotus-notes"],
    ["nvd", "application/x-navidoc"],
    ["nws", "message/rfc822"],
    ["o", "application/octet-stream"],
    ["oa2", "application/vnd.fujitsu.oasys2"],
    ["oa3", "application/vnd.fujitsu.oasys3"],
    ["oas", "application/vnd.fujitsu.oasys"],
    ["obd", "application/x-msbinder"],
    ["oda", "application/oda"],
    ["odb", "application/vnd.oasis.opendocument.database"],
    ["odc", "application/vnd.oasis.opendocument.chart"],
    ["odf", "application/vnd.oasis.opendocument.formula"],
    ["odft", "application/vnd.oasis.opendocument.formula-template"],
    ["odg", "application/vnd.oasis.opendocument.graphics"],
    ["odi", "application/vnd.oasis.opendocument.image"],
    ["odm", "application/vnd.oasis.opendocument.text-master"],
    ["odp", "application/vnd.oasis.opendocument.presentation"],
    ["ods", "application/vnd.oasis.opendocument.spreadsheet"],
    ["odt", "application/vnd.oasis.opendocument.text"],
    ["oga", "audio/ogg"],
    ["ogv", "video/ogg"],
    ["ogx", "application/ogg"],
    ["omc", "application/x-omc"],
    ["omcd", "application/x-omcdatamaker"],
    ["omcr", "application/x-omcregerator"],
    ["onetoc", "application/onenote"],
    ["opf", "application/oebps-package+xml"],
    ["org", "application/vnd.lotus-organizer"],
    ["osf", "application/vnd.yamaha.openscoreformat"],
    ["osfpvg", "application/vnd.yamaha.openscoreformat.osfpvg+xml"],
    ["otc", "application/vnd.oasis.opendocument.chart-template"],
    ["otf", "application/x-font-otf"],
    ["otg", "application/vnd.oasis.opendocument.graphics-template"],
    ["oth", "application/vnd.oasis.opendocument.text-web"],
    ["oti", "application/vnd.oasis.opendocument.image-template"],
    ["otp", "application/vnd.oasis.opendocument.presentation-template"],
    ["ots", "application/vnd.oasis.opendocument.spreadsheet-template"],
    ["ott", "application/vnd.oasis.opendocument.text-template"],
    ["oxt", "application/vnd.openofficeorg.extension"],
    ["p", "text/x-pascal"],
    ["p10", ["application/pkcs10", "application/x-pkcs10"]],
    ["p12", ["application/pkcs-12", "application/x-pkcs12"]],
    ["p7a", "application/x-pkcs7-signature"],
    ["p7b", "application/x-pkcs7-certificates"],
    ["p7c", ["application/pkcs7-mime", "application/x-pkcs7-mime"]],
    ["p7m", ["application/pkcs7-mime", "application/x-pkcs7-mime"]],
    ["p7r", "application/x-pkcs7-certreqresp"],
    ["p7s", ["application/pkcs7-signature", "application/x-pkcs7-signature"]],
    ["p8", "application/pkcs8"],
    ["par", "text/plain-bas"],
    ["part", "application/pro_eng"],
    ["pas", "text/pascal"],
    ["paw", "application/vnd.pawaafile"],
    ["pbd", "application/vnd.powerbuilder6"],
    ["pbm", "image/x-portable-bitmap"],
    ["pcf", "application/x-font-pcf"],
    ["pcl", ["application/vnd.hp-pcl", "application/x-pcl"]],
    ["pclxl", "application/vnd.hp-pclxl"],
    ["pct", "image/x-pict"],
    ["pcurl", "application/vnd.curl.pcurl"],
    ["pcx", "image/x-pcx"],
    ["pdb", ["application/vnd.palm", "chemical/x-pdb"]],
    ["pdf", "application/pdf"],
    ["pfa", "application/x-font-type1"],
    ["pfr", "application/font-tdpfr"],
    ["pfunk", ["audio/make", "audio/make.my.funk"]],
    ["pfx", "application/x-pkcs12"],
    ["pgm", ["image/x-portable-graymap", "image/x-portable-greymap"]],
    ["pgn", "application/x-chess-pgn"],
    ["pgp", "application/pgp-signature"],
    ["pic", ["image/pict", "image/x-pict"]],
    ["pict", "image/pict"],
    ["pkg", "application/x-newton-compatible-pkg"],
    ["pki", "application/pkixcmp"],
    ["pkipath", "application/pkix-pkipath"],
    ["pko", ["application/ynd.ms-pkipko", "application/vnd.ms-pki.pko"]],
    ["pl", ["text/plain", "text/x-script.perl"]],
    ["plb", "application/vnd.3gpp.pic-bw-large"],
    ["plc", "application/vnd.mobius.plc"],
    ["plf", "application/vnd.pocketlearn"],
    ["pls", "application/pls+xml"],
    ["plx", "application/x-pixclscript"],
    ["pm", ["text/x-script.perl-module", "image/x-xpixmap"]],
    ["pm4", "application/x-pagemaker"],
    ["pm5", "application/x-pagemaker"],
    ["pma", "application/x-perfmon"],
    ["pmc", "application/x-perfmon"],
    ["pml", ["application/vnd.ctc-posml", "application/x-perfmon"]],
    ["pmr", "application/x-perfmon"],
    ["pmw", "application/x-perfmon"],
    ["png", "image/png"],
    ["pnm", ["application/x-portable-anymap", "image/x-portable-anymap"]],
    ["portpkg", "application/vnd.macports.portpkg"],
    ["pot", ["application/vnd.ms-powerpoint", "application/mspowerpoint"]],
    ["potm", "application/vnd.ms-powerpoint.template.macroenabled.12"],
    ["potx", "application/vnd.openxmlformats-officedocument.presentationml.template"],
    ["pov", "model/x-pov"],
    ["ppa", "application/vnd.ms-powerpoint"],
    ["ppam", "application/vnd.ms-powerpoint.addin.macroenabled.12"],
    ["ppd", "application/vnd.cups-ppd"],
    ["ppm", "image/x-portable-pixmap"],
    ["pps", ["application/vnd.ms-powerpoint", "application/mspowerpoint"]],
    ["ppsm", "application/vnd.ms-powerpoint.slideshow.macroenabled.12"],
    ["ppsx", "application/vnd.openxmlformats-officedocument.presentationml.slideshow"],
    ["ppt", ["application/vnd.ms-powerpoint", "application/mspowerpoint", "application/powerpoint", "application/x-mspowerpoint"]],
    ["pptm", "application/vnd.ms-powerpoint.presentation.macroenabled.12"],
    ["pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
    ["ppz", "application/mspowerpoint"],
    ["prc", "application/x-mobipocket-ebook"],
    ["pre", ["application/vnd.lotus-freelance", "application/x-freelance"]],
    ["prf", "application/pics-rules"],
    ["prt", "application/pro_eng"],
    ["ps", "application/postscript"],
    ["psb", "application/vnd.3gpp.pic-bw-small"],
    ["psd", ["application/octet-stream", "image/vnd.adobe.photoshop"]],
    ["psf", "application/x-font-linux-psf"],
    ["pskcxml", "application/pskc+xml"],
    ["ptid", "application/vnd.pvi.ptid1"],
    ["pub", "application/x-mspublisher"],
    ["pvb", "application/vnd.3gpp.pic-bw-var"],
    ["pvu", "paleovu/x-pv"],
    ["pwn", "application/vnd.3m.post-it-notes"],
    ["pwz", "application/vnd.ms-powerpoint"],
    ["py", "text/x-script.phyton"],
    ["pya", "audio/vnd.ms-playready.media.pya"],
    ["pyc", "application/x-bytecode.python"],
    ["pyv", "video/vnd.ms-playready.media.pyv"],
    ["qam", "application/vnd.epson.quickanime"],
    ["qbo", "application/vnd.intu.qbo"],
    ["qcp", "audio/vnd.qcelp"],
    ["qd3", "x-world/x-3dmf"],
    ["qd3d", "x-world/x-3dmf"],
    ["qfx", "application/vnd.intu.qfx"],
    ["qif", "image/x-quicktime"],
    ["qps", "application/vnd.publishare-delta-tree"],
    ["qt", "video/quicktime"],
    ["qtc", "video/x-qtc"],
    ["qti", "image/x-quicktime"],
    ["qtif", "image/x-quicktime"],
    ["qxd", "application/vnd.quark.quarkxpress"],
    ["ra", ["audio/x-realaudio", "audio/x-pn-realaudio", "audio/x-pn-realaudio-plugin"]],
    ["ram", "audio/x-pn-realaudio"],
    ["rar", "application/x-rar-compressed"],
    ["ras", ["image/cmu-raster", "application/x-cmu-raster", "image/x-cmu-raster"]],
    ["rast", "image/cmu-raster"],
    ["rcprofile", "application/vnd.ipunplugged.rcprofile"],
    ["rdf", "application/rdf+xml"],
    ["rdz", "application/vnd.data-vision.rdz"],
    ["rep", "application/vnd.businessobjects"],
    ["res", "application/x-dtbresource+xml"],
    ["rexx", "text/x-script.rexx"],
    ["rf", "image/vnd.rn-realflash"],
    ["rgb", "image/x-rgb"],
    ["rif", "application/reginfo+xml"],
    ["rip", "audio/vnd.rip"],
    ["rl", "application/resource-lists+xml"],
    ["rlc", "image/vnd.fujixerox.edmics-rlc"],
    ["rld", "application/resource-lists-diff+xml"],
    ["rm", ["application/vnd.rn-realmedia", "audio/x-pn-realaudio"]],
    ["rmi", "audio/mid"],
    ["rmm", "audio/x-pn-realaudio"],
    ["rmp", ["audio/x-pn-realaudio-plugin", "audio/x-pn-realaudio"]],
    ["rms", "application/vnd.jcp.javame.midlet-rms"],
    ["rnc", "application/relax-ng-compact-syntax"],
    ["rng", ["application/ringing-tones", "application/vnd.nokia.ringing-tone"]],
    ["rnx", "application/vnd.rn-realplayer"],
    ["roff", "application/x-troff"],
    ["rp", "image/vnd.rn-realpix"],
    ["rp9", "application/vnd.cloanto.rp9"],
    ["rpm", "audio/x-pn-realaudio-plugin"],
    ["rpss", "application/vnd.nokia.radio-presets"],
    ["rpst", "application/vnd.nokia.radio-preset"],
    ["rq", "application/sparql-query"],
    ["rs", "application/rls-services+xml"],
    ["rsd", "application/rsd+xml"],
    ["rt", ["text/richtext", "text/vnd.rn-realtext"]],
    ["rtf", ["application/rtf", "text/richtext", "application/x-rtf"]],
    ["rtx", ["text/richtext", "application/rtf"]],
    ["rv", "video/vnd.rn-realvideo"],
    ["s", "text/x-asm"],
    ["s3m", "audio/s3m"],
    ["saf", "application/vnd.yamaha.smaf-audio"],
    ["saveme", "application/octet-stream"],
    ["sbk", "application/x-tbook"],
    ["sbml", "application/sbml+xml"],
    ["sc", "application/vnd.ibm.secure-container"],
    ["scd", "application/x-msschedule"],
    ["scm", ["application/vnd.lotus-screencam", "video/x-scm", "text/x-script.guile", "application/x-lotusscreencam", "text/x-script.scheme"]],
    ["scq", "application/scvp-cv-request"],
    ["scs", "application/scvp-cv-response"],
    ["sct", "text/scriptlet"],
    ["scurl", "text/vnd.curl.scurl"],
    ["sda", "application/vnd.stardivision.draw"],
    ["sdc", "application/vnd.stardivision.calc"],
    ["sdd", "application/vnd.stardivision.impress"],
    ["sdkm", "application/vnd.solent.sdkm+xml"],
    ["sdml", "text/plain"],
    ["sdp", ["application/sdp", "application/x-sdp"]],
    ["sdr", "application/sounder"],
    ["sdw", "application/vnd.stardivision.writer"],
    ["sea", ["application/sea", "application/x-sea"]],
    ["see", "application/vnd.seemail"],
    ["seed", "application/vnd.fdsn.seed"],
    ["sema", "application/vnd.sema"],
    ["semd", "application/vnd.semd"],
    ["semf", "application/vnd.semf"],
    ["ser", "application/java-serialized-object"],
    ["set", "application/set"],
    ["setpay", "application/set-payment-initiation"],
    ["setreg", "application/set-registration-initiation"],
    ["sfd-hdstx", "application/vnd.hydrostatix.sof-data"],
    ["sfs", "application/vnd.spotfire.sfs"],
    ["sgl", "application/vnd.stardivision.writer-global"],
    ["sgm", ["text/sgml", "text/x-sgml"]],
    ["sgml", ["text/sgml", "text/x-sgml"]],
    ["sh", ["application/x-shar", "application/x-bsh", "application/x-sh", "text/x-script.sh"]],
    ["shar", ["application/x-bsh", "application/x-shar"]],
    ["shf", "application/shf+xml"],
    ["shtml", ["text/html", "text/x-server-parsed-html"]],
    ["sid", "audio/x-psid"],
    ["sis", "application/vnd.symbian.install"],
    ["sit", ["application/x-stuffit", "application/x-sit"]],
    ["sitx", "application/x-stuffitx"],
    ["skd", "application/x-koan"],
    ["skm", "application/x-koan"],
    ["skp", ["application/vnd.koan", "application/x-koan"]],
    ["skt", "application/x-koan"],
    ["sl", "application/x-seelogo"],
    ["sldm", "application/vnd.ms-powerpoint.slide.macroenabled.12"],
    ["sldx", "application/vnd.openxmlformats-officedocument.presentationml.slide"],
    ["slt", "application/vnd.epson.salt"],
    ["sm", "application/vnd.stepmania.stepchart"],
    ["smf", "application/vnd.stardivision.math"],
    ["smi", ["application/smil", "application/smil+xml"]],
    ["smil", "application/smil"],
    ["snd", ["audio/basic", "audio/x-adpcm"]],
    ["snf", "application/x-font-snf"],
    ["sol", "application/solids"],
    ["spc", ["text/x-speech", "application/x-pkcs7-certificates"]],
    ["spf", "application/vnd.yamaha.smaf-phrase"],
    ["spl", ["application/futuresplash", "application/x-futuresplash"]],
    ["spot", "text/vnd.in3d.spot"],
    ["spp", "application/scvp-vp-response"],
    ["spq", "application/scvp-vp-request"],
    ["spr", "application/x-sprite"],
    ["sprite", "application/x-sprite"],
    ["src", "application/x-wais-source"],
    ["sru", "application/sru+xml"],
    ["srx", "application/sparql-results+xml"],
    ["sse", "application/vnd.kodak-descriptor"],
    ["ssf", "application/vnd.epson.ssf"],
    ["ssi", "text/x-server-parsed-html"],
    ["ssm", "application/streamingmedia"],
    ["ssml", "application/ssml+xml"],
    ["sst", ["application/vnd.ms-pkicertstore", "application/vnd.ms-pki.certstore"]],
    ["st", "application/vnd.sailingtracker.track"],
    ["stc", "application/vnd.sun.xml.calc.template"],
    ["std", "application/vnd.sun.xml.draw.template"],
    ["step", "application/step"],
    ["stf", "application/vnd.wt.stf"],
    ["sti", "application/vnd.sun.xml.impress.template"],
    ["stk", "application/hyperstudio"],
    ["stl", ["application/vnd.ms-pkistl", "application/sla", "application/vnd.ms-pki.stl", "application/x-navistyle"]],
    ["stm", "text/html"],
    ["stp", "application/step"],
    ["str", "application/vnd.pg.format"],
    ["stw", "application/vnd.sun.xml.writer.template"],
    ["sub", "image/vnd.dvb.subtitle"],
    ["sus", "application/vnd.sus-calendar"],
    ["sv4cpio", "application/x-sv4cpio"],
    ["sv4crc", "application/x-sv4crc"],
    ["svc", "application/vnd.dvb.service"],
    ["svd", "application/vnd.svd"],
    ["svf", ["image/vnd.dwg", "image/x-dwg"]],
    ["svg", "image/svg+xml"],
    ["svr", ["x-world/x-svr", "application/x-world"]],
    ["swf", "application/x-shockwave-flash"],
    ["swi", "application/vnd.aristanetworks.swi"],
    ["sxc", "application/vnd.sun.xml.calc"],
    ["sxd", "application/vnd.sun.xml.draw"],
    ["sxg", "application/vnd.sun.xml.writer.global"],
    ["sxi", "application/vnd.sun.xml.impress"],
    ["sxm", "application/vnd.sun.xml.math"],
    ["sxw", "application/vnd.sun.xml.writer"],
    ["t", ["text/troff", "application/x-troff"]],
    ["talk", "text/x-speech"],
    ["tao", "application/vnd.tao.intent-module-archive"],
    ["tar", "application/x-tar"],
    ["tbk", ["application/toolbook", "application/x-tbook"]],
    ["tcap", "application/vnd.3gpp2.tcap"],
    ["tcl", ["text/x-script.tcl", "application/x-tcl"]],
    ["tcsh", "text/x-script.tcsh"],
    ["teacher", "application/vnd.smart.teacher"],
    ["tei", "application/tei+xml"],
    ["tex", "application/x-tex"],
    ["texi", "application/x-texinfo"],
    ["texinfo", "application/x-texinfo"],
    ["text", ["application/plain", "text/plain"]],
    ["tfi", "application/thraud+xml"],
    ["tfm", "application/x-tex-tfm"],
    ["tgz", ["application/gnutar", "application/x-compressed"]],
    ["thmx", "application/vnd.ms-officetheme"],
    ["tif", ["image/tiff", "image/x-tiff"]],
    ["tiff", ["image/tiff", "image/x-tiff"]],
    ["tmo", "application/vnd.tmobile-livetv"],
    ["torrent", "application/x-bittorrent"],
    ["tpl", "application/vnd.groove-tool-template"],
    ["tpt", "application/vnd.trid.tpt"],
    ["tr", "application/x-troff"],
    ["tra", "application/vnd.trueapp"],
    ["trm", "application/x-msterminal"],
    ["tsd", "application/timestamped-data"],
    ["tsi", "audio/tsp-audio"],
    ["tsp", ["application/dsptype", "audio/tsplayer"]],
    ["tsv", "text/tab-separated-values"],
    ["ttf", "application/x-font-ttf"],
    ["ttl", "text/turtle"],
    ["turbot", "image/florian"],
    ["twd", "application/vnd.simtech-mindmapper"],
    ["txd", "application/vnd.genomatix.tuxedo"],
    ["txf", "application/vnd.mobius.txf"],
    ["txt", "text/plain"],
    ["ufd", "application/vnd.ufdl"],
    ["uil", "text/x-uil"],
    ["uls", "text/iuls"],
    ["umj", "application/vnd.umajin"],
    ["uni", "text/uri-list"],
    ["unis", "text/uri-list"],
    ["unityweb", "application/vnd.unity"],
    ["unv", "application/i-deas"],
    ["uoml", "application/vnd.uoml+xml"],
    ["uri", "text/uri-list"],
    ["uris", "text/uri-list"],
    ["ustar", ["application/x-ustar", "multipart/x-ustar"]],
    ["utz", "application/vnd.uiq.theme"],
    ["uu", ["application/octet-stream", "text/x-uuencode"]],
    ["uue", "text/x-uuencode"],
    ["uva", "audio/vnd.dece.audio"],
    ["uvh", "video/vnd.dece.hd"],
    ["uvi", "image/vnd.dece.graphic"],
    ["uvm", "video/vnd.dece.mobile"],
    ["uvp", "video/vnd.dece.pd"],
    ["uvs", "video/vnd.dece.sd"],
    ["uvu", "video/vnd.uvvu.mp4"],
    ["uvv", "video/vnd.dece.video"],
    ["vcd", "application/x-cdlink"],
    ["vcf", "text/x-vcard"],
    ["vcg", "application/vnd.groove-vcard"],
    ["vcs", "text/x-vcalendar"],
    ["vcx", "application/vnd.vcx"],
    ["vda", "application/vda"],
    ["vdo", "video/vdo"],
    ["vew", "application/groupwise"],
    ["vis", "application/vnd.visionary"],
    ["viv", ["video/vivo", "video/vnd.vivo"]],
    ["vivo", ["video/vivo", "video/vnd.vivo"]],
    ["vmd", "application/vocaltec-media-desc"],
    ["vmf", "application/vocaltec-media-file"],
    ["voc", ["audio/voc", "audio/x-voc"]],
    ["vos", "video/vosaic"],
    ["vox", "audio/voxware"],
    ["vqe", "audio/x-twinvq-plugin"],
    ["vqf", "audio/x-twinvq"],
    ["vql", "audio/x-twinvq-plugin"],
    ["vrml", ["model/vrml", "x-world/x-vrml", "application/x-vrml"]],
    ["vrt", "x-world/x-vrt"],
    ["vsd", ["application/vnd.visio", "application/x-visio"]],
    ["vsf", "application/vnd.vsf"],
    ["vst", "application/x-visio"],
    ["vsw", "application/x-visio"],
    ["vtu", "model/vnd.vtu"],
    ["vxml", "application/voicexml+xml"],
    ["w60", "application/wordperfect6.0"],
    ["w61", "application/wordperfect6.1"],
    ["w6w", "application/msword"],
    ["wad", "application/x-doom"],
    ["wav", ["audio/wav", "audio/x-wav"]],
    ["wax", "audio/x-ms-wax"],
    ["wb1", "application/x-qpro"],
    ["wbmp", "image/vnd.wap.wbmp"],
    ["wbs", "application/vnd.criticaltools.wbs+xml"],
    ["wbxml", "application/vnd.wap.wbxml"],
    ["wcm", "application/vnd.ms-works"],
    ["wdb", "application/vnd.ms-works"],
    ["web", "application/vnd.xara"],
    ["weba", "audio/webm"],
    ["webm", "video/webm"],
    ["webp", "image/webp"],
    ["wg", "application/vnd.pmi.widget"],
    ["wgt", "application/widget"],
    ["wiz", "application/msword"],
    ["wk1", "application/x-123"],
    ["wks", "application/vnd.ms-works"],
    ["wm", "video/x-ms-wm"],
    ["wma", "audio/x-ms-wma"],
    ["wmd", "application/x-ms-wmd"],
    ["wmf", ["windows/metafile", "application/x-msmetafile"]],
    ["wml", "text/vnd.wap.wml"],
    ["wmlc", "application/vnd.wap.wmlc"],
    ["wmls", "text/vnd.wap.wmlscript"],
    ["wmlsc", "application/vnd.wap.wmlscriptc"],
    ["wmv", "video/x-ms-wmv"],
    ["wmx", "video/x-ms-wmx"],
    ["wmz", "application/x-ms-wmz"],
    ["woff", "application/x-font-woff"],
    ["word", "application/msword"],
    ["wp", "application/wordperfect"],
    ["wp5", ["application/wordperfect", "application/wordperfect6.0"]],
    ["wp6", "application/wordperfect"],
    ["wpd", ["application/wordperfect", "application/vnd.wordperfect", "application/x-wpwin"]],
    ["wpl", "application/vnd.ms-wpl"],
    ["wps", "application/vnd.ms-works"],
    ["wq1", "application/x-lotus"],
    ["wqd", "application/vnd.wqd"],
    ["wri", ["application/mswrite", "application/x-wri", "application/x-mswrite"]],
    ["wrl", ["model/vrml", "x-world/x-vrml", "application/x-world"]],
    ["wrz", ["model/vrml", "x-world/x-vrml"]],
    ["wsc", "text/scriplet"],
    ["wsdl", "application/wsdl+xml"],
    ["wspolicy", "application/wspolicy+xml"],
    ["wsrc", "application/x-wais-source"],
    ["wtb", "application/vnd.webturbo"],
    ["wtk", "application/x-wintalk"],
    ["wvx", "video/x-ms-wvx"],
    ["x-png", "image/png"],
    ["x3d", "application/vnd.hzn-3d-crossword"],
    ["xaf", "x-world/x-vrml"],
    ["xap", "application/x-silverlight-app"],
    ["xar", "application/vnd.xara"],
    ["xbap", "application/x-ms-xbap"],
    ["xbd", "application/vnd.fujixerox.docuworks.binder"],
    ["xbm", ["image/xbm", "image/x-xbm", "image/x-xbitmap"]],
    ["xdf", "application/xcap-diff+xml"],
    ["xdm", "application/vnd.syncml.dm+xml"],
    ["xdp", "application/vnd.adobe.xdp+xml"],
    ["xdr", "video/x-amt-demorun"],
    ["xdssc", "application/dssc+xml"],
    ["xdw", "application/vnd.fujixerox.docuworks"],
    ["xenc", "application/xenc+xml"],
    ["xer", "application/patch-ops-error+xml"],
    ["xfdf", "application/vnd.adobe.xfdf"],
    ["xfdl", "application/vnd.xfdl"],
    ["xgz", "xgl/drawing"],
    ["xhtml", "application/xhtml+xml"],
    ["xif", "image/vnd.xiff"],
    ["xl", "application/excel"],
    ["xla", ["application/vnd.ms-excel", "application/excel", "application/x-msexcel", "application/x-excel"]],
    ["xlam", "application/vnd.ms-excel.addin.macroenabled.12"],
    ["xlb", ["application/excel", "application/vnd.ms-excel", "application/x-excel"]],
    ["xlc", ["application/vnd.ms-excel", "application/excel", "application/x-excel"]],
    ["xld", ["application/excel", "application/x-excel"]],
    ["xlk", ["application/excel", "application/x-excel"]],
    ["xll", ["application/excel", "application/vnd.ms-excel", "application/x-excel"]],
    ["xlm", ["application/vnd.ms-excel", "application/excel", "application/x-excel"]],
    ["xls", ["application/vnd.ms-excel", "application/excel", "application/x-msexcel", "application/x-excel"]],
    ["xlsb", "application/vnd.ms-excel.sheet.binary.macroenabled.12"],
    ["xlsm", "application/vnd.ms-excel.sheet.macroenabled.12"],
    ["xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
    ["xlt", ["application/vnd.ms-excel", "application/excel", "application/x-excel"]],
    ["xltm", "application/vnd.ms-excel.template.macroenabled.12"],
    ["xltx", "application/vnd.openxmlformats-officedocument.spreadsheetml.template"],
    ["xlv", ["application/excel", "application/x-excel"]],
    ["xlw", ["application/vnd.ms-excel", "application/excel", "application/x-msexcel", "application/x-excel"]],
    ["xm", "audio/xm"],
    ["xml", ["application/xml", "text/xml", "application/atom+xml", "application/rss+xml"]],
    ["xmz", "xgl/movie"],
    ["xo", "application/vnd.olpc-sugar"],
    ["xof", "x-world/x-vrml"],
    ["xop", "application/xop+xml"],
    ["xpi", "application/x-xpinstall"],
    ["xpix", "application/x-vnd.ls-xpix"],
    ["xpm", ["image/xpm", "image/x-xpixmap"]],
    ["xpr", "application/vnd.is-xpr"],
    ["xps", "application/vnd.ms-xpsdocument"],
    ["xpw", "application/vnd.intercon.formnet"],
    ["xslt", "application/xslt+xml"],
    ["xsm", "application/vnd.syncml+xml"],
    ["xspf", "application/xspf+xml"],
    ["xsr", "video/x-amt-showrun"],
    ["xul", "application/vnd.mozilla.xul+xml"],
    ["xwd", ["image/x-xwd", "image/x-xwindowdump"]],
    ["xyz", ["chemical/x-xyz", "chemical/x-pdb"]],
    ["yang", "application/yang"],
    ["yin", "application/yin+xml"],
    ["z", ["application/x-compressed", "application/x-compress"]],
    ["zaz", "application/vnd.zzazz.deck+xml"],
    ["zip", ["application/zip", "multipart/x-zip", "application/x-zip-compressed", "application/x-compressed"]],
    ["zir", "application/vnd.zul"],
    ["zmm", "application/vnd.handheld-entertainment+xml"],
    ["zoo", "application/octet-stream"],
    ["zsh", "text/x-script.zsh"]
  ]);
  module.exports = {
    detectMimeType(filename) {
      if (!filename) {
        return defaultMimeType;
      }
      let parsed = path.parse(filename);
      let extension = (parsed.ext.substr(1) || parsed.name || "").split("?").shift().trim().toLowerCase();
      let value = defaultMimeType;
      if (extensions.has(extension)) {
        value = extensions.get(extension);
      }
      if (Array.isArray(value)) {
        return value[0];
      }
      return value;
    },
    detectExtension(mimeType) {
      if (!mimeType) {
        return defaultExtension;
      }
      let parts = (mimeType || "").toLowerCase().trim().split("/");
      let rootType = parts.shift().trim();
      let subType = parts.join("/").trim();
      if (mimeTypes.has(rootType + "/" + subType)) {
        let value = mimeTypes.get(rootType + "/" + subType);
        if (Array.isArray(value)) {
          return value[0];
        }
        return value;
      }
      switch (rootType) {
        case "text":
          return "txt";
        default:
          return "bin";
      }
    }
  };
});

// node_modules/nodemailer/lib/punycode/index.js
var require_punycode = __commonJS((exports, module) => {
  var maxInt = 2147483647;
  var base = 36;
  var tMin = 1;
  var tMax = 26;
  var skew = 38;
  var damp = 700;
  var initialBias = 72;
  var initialN = 128;
  var delimiter = "-";
  var regexPunycode = /^xn--/;
  var regexNonASCII = /[^\0-\x7F]/;
  var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
  var errors = {
    overflow: "Overflow: input needs wider integers to process",
    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
    "invalid-input": "Invalid input"
  };
  var baseMinusTMin = base - tMin;
  var floor = Math.floor;
  var stringFromCharCode = String.fromCharCode;
  function error(type) {
    throw new RangeError(errors[type]);
  }
  function map(array, callback) {
    const result = [];
    let length = array.length;
    while (length--) {
      result[length] = callback(array[length]);
    }
    return result;
  }
  function mapDomain(domain, callback) {
    const parts = domain.split("@");
    let result = "";
    if (parts.length > 1) {
      result = parts[0] + "@";
      domain = parts[1];
    }
    domain = domain.replace(regexSeparators, ".");
    const labels = domain.split(".");
    const encoded = map(labels, callback).join(".");
    return result + encoded;
  }
  function ucs2decode(string) {
    const output = [];
    let counter = 0;
    const length = string.length;
    while (counter < length) {
      const value = string.charCodeAt(counter++);
      if (value >= 55296 && value <= 56319 && counter < length) {
        const extra = string.charCodeAt(counter++);
        if ((extra & 64512) == 56320) {
          output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
        } else {
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }
    return output;
  }
  var ucs2encode = (codePoints) => String.fromCodePoint(...codePoints);
  var basicToDigit = function(codePoint) {
    if (codePoint >= 48 && codePoint < 58) {
      return 26 + (codePoint - 48);
    }
    if (codePoint >= 65 && codePoint < 91) {
      return codePoint - 65;
    }
    if (codePoint >= 97 && codePoint < 123) {
      return codePoint - 97;
    }
    return base;
  };
  var digitToBasic = function(digit, flag) {
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  };
  var adapt = function(delta, numPoints, firstTime) {
    let k = 0;
    delta = firstTime ? floor(delta / damp) : delta >> 1;
    delta += floor(delta / numPoints);
    for (;delta > baseMinusTMin * tMax >> 1; k += base) {
      delta = floor(delta / baseMinusTMin);
    }
    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
  };
  var decode = function(input) {
    const output = [];
    const inputLength = input.length;
    let i = 0;
    let n = initialN;
    let bias = initialBias;
    let basic = input.lastIndexOf(delimiter);
    if (basic < 0) {
      basic = 0;
    }
    for (let j = 0;j < basic; ++j) {
      if (input.charCodeAt(j) >= 128) {
        error("not-basic");
      }
      output.push(input.charCodeAt(j));
    }
    for (let index = basic > 0 ? basic + 1 : 0;index < inputLength; ) {
      const oldi = i;
      for (let w = 1, k = base;; k += base) {
        if (index >= inputLength) {
          error("invalid-input");
        }
        const digit = basicToDigit(input.charCodeAt(index++));
        if (digit >= base) {
          error("invalid-input");
        }
        if (digit > floor((maxInt - i) / w)) {
          error("overflow");
        }
        i += digit * w;
        const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
        if (digit < t) {
          break;
        }
        const baseMinusT = base - t;
        if (w > floor(maxInt / baseMinusT)) {
          error("overflow");
        }
        w *= baseMinusT;
      }
      const out = output.length + 1;
      bias = adapt(i - oldi, out, oldi == 0);
      if (floor(i / out) > maxInt - n) {
        error("overflow");
      }
      n += floor(i / out);
      i %= out;
      output.splice(i++, 0, n);
    }
    return String.fromCodePoint(...output);
  };
  var encode = function(input) {
    const output = [];
    input = ucs2decode(input);
    const inputLength = input.length;
    let n = initialN;
    let delta = 0;
    let bias = initialBias;
    for (const currentValue of input) {
      if (currentValue < 128) {
        output.push(stringFromCharCode(currentValue));
      }
    }
    const basicLength = output.length;
    let handledCPCount = basicLength;
    if (basicLength) {
      output.push(delimiter);
    }
    while (handledCPCount < inputLength) {
      let m = maxInt;
      for (const currentValue of input) {
        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      }
      const handledCPCountPlusOne = handledCPCount + 1;
      if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
        error("overflow");
      }
      delta += (m - n) * handledCPCountPlusOne;
      n = m;
      for (const currentValue of input) {
        if (currentValue < n && ++delta > maxInt) {
          error("overflow");
        }
        if (currentValue === n) {
          let q = delta;
          for (let k = base;; k += base) {
            const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (q < t) {
              break;
            }
            const qMinusT = q - t;
            const baseMinusT = base - t;
            output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
            q = floor(qMinusT / baseMinusT);
          }
          output.push(stringFromCharCode(digitToBasic(q, 0)));
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
          delta = 0;
          ++handledCPCount;
        }
      }
      ++delta;
      ++n;
    }
    return output.join("");
  };
  var toUnicode = function(input) {
    return mapDomain(input, function(string) {
      return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
    });
  };
  var toASCII = function(input) {
    return mapDomain(input, function(string) {
      return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
    });
  };
  var punycode = {
    version: "2.3.1",
    ucs2: {
      decode: ucs2decode,
      encode: ucs2encode
    },
    decode,
    encode,
    toASCII,
    toUnicode
  };
  module.exports = punycode;
});

// node_modules/nodemailer/lib/base64/index.js
var require_base64 = __commonJS((exports, module) => {
  var Transform = __require("node:stream").Transform;
  function encode(buffer) {
    if (typeof buffer === "string") {
      buffer = Buffer.from(buffer, "utf-8");
    }
    return buffer.toString("base64");
  }
  function wrap(str, lineLength) {
    str = (str || "").toString();
    lineLength = lineLength || 76;
    if (str.length <= lineLength) {
      return str;
    }
    let result = [];
    let pos = 0;
    let chunkLength = lineLength * 1024;
    while (pos < str.length) {
      let wrappedLines = str.substr(pos, chunkLength).replace(new RegExp(".{" + lineLength + "}", "g"), `$&\r
`).trim();
      result.push(wrappedLines);
      pos += chunkLength;
    }
    return result.join(`\r
`).trim();
  }

  class Encoder extends Transform {
    constructor(options) {
      super();
      this.options = options || {};
      if (this.options.lineLength !== false) {
        this.options.lineLength = this.options.lineLength || 76;
      }
      this._curLine = "";
      this._remainingBytes = false;
      this.inputBytes = 0;
      this.outputBytes = 0;
    }
    _transform(chunk, encoding, done) {
      if (encoding !== "buffer") {
        chunk = Buffer.from(chunk, encoding);
      }
      if (!chunk || !chunk.length) {
        return setImmediate(done);
      }
      this.inputBytes += chunk.length;
      if (this._remainingBytes && this._remainingBytes.length) {
        chunk = Buffer.concat([this._remainingBytes, chunk], this._remainingBytes.length + chunk.length);
        this._remainingBytes = false;
      }
      if (chunk.length % 3) {
        this._remainingBytes = chunk.slice(chunk.length - chunk.length % 3);
        chunk = chunk.slice(0, chunk.length - chunk.length % 3);
      } else {
        this._remainingBytes = false;
      }
      let b64 = this._curLine + encode(chunk);
      if (this.options.lineLength) {
        b64 = wrap(b64, this.options.lineLength);
        let lastLF = b64.lastIndexOf(`
`);
        if (lastLF < 0) {
          this._curLine = b64;
          b64 = "";
        } else if (lastLF === b64.length - 1) {
          this._curLine = "";
        } else {
          this._curLine = b64.substr(lastLF + 1);
          b64 = b64.substr(0, lastLF + 1);
        }
      }
      if (b64) {
        this.outputBytes += b64.length;
        this.push(Buffer.from(b64, "ascii"));
      }
      setImmediate(done);
    }
    _flush(done) {
      if (this._remainingBytes && this._remainingBytes.length) {
        this._curLine += encode(this._remainingBytes);
      }
      if (this._curLine) {
        this._curLine = wrap(this._curLine, this.options.lineLength);
        this.outputBytes += this._curLine.length;
        this.push(this._curLine, "ascii");
        this._curLine = "";
      }
      done();
    }
  }
  module.exports = {
    encode,
    wrap,
    Encoder
  };
});

// node_modules/nodemailer/lib/qp/index.js
var require_qp = __commonJS((exports, module) => {
  var Transform = __require("node:stream").Transform;
  function encode(buffer) {
    if (typeof buffer === "string") {
      buffer = Buffer.from(buffer, "utf-8");
    }
    let ranges = [
      [9],
      [10],
      [13],
      [32, 60],
      [62, 126]
    ];
    let result = "";
    let ord;
    for (let i = 0, len = buffer.length;i < len; i++) {
      ord = buffer[i];
      if (checkRanges(ord, ranges) && !((ord === 32 || ord === 9) && (i === len - 1 || buffer[i + 1] === 10 || buffer[i + 1] === 13))) {
        result += String.fromCharCode(ord);
        continue;
      }
      result += "=" + (ord < 16 ? "0" : "") + ord.toString(16).toUpperCase();
    }
    return result;
  }
  function wrap(str, lineLength) {
    str = (str || "").toString();
    lineLength = lineLength || 76;
    if (str.length <= lineLength) {
      return str;
    }
    let pos = 0;
    let len = str.length;
    let match, code, line;
    let lineMargin = Math.floor(lineLength / 3);
    let result = "";
    while (pos < len) {
      line = str.substr(pos, lineLength);
      if (match = line.match(/\r\n/)) {
        line = line.substr(0, match.index + match[0].length);
        result += line;
        pos += line.length;
        continue;
      }
      if (line.substr(-1) === `
`) {
        result += line;
        pos += line.length;
        continue;
      } else if (match = line.substr(-lineMargin).match(/\n.*?$/)) {
        line = line.substr(0, line.length - (match[0].length - 1));
        result += line;
        pos += line.length;
        continue;
      } else if (line.length > lineLength - lineMargin && (match = line.substr(-lineMargin).match(/[ \t.,!?][^ \t.,!?]*$/))) {
        line = line.substr(0, line.length - (match[0].length - 1));
      } else if (line.match(/[=][\da-f]{0,2}$/i)) {
        if (match = line.match(/[=][\da-f]{0,1}$/i)) {
          line = line.substr(0, line.length - match[0].length);
        }
        while (line.length > 3 && line.length < len - pos && !line.match(/^(?:=[\da-f]{2}){1,4}$/i) && (match = line.match(/[=][\da-f]{2}$/gi))) {
          code = parseInt(match[0].substr(1, 2), 16);
          if (code < 128) {
            break;
          }
          line = line.substr(0, line.length - 3);
          if (code >= 192) {
            break;
          }
        }
      }
      if (pos + line.length < len && line.substr(-1) !== `
`) {
        if (line.length === lineLength && line.match(/[=][\da-f]{2}$/i)) {
          line = line.substr(0, line.length - 3);
        } else if (line.length === lineLength) {
          line = line.substr(0, line.length - 1);
        }
        pos += line.length;
        line += `=\r
`;
      } else {
        pos += line.length;
      }
      result += line;
    }
    return result;
  }
  function checkRanges(nr, ranges) {
    for (let i = ranges.length - 1;i >= 0; i--) {
      if (!ranges[i].length) {
        continue;
      }
      if (ranges[i].length === 1 && nr === ranges[i][0]) {
        return true;
      }
      if (ranges[i].length === 2 && nr >= ranges[i][0] && nr <= ranges[i][1]) {
        return true;
      }
    }
    return false;
  }

  class Encoder extends Transform {
    constructor(options) {
      super();
      this.options = options || {};
      if (this.options.lineLength !== false) {
        this.options.lineLength = this.options.lineLength || 76;
      }
      this._curLine = "";
      this.inputBytes = 0;
      this.outputBytes = 0;
    }
    _transform(chunk, encoding, done) {
      let qp;
      if (encoding !== "buffer") {
        chunk = Buffer.from(chunk, encoding);
      }
      if (!chunk || !chunk.length) {
        return done();
      }
      this.inputBytes += chunk.length;
      if (this.options.lineLength) {
        qp = this._curLine + encode(chunk);
        qp = wrap(qp, this.options.lineLength);
        qp = qp.replace(/(^|\n)([^\n]*)$/, (match, lineBreak, lastLine) => {
          this._curLine = lastLine;
          return lineBreak;
        });
        if (qp) {
          this.outputBytes += qp.length;
          this.push(qp);
        }
      } else {
        qp = encode(chunk);
        this.outputBytes += qp.length;
        this.push(qp, "ascii");
      }
      done();
    }
    _flush(done) {
      if (this._curLine) {
        this.outputBytes += this._curLine.length;
        this.push(this._curLine, "ascii");
      }
      done();
    }
  }
  module.exports = {
    encode,
    wrap,
    Encoder
  };
});

// node_modules/nodemailer/lib/mime-funcs/index.js
var require_mime_funcs = __commonJS((exports, module) => {
  var base64 = require_base64();
  var qp = require_qp();
  var mimeTypes = require_mime_types();
  module.exports = {
    isPlainText(value, isParam) {
      const re = isParam ? /[\x00-\x08\x0b\x0c\x0e-\x1f"\u0080-\uFFFF]/ : /[\x00-\x08\x0b\x0c\x0e-\x1f\u0080-\uFFFF]/;
      if (typeof value !== "string" || re.test(value)) {
        return false;
      } else {
        return true;
      }
    },
    hasLongerLines(str, lineLength) {
      if (str.length > 128 * 1024) {
        return true;
      }
      return new RegExp("^.{" + (lineLength + 1) + ",}", "m").test(str);
    },
    encodeWord(data, mimeWordEncoding, maxLength) {
      mimeWordEncoding = (mimeWordEncoding || "Q").toString().toUpperCase().trim().charAt(0);
      maxLength = maxLength || 0;
      let encodedStr;
      let toCharset = "UTF-8";
      if (maxLength && maxLength > 7 + toCharset.length) {
        maxLength -= 7 + toCharset.length;
      }
      if (mimeWordEncoding === "Q") {
        encodedStr = qp.encode(data).replace(/[^a-z0-9!*+\-/=]/gi, (chr) => {
          let ord = chr.charCodeAt(0).toString(16).toUpperCase();
          if (chr === " ") {
            return "_";
          } else {
            return "=" + (ord.length === 1 ? "0" + ord : ord);
          }
        });
      } else if (mimeWordEncoding === "B") {
        encodedStr = typeof data === "string" ? data : base64.encode(data);
        maxLength = maxLength ? Math.max(3, (maxLength - maxLength % 4) / 4 * 3) : 0;
      }
      if (maxLength && (mimeWordEncoding !== "B" ? encodedStr : base64.encode(data)).length > maxLength) {
        if (mimeWordEncoding === "Q") {
          encodedStr = this.splitMimeEncodedString(encodedStr, maxLength).join("?= =?" + toCharset + "?" + mimeWordEncoding + "?");
        } else {
          let parts = [];
          let lpart = "";
          for (let i = 0, len = encodedStr.length;i < len; i++) {
            let chr = encodedStr.charAt(i);
            if (/[\ud83c\ud83d\ud83e]/.test(chr) && i < len - 1) {
              chr += encodedStr.charAt(++i);
            }
            if (Buffer.byteLength(lpart + chr) <= maxLength || i === 0) {
              lpart += chr;
            } else {
              parts.push(base64.encode(lpart));
              lpart = chr;
            }
          }
          if (lpart) {
            parts.push(base64.encode(lpart));
          }
          if (parts.length > 1) {
            encodedStr = parts.join("?= =?" + toCharset + "?" + mimeWordEncoding + "?");
          } else {
            encodedStr = parts.join("");
          }
        }
      } else if (mimeWordEncoding === "B") {
        encodedStr = base64.encode(data);
      }
      return "=?" + toCharset + "?" + mimeWordEncoding + "?" + encodedStr + (encodedStr.substr(-2) === "?=" ? "" : "?=");
    },
    encodeWords(value, mimeWordEncoding, maxLength, encodeAll) {
      maxLength = maxLength || 0;
      let encodedValue;
      let firstMatch = value.match(/(?:^|\s)([^\s]*["\u0080-\uFFFF])/);
      if (!firstMatch) {
        return value;
      }
      if (encodeAll) {
        return this.encodeWord(value, mimeWordEncoding, maxLength);
      }
      let lastMatch = value.match(/(["\u0080-\uFFFF][^\s]*)[^"\u0080-\uFFFF]*$/);
      if (!lastMatch) {
        return value;
      }
      let startIndex = firstMatch.index + (firstMatch[0].match(/[^\s]/) || {
        index: 0
      }).index;
      let endIndex = lastMatch.index + (lastMatch[1] || "").length;
      encodedValue = (startIndex ? value.substr(0, startIndex) : "") + this.encodeWord(value.substring(startIndex, endIndex), mimeWordEncoding || "Q", maxLength) + (endIndex < value.length ? value.substr(endIndex) : "");
      return encodedValue;
    },
    buildHeaderValue(structured) {
      let paramsArray = [];
      Object.keys(structured.params || {}).forEach((param) => {
        let value = structured.params[param];
        if (!this.isPlainText(value, true) || value.length >= 75) {
          this.buildHeaderParam(param, value, 50).forEach((encodedParam) => {
            if (!/[\s"\\;:/=(),<>@[\]?]|^[-']|'$/.test(encodedParam.value) || encodedParam.key.substr(-1) === "*") {
              paramsArray.push(encodedParam.key + "=" + encodedParam.value);
            } else {
              paramsArray.push(encodedParam.key + "=" + JSON.stringify(encodedParam.value));
            }
          });
        } else if (/[\s'"\\;:/=(),<>@[\]?]|^-/.test(value)) {
          paramsArray.push(param + "=" + JSON.stringify(value));
        } else {
          paramsArray.push(param + "=" + value);
        }
      });
      return structured.value + (paramsArray.length ? "; " + paramsArray.join("; ") : "");
    },
    buildHeaderParam(key, data, maxLength) {
      let list = [];
      let encodedStr = typeof data === "string" ? data : (data || "").toString();
      let encodedStrArr;
      let chr, ord;
      let line;
      let startPos = 0;
      let i, len;
      maxLength = maxLength || 50;
      if (this.isPlainText(data, true)) {
        if (encodedStr.length <= maxLength) {
          return [
            {
              key,
              value: encodedStr
            }
          ];
        }
        encodedStr = encodedStr.replace(new RegExp(".{" + maxLength + "}", "g"), (str) => {
          list.push({
            line: str
          });
          return "";
        });
        if (encodedStr) {
          list.push({
            line: encodedStr
          });
        }
      } else {
        if (/[\uD800-\uDBFF]/.test(encodedStr)) {
          encodedStrArr = [];
          for (i = 0, len = encodedStr.length;i < len; i++) {
            chr = encodedStr.charAt(i);
            ord = chr.charCodeAt(0);
            if (ord >= 55296 && ord <= 56319 && i < len - 1) {
              chr += encodedStr.charAt(i + 1);
              encodedStrArr.push(chr);
              i++;
            } else {
              encodedStrArr.push(chr);
            }
          }
          encodedStr = encodedStrArr;
        }
        line = "utf-8''";
        let encoded = true;
        startPos = 0;
        for (i = 0, len = encodedStr.length;i < len; i++) {
          chr = encodedStr[i];
          if (encoded) {
            chr = this.safeEncodeURIComponent(chr);
          } else {
            chr = chr === " " ? chr : this.safeEncodeURIComponent(chr);
            if (chr !== encodedStr[i]) {
              if ((this.safeEncodeURIComponent(line) + chr).length >= maxLength) {
                list.push({
                  line,
                  encoded
                });
                line = "";
                startPos = i - 1;
              } else {
                encoded = true;
                i = startPos;
                line = "";
                continue;
              }
            }
          }
          if ((line + chr).length >= maxLength) {
            list.push({
              line,
              encoded
            });
            line = chr = encodedStr[i] === " " ? " " : this.safeEncodeURIComponent(encodedStr[i]);
            if (chr === encodedStr[i]) {
              encoded = false;
              startPos = i - 1;
            } else {
              encoded = true;
            }
          } else {
            line += chr;
          }
        }
        if (line) {
          list.push({
            line,
            encoded
          });
        }
      }
      return list.map((item, i2) => ({
        key: key + "*" + i2 + (item.encoded ? "*" : ""),
        value: item.line
      }));
    },
    parseHeaderValue(str) {
      let response = {
        value: false,
        params: {}
      };
      let key = false;
      let value = "";
      let type = "value";
      let quote = false;
      let escaped = false;
      let chr;
      for (let i = 0, len = str.length;i < len; i++) {
        chr = str.charAt(i);
        if (type === "key") {
          if (chr === "=") {
            key = value.trim().toLowerCase();
            type = "value";
            value = "";
            continue;
          }
          value += chr;
        } else {
          if (escaped) {
            value += chr;
          } else if (chr === "\\") {
            escaped = true;
            continue;
          } else if (quote && chr === quote) {
            quote = false;
          } else if (!quote && chr === '"') {
            quote = chr;
          } else if (!quote && chr === ";") {
            if (key === false) {
              response.value = value.trim();
            } else {
              response.params[key] = value.trim();
            }
            type = "key";
            value = "";
          } else {
            value += chr;
          }
          escaped = false;
        }
      }
      if (type === "value") {
        if (key === false) {
          response.value = value.trim();
        } else {
          response.params[key] = value.trim();
        }
      } else if (value.trim()) {
        response.params[value.trim().toLowerCase()] = "";
      }
      Object.keys(response.params).forEach((key2) => {
        let actualKey, nr, match, value2;
        if (match = key2.match(/(\*(\d+)|\*(\d+)\*|\*)$/)) {
          actualKey = key2.substr(0, match.index);
          nr = Number(match[2] || match[3]) || 0;
          if (!response.params[actualKey] || typeof response.params[actualKey] !== "object") {
            response.params[actualKey] = {
              charset: false,
              values: []
            };
          }
          value2 = response.params[key2];
          if (nr === 0 && match[0].substr(-1) === "*" && (match = value2.match(/^([^']*)'[^']*'(.*)$/))) {
            response.params[actualKey].charset = match[1] || "iso-8859-1";
            value2 = match[2];
          }
          response.params[actualKey].values[nr] = value2;
          delete response.params[key2];
        }
      });
      Object.keys(response.params).forEach((key2) => {
        let value2;
        if (response.params[key2] && Array.isArray(response.params[key2].values)) {
          value2 = response.params[key2].values.map((val) => val || "").join("");
          if (response.params[key2].charset) {
            response.params[key2] = "=?" + response.params[key2].charset + "?Q?" + value2.replace(/[=?_\s]/g, (s) => {
              let c = s.charCodeAt(0).toString(16);
              if (s === " ") {
                return "_";
              } else {
                return "%" + (c.length < 2 ? "0" : "") + c;
              }
            }).replace(/%/g, "=") + "?=";
          } else {
            response.params[key2] = value2;
          }
        }
      });
      return response;
    },
    detectExtension: (mimeType) => mimeTypes.detectExtension(mimeType),
    detectMimeType: (extension) => mimeTypes.detectMimeType(extension),
    foldLines(str, lineLength, afterSpace) {
      str = (str || "").toString();
      lineLength = lineLength || 76;
      let pos = 0, len = str.length, result = "", line, match;
      while (pos < len) {
        line = str.substr(pos, lineLength);
        if (line.length < lineLength) {
          result += line;
          break;
        }
        if (match = line.match(/^[^\n\r]*(\r?\n|\r)/)) {
          line = match[0];
          result += line;
          pos += line.length;
          continue;
        } else if ((match = line.match(/(\s+)[^\s]*$/)) && match[0].length - (afterSpace ? (match[1] || "").length : 0) < line.length) {
          line = line.substr(0, line.length - (match[0].length - (afterSpace ? (match[1] || "").length : 0)));
        } else if (match = str.substr(pos + line.length).match(/^[^\s]+(\s*)/)) {
          line = line + match[0].substr(0, match[0].length - (!afterSpace ? (match[1] || "").length : 0));
        }
        result += line;
        pos += line.length;
        if (pos < len) {
          result += `\r
`;
        }
      }
      return result;
    },
    splitMimeEncodedString: (str, maxlen) => {
      let curLine, match, chr, done, lines = [];
      maxlen = Math.max(maxlen || 0, 12);
      while (str.length) {
        curLine = str.substr(0, maxlen);
        if (match = curLine.match(/[=][0-9A-F]?$/i)) {
          curLine = curLine.substr(0, match.index);
        }
        done = false;
        while (!done) {
          done = true;
          if (match = str.substr(curLine.length).match(/^[=]([0-9A-F]{2})/i)) {
            chr = parseInt(match[1], 16);
            if (chr < 194 && chr > 127) {
              curLine = curLine.substr(0, curLine.length - 3);
              done = false;
            }
          }
        }
        if (curLine.length) {
          lines.push(curLine);
        }
        str = str.substr(curLine.length);
      }
      return lines;
    },
    encodeURICharComponent: (chr) => {
      let res = "";
      let ord = chr.charCodeAt(0).toString(16).toUpperCase();
      if (ord.length % 2) {
        ord = "0" + ord;
      }
      if (ord.length > 2) {
        for (let i = 0, len = ord.length / 2;i < len; i++) {
          res += "%" + ord.substr(i, 2);
        }
      } else {
        res += "%" + ord;
      }
      return res;
    },
    safeEncodeURIComponent(str) {
      str = (str || "").toString();
      try {
        str = encodeURIComponent(str);
      } catch (E) {
        return str.replace(/[^\x00-\x1F *'()<>@,;:\\"[\]?=\u007F-\uFFFF]+/g, "");
      }
      return str.replace(/[\x00-\x1F *'()<>@,;:\\"[\]?=\u007F-\uFFFF]/g, (chr) => this.encodeURICharComponent(chr));
    }
  };
});

// node_modules/nodemailer/lib/addressparser/index.js
var require_addressparser = __commonJS((exports, module) => {
  function _handleAddress(tokens) {
    let isGroup = false;
    let state = "text";
    let address;
    let addresses = [];
    let data = {
      address: [],
      comment: [],
      group: [],
      text: []
    };
    let i;
    let len;
    for (i = 0, len = tokens.length;i < len; i++) {
      let token = tokens[i];
      let prevToken = i ? tokens[i - 1] : null;
      if (token.type === "operator") {
        switch (token.value) {
          case "<":
            state = "address";
            break;
          case "(":
            state = "comment";
            break;
          case ":":
            state = "group";
            isGroup = true;
            break;
          default:
            state = "text";
            break;
        }
      } else if (token.value) {
        if (state === "address") {
          token.value = token.value.replace(/^[^<]*<\s*/, "");
        }
        if (prevToken && prevToken.noBreak && data[state].length) {
          data[state][data[state].length - 1] += token.value;
        } else {
          data[state].push(token.value);
        }
      }
    }
    if (!data.text.length && data.comment.length) {
      data.text = data.comment;
      data.comment = [];
    }
    if (isGroup) {
      data.text = data.text.join(" ");
      addresses.push({
        name: data.text || address && address.name,
        group: data.group.length ? addressparser(data.group.join(",")) : []
      });
    } else {
      if (!data.address.length && data.text.length) {
        for (i = data.text.length - 1;i >= 0; i--) {
          if (data.text[i].match(/^[^@\s]+@[^@\s]+$/)) {
            data.address = data.text.splice(i, 1);
            break;
          }
        }
        let _regexHandler = function(address2) {
          if (!data.address.length) {
            data.address = [address2.trim()];
            return " ";
          } else {
            return address2;
          }
        };
        if (!data.address.length) {
          for (i = data.text.length - 1;i >= 0; i--) {
            data.text[i] = data.text[i].replace(/\s*\b[^@\s]+@[^\s]+\b\s*/, _regexHandler).trim();
            if (data.address.length) {
              break;
            }
          }
        }
      }
      if (!data.text.length && data.comment.length) {
        data.text = data.comment;
        data.comment = [];
      }
      if (data.address.length > 1) {
        data.text = data.text.concat(data.address.splice(1));
      }
      data.text = data.text.join(" ");
      data.address = data.address.join(" ");
      if (!data.address && isGroup) {
        return [];
      } else {
        address = {
          address: data.address || data.text || "",
          name: data.text || data.address || ""
        };
        if (address.address === address.name) {
          if ((address.address || "").match(/@/)) {
            address.name = "";
          } else {
            address.address = "";
          }
        }
        addresses.push(address);
      }
    }
    return addresses;
  }

  class Tokenizer {
    constructor(str) {
      this.str = (str || "").toString();
      this.operatorCurrent = "";
      this.operatorExpecting = "";
      this.node = null;
      this.escaped = false;
      this.list = [];
      this.operators = {
        '"': '"',
        "(": ")",
        "<": ">",
        ",": "",
        ":": ";",
        ";": ""
      };
    }
    tokenize() {
      let list = [];
      for (let i = 0, len = this.str.length;i < len; i++) {
        let chr = this.str.charAt(i);
        let nextChr = i < len - 1 ? this.str.charAt(i + 1) : null;
        this.checkChar(chr, nextChr);
      }
      this.list.forEach((node) => {
        node.value = (node.value || "").toString().trim();
        if (node.value) {
          list.push(node);
        }
      });
      return list;
    }
    checkChar(chr, nextChr) {
      if (this.escaped) {} else if (chr === this.operatorExpecting) {
        this.node = {
          type: "operator",
          value: chr
        };
        if (nextChr && ![" ", "\t", "\r", `
`, ",", ";"].includes(nextChr)) {
          this.node.noBreak = true;
        }
        this.list.push(this.node);
        this.node = null;
        this.operatorExpecting = "";
        this.escaped = false;
        return;
      } else if (!this.operatorExpecting && chr in this.operators) {
        this.node = {
          type: "operator",
          value: chr
        };
        this.list.push(this.node);
        this.node = null;
        this.operatorExpecting = this.operators[chr];
        this.escaped = false;
        return;
      } else if (['"', "'"].includes(this.operatorExpecting) && chr === "\\") {
        this.escaped = true;
        return;
      }
      if (!this.node) {
        this.node = {
          type: "text",
          value: ""
        };
        this.list.push(this.node);
      }
      if (chr === `
`) {
        chr = " ";
      }
      if (chr.charCodeAt(0) >= 33 || [" ", "\t"].includes(chr)) {
        this.node.value += chr;
      }
      this.escaped = false;
    }
  }
  function addressparser(str, options) {
    options = options || {};
    let tokenizer = new Tokenizer(str);
    let tokens = tokenizer.tokenize();
    let addresses = [];
    let address = [];
    let parsedAddresses = [];
    tokens.forEach((token) => {
      if (token.type === "operator" && (token.value === "," || token.value === ";")) {
        if (address.length) {
          addresses.push(address);
        }
        address = [];
      } else {
        address.push(token);
      }
    });
    if (address.length) {
      addresses.push(address);
    }
    addresses.forEach((address2) => {
      address2 = _handleAddress(address2);
      if (address2.length) {
        parsedAddresses = parsedAddresses.concat(address2);
      }
    });
    if (options.flatten) {
      let addresses2 = [];
      let walkAddressList = (list) => {
        list.forEach((address2) => {
          if (address2.group) {
            return walkAddressList(address2.group);
          } else {
            addresses2.push(address2);
          }
        });
      };
      walkAddressList(parsedAddresses);
      return addresses2;
    }
    return parsedAddresses;
  }
  module.exports = addressparser;
});

// node_modules/nodemailer/lib/mime-node/last-newline.js
var require_last_newline = __commonJS((exports, module) => {
  var Transform = __require("node:stream").Transform;

  class LastNewline extends Transform {
    constructor() {
      super();
      this.lastByte = false;
    }
    _transform(chunk, encoding, done) {
      if (chunk.length) {
        this.lastByte = chunk[chunk.length - 1];
      }
      this.push(chunk);
      done();
    }
    _flush(done) {
      if (this.lastByte === 10) {
        return done();
      }
      if (this.lastByte === 13) {
        this.push(Buffer.from(`
`));
        return done();
      }
      this.push(Buffer.from(`\r
`));
      return done();
    }
  }
  module.exports = LastNewline;
});

// node_modules/nodemailer/lib/mime-node/le-windows.js
var require_le_windows = __commonJS((exports, module) => {
  var stream = __require("node:stream");
  var Transform = stream.Transform;

  class LeWindows extends Transform {
    constructor(options) {
      super(options);
      this.options = options || {};
      this.lastByte = false;
    }
    _transform(chunk, encoding, done) {
      let buf;
      let lastPos = 0;
      for (let i = 0, len = chunk.length;i < len; i++) {
        if (chunk[i] === 10) {
          if (i && chunk[i - 1] !== 13 || !i && this.lastByte !== 13) {
            if (i > lastPos) {
              buf = chunk.slice(lastPos, i);
              this.push(buf);
            }
            this.push(Buffer.from(`\r
`));
            lastPos = i + 1;
          }
        }
      }
      if (lastPos && lastPos < chunk.length) {
        buf = chunk.slice(lastPos);
        this.push(buf);
      } else if (!lastPos) {
        this.push(chunk);
      }
      this.lastByte = chunk[chunk.length - 1];
      done();
    }
  }
  module.exports = LeWindows;
});

// node_modules/nodemailer/lib/mime-node/le-unix.js
var require_le_unix = __commonJS((exports, module) => {
  var stream = __require("node:stream");
  var Transform = stream.Transform;

  class LeWindows extends Transform {
    constructor(options) {
      super(options);
      this.options = options || {};
    }
    _transform(chunk, encoding, done) {
      let buf;
      let lastPos = 0;
      for (let i = 0, len = chunk.length;i < len; i++) {
        if (chunk[i] === 13) {
          buf = chunk.slice(lastPos, i);
          lastPos = i + 1;
          this.push(buf);
        }
      }
      if (lastPos && lastPos < chunk.length) {
        buf = chunk.slice(lastPos);
        this.push(buf);
      } else if (!lastPos) {
        this.push(chunk);
      }
      done();
    }
  }
  module.exports = LeWindows;
});

// node_modules/nodemailer/lib/mime-node/index.js
var require_mime_node = __commonJS((exports, module) => {
  var crypto = __require("node:crypto");
  var fs = __require("node:fs");
  var punycode = require_punycode();
  var PassThrough = __require("node:stream").PassThrough;
  var shared = require_shared();
  var mimeFuncs = require_mime_funcs();
  var qp = require_qp();
  var base64 = require_base64();
  var addressparser = require_addressparser();
  var nmfetch = require_fetch();
  var LastNewline = require_last_newline();
  var LeWindows = require_le_windows();
  var LeUnix = require_le_unix();

  class MimeNode {
    constructor(contentType, options) {
      this.nodeCounter = 0;
      options = options || {};
      this.baseBoundary = options.baseBoundary || crypto.randomBytes(8).toString("hex");
      this.boundaryPrefix = options.boundaryPrefix || "--_NmP";
      this.disableFileAccess = !!options.disableFileAccess;
      this.disableUrlAccess = !!options.disableUrlAccess;
      this.normalizeHeaderKey = options.normalizeHeaderKey;
      this.date = new Date;
      this.rootNode = options.rootNode || this;
      this.keepBcc = !!options.keepBcc;
      if (options.filename) {
        this.filename = options.filename;
        if (!contentType) {
          contentType = mimeFuncs.detectMimeType(this.filename.split(".").pop());
        }
      }
      this.textEncoding = (options.textEncoding || "").toString().trim().charAt(0).toUpperCase();
      this.parentNode = options.parentNode;
      this.hostname = options.hostname;
      this.newline = options.newline;
      this.childNodes = [];
      this._nodeId = ++this.rootNode.nodeCounter;
      this._headers = [];
      this._isPlainText = false;
      this._hasLongLines = false;
      this._envelope = false;
      this._raw = false;
      this._transforms = [];
      this._processFuncs = [];
      if (contentType) {
        this.setHeader("Content-Type", contentType);
      }
    }
    createChild(contentType, options) {
      if (!options && typeof contentType === "object") {
        options = contentType;
        contentType = undefined;
      }
      let node = new MimeNode(contentType, options);
      this.appendChild(node);
      return node;
    }
    appendChild(childNode) {
      if (childNode.rootNode !== this.rootNode) {
        childNode.rootNode = this.rootNode;
        childNode._nodeId = ++this.rootNode.nodeCounter;
      }
      childNode.parentNode = this;
      this.childNodes.push(childNode);
      return childNode;
    }
    replace(node) {
      if (node === this) {
        return this;
      }
      this.parentNode.childNodes.forEach((childNode, i) => {
        if (childNode === this) {
          node.rootNode = this.rootNode;
          node.parentNode = this.parentNode;
          node._nodeId = this._nodeId;
          this.rootNode = this;
          this.parentNode = undefined;
          node.parentNode.childNodes[i] = node;
        }
      });
      return node;
    }
    remove() {
      if (!this.parentNode) {
        return this;
      }
      for (let i = this.parentNode.childNodes.length - 1;i >= 0; i--) {
        if (this.parentNode.childNodes[i] === this) {
          this.parentNode.childNodes.splice(i, 1);
          this.parentNode = undefined;
          this.rootNode = this;
          return this;
        }
      }
    }
    setHeader(key, value) {
      let added = false, headerValue;
      if (!value && key && typeof key === "object") {
        if (key.key && "value" in key) {
          this.setHeader(key.key, key.value);
        } else if (Array.isArray(key)) {
          key.forEach((i) => {
            this.setHeader(i.key, i.value);
          });
        } else {
          Object.keys(key).forEach((i) => {
            this.setHeader(i, key[i]);
          });
        }
        return this;
      }
      key = this._normalizeHeaderKey(key);
      headerValue = {
        key,
        value
      };
      for (let i = 0, len = this._headers.length;i < len; i++) {
        if (this._headers[i].key === key) {
          if (!added) {
            this._headers[i] = headerValue;
            added = true;
          } else {
            this._headers.splice(i, 1);
            i--;
            len--;
          }
        }
      }
      if (!added) {
        this._headers.push(headerValue);
      }
      return this;
    }
    addHeader(key, value) {
      if (!value && key && typeof key === "object") {
        if (key.key && key.value) {
          this.addHeader(key.key, key.value);
        } else if (Array.isArray(key)) {
          key.forEach((i) => {
            this.addHeader(i.key, i.value);
          });
        } else {
          Object.keys(key).forEach((i) => {
            this.addHeader(i, key[i]);
          });
        }
        return this;
      } else if (Array.isArray(value)) {
        value.forEach((val) => {
          this.addHeader(key, val);
        });
        return this;
      }
      this._headers.push({
        key: this._normalizeHeaderKey(key),
        value
      });
      return this;
    }
    getHeader(key) {
      key = this._normalizeHeaderKey(key);
      for (let i = 0, len = this._headers.length;i < len; i++) {
        if (this._headers[i].key === key) {
          return this._headers[i].value;
        }
      }
    }
    setContent(content) {
      this.content = content;
      if (typeof this.content.pipe === "function") {
        this._contentErrorHandler = (err) => {
          this.content.removeListener("error", this._contentErrorHandler);
          this.content = err;
        };
        this.content.once("error", this._contentErrorHandler);
      } else if (typeof this.content === "string") {
        this._isPlainText = mimeFuncs.isPlainText(this.content);
        if (this._isPlainText && mimeFuncs.hasLongerLines(this.content, 76)) {
          this._hasLongLines = true;
        }
      }
      return this;
    }
    build(callback) {
      let promise;
      if (!callback) {
        promise = new Promise((resolve, reject) => {
          callback = shared.callbackPromise(resolve, reject);
        });
      }
      let stream = this.createReadStream();
      let buf = [];
      let buflen = 0;
      let returned = false;
      stream.on("readable", () => {
        let chunk;
        while ((chunk = stream.read()) !== null) {
          buf.push(chunk);
          buflen += chunk.length;
        }
      });
      stream.once("error", (err) => {
        if (returned) {
          return;
        }
        returned = true;
        return callback(err);
      });
      stream.once("end", (chunk) => {
        if (returned) {
          return;
        }
        returned = true;
        if (chunk && chunk.length) {
          buf.push(chunk);
          buflen += chunk.length;
        }
        return callback(null, Buffer.concat(buf, buflen));
      });
      return promise;
    }
    getTransferEncoding() {
      let transferEncoding = false;
      let contentType = (this.getHeader("Content-Type") || "").toString().toLowerCase().trim();
      if (this.content) {
        transferEncoding = (this.getHeader("Content-Transfer-Encoding") || "").toString().toLowerCase().trim();
        if (!transferEncoding || !["base64", "quoted-printable"].includes(transferEncoding)) {
          if (/^text\//i.test(contentType)) {
            if (this._isPlainText && !this._hasLongLines) {
              transferEncoding = "7bit";
            } else if (typeof this.content === "string" || this.content instanceof Buffer) {
              transferEncoding = this._getTextEncoding(this.content) === "Q" ? "quoted-printable" : "base64";
            } else {
              transferEncoding = this.textEncoding === "B" ? "base64" : "quoted-printable";
            }
          } else if (!/^(multipart|message)\//i.test(contentType)) {
            transferEncoding = transferEncoding || "base64";
          }
        }
      }
      return transferEncoding;
    }
    buildHeaders() {
      let transferEncoding = this.getTransferEncoding();
      let headers = [];
      if (transferEncoding) {
        this.setHeader("Content-Transfer-Encoding", transferEncoding);
      }
      if (this.filename && !this.getHeader("Content-Disposition")) {
        this.setHeader("Content-Disposition", "attachment");
      }
      if (this.rootNode === this) {
        if (!this.getHeader("Date")) {
          this.setHeader("Date", this.date.toUTCString().replace(/GMT/, "+0000"));
        }
        this.messageId();
        if (!this.getHeader("MIME-Version")) {
          this.setHeader("MIME-Version", "1.0");
        }
        for (let i = this._headers.length - 2;i >= 0; i--) {
          let header = this._headers[i];
          if (header.key === "Content-Type") {
            this._headers.splice(i, 1);
            this._headers.push(header);
          }
        }
      }
      this._headers.forEach((header) => {
        let key = header.key;
        let value = header.value;
        let structured;
        let param;
        let options = {};
        let formattedHeaders = ["From", "Sender", "To", "Cc", "Bcc", "Reply-To", "Date", "References"];
        if (value && typeof value === "object" && !formattedHeaders.includes(key)) {
          Object.keys(value).forEach((key2) => {
            if (key2 !== "value") {
              options[key2] = value[key2];
            }
          });
          value = (value.value || "").toString();
          if (!value.trim()) {
            return;
          }
        }
        if (options.prepared) {
          if (options.foldLines) {
            headers.push(mimeFuncs.foldLines(key + ": " + value));
          } else {
            headers.push(key + ": " + value);
          }
          return;
        }
        switch (header.key) {
          case "Content-Disposition":
            structured = mimeFuncs.parseHeaderValue(value);
            if (this.filename) {
              structured.params.filename = this.filename;
            }
            value = mimeFuncs.buildHeaderValue(structured);
            break;
          case "Content-Type":
            structured = mimeFuncs.parseHeaderValue(value);
            this._handleContentType(structured);
            if (structured.value.match(/^text\/plain\b/) && typeof this.content === "string" && /[\u0080-\uFFFF]/.test(this.content)) {
              structured.params.charset = "utf-8";
            }
            value = mimeFuncs.buildHeaderValue(structured);
            if (this.filename) {
              param = this._encodeWords(this.filename);
              if (param !== this.filename || /[\s'"\\;:/=(),<>@[\]?]|^-/.test(param)) {
                param = '"' + param + '"';
              }
              value += "; name=" + param;
            }
            break;
          case "Bcc":
            if (!this.keepBcc) {
              return;
            }
            break;
        }
        value = this._encodeHeaderValue(key, value);
        if (!(value || "").toString().trim()) {
          return;
        }
        if (typeof this.normalizeHeaderKey === "function") {
          let normalized = this.normalizeHeaderKey(key, value);
          if (normalized && typeof normalized === "string" && normalized.length) {
            key = normalized;
          }
        }
        headers.push(mimeFuncs.foldLines(key + ": " + value, 76));
      });
      return headers.join(`\r
`);
    }
    createReadStream(options) {
      options = options || {};
      let stream = new PassThrough(options);
      let outputStream = stream;
      let transform;
      this.stream(stream, options, (err) => {
        if (err) {
          outputStream.emit("error", err);
          return;
        }
        stream.end();
      });
      for (let i = 0, len = this._transforms.length;i < len; i++) {
        transform = typeof this._transforms[i] === "function" ? this._transforms[i]() : this._transforms[i];
        outputStream.once("error", (err) => {
          transform.emit("error", err);
        });
        outputStream = outputStream.pipe(transform);
      }
      transform = new LastNewline;
      outputStream.once("error", (err) => {
        transform.emit("error", err);
      });
      outputStream = outputStream.pipe(transform);
      for (let i = 0, len = this._processFuncs.length;i < len; i++) {
        transform = this._processFuncs[i];
        outputStream = transform(outputStream);
      }
      if (this.newline) {
        const winbreak = ["win", "windows", "dos", `\r
`].includes(this.newline.toString().toLowerCase());
        const newlineTransform = winbreak ? new LeWindows : new LeUnix;
        const stream2 = outputStream.pipe(newlineTransform);
        outputStream.on("error", (err) => stream2.emit("error", err));
        return stream2;
      }
      return outputStream;
    }
    transform(transform) {
      this._transforms.push(transform);
    }
    processFunc(processFunc) {
      this._processFuncs.push(processFunc);
    }
    stream(outputStream, options, done) {
      let transferEncoding = this.getTransferEncoding();
      let contentStream;
      let localStream;
      let returned = false;
      let callback = (err) => {
        if (returned) {
          return;
        }
        returned = true;
        done(err);
      };
      let finalize = () => {
        let childId = 0;
        let processChildNode = () => {
          if (childId >= this.childNodes.length) {
            outputStream.write(`\r
--` + this.boundary + `--\r
`);
            return callback();
          }
          let child = this.childNodes[childId++];
          outputStream.write((childId > 1 ? `\r
` : "") + "--" + this.boundary + `\r
`);
          child.stream(outputStream, options, (err) => {
            if (err) {
              return callback(err);
            }
            setImmediate(processChildNode);
          });
        };
        if (this.multipart) {
          setImmediate(processChildNode);
        } else {
          return callback();
        }
      };
      let sendContent = () => {
        if (this.content) {
          if (Object.prototype.toString.call(this.content) === "[object Error]") {
            return callback(this.content);
          }
          if (typeof this.content.pipe === "function") {
            this.content.removeListener("error", this._contentErrorHandler);
            this._contentErrorHandler = (err) => callback(err);
            this.content.once("error", this._contentErrorHandler);
          }
          let createStream = () => {
            if (["quoted-printable", "base64"].includes(transferEncoding)) {
              contentStream = new (transferEncoding === "base64" ? base64 : qp).Encoder(options);
              contentStream.pipe(outputStream, {
                end: false
              });
              contentStream.once("end", finalize);
              contentStream.once("error", (err) => callback(err));
              localStream = this._getStream(this.content);
              localStream.pipe(contentStream);
            } else {
              localStream = this._getStream(this.content);
              localStream.pipe(outputStream, {
                end: false
              });
              localStream.once("end", finalize);
            }
            localStream.once("error", (err) => callback(err));
          };
          if (this.content._resolve) {
            let chunks = [];
            let chunklen = 0;
            let returned2 = false;
            let sourceStream = this._getStream(this.content);
            sourceStream.on("error", (err) => {
              if (returned2) {
                return;
              }
              returned2 = true;
              callback(err);
            });
            sourceStream.on("readable", () => {
              let chunk;
              while ((chunk = sourceStream.read()) !== null) {
                chunks.push(chunk);
                chunklen += chunk.length;
              }
            });
            sourceStream.on("end", () => {
              if (returned2) {
                return;
              }
              returned2 = true;
              this.content._resolve = false;
              this.content._resolvedValue = Buffer.concat(chunks, chunklen);
              setImmediate(createStream);
            });
          } else {
            setImmediate(createStream);
          }
          return;
        } else {
          return setImmediate(finalize);
        }
      };
      if (this._raw) {
        setImmediate(() => {
          if (Object.prototype.toString.call(this._raw) === "[object Error]") {
            return callback(this._raw);
          }
          if (typeof this._raw.pipe === "function") {
            this._raw.removeListener("error", this._contentErrorHandler);
          }
          let raw2 = this._getStream(this._raw);
          raw2.pipe(outputStream, {
            end: false
          });
          raw2.on("error", (err) => outputStream.emit("error", err));
          raw2.on("end", finalize);
        });
      } else {
        outputStream.write(this.buildHeaders() + `\r
\r
`);
        setImmediate(sendContent);
      }
    }
    setEnvelope(envelope) {
      let list;
      this._envelope = {
        from: false,
        to: []
      };
      if (envelope.from) {
        list = [];
        this._convertAddresses(this._parseAddresses(envelope.from), list);
        list = list.filter((address) => address && address.address);
        if (list.length && list[0]) {
          this._envelope.from = list[0].address;
        }
      }
      ["to", "cc", "bcc"].forEach((key) => {
        if (envelope[key]) {
          this._convertAddresses(this._parseAddresses(envelope[key]), this._envelope.to);
        }
      });
      this._envelope.to = this._envelope.to.map((to) => to.address).filter((address) => address);
      let standardFields = ["to", "cc", "bcc", "from"];
      Object.keys(envelope).forEach((key) => {
        if (!standardFields.includes(key)) {
          this._envelope[key] = envelope[key];
        }
      });
      return this;
    }
    getAddresses() {
      let addresses = {};
      this._headers.forEach((header) => {
        let key = header.key.toLowerCase();
        if (["from", "sender", "reply-to", "to", "cc", "bcc"].includes(key)) {
          if (!Array.isArray(addresses[key])) {
            addresses[key] = [];
          }
          this._convertAddresses(this._parseAddresses(header.value), addresses[key]);
        }
      });
      return addresses;
    }
    getEnvelope() {
      if (this._envelope) {
        return this._envelope;
      }
      let envelope = {
        from: false,
        to: []
      };
      this._headers.forEach((header) => {
        let list = [];
        if (header.key === "From" || !envelope.from && ["Reply-To", "Sender"].includes(header.key)) {
          this._convertAddresses(this._parseAddresses(header.value), list);
          if (list.length && list[0]) {
            envelope.from = list[0].address;
          }
        } else if (["To", "Cc", "Bcc"].includes(header.key)) {
          this._convertAddresses(this._parseAddresses(header.value), envelope.to);
        }
      });
      envelope.to = envelope.to.map((to) => to.address);
      return envelope;
    }
    messageId() {
      let messageId = this.getHeader("Message-ID");
      if (!messageId) {
        messageId = this._generateMessageId();
        this.setHeader("Message-ID", messageId);
      }
      return messageId;
    }
    setRaw(raw2) {
      this._raw = raw2;
      if (this._raw && typeof this._raw.pipe === "function") {
        this._contentErrorHandler = (err) => {
          this._raw.removeListener("error", this._contentErrorHandler);
          this._raw = err;
        };
        this._raw.once("error", this._contentErrorHandler);
      }
      return this;
    }
    _getStream(content) {
      let contentStream;
      if (content._resolvedValue) {
        contentStream = new PassThrough;
        setImmediate(() => {
          try {
            contentStream.end(content._resolvedValue);
          } catch (err) {
            contentStream.emit("error", err);
          }
        });
        return contentStream;
      } else if (typeof content.pipe === "function") {
        return content;
      } else if (content && typeof content.path === "string" && !content.href) {
        if (this.disableFileAccess) {
          contentStream = new PassThrough;
          setImmediate(() => contentStream.emit("error", new Error("File access rejected for " + content.path)));
          return contentStream;
        }
        return fs.createReadStream(content.path);
      } else if (content && typeof content.href === "string") {
        if (this.disableUrlAccess) {
          contentStream = new PassThrough;
          setImmediate(() => contentStream.emit("error", new Error("Url access rejected for " + content.href)));
          return contentStream;
        }
        return nmfetch(content.href, { headers: content.httpHeaders });
      } else {
        contentStream = new PassThrough;
        setImmediate(() => {
          try {
            contentStream.end(content || "");
          } catch (err) {
            contentStream.emit("error", err);
          }
        });
        return contentStream;
      }
    }
    _parseAddresses(addresses) {
      return [].concat.apply([], [].concat(addresses).map((address) => {
        if (address && address.address) {
          address.address = this._normalizeAddress(address.address);
          address.name = address.name || "";
          return [address];
        }
        return addressparser(address);
      }));
    }
    _normalizeHeaderKey(key) {
      key = (key || "").toString().replace(/\r?\n|\r/g, " ").trim().toLowerCase().replace(/^X-SMTPAPI$|^(MIME|DKIM|ARC|BIMI)\b|^[a-z]|-(SPF|FBL|ID|MD5)$|-[a-z]/gi, (c) => c.toUpperCase()).replace(/^Content-Features$/i, "Content-features");
      return key;
    }
    _handleContentType(structured) {
      this.contentType = structured.value.trim().toLowerCase();
      this.multipart = /^multipart\//i.test(this.contentType) ? this.contentType.substr(this.contentType.indexOf("/") + 1) : false;
      if (this.multipart) {
        this.boundary = structured.params.boundary = structured.params.boundary || this.boundary || this._generateBoundary();
      } else {
        this.boundary = false;
      }
    }
    _generateBoundary() {
      return this.rootNode.boundaryPrefix + "-" + this.rootNode.baseBoundary + "-Part_" + this._nodeId;
    }
    _encodeHeaderValue(key, value) {
      key = this._normalizeHeaderKey(key);
      switch (key) {
        case "From":
        case "Sender":
        case "To":
        case "Cc":
        case "Bcc":
        case "Reply-To":
          return this._convertAddresses(this._parseAddresses(value));
        case "Message-ID":
        case "In-Reply-To":
        case "Content-Id":
          value = (value || "").toString().replace(/\r?\n|\r/g, " ");
          if (value.charAt(0) !== "<") {
            value = "<" + value;
          }
          if (value.charAt(value.length - 1) !== ">") {
            value = value + ">";
          }
          return value;
        case "References":
          value = [].concat.apply([], [].concat(value || "").map((elm) => {
            elm = (elm || "").toString().replace(/\r?\n|\r/g, " ").trim();
            return elm.replace(/<[^>]*>/g, (str) => str.replace(/\s/g, "")).split(/\s+/);
          })).map((elm) => {
            if (elm.charAt(0) !== "<") {
              elm = "<" + elm;
            }
            if (elm.charAt(elm.length - 1) !== ">") {
              elm = elm + ">";
            }
            return elm;
          });
          return value.join(" ").trim();
        case "Date":
          if (Object.prototype.toString.call(value) === "[object Date]") {
            return value.toUTCString().replace(/GMT/, "+0000");
          }
          value = (value || "").toString().replace(/\r?\n|\r/g, " ");
          return this._encodeWords(value);
        case "Content-Type":
        case "Content-Disposition":
          return (value || "").toString().replace(/\r?\n|\r/g, " ");
        default:
          value = (value || "").toString().replace(/\r?\n|\r/g, " ");
          return this._encodeWords(value);
      }
    }
    _convertAddresses(addresses, uniqueList) {
      let values = [];
      uniqueList = uniqueList || [];
      [].concat(addresses || []).forEach((address) => {
        if (address.address) {
          address.address = this._normalizeAddress(address.address);
          if (!address.name) {
            values.push(address.address.indexOf(" ") >= 0 ? `<${address.address}>` : `${address.address}`);
          } else if (address.name) {
            values.push(`${this._encodeAddressName(address.name)} <${address.address}>`);
          }
          if (address.address) {
            if (!uniqueList.filter((a) => a.address === address.address).length) {
              uniqueList.push(address);
            }
          }
        } else if (address.group) {
          let groupListAddresses = (address.group.length ? this._convertAddresses(address.group, uniqueList) : "").trim();
          values.push(`${this._encodeAddressName(address.name)}:${groupListAddresses};`);
        }
      });
      return values.join(", ");
    }
    _normalizeAddress(address) {
      address = (address || "").toString().replace(/[\x00-\x1F<>]+/g, " ").trim();
      let lastAt = address.lastIndexOf("@");
      if (lastAt < 0) {
        return address;
      }
      let user = address.substr(0, lastAt);
      let domain = address.substr(lastAt + 1);
      let encodedDomain;
      try {
        encodedDomain = punycode.toASCII(domain.toLowerCase());
      } catch (err) {}
      if (user.indexOf(" ") >= 0) {
        if (user.charAt(0) !== '"') {
          user = '"' + user;
        }
        if (user.substr(-1) !== '"') {
          user = user + '"';
        }
      }
      return `${user}@${encodedDomain}`;
    }
    _encodeAddressName(name) {
      if (!/^[\w ]*$/.test(name)) {
        if (/^[\x20-\x7e]*$/.test(name)) {
          return '"' + name.replace(/([\\"])/g, "\\$1") + '"';
        } else {
          return mimeFuncs.encodeWord(name, this._getTextEncoding(name), 52);
        }
      }
      return name;
    }
    _encodeWords(value) {
      return mimeFuncs.encodeWords(value, this._getTextEncoding(value), 52, true);
    }
    _getTextEncoding(value) {
      value = (value || "").toString();
      let encoding = this.textEncoding;
      let latinLen;
      let nonLatinLen;
      if (!encoding) {
        nonLatinLen = (value.match(/[\x00-\x08\x0B\x0C\x0E-\x1F\u0080-\uFFFF]/g) || []).length;
        latinLen = (value.match(/[a-z]/gi) || []).length;
        encoding = nonLatinLen < latinLen ? "Q" : "B";
      }
      return encoding;
    }
    _generateMessageId() {
      return "<" + [2, 2, 2, 6].reduce((prev, len) => prev + "-" + crypto.randomBytes(len).toString("hex"), crypto.randomBytes(4).toString("hex")) + "@" + (this.getEnvelope().from || this.hostname || "localhost").split("@").pop() + ">";
    }
  }
  module.exports = MimeNode;
});

// node_modules/nodemailer/lib/mail-composer/index.js
var require_mail_composer = __commonJS((exports, module) => {
  var MimeNode = require_mime_node();
  var mimeFuncs = require_mime_funcs();
  var parseDataURI = require_shared().parseDataURI;

  class MailComposer {
    constructor(mail) {
      this.mail = mail || {};
      this.message = false;
    }
    compile() {
      this._alternatives = this.getAlternatives();
      this._htmlNode = this._alternatives.filter((alternative) => /^text\/html\b/i.test(alternative.contentType)).pop();
      this._attachments = this.getAttachments(!!this._htmlNode);
      this._useRelated = !!(this._htmlNode && this._attachments.related.length);
      this._useAlternative = this._alternatives.length > 1;
      this._useMixed = this._attachments.attached.length > 1 || this._alternatives.length && this._attachments.attached.length === 1;
      if (this.mail.raw) {
        this.message = new MimeNode("message/rfc822", { newline: this.mail.newline }).setRaw(this.mail.raw);
      } else if (this._useMixed) {
        this.message = this._createMixed();
      } else if (this._useAlternative) {
        this.message = this._createAlternative();
      } else if (this._useRelated) {
        this.message = this._createRelated();
      } else {
        this.message = this._createContentNode(false, [].concat(this._alternatives || []).concat(this._attachments.attached || []).shift() || {
          contentType: "text/plain",
          content: ""
        });
      }
      if (this.mail.headers) {
        this.message.addHeader(this.mail.headers);
      }
      ["from", "sender", "to", "cc", "bcc", "reply-to", "in-reply-to", "references", "subject", "message-id", "date"].forEach((header) => {
        let key = header.replace(/-(\w)/g, (o, c) => c.toUpperCase());
        if (this.mail[key]) {
          this.message.setHeader(header, this.mail[key]);
        }
      });
      if (this.mail.envelope) {
        this.message.setEnvelope(this.mail.envelope);
      }
      this.message.messageId();
      return this.message;
    }
    getAttachments(findRelated) {
      let icalEvent, eventObject;
      let attachments = [].concat(this.mail.attachments || []).map((attachment, i) => {
        let data;
        let isMessageNode = /^message\//i.test(attachment.contentType);
        if (/^data:/i.test(attachment.path || attachment.href)) {
          attachment = this._processDataUrl(attachment);
        }
        let contentType = attachment.contentType || mimeFuncs.detectMimeType(attachment.filename || attachment.path || attachment.href || "bin");
        let isImage = /^image\//i.test(contentType);
        let contentDisposition = attachment.contentDisposition || (isMessageNode || isImage && attachment.cid ? "inline" : "attachment");
        data = {
          contentType,
          contentDisposition,
          contentTransferEncoding: "contentTransferEncoding" in attachment ? attachment.contentTransferEncoding : "base64"
        };
        if (attachment.filename) {
          data.filename = attachment.filename;
        } else if (!isMessageNode && attachment.filename !== false) {
          data.filename = (attachment.path || attachment.href || "").split("/").pop().split("?").shift() || "attachment-" + (i + 1);
          if (data.filename.indexOf(".") < 0) {
            data.filename += "." + mimeFuncs.detectExtension(data.contentType);
          }
        }
        if (/^https?:\/\//i.test(attachment.path)) {
          attachment.href = attachment.path;
          attachment.path = undefined;
        }
        if (attachment.cid) {
          data.cid = attachment.cid;
        }
        if (attachment.raw) {
          data.raw = attachment.raw;
        } else if (attachment.path) {
          data.content = {
            path: attachment.path
          };
        } else if (attachment.href) {
          data.content = {
            href: attachment.href,
            httpHeaders: attachment.httpHeaders
          };
        } else {
          data.content = attachment.content || "";
        }
        if (attachment.encoding) {
          data.encoding = attachment.encoding;
        }
        if (attachment.headers) {
          data.headers = attachment.headers;
        }
        return data;
      });
      if (this.mail.icalEvent) {
        if (typeof this.mail.icalEvent === "object" && (this.mail.icalEvent.content || this.mail.icalEvent.path || this.mail.icalEvent.href || this.mail.icalEvent.raw)) {
          icalEvent = this.mail.icalEvent;
        } else {
          icalEvent = {
            content: this.mail.icalEvent
          };
        }
        eventObject = {};
        Object.keys(icalEvent).forEach((key) => {
          eventObject[key] = icalEvent[key];
        });
        eventObject.contentType = "application/ics";
        if (!eventObject.headers) {
          eventObject.headers = {};
        }
        eventObject.filename = eventObject.filename || "invite.ics";
        eventObject.headers["Content-Disposition"] = "attachment";
        eventObject.headers["Content-Transfer-Encoding"] = "base64";
      }
      if (!findRelated) {
        return {
          attached: attachments.concat(eventObject || []),
          related: []
        };
      } else {
        return {
          attached: attachments.filter((attachment) => !attachment.cid).concat(eventObject || []),
          related: attachments.filter((attachment) => !!attachment.cid)
        };
      }
    }
    getAlternatives() {
      let alternatives = [], text, html, watchHtml, amp, icalEvent, eventObject;
      if (this.mail.text) {
        if (typeof this.mail.text === "object" && (this.mail.text.content || this.mail.text.path || this.mail.text.href || this.mail.text.raw)) {
          text = this.mail.text;
        } else {
          text = {
            content: this.mail.text
          };
        }
        text.contentType = "text/plain; charset=utf-8";
      }
      if (this.mail.watchHtml) {
        if (typeof this.mail.watchHtml === "object" && (this.mail.watchHtml.content || this.mail.watchHtml.path || this.mail.watchHtml.href || this.mail.watchHtml.raw)) {
          watchHtml = this.mail.watchHtml;
        } else {
          watchHtml = {
            content: this.mail.watchHtml
          };
        }
        watchHtml.contentType = "text/watch-html; charset=utf-8";
      }
      if (this.mail.amp) {
        if (typeof this.mail.amp === "object" && (this.mail.amp.content || this.mail.amp.path || this.mail.amp.href || this.mail.amp.raw)) {
          amp = this.mail.amp;
        } else {
          amp = {
            content: this.mail.amp
          };
        }
        amp.contentType = "text/x-amp-html; charset=utf-8";
      }
      if (this.mail.icalEvent) {
        if (typeof this.mail.icalEvent === "object" && (this.mail.icalEvent.content || this.mail.icalEvent.path || this.mail.icalEvent.href || this.mail.icalEvent.raw)) {
          icalEvent = this.mail.icalEvent;
        } else {
          icalEvent = {
            content: this.mail.icalEvent
          };
        }
        eventObject = {};
        Object.keys(icalEvent).forEach((key) => {
          eventObject[key] = icalEvent[key];
        });
        if (eventObject.content && typeof eventObject.content === "object") {
          eventObject.content._resolve = true;
        }
        eventObject.filename = false;
        eventObject.contentType = "text/calendar; charset=utf-8; method=" + (eventObject.method || "PUBLISH").toString().trim().toUpperCase();
        if (!eventObject.headers) {
          eventObject.headers = {};
        }
      }
      if (this.mail.html) {
        if (typeof this.mail.html === "object" && (this.mail.html.content || this.mail.html.path || this.mail.html.href || this.mail.html.raw)) {
          html = this.mail.html;
        } else {
          html = {
            content: this.mail.html
          };
        }
        html.contentType = "text/html; charset=utf-8";
      }
      [].concat(text || []).concat(watchHtml || []).concat(amp || []).concat(html || []).concat(eventObject || []).concat(this.mail.alternatives || []).forEach((alternative) => {
        let data;
        if (/^data:/i.test(alternative.path || alternative.href)) {
          alternative = this._processDataUrl(alternative);
        }
        data = {
          contentType: alternative.contentType || mimeFuncs.detectMimeType(alternative.filename || alternative.path || alternative.href || "txt"),
          contentTransferEncoding: alternative.contentTransferEncoding
        };
        if (alternative.filename) {
          data.filename = alternative.filename;
        }
        if (/^https?:\/\//i.test(alternative.path)) {
          alternative.href = alternative.path;
          alternative.path = undefined;
        }
        if (alternative.raw) {
          data.raw = alternative.raw;
        } else if (alternative.path) {
          data.content = {
            path: alternative.path
          };
        } else if (alternative.href) {
          data.content = {
            href: alternative.href
          };
        } else {
          data.content = alternative.content || "";
        }
        if (alternative.encoding) {
          data.encoding = alternative.encoding;
        }
        if (alternative.headers) {
          data.headers = alternative.headers;
        }
        alternatives.push(data);
      });
      return alternatives;
    }
    _createMixed(parentNode) {
      let node;
      if (!parentNode) {
        node = new MimeNode("multipart/mixed", {
          baseBoundary: this.mail.baseBoundary,
          textEncoding: this.mail.textEncoding,
          boundaryPrefix: this.mail.boundaryPrefix,
          disableUrlAccess: this.mail.disableUrlAccess,
          disableFileAccess: this.mail.disableFileAccess,
          normalizeHeaderKey: this.mail.normalizeHeaderKey,
          newline: this.mail.newline
        });
      } else {
        node = parentNode.createChild("multipart/mixed", {
          disableUrlAccess: this.mail.disableUrlAccess,
          disableFileAccess: this.mail.disableFileAccess,
          normalizeHeaderKey: this.mail.normalizeHeaderKey,
          newline: this.mail.newline
        });
      }
      if (this._useAlternative) {
        this._createAlternative(node);
      } else if (this._useRelated) {
        this._createRelated(node);
      }
      [].concat(!this._useAlternative && this._alternatives || []).concat(this._attachments.attached || []).forEach((element) => {
        if (!this._useRelated || element !== this._htmlNode) {
          this._createContentNode(node, element);
        }
      });
      return node;
    }
    _createAlternative(parentNode) {
      let node;
      if (!parentNode) {
        node = new MimeNode("multipart/alternative", {
          baseBoundary: this.mail.baseBoundary,
          textEncoding: this.mail.textEncoding,
          boundaryPrefix: this.mail.boundaryPrefix,
          disableUrlAccess: this.mail.disableUrlAccess,
          disableFileAccess: this.mail.disableFileAccess,
          normalizeHeaderKey: this.mail.normalizeHeaderKey,
          newline: this.mail.newline
        });
      } else {
        node = parentNode.createChild("multipart/alternative", {
          disableUrlAccess: this.mail.disableUrlAccess,
          disableFileAccess: this.mail.disableFileAccess,
          normalizeHeaderKey: this.mail.normalizeHeaderKey,
          newline: this.mail.newline
        });
      }
      this._alternatives.forEach((alternative) => {
        if (this._useRelated && this._htmlNode === alternative) {
          this._createRelated(node);
        } else {
          this._createContentNode(node, alternative);
        }
      });
      return node;
    }
    _createRelated(parentNode) {
      let node;
      if (!parentNode) {
        node = new MimeNode('multipart/related; type="text/html"', {
          baseBoundary: this.mail.baseBoundary,
          textEncoding: this.mail.textEncoding,
          boundaryPrefix: this.mail.boundaryPrefix,
          disableUrlAccess: this.mail.disableUrlAccess,
          disableFileAccess: this.mail.disableFileAccess,
          normalizeHeaderKey: this.mail.normalizeHeaderKey,
          newline: this.mail.newline
        });
      } else {
        node = parentNode.createChild('multipart/related; type="text/html"', {
          disableUrlAccess: this.mail.disableUrlAccess,
          disableFileAccess: this.mail.disableFileAccess,
          normalizeHeaderKey: this.mail.normalizeHeaderKey,
          newline: this.mail.newline
        });
      }
      this._createContentNode(node, this._htmlNode);
      this._attachments.related.forEach((alternative) => this._createContentNode(node, alternative));
      return node;
    }
    _createContentNode(parentNode, element) {
      element = element || {};
      element.content = element.content || "";
      let node;
      let encoding = (element.encoding || "utf8").toString().toLowerCase().replace(/[-_\s]/g, "");
      if (!parentNode) {
        node = new MimeNode(element.contentType, {
          filename: element.filename,
          baseBoundary: this.mail.baseBoundary,
          textEncoding: this.mail.textEncoding,
          boundaryPrefix: this.mail.boundaryPrefix,
          disableUrlAccess: this.mail.disableUrlAccess,
          disableFileAccess: this.mail.disableFileAccess,
          normalizeHeaderKey: this.mail.normalizeHeaderKey,
          newline: this.mail.newline
        });
      } else {
        node = parentNode.createChild(element.contentType, {
          filename: element.filename,
          textEncoding: this.mail.textEncoding,
          disableUrlAccess: this.mail.disableUrlAccess,
          disableFileAccess: this.mail.disableFileAccess,
          normalizeHeaderKey: this.mail.normalizeHeaderKey,
          newline: this.mail.newline
        });
      }
      if (element.headers) {
        node.addHeader(element.headers);
      }
      if (element.cid) {
        node.setHeader("Content-Id", "<" + element.cid.replace(/[<>]/g, "") + ">");
      }
      if (element.contentTransferEncoding) {
        node.setHeader("Content-Transfer-Encoding", element.contentTransferEncoding);
      } else if (this.mail.encoding && /^text\//i.test(element.contentType)) {
        node.setHeader("Content-Transfer-Encoding", this.mail.encoding);
      }
      if (!/^text\//i.test(element.contentType) || element.contentDisposition) {
        node.setHeader("Content-Disposition", element.contentDisposition || (element.cid && /^image\//i.test(element.contentType) ? "inline" : "attachment"));
      }
      if (typeof element.content === "string" && !["utf8", "usascii", "ascii"].includes(encoding)) {
        element.content = Buffer.from(element.content, encoding);
      }
      if (element.raw) {
        node.setRaw(element.raw);
      } else {
        node.setContent(element.content);
      }
      return node;
    }
    _processDataUrl(element) {
      let parsedDataUri;
      if ((element.path || element.href).match(/^data:/)) {
        parsedDataUri = parseDataURI(element.path || element.href);
      }
      if (!parsedDataUri) {
        return element;
      }
      element.content = parsedDataUri.data;
      element.contentType = element.contentType || parsedDataUri.contentType;
      if ("path" in element) {
        element.path = false;
      }
      if ("href" in element) {
        element.href = false;
      }
      return element;
    }
  }
  module.exports = MailComposer;
});

// node_modules/nodemailer/lib/dkim/message-parser.js
var require_message_parser = __commonJS((exports, module) => {
  var Transform = __require("node:stream").Transform;

  class MessageParser extends Transform {
    constructor(options) {
      super(options);
      this.lastBytes = Buffer.alloc(4);
      this.headersParsed = false;
      this.headerBytes = 0;
      this.headerChunks = [];
      this.rawHeaders = false;
      this.bodySize = 0;
    }
    updateLastBytes(data) {
      let lblen = this.lastBytes.length;
      let nblen = Math.min(data.length, lblen);
      for (let i = 0, len = lblen - nblen;i < len; i++) {
        this.lastBytes[i] = this.lastBytes[i + nblen];
      }
      for (let i = 1;i <= nblen; i++) {
        this.lastBytes[lblen - i] = data[data.length - i];
      }
    }
    checkHeaders(data) {
      if (this.headersParsed) {
        return true;
      }
      let lblen = this.lastBytes.length;
      let headerPos = 0;
      this.curLinePos = 0;
      for (let i = 0, len = this.lastBytes.length + data.length;i < len; i++) {
        let chr;
        if (i < lblen) {
          chr = this.lastBytes[i];
        } else {
          chr = data[i - lblen];
        }
        if (chr === 10 && i) {
          let pr1 = i - 1 < lblen ? this.lastBytes[i - 1] : data[i - 1 - lblen];
          let pr2 = i > 1 ? i - 2 < lblen ? this.lastBytes[i - 2] : data[i - 2 - lblen] : false;
          if (pr1 === 10) {
            this.headersParsed = true;
            headerPos = i - lblen + 1;
            this.headerBytes += headerPos;
            break;
          } else if (pr1 === 13 && pr2 === 10) {
            this.headersParsed = true;
            headerPos = i - lblen + 1;
            this.headerBytes += headerPos;
            break;
          }
        }
      }
      if (this.headersParsed) {
        this.headerChunks.push(data.slice(0, headerPos));
        this.rawHeaders = Buffer.concat(this.headerChunks, this.headerBytes);
        this.headerChunks = null;
        this.emit("headers", this.parseHeaders());
        if (data.length - 1 > headerPos) {
          let chunk = data.slice(headerPos);
          this.bodySize += chunk.length;
          setImmediate(() => this.push(chunk));
        }
        return false;
      } else {
        this.headerBytes += data.length;
        this.headerChunks.push(data);
      }
      this.updateLastBytes(data);
      return false;
    }
    _transform(chunk, encoding, callback) {
      if (!chunk || !chunk.length) {
        return callback();
      }
      if (typeof chunk === "string") {
        chunk = Buffer.from(chunk, encoding);
      }
      let headersFound;
      try {
        headersFound = this.checkHeaders(chunk);
      } catch (E) {
        return callback(E);
      }
      if (headersFound) {
        this.bodySize += chunk.length;
        this.push(chunk);
      }
      setImmediate(callback);
    }
    _flush(callback) {
      if (this.headerChunks) {
        let chunk = Buffer.concat(this.headerChunks, this.headerBytes);
        this.bodySize += chunk.length;
        this.push(chunk);
        this.headerChunks = null;
      }
      callback();
    }
    parseHeaders() {
      let lines = (this.rawHeaders || "").toString().split(/\r?\n/);
      for (let i = lines.length - 1;i > 0; i--) {
        if (/^\s/.test(lines[i])) {
          lines[i - 1] += `
` + lines[i];
          lines.splice(i, 1);
        }
      }
      return lines.filter((line) => line.trim()).map((line) => ({
        key: line.substr(0, line.indexOf(":")).trim().toLowerCase(),
        line
      }));
    }
  }
  module.exports = MessageParser;
});

// node_modules/nodemailer/lib/dkim/relaxed-body.js
var require_relaxed_body = __commonJS((exports, module) => {
  var Transform = __require("node:stream").Transform;
  var crypto = __require("node:crypto");

  class RelaxedBody extends Transform {
    constructor(options) {
      super();
      options = options || {};
      this.chunkBuffer = [];
      this.chunkBufferLen = 0;
      this.bodyHash = crypto.createHash(options.hashAlgo || "sha1");
      this.remainder = "";
      this.byteLength = 0;
      this.debug = options.debug;
      this._debugBody = options.debug ? [] : false;
    }
    updateHash(chunk) {
      let bodyStr;
      let nextRemainder = "";
      let state = "file";
      for (let i = chunk.length - 1;i >= 0; i--) {
        let c = chunk[i];
        if (state === "file" && (c === 10 || c === 13)) {} else if (state === "file" && (c === 9 || c === 32)) {
          state = "line";
        } else if (state === "line" && (c === 9 || c === 32)) {} else if (state === "file" || state === "line") {
          state = "body";
          if (i === chunk.length - 1) {
            break;
          }
        }
        if (i === 0) {
          if (state === "file" && (!this.remainder || /[\r\n]$/.test(this.remainder)) || state === "line" && (!this.remainder || /[ \t]$/.test(this.remainder))) {
            this.remainder += chunk.toString("binary");
            return;
          } else if (state === "line" || state === "file") {
            nextRemainder = chunk.toString("binary");
            chunk = false;
            break;
          }
        }
        if (state !== "body") {
          continue;
        }
        nextRemainder = chunk.slice(i + 1).toString("binary");
        chunk = chunk.slice(0, i + 1);
        break;
      }
      let needsFixing = !!this.remainder;
      if (chunk && !needsFixing) {
        for (let i = 0, len = chunk.length;i < len; i++) {
          if (i && chunk[i] === 10 && chunk[i - 1] !== 13) {
            needsFixing = true;
            break;
          } else if (i && chunk[i] === 13 && chunk[i - 1] === 32) {
            needsFixing = true;
            break;
          } else if (i && chunk[i] === 32 && chunk[i - 1] === 32) {
            needsFixing = true;
            break;
          } else if (chunk[i] === 9) {
            needsFixing = true;
            break;
          }
        }
      }
      if (needsFixing) {
        bodyStr = this.remainder + (chunk ? chunk.toString("binary") : "");
        this.remainder = nextRemainder;
        bodyStr = bodyStr.replace(/\r?\n/g, `
`).replace(/[ \t]*$/gm, "").replace(/[ \t]+/gm, " ").replace(/\n/g, `\r
`);
        chunk = Buffer.from(bodyStr, "binary");
      } else if (nextRemainder) {
        this.remainder = nextRemainder;
      }
      if (this.debug) {
        this._debugBody.push(chunk);
      }
      this.bodyHash.update(chunk);
    }
    _transform(chunk, encoding, callback) {
      if (!chunk || !chunk.length) {
        return callback();
      }
      if (typeof chunk === "string") {
        chunk = Buffer.from(chunk, encoding);
      }
      this.updateHash(chunk);
      this.byteLength += chunk.length;
      this.push(chunk);
      callback();
    }
    _flush(callback) {
      if (/[\r\n]$/.test(this.remainder) && this.byteLength > 2) {
        this.bodyHash.update(Buffer.from(`\r
`));
      }
      if (!this.byteLength) {
        this.push(Buffer.from(`\r
`));
      }
      this.emit("hash", this.bodyHash.digest("base64"), this.debug ? Buffer.concat(this._debugBody) : false);
      callback();
    }
  }
  module.exports = RelaxedBody;
});

// node_modules/nodemailer/lib/dkim/sign.js
var require_sign = __commonJS((exports, module) => {
  var punycode = require_punycode();
  var mimeFuncs = require_mime_funcs();
  var crypto = __require("node:crypto");
  module.exports = (headers, hashAlgo, bodyHash, options) => {
    options = options || {};
    let defaultFieldNames = "From:Sender:Reply-To:Subject:Date:Message-ID:To:" + "Cc:MIME-Version:Content-Type:Content-Transfer-Encoding:Content-ID:" + "Content-Description:Resent-Date:Resent-From:Resent-Sender:" + "Resent-To:Resent-Cc:Resent-Message-ID:In-Reply-To:References:" + "List-Id:List-Help:List-Unsubscribe:List-Subscribe:List-Post:" + "List-Owner:List-Archive";
    let fieldNames = options.headerFieldNames || defaultFieldNames;
    let canonicalizedHeaderData = relaxedHeaders(headers, fieldNames, options.skipFields);
    let dkimHeader = generateDKIMHeader(options.domainName, options.keySelector, canonicalizedHeaderData.fieldNames, hashAlgo, bodyHash);
    let signer, signature;
    canonicalizedHeaderData.headers += "dkim-signature:" + relaxedHeaderLine(dkimHeader);
    signer = crypto.createSign(("rsa-" + hashAlgo).toUpperCase());
    signer.update(canonicalizedHeaderData.headers);
    try {
      signature = signer.sign(options.privateKey, "base64");
    } catch (E) {
      return false;
    }
    return dkimHeader + signature.replace(/(^.{73}|.{75}(?!\r?\n|\r))/g, `$&\r
 `).trim();
  };
  module.exports.relaxedHeaders = relaxedHeaders;
  function generateDKIMHeader(domainName, keySelector, fieldNames, hashAlgo, bodyHash) {
    let dkim = [
      "v=1",
      "a=rsa-" + hashAlgo,
      "c=relaxed/relaxed",
      "d=" + punycode.toASCII(domainName),
      "q=dns/txt",
      "s=" + keySelector,
      "bh=" + bodyHash,
      "h=" + fieldNames
    ].join("; ");
    return mimeFuncs.foldLines("DKIM-Signature: " + dkim, 76) + `;\r
 b=`;
  }
  function relaxedHeaders(headers, fieldNames, skipFields) {
    let includedFields = new Set;
    let skip = new Set;
    let headerFields = new Map;
    (skipFields || "").toLowerCase().split(":").forEach((field) => {
      skip.add(field.trim());
    });
    (fieldNames || "").toLowerCase().split(":").filter((field) => !skip.has(field.trim())).forEach((field) => {
      includedFields.add(field.trim());
    });
    for (let i = headers.length - 1;i >= 0; i--) {
      let line = headers[i];
      if (includedFields.has(line.key) && !headerFields.has(line.key)) {
        headerFields.set(line.key, relaxedHeaderLine(line.line));
      }
    }
    let headersList = [];
    let fields = [];
    includedFields.forEach((field) => {
      if (headerFields.has(field)) {
        fields.push(field);
        headersList.push(field + ":" + headerFields.get(field));
      }
    });
    return {
      headers: headersList.join(`\r
`) + `\r
`,
      fieldNames: fields.join(":")
    };
  }
  function relaxedHeaderLine(line) {
    return line.substr(line.indexOf(":") + 1).replace(/\r?\n/g, "").replace(/\s+/g, " ").trim();
  }
});

// node_modules/nodemailer/lib/dkim/index.js
var require_dkim = __commonJS((exports, module) => {
  var MessageParser = require_message_parser();
  var RelaxedBody = require_relaxed_body();
  var sign = require_sign();
  var PassThrough = __require("node:stream").PassThrough;
  var fs = __require("node:fs");
  var path = __require("node:path");
  var crypto = __require("node:crypto");
  var DKIM_ALGO = "sha256";
  var MAX_MESSAGE_SIZE = 128 * 1024;

  class DKIMSigner {
    constructor(options, keys, input, output) {
      this.options = options || {};
      this.keys = keys;
      this.cacheTreshold = Number(this.options.cacheTreshold) || MAX_MESSAGE_SIZE;
      this.hashAlgo = this.options.hashAlgo || DKIM_ALGO;
      this.cacheDir = this.options.cacheDir || false;
      this.chunks = [];
      this.chunklen = 0;
      this.readPos = 0;
      this.cachePath = this.cacheDir ? path.join(this.cacheDir, "message." + Date.now() + "-" + crypto.randomBytes(14).toString("hex")) : false;
      this.cache = false;
      this.headers = false;
      this.bodyHash = false;
      this.parser = false;
      this.relaxedBody = false;
      this.input = input;
      this.output = output;
      this.output.usingCache = false;
      this.hasErrored = false;
      this.input.on("error", (err) => {
        this.hasErrored = true;
        this.cleanup();
        output.emit("error", err);
      });
    }
    cleanup() {
      if (!this.cache || !this.cachePath) {
        return;
      }
      fs.unlink(this.cachePath, () => false);
    }
    createReadCache() {
      this.cache = fs.createReadStream(this.cachePath);
      this.cache.once("error", (err) => {
        this.cleanup();
        this.output.emit("error", err);
      });
      this.cache.once("close", () => {
        this.cleanup();
      });
      this.cache.pipe(this.output);
    }
    sendNextChunk() {
      if (this.hasErrored) {
        return;
      }
      if (this.readPos >= this.chunks.length) {
        if (!this.cache) {
          return this.output.end();
        }
        return this.createReadCache();
      }
      let chunk = this.chunks[this.readPos++];
      if (this.output.write(chunk) === false) {
        return this.output.once("drain", () => {
          this.sendNextChunk();
        });
      }
      setImmediate(() => this.sendNextChunk());
    }
    sendSignedOutput() {
      let keyPos = 0;
      let signNextKey = () => {
        if (keyPos >= this.keys.length) {
          this.output.write(this.parser.rawHeaders);
          return setImmediate(() => this.sendNextChunk());
        }
        let key = this.keys[keyPos++];
        let dkimField = sign(this.headers, this.hashAlgo, this.bodyHash, {
          domainName: key.domainName,
          keySelector: key.keySelector,
          privateKey: key.privateKey,
          headerFieldNames: this.options.headerFieldNames,
          skipFields: this.options.skipFields
        });
        if (dkimField) {
          this.output.write(Buffer.from(dkimField + `\r
`));
        }
        return setImmediate(signNextKey);
      };
      if (this.bodyHash && this.headers) {
        return signNextKey();
      }
      this.output.write(this.parser.rawHeaders);
      this.sendNextChunk();
    }
    createWriteCache() {
      this.output.usingCache = true;
      this.cache = fs.createWriteStream(this.cachePath);
      this.cache.once("error", (err) => {
        this.cleanup();
        this.relaxedBody.unpipe(this.cache);
        this.relaxedBody.on("readable", () => {
          while (this.relaxedBody.read() !== null) {}
        });
        this.hasErrored = true;
        this.output.emit("error", err);
      });
      this.cache.once("close", () => {
        this.sendSignedOutput();
      });
      this.relaxedBody.removeAllListeners("readable");
      this.relaxedBody.pipe(this.cache);
    }
    signStream() {
      this.parser = new MessageParser;
      this.relaxedBody = new RelaxedBody({
        hashAlgo: this.hashAlgo
      });
      this.parser.on("headers", (value) => {
        this.headers = value;
      });
      this.relaxedBody.on("hash", (value) => {
        this.bodyHash = value;
      });
      this.relaxedBody.on("readable", () => {
        let chunk;
        if (this.cache) {
          return;
        }
        while ((chunk = this.relaxedBody.read()) !== null) {
          this.chunks.push(chunk);
          this.chunklen += chunk.length;
          if (this.chunklen >= this.cacheTreshold && this.cachePath) {
            return this.createWriteCache();
          }
        }
      });
      this.relaxedBody.on("end", () => {
        if (this.cache) {
          return;
        }
        this.sendSignedOutput();
      });
      this.parser.pipe(this.relaxedBody);
      setImmediate(() => this.input.pipe(this.parser));
    }
  }

  class DKIM {
    constructor(options) {
      this.options = options || {};
      this.keys = [].concat(this.options.keys || {
        domainName: options.domainName,
        keySelector: options.keySelector,
        privateKey: options.privateKey
      });
    }
    sign(input, extraOptions) {
      let output = new PassThrough;
      let inputStream = input;
      let writeValue = false;
      if (Buffer.isBuffer(input)) {
        writeValue = input;
        inputStream = new PassThrough;
      } else if (typeof input === "string") {
        writeValue = Buffer.from(input);
        inputStream = new PassThrough;
      }
      let options = this.options;
      if (extraOptions && Object.keys(extraOptions).length) {
        options = {};
        Object.keys(this.options || {}).forEach((key) => {
          options[key] = this.options[key];
        });
        Object.keys(extraOptions || {}).forEach((key) => {
          if (!(key in options)) {
            options[key] = extraOptions[key];
          }
        });
      }
      let signer = new DKIMSigner(options, this.keys, inputStream, output);
      setImmediate(() => {
        signer.signStream();
        if (writeValue) {
          setImmediate(() => {
            inputStream.end(writeValue);
          });
        }
      });
      return output;
    }
  }
  module.exports = DKIM;
});

// node_modules/nodemailer/lib/smtp-connection/http-proxy-client.js
var require_http_proxy_client = __commonJS((exports, module) => {
  var net = __require("node:net");
  var tls = __require("node:tls");
  var urllib = __require("node:url");
  function httpProxyClient(proxyUrl, destinationPort, destinationHost, callback) {
    let proxy = urllib.parse(proxyUrl);
    let options;
    let connect;
    let socket;
    options = {
      host: proxy.hostname,
      port: Number(proxy.port) ? Number(proxy.port) : proxy.protocol === "https:" ? 443 : 80
    };
    if (proxy.protocol === "https:") {
      options.rejectUnauthorized = false;
      connect = tls.connect.bind(tls);
    } else {
      connect = net.connect.bind(net);
    }
    let finished = false;
    let tempSocketErr = (err) => {
      if (finished) {
        return;
      }
      finished = true;
      try {
        socket.destroy();
      } catch (E) {}
      callback(err);
    };
    let timeoutErr = () => {
      let err = new Error("Proxy socket timed out");
      err.code = "ETIMEDOUT";
      tempSocketErr(err);
    };
    socket = connect(options, () => {
      if (finished) {
        return;
      }
      let reqHeaders = {
        Host: destinationHost + ":" + destinationPort,
        Connection: "close"
      };
      if (proxy.auth) {
        reqHeaders["Proxy-Authorization"] = "Basic " + Buffer.from(proxy.auth).toString("base64");
      }
      socket.write("CONNECT " + destinationHost + ":" + destinationPort + ` HTTP/1.1\r
` + Object.keys(reqHeaders).map((key) => key + ": " + reqHeaders[key]).join(`\r
`) + `\r
\r
`);
      let headers = "";
      let onSocketData = (chunk) => {
        let match;
        let remainder;
        if (finished) {
          return;
        }
        headers += chunk.toString("binary");
        if (match = headers.match(/\r\n\r\n/)) {
          socket.removeListener("data", onSocketData);
          remainder = headers.substr(match.index + match[0].length);
          headers = headers.substr(0, match.index);
          if (remainder) {
            socket.unshift(Buffer.from(remainder, "binary"));
          }
          finished = true;
          match = headers.match(/^HTTP\/\d+\.\d+ (\d+)/i);
          if (!match || (match[1] || "").charAt(0) !== "2") {
            try {
              socket.destroy();
            } catch (E) {}
            return callback(new Error("Invalid response from proxy" + (match && ": " + match[1] || "")));
          }
          socket.removeListener("error", tempSocketErr);
          socket.removeListener("timeout", timeoutErr);
          socket.setTimeout(0);
          return callback(null, socket);
        }
      };
      socket.on("data", onSocketData);
    });
    socket.setTimeout(httpProxyClient.timeout || 30 * 1000);
    socket.on("timeout", timeoutErr);
    socket.once("error", tempSocketErr);
  }
  module.exports = httpProxyClient;
});

// node_modules/nodemailer/lib/mailer/mail-message.js
var require_mail_message = __commonJS((exports, module) => {
  var shared = require_shared();
  var MimeNode = require_mime_node();
  var mimeFuncs = require_mime_funcs();

  class MailMessage {
    constructor(mailer, data) {
      this.mailer = mailer;
      this.data = {};
      this.message = null;
      data = data || {};
      let options = mailer.options || {};
      let defaults = mailer._defaults || {};
      Object.keys(data).forEach((key) => {
        this.data[key] = data[key];
      });
      this.data.headers = this.data.headers || {};
      Object.keys(defaults).forEach((key) => {
        if (!(key in this.data)) {
          this.data[key] = defaults[key];
        } else if (key === "headers") {
          Object.keys(defaults.headers).forEach((key2) => {
            if (!(key2 in this.data.headers)) {
              this.data.headers[key2] = defaults.headers[key2];
            }
          });
        }
      });
      ["disableFileAccess", "disableUrlAccess", "normalizeHeaderKey"].forEach((key) => {
        if (key in options) {
          this.data[key] = options[key];
        }
      });
    }
    resolveContent(...args) {
      return shared.resolveContent(...args);
    }
    resolveAll(callback) {
      let keys = [
        [this.data, "html"],
        [this.data, "text"],
        [this.data, "watchHtml"],
        [this.data, "amp"],
        [this.data, "icalEvent"]
      ];
      if (this.data.alternatives && this.data.alternatives.length) {
        this.data.alternatives.forEach((alternative, i) => {
          keys.push([this.data.alternatives, i]);
        });
      }
      if (this.data.attachments && this.data.attachments.length) {
        this.data.attachments.forEach((attachment, i) => {
          if (!attachment.filename) {
            attachment.filename = (attachment.path || attachment.href || "").split("/").pop().split("?").shift() || "attachment-" + (i + 1);
            if (attachment.filename.indexOf(".") < 0) {
              attachment.filename += "." + mimeFuncs.detectExtension(attachment.contentType);
            }
          }
          if (!attachment.contentType) {
            attachment.contentType = mimeFuncs.detectMimeType(attachment.filename || attachment.path || attachment.href || "bin");
          }
          keys.push([this.data.attachments, i]);
        });
      }
      let mimeNode = new MimeNode;
      let addressKeys = ["from", "to", "cc", "bcc", "sender", "replyTo"];
      addressKeys.forEach((address) => {
        let value;
        if (this.message) {
          value = [].concat(mimeNode._parseAddresses(this.message.getHeader(address === "replyTo" ? "reply-to" : address)) || []);
        } else if (this.data[address]) {
          value = [].concat(mimeNode._parseAddresses(this.data[address]) || []);
        }
        if (value && value.length) {
          this.data[address] = value;
        } else if (address in this.data) {
          this.data[address] = null;
        }
      });
      let singleKeys = ["from", "sender"];
      singleKeys.forEach((address) => {
        if (this.data[address]) {
          this.data[address] = this.data[address].shift();
        }
      });
      let pos = 0;
      let resolveNext = () => {
        if (pos >= keys.length) {
          return callback(null, this.data);
        }
        let args = keys[pos++];
        if (!args[0] || !args[0][args[1]]) {
          return resolveNext();
        }
        shared.resolveContent(...args, (err, value) => {
          if (err) {
            return callback(err);
          }
          let node = {
            content: value
          };
          if (args[0][args[1]] && typeof args[0][args[1]] === "object" && !Buffer.isBuffer(args[0][args[1]])) {
            Object.keys(args[0][args[1]]).forEach((key) => {
              if (!(key in node) && !["content", "path", "href", "raw"].includes(key)) {
                node[key] = args[0][args[1]][key];
              }
            });
          }
          args[0][args[1]] = node;
          resolveNext();
        });
      };
      setImmediate(() => resolveNext());
    }
    normalize(callback) {
      let envelope = this.data.envelope || this.message.getEnvelope();
      let messageId = this.message.messageId();
      this.resolveAll((err, data) => {
        if (err) {
          return callback(err);
        }
        data.envelope = envelope;
        data.messageId = messageId;
        ["html", "text", "watchHtml", "amp"].forEach((key) => {
          if (data[key] && data[key].content) {
            if (typeof data[key].content === "string") {
              data[key] = data[key].content;
            } else if (Buffer.isBuffer(data[key].content)) {
              data[key] = data[key].content.toString();
            }
          }
        });
        if (data.icalEvent && Buffer.isBuffer(data.icalEvent.content)) {
          data.icalEvent.content = data.icalEvent.content.toString("base64");
          data.icalEvent.encoding = "base64";
        }
        if (data.alternatives && data.alternatives.length) {
          data.alternatives.forEach((alternative) => {
            if (alternative && alternative.content && Buffer.isBuffer(alternative.content)) {
              alternative.content = alternative.content.toString("base64");
              alternative.encoding = "base64";
            }
          });
        }
        if (data.attachments && data.attachments.length) {
          data.attachments.forEach((attachment) => {
            if (attachment && attachment.content && Buffer.isBuffer(attachment.content)) {
              attachment.content = attachment.content.toString("base64");
              attachment.encoding = "base64";
            }
          });
        }
        data.normalizedHeaders = {};
        Object.keys(data.headers || {}).forEach((key) => {
          let value = [].concat(data.headers[key] || []).shift();
          value = value && value.value || value;
          if (value) {
            if (["references", "in-reply-to", "message-id", "content-id"].includes(key)) {
              value = this.message._encodeHeaderValue(key, value);
            }
            data.normalizedHeaders[key] = value;
          }
        });
        if (data.list && typeof data.list === "object") {
          let listHeaders = this._getListHeaders(data.list);
          listHeaders.forEach((entry) => {
            data.normalizedHeaders[entry.key] = entry.value.map((val) => val && val.value || val).join(", ");
          });
        }
        if (data.references) {
          data.normalizedHeaders.references = this.message._encodeHeaderValue("references", data.references);
        }
        if (data.inReplyTo) {
          data.normalizedHeaders["in-reply-to"] = this.message._encodeHeaderValue("in-reply-to", data.inReplyTo);
        }
        return callback(null, data);
      });
    }
    setMailerHeader() {
      if (!this.message || !this.data.xMailer) {
        return;
      }
      this.message.setHeader("X-Mailer", this.data.xMailer);
    }
    setPriorityHeaders() {
      if (!this.message || !this.data.priority) {
        return;
      }
      switch ((this.data.priority || "").toString().toLowerCase()) {
        case "high":
          this.message.setHeader("X-Priority", "1 (Highest)");
          this.message.setHeader("X-MSMail-Priority", "High");
          this.message.setHeader("Importance", "High");
          break;
        case "low":
          this.message.setHeader("X-Priority", "5 (Lowest)");
          this.message.setHeader("X-MSMail-Priority", "Low");
          this.message.setHeader("Importance", "Low");
          break;
        default:
      }
    }
    setListHeaders() {
      if (!this.message || !this.data.list || typeof this.data.list !== "object") {
        return;
      }
      if (this.data.list && typeof this.data.list === "object") {
        this._getListHeaders(this.data.list).forEach((listHeader) => {
          listHeader.value.forEach((value) => {
            this.message.addHeader(listHeader.key, value);
          });
        });
      }
    }
    _getListHeaders(listData) {
      return Object.keys(listData).map((key) => ({
        key: "list-" + key.toLowerCase().trim(),
        value: [].concat(listData[key] || []).map((value) => ({
          prepared: true,
          foldLines: true,
          value: [].concat(value || []).map((value2) => {
            if (typeof value2 === "string") {
              value2 = {
                url: value2
              };
            }
            if (value2 && value2.url) {
              if (key.toLowerCase().trim() === "id") {
                let comment2 = value2.comment || "";
                if (mimeFuncs.isPlainText(comment2)) {
                  comment2 = '"' + comment2 + '"';
                } else {
                  comment2 = mimeFuncs.encodeWord(comment2);
                }
                return (value2.comment ? comment2 + " " : "") + this._formatListUrl(value2.url).replace(/^<[^:]+\/{,2}/, "");
              }
              let comment = value2.comment || "";
              if (!mimeFuncs.isPlainText(comment)) {
                comment = mimeFuncs.encodeWord(comment);
              }
              return this._formatListUrl(value2.url) + (value2.comment ? " (" + comment + ")" : "");
            }
            return "";
          }).filter((value2) => value2).join(", ")
        }))
      }));
    }
    _formatListUrl(url) {
      url = url.replace(/[\s<]+|[\s>]+/g, "");
      if (/^(https?|mailto|ftp):/.test(url)) {
        return "<" + url + ">";
      }
      if (/^[^@]+@[^@]+$/.test(url)) {
        return "<mailto:" + url + ">";
      }
      return "<http://" + url + ">";
    }
  }
  module.exports = MailMessage;
});

// node_modules/nodemailer/lib/mailer/index.js
var require_mailer = __commonJS((exports, module) => {
  var EventEmitter = __require("node:events");
  var shared = require_shared();
  var mimeTypes = require_mime_types();
  var MailComposer = require_mail_composer();
  var DKIM = require_dkim();
  var httpProxyClient = require_http_proxy_client();
  var util = __require("node:util");
  var urllib = __require("node:url");
  var packageData = require_package2();
  var MailMessage = require_mail_message();
  var net = __require("node:net");
  var dns = __require("node:dns");
  var crypto = __require("node:crypto");

  class Mail extends EventEmitter {
    constructor(transporter, options, defaults) {
      super();
      this.options = options || {};
      this._defaults = defaults || {};
      this._defaultPlugins = {
        compile: [(...args) => this._convertDataImages(...args)],
        stream: []
      };
      this._userPlugins = {
        compile: [],
        stream: []
      };
      this.meta = new Map;
      this.dkim = this.options.dkim ? new DKIM(this.options.dkim) : false;
      this.transporter = transporter;
      this.transporter.mailer = this;
      this.logger = shared.getLogger(this.options, {
        component: this.options.component || "mail"
      });
      this.logger.debug({
        tnx: "create"
      }, "Creating transport: %s", this.getVersionString());
      if (typeof this.transporter.on === "function") {
        this.transporter.on("log", (log2) => {
          this.logger.debug({
            tnx: "transport"
          }, "%s: %s", log2.type, log2.message);
        });
        this.transporter.on("error", (err) => {
          this.logger.error({
            err,
            tnx: "transport"
          }, "Transport Error: %s", err.message);
          this.emit("error", err);
        });
        this.transporter.on("idle", (...args) => {
          this.emit("idle", ...args);
        });
      }
      ["close", "isIdle", "verify"].forEach((method) => {
        this[method] = (...args) => {
          if (typeof this.transporter[method] === "function") {
            if (method === "verify" && typeof this.getSocket === "function") {
              this.transporter.getSocket = this.getSocket;
              this.getSocket = false;
            }
            return this.transporter[method](...args);
          } else {
            this.logger.warn({
              tnx: "transport",
              methodName: method
            }, "Non existing method %s called for transport", method);
            return false;
          }
        };
      });
      if (this.options.proxy && typeof this.options.proxy === "string") {
        this.setupProxy(this.options.proxy);
      }
    }
    use(step, plugin) {
      step = (step || "").toString();
      if (!this._userPlugins.hasOwnProperty(step)) {
        this._userPlugins[step] = [plugin];
      } else {
        this._userPlugins[step].push(plugin);
      }
      return this;
    }
    sendMail(data, callback = null) {
      let promise;
      if (!callback) {
        promise = new Promise((resolve, reject) => {
          callback = shared.callbackPromise(resolve, reject);
        });
      }
      if (typeof this.getSocket === "function") {
        this.transporter.getSocket = this.getSocket;
        this.getSocket = false;
      }
      let mail = new MailMessage(this, data);
      this.logger.debug({
        tnx: "transport",
        name: this.transporter.name,
        version: this.transporter.version,
        action: "send"
      }, "Sending mail using %s/%s", this.transporter.name, this.transporter.version);
      this._processPlugins("compile", mail, (err) => {
        if (err) {
          this.logger.error({
            err,
            tnx: "plugin",
            action: "compile"
          }, "PluginCompile Error: %s", err.message);
          return callback(err);
        }
        mail.message = new MailComposer(mail.data).compile();
        mail.setMailerHeader();
        mail.setPriorityHeaders();
        mail.setListHeaders();
        this._processPlugins("stream", mail, (err2) => {
          if (err2) {
            this.logger.error({
              err: err2,
              tnx: "plugin",
              action: "stream"
            }, "PluginStream Error: %s", err2.message);
            return callback(err2);
          }
          if (mail.data.dkim || this.dkim) {
            mail.message.processFunc((input) => {
              let dkim = mail.data.dkim ? new DKIM(mail.data.dkim) : this.dkim;
              this.logger.debug({
                tnx: "DKIM",
                messageId: mail.message.messageId(),
                dkimDomains: dkim.keys.map((key) => key.keySelector + "." + key.domainName).join(", ")
              }, "Signing outgoing message with %s keys", dkim.keys.length);
              return dkim.sign(input, mail.data._dkim);
            });
          }
          this.transporter.send(mail, (...args) => {
            if (args[0]) {
              this.logger.error({
                err: args[0],
                tnx: "transport",
                action: "send"
              }, "Send Error: %s", args[0].message);
            }
            callback(...args);
          });
        });
      });
      return promise;
    }
    getVersionString() {
      return util.format("%s (%s; +%s; %s/%s)", packageData.name, packageData.version, packageData.homepage, this.transporter.name, this.transporter.version);
    }
    _processPlugins(step, mail, callback) {
      step = (step || "").toString();
      if (!this._userPlugins.hasOwnProperty(step)) {
        return callback();
      }
      let userPlugins = this._userPlugins[step] || [];
      let defaultPlugins = this._defaultPlugins[step] || [];
      if (userPlugins.length) {
        this.logger.debug({
          tnx: "transaction",
          pluginCount: userPlugins.length,
          step
        }, "Using %s plugins for %s", userPlugins.length, step);
      }
      if (userPlugins.length + defaultPlugins.length === 0) {
        return callback();
      }
      let pos = 0;
      let block = "default";
      let processPlugins = () => {
        let curplugins = block === "default" ? defaultPlugins : userPlugins;
        if (pos >= curplugins.length) {
          if (block === "default" && userPlugins.length) {
            block = "user";
            pos = 0;
            curplugins = userPlugins;
          } else {
            return callback();
          }
        }
        let plugin = curplugins[pos++];
        plugin(mail, (err) => {
          if (err) {
            return callback(err);
          }
          processPlugins();
        });
      };
      processPlugins();
    }
    setupProxy(proxyUrl) {
      let proxy = urllib.parse(proxyUrl);
      this.getSocket = (options, callback) => {
        let protocol = proxy.protocol.replace(/:$/, "").toLowerCase();
        if (this.meta.has("proxy_handler_" + protocol)) {
          return this.meta.get("proxy_handler_" + protocol)(proxy, options, callback);
        }
        switch (protocol) {
          case "http":
          case "https":
            httpProxyClient(proxy.href, options.port, options.host, (err, socket) => {
              if (err) {
                return callback(err);
              }
              return callback(null, {
                connection: socket
              });
            });
            return;
          case "socks":
          case "socks5":
          case "socks4":
          case "socks4a": {
            if (!this.meta.has("proxy_socks_module")) {
              return callback(new Error("Socks module not loaded"));
            }
            let connect = (ipaddress) => {
              let proxyV2 = !!this.meta.get("proxy_socks_module").SocksClient;
              let socksClient = proxyV2 ? this.meta.get("proxy_socks_module").SocksClient : this.meta.get("proxy_socks_module");
              let proxyType = Number(proxy.protocol.replace(/\D/g, "")) || 5;
              let connectionOpts = {
                proxy: {
                  ipaddress,
                  port: Number(proxy.port),
                  type: proxyType
                },
                [proxyV2 ? "destination" : "target"]: {
                  host: options.host,
                  port: options.port
                },
                command: "connect"
              };
              if (proxy.auth) {
                let username = decodeURIComponent(proxy.auth.split(":").shift());
                let password = decodeURIComponent(proxy.auth.split(":").pop());
                if (proxyV2) {
                  connectionOpts.proxy.userId = username;
                  connectionOpts.proxy.password = password;
                } else if (proxyType === 4) {
                  connectionOpts.userid = username;
                } else {
                  connectionOpts.authentication = {
                    username,
                    password
                  };
                }
              }
              socksClient.createConnection(connectionOpts, (err, info) => {
                if (err) {
                  return callback(err);
                }
                return callback(null, {
                  connection: info.socket || info
                });
              });
            };
            if (net.isIP(proxy.hostname)) {
              return connect(proxy.hostname);
            }
            return dns.resolve(proxy.hostname, (err, address) => {
              if (err) {
                return callback(err);
              }
              connect(Array.isArray(address) ? address[0] : address);
            });
          }
        }
        callback(new Error("Unknown proxy configuration"));
      };
    }
    _convertDataImages(mail, callback) {
      if (!this.options.attachDataUrls && !mail.data.attachDataUrls || !mail.data.html) {
        return callback();
      }
      mail.resolveContent(mail.data, "html", (err, html) => {
        if (err) {
          return callback(err);
        }
        let cidCounter = 0;
        html = (html || "").toString().replace(/(<img\b[^<>]{0,1024} src\s{0,20}=[\s"']{0,20})(data:([^;]+);[^"'>\s]+)/gi, (match, prefix, dataUri, mimeType) => {
          let cid = crypto.randomBytes(10).toString("hex") + "@localhost";
          if (!mail.data.attachments) {
            mail.data.attachments = [];
          }
          if (!Array.isArray(mail.data.attachments)) {
            mail.data.attachments = [].concat(mail.data.attachments || []);
          }
          mail.data.attachments.push({
            path: dataUri,
            cid,
            filename: "image-" + ++cidCounter + "." + mimeTypes.detectExtension(mimeType)
          });
          return prefix + "cid:" + cid;
        });
        mail.data.html = html;
        callback();
      });
    }
    set(key, value) {
      return this.meta.set(key, value);
    }
    get(key) {
      return this.meta.get(key);
    }
  }
  module.exports = Mail;
});

// node_modules/nodemailer/lib/smtp-connection/data-stream.js
var require_data_stream = __commonJS((exports, module) => {
  var stream = __require("node:stream");
  var Transform = stream.Transform;

  class DataStream extends Transform {
    constructor(options) {
      super(options);
      this.options = options || {};
      this._curLine = "";
      this.inByteCount = 0;
      this.outByteCount = 0;
      this.lastByte = false;
    }
    _transform(chunk, encoding, done) {
      let chunks = [];
      let chunklen = 0;
      let i, len, lastPos = 0;
      let buf;
      if (!chunk || !chunk.length) {
        return done();
      }
      if (typeof chunk === "string") {
        chunk = Buffer.from(chunk);
      }
      this.inByteCount += chunk.length;
      for (i = 0, len = chunk.length;i < len; i++) {
        if (chunk[i] === 46) {
          if (i && chunk[i - 1] === 10 || !i && (!this.lastByte || this.lastByte === 10)) {
            buf = chunk.slice(lastPos, i + 1);
            chunks.push(buf);
            chunks.push(Buffer.from("."));
            chunklen += buf.length + 1;
            lastPos = i + 1;
          }
        } else if (chunk[i] === 10) {
          if (i && chunk[i - 1] !== 13 || !i && this.lastByte !== 13) {
            if (i > lastPos) {
              buf = chunk.slice(lastPos, i);
              chunks.push(buf);
              chunklen += buf.length + 2;
            } else {
              chunklen += 2;
            }
            chunks.push(Buffer.from(`\r
`));
            lastPos = i + 1;
          }
        }
      }
      if (chunklen) {
        if (lastPos < chunk.length) {
          buf = chunk.slice(lastPos);
          chunks.push(buf);
          chunklen += buf.length;
        }
        this.outByteCount += chunklen;
        this.push(Buffer.concat(chunks, chunklen));
      } else {
        this.outByteCount += chunk.length;
        this.push(chunk);
      }
      this.lastByte = chunk[chunk.length - 1];
      done();
    }
    _flush(done) {
      let buf;
      if (this.lastByte === 10) {
        buf = Buffer.from(`.\r
`);
      } else if (this.lastByte === 13) {
        buf = Buffer.from(`
.\r
`);
      } else {
        buf = Buffer.from(`\r
.\r
`);
      }
      this.outByteCount += buf.length;
      this.push(buf);
      done();
    }
  }
  module.exports = DataStream;
});

// node_modules/nodemailer/lib/smtp-connection/index.js
var require_smtp_connection = __commonJS((exports, module) => {
  var packageInfo = require_package2();
  var EventEmitter = __require("node:events").EventEmitter;
  var net = __require("node:net");
  var tls = __require("node:tls");
  var os = __require("node:os");
  var crypto = __require("node:crypto");
  var DataStream = require_data_stream();
  var PassThrough = __require("node:stream").PassThrough;
  var shared = require_shared();
  var CONNECTION_TIMEOUT = 2 * 60 * 1000;
  var SOCKET_TIMEOUT = 10 * 60 * 1000;
  var GREETING_TIMEOUT = 30 * 1000;
  var DNS_TIMEOUT = 30 * 1000;

  class SMTPConnection extends EventEmitter {
    constructor(options) {
      super(options);
      this.id = crypto.randomBytes(8).toString("base64").replace(/\W/g, "");
      this.stage = "init";
      this.options = options || {};
      this.secureConnection = !!this.options.secure;
      this.alreadySecured = !!this.options.secured;
      this.port = Number(this.options.port) || (this.secureConnection ? 465 : 587);
      this.host = this.options.host || "localhost";
      this.servername = this.options.servername ? this.options.servername : !net.isIP(this.host) ? this.host : false;
      this.allowInternalNetworkInterfaces = this.options.allowInternalNetworkInterfaces || false;
      if (typeof this.options.secure === "undefined" && this.port === 465) {
        this.secureConnection = true;
      }
      this.name = this.options.name || this._getHostname();
      this.logger = shared.getLogger(this.options, {
        component: this.options.component || "smtp-connection",
        sid: this.id
      });
      this.customAuth = new Map;
      Object.keys(this.options.customAuth || {}).forEach((key) => {
        let mapKey = (key || "").toString().trim().toUpperCase();
        if (!mapKey) {
          return;
        }
        this.customAuth.set(mapKey, this.options.customAuth[key]);
      });
      this.version = packageInfo.version;
      this.authenticated = false;
      this.destroyed = false;
      this.secure = !!this.secureConnection;
      this._remainder = "";
      this._responseQueue = [];
      this.lastServerResponse = false;
      this._socket = false;
      this._supportedAuth = [];
      this.allowsAuth = false;
      this._envelope = false;
      this._supportedExtensions = [];
      this._maxAllowedSize = 0;
      this._responseActions = [];
      this._recipientQueue = [];
      this._greetingTimeout = false;
      this._connectionTimeout = false;
      this._destroyed = false;
      this._closing = false;
      this._onSocketData = (chunk) => this._onData(chunk);
      this._onSocketError = (error) => this._onError(error, "ESOCKET", false, "CONN");
      this._onSocketClose = () => this._onClose();
      this._onSocketEnd = () => this._onEnd();
      this._onSocketTimeout = () => this._onTimeout();
    }
    connect(connectCallback) {
      if (typeof connectCallback === "function") {
        this.once("connect", () => {
          this.logger.debug({
            tnx: "smtp"
          }, "SMTP handshake finished");
          connectCallback();
        });
        const isDestroyedMessage = this._isDestroyedMessage("connect");
        if (isDestroyedMessage) {
          return connectCallback(this._formatError(isDestroyedMessage, "ECONNECTION", false, "CONN"));
        }
      }
      let opts = {
        port: this.port,
        host: this.host,
        allowInternalNetworkInterfaces: this.allowInternalNetworkInterfaces,
        timeout: this.options.dnsTimeout || DNS_TIMEOUT
      };
      if (this.options.localAddress) {
        opts.localAddress = this.options.localAddress;
      }
      let setupConnectionHandlers = () => {
        this._connectionTimeout = setTimeout(() => {
          this._onError("Connection timeout", "ETIMEDOUT", false, "CONN");
        }, this.options.connectionTimeout || CONNECTION_TIMEOUT);
        this._socket.on("error", this._onSocketError);
      };
      if (this.options.connection) {
        this._socket = this.options.connection;
        setupConnectionHandlers();
        if (this.secureConnection && !this.alreadySecured) {
          setImmediate(() => this._upgradeConnection((err) => {
            if (err) {
              this._onError(new Error("Error initiating TLS - " + (err.message || err)), "ETLS", false, "CONN");
              return;
            }
            this._onConnect();
          }));
        } else {
          setImmediate(() => this._onConnect());
        }
        return;
      } else if (this.options.socket) {
        this._socket = this.options.socket;
        return shared.resolveHostname(opts, (err, resolved) => {
          if (err) {
            return setImmediate(() => this._onError(err, "EDNS", false, "CONN"));
          }
          this.logger.debug({
            tnx: "dns",
            source: opts.host,
            resolved: resolved.host,
            cached: !!resolved.cached
          }, "Resolved %s as %s [cache %s]", opts.host, resolved.host, resolved.cached ? "hit" : "miss");
          Object.keys(resolved).forEach((key) => {
            if (key.charAt(0) !== "_" && resolved[key]) {
              opts[key] = resolved[key];
            }
          });
          try {
            this._socket.connect(this.port, this.host, () => {
              this._socket.setKeepAlive(true);
              this._onConnect();
            });
            setupConnectionHandlers();
          } catch (E) {
            return setImmediate(() => this._onError(E, "ECONNECTION", false, "CONN"));
          }
        });
      } else if (this.secureConnection) {
        if (this.options.tls) {
          Object.keys(this.options.tls).forEach((key) => {
            opts[key] = this.options.tls[key];
          });
        }
        if (this.servername && !opts.servername) {
          opts.servername = this.servername;
        }
        return shared.resolveHostname(opts, (err, resolved) => {
          if (err) {
            return setImmediate(() => this._onError(err, "EDNS", false, "CONN"));
          }
          this.logger.debug({
            tnx: "dns",
            source: opts.host,
            resolved: resolved.host,
            cached: !!resolved.cached
          }, "Resolved %s as %s [cache %s]", opts.host, resolved.host, resolved.cached ? "hit" : "miss");
          Object.keys(resolved).forEach((key) => {
            if (key.charAt(0) !== "_" && resolved[key]) {
              opts[key] = resolved[key];
            }
          });
          try {
            this._socket = tls.connect(opts, () => {
              this._socket.setKeepAlive(true);
              this._onConnect();
            });
            setupConnectionHandlers();
          } catch (E) {
            return setImmediate(() => this._onError(E, "ECONNECTION", false, "CONN"));
          }
        });
      } else {
        return shared.resolveHostname(opts, (err, resolved) => {
          if (err) {
            return setImmediate(() => this._onError(err, "EDNS", false, "CONN"));
          }
          this.logger.debug({
            tnx: "dns",
            source: opts.host,
            resolved: resolved.host,
            cached: !!resolved.cached
          }, "Resolved %s as %s [cache %s]", opts.host, resolved.host, resolved.cached ? "hit" : "miss");
          Object.keys(resolved).forEach((key) => {
            if (key.charAt(0) !== "_" && resolved[key]) {
              opts[key] = resolved[key];
            }
          });
          try {
            this._socket = net.connect(opts, () => {
              this._socket.setKeepAlive(true);
              this._onConnect();
            });
            setupConnectionHandlers();
          } catch (E) {
            return setImmediate(() => this._onError(E, "ECONNECTION", false, "CONN"));
          }
        });
      }
    }
    quit() {
      this._sendCommand("QUIT");
      this._responseActions.push(this.close);
    }
    close() {
      clearTimeout(this._connectionTimeout);
      clearTimeout(this._greetingTimeout);
      this._responseActions = [];
      if (this._closing) {
        return;
      }
      this._closing = true;
      let closeMethod = "end";
      if (this.stage === "init") {
        closeMethod = "destroy";
      }
      this.logger.debug({
        tnx: "smtp"
      }, 'Closing connection to the server using "%s"', closeMethod);
      let socket = this._socket && this._socket.socket || this._socket;
      if (socket && !socket.destroyed) {
        try {
          this._socket[closeMethod]();
        } catch (E) {}
      }
      this._destroy();
    }
    login(authData, callback) {
      const isDestroyedMessage = this._isDestroyedMessage("login");
      if (isDestroyedMessage) {
        return callback(this._formatError(isDestroyedMessage, "ECONNECTION", false, "API"));
      }
      this._auth = authData || {};
      this._authMethod = (this._auth.method || "").toString().trim().toUpperCase() || false;
      if (!this._authMethod && this._auth.oauth2 && !this._auth.credentials) {
        this._authMethod = "XOAUTH2";
      } else if (!this._authMethod || this._authMethod === "XOAUTH2" && !this._auth.oauth2) {
        this._authMethod = (this._supportedAuth[0] || "PLAIN").toUpperCase().trim();
      }
      if (this._authMethod !== "XOAUTH2" && (!this._auth.credentials || !this._auth.credentials.user || !this._auth.credentials.pass)) {
        if (this._auth.user && this._auth.pass || this.customAuth.has(this._authMethod)) {
          this._auth.credentials = {
            user: this._auth.user,
            pass: this._auth.pass,
            options: this._auth.options
          };
        } else {
          return callback(this._formatError('Missing credentials for "' + this._authMethod + '"', "EAUTH", false, "API"));
        }
      }
      if (this.customAuth.has(this._authMethod)) {
        let handler = this.customAuth.get(this._authMethod);
        let lastResponse;
        let returned = false;
        let resolve = () => {
          if (returned) {
            return;
          }
          returned = true;
          this.logger.info({
            tnx: "smtp",
            username: this._auth.user,
            action: "authenticated",
            method: this._authMethod
          }, "User %s authenticated", JSON.stringify(this._auth.user));
          this.authenticated = true;
          callback(null, true);
        };
        let reject = (err) => {
          if (returned) {
            return;
          }
          returned = true;
          callback(this._formatError(err, "EAUTH", lastResponse, "AUTH " + this._authMethod));
        };
        let handlerResponse = handler({
          auth: this._auth,
          method: this._authMethod,
          extensions: [].concat(this._supportedExtensions),
          authMethods: [].concat(this._supportedAuth),
          maxAllowedSize: this._maxAllowedSize || false,
          sendCommand: (cmd, done) => {
            let promise;
            if (!done) {
              promise = new Promise((resolve2, reject2) => {
                done = shared.callbackPromise(resolve2, reject2);
              });
            }
            this._responseActions.push((str) => {
              lastResponse = str;
              let codes = str.match(/^(\d+)(?:\s(\d+\.\d+\.\d+))?\s/);
              let data = {
                command: cmd,
                response: str
              };
              if (codes) {
                data.status = Number(codes[1]) || 0;
                if (codes[2]) {
                  data.code = codes[2];
                }
                data.text = str.substr(codes[0].length);
              } else {
                data.text = str;
                data.status = 0;
              }
              done(null, data);
            });
            setImmediate(() => this._sendCommand(cmd));
            return promise;
          },
          resolve,
          reject
        });
        if (handlerResponse && typeof handlerResponse.catch === "function") {
          handlerResponse.then(resolve).catch(reject);
        }
        return;
      }
      switch (this._authMethod) {
        case "XOAUTH2":
          this._handleXOauth2Token(false, callback);
          return;
        case "LOGIN":
          this._responseActions.push((str) => {
            this._actionAUTH_LOGIN_USER(str, callback);
          });
          this._sendCommand("AUTH LOGIN");
          return;
        case "PLAIN":
          this._responseActions.push((str) => {
            this._actionAUTHComplete(str, callback);
          });
          this._sendCommand("AUTH PLAIN " + Buffer.from("\x00" + this._auth.credentials.user + "\x00" + this._auth.credentials.pass, "utf-8").toString("base64"), "AUTH PLAIN " + Buffer.from("\x00" + this._auth.credentials.user + "\x00" + "/* secret */", "utf-8").toString("base64"));
          return;
        case "CRAM-MD5":
          this._responseActions.push((str) => {
            this._actionAUTH_CRAM_MD5(str, callback);
          });
          this._sendCommand("AUTH CRAM-MD5");
          return;
      }
      return callback(this._formatError('Unknown authentication method "' + this._authMethod + '"', "EAUTH", false, "API"));
    }
    send(envelope, message, done) {
      if (!message) {
        return done(this._formatError("Empty message", "EMESSAGE", false, "API"));
      }
      const isDestroyedMessage = this._isDestroyedMessage("send message");
      if (isDestroyedMessage) {
        return done(this._formatError(isDestroyedMessage, "ECONNECTION", false, "API"));
      }
      if (this._maxAllowedSize && envelope.size > this._maxAllowedSize) {
        return setImmediate(() => {
          done(this._formatError("Message size larger than allowed " + this._maxAllowedSize, "EMESSAGE", false, "MAIL FROM"));
        });
      }
      let returned = false;
      let callback = function() {
        if (returned) {
          return;
        }
        returned = true;
        done(...arguments);
      };
      if (typeof message.on === "function") {
        message.on("error", (err) => callback(this._formatError(err, "ESTREAM", false, "API")));
      }
      let startTime = Date.now();
      this._setEnvelope(envelope, (err, info) => {
        if (err) {
          let stream2 = new PassThrough;
          if (typeof message.pipe === "function") {
            message.pipe(stream2);
          } else {
            stream2.write(message);
            stream2.end();
          }
          return callback(err);
        }
        let envelopeTime = Date.now();
        let stream = this._createSendStream((err2, str) => {
          if (err2) {
            return callback(err2);
          }
          info.envelopeTime = envelopeTime - startTime;
          info.messageTime = Date.now() - envelopeTime;
          info.messageSize = stream.outByteCount;
          info.response = str;
          return callback(null, info);
        });
        if (typeof message.pipe === "function") {
          message.pipe(stream);
        } else {
          stream.write(message);
          stream.end();
        }
      });
    }
    reset(callback) {
      this._sendCommand("RSET");
      this._responseActions.push((str) => {
        if (str.charAt(0) !== "2") {
          return callback(this._formatError("Could not reset session state. response=" + str, "EPROTOCOL", str, "RSET"));
        }
        this._envelope = false;
        return callback(null, true);
      });
    }
    _onConnect() {
      clearTimeout(this._connectionTimeout);
      this.logger.info({
        tnx: "network",
        localAddress: this._socket.localAddress,
        localPort: this._socket.localPort,
        remoteAddress: this._socket.remoteAddress,
        remotePort: this._socket.remotePort
      }, "%s established to %s:%s", this.secure ? "Secure connection" : "Connection", this._socket.remoteAddress, this._socket.remotePort);
      if (this._destroyed) {
        this.close();
        return;
      }
      this.stage = "connected";
      this._socket.removeListener("data", this._onSocketData);
      this._socket.removeListener("timeout", this._onSocketTimeout);
      this._socket.removeListener("close", this._onSocketClose);
      this._socket.removeListener("end", this._onSocketEnd);
      this._socket.on("data", this._onSocketData);
      this._socket.once("close", this._onSocketClose);
      this._socket.once("end", this._onSocketEnd);
      this._socket.setTimeout(this.options.socketTimeout || SOCKET_TIMEOUT);
      this._socket.on("timeout", this._onSocketTimeout);
      this._greetingTimeout = setTimeout(() => {
        if (this._socket && !this._destroyed && this._responseActions[0] === this._actionGreeting) {
          this._onError("Greeting never received", "ETIMEDOUT", false, "CONN");
        }
      }, this.options.greetingTimeout || GREETING_TIMEOUT);
      this._responseActions.push(this._actionGreeting);
      this._socket.resume();
    }
    _onData(chunk) {
      if (this._destroyed || !chunk || !chunk.length) {
        return;
      }
      let data = (chunk || "").toString("binary");
      let lines = (this._remainder + data).split(/\r?\n/);
      let lastline;
      this._remainder = lines.pop();
      for (let i = 0, len = lines.length;i < len; i++) {
        if (this._responseQueue.length) {
          lastline = this._responseQueue[this._responseQueue.length - 1];
          if (/^\d+-/.test(lastline.split(`
`).pop())) {
            this._responseQueue[this._responseQueue.length - 1] += `
` + lines[i];
            continue;
          }
        }
        this._responseQueue.push(lines[i]);
      }
      if (this._responseQueue.length) {
        lastline = this._responseQueue[this._responseQueue.length - 1];
        if (/^\d+-/.test(lastline.split(`
`).pop())) {
          return;
        }
      }
      this._processResponse();
    }
    _onError(err, type, data, command) {
      clearTimeout(this._connectionTimeout);
      clearTimeout(this._greetingTimeout);
      if (this._destroyed) {
        return;
      }
      err = this._formatError(err, type, data, command);
      this.logger.error(data, err.message);
      this.emit("error", err);
      this.close();
    }
    _formatError(message, type, response, command) {
      let err;
      if (/Error\]$/i.test(Object.prototype.toString.call(message))) {
        err = message;
      } else {
        err = new Error(message);
      }
      if (type && type !== "Error") {
        err.code = type;
      }
      if (response) {
        err.response = response;
        err.message += ": " + response;
      }
      let responseCode = typeof response === "string" && Number((response.match(/^\d+/) || [])[0]) || false;
      if (responseCode) {
        err.responseCode = responseCode;
      }
      if (command) {
        err.command = command;
      }
      return err;
    }
    _onClose() {
      let serverResponse = false;
      if (this._remainder && this._remainder.trim()) {
        if (this.options.debug || this.options.transactionLog) {
          this.logger.debug({
            tnx: "server"
          }, this._remainder.replace(/\r?\n$/, ""));
        }
        this.lastServerResponse = serverResponse = this._remainder.trim();
      }
      this.logger.info({
        tnx: "network"
      }, "Connection closed");
      if (this.upgrading && !this._destroyed) {
        return this._onError(new Error("Connection closed unexpectedly"), "ETLS", serverResponse, "CONN");
      } else if (![this._actionGreeting, this.close].includes(this._responseActions[0]) && !this._destroyed) {
        return this._onError(new Error("Connection closed unexpectedly"), "ECONNECTION", serverResponse, "CONN");
      } else if (/^[45]\d{2}\b/.test(serverResponse)) {
        return this._onError(new Error("Connection closed unexpectedly"), "ECONNECTION", serverResponse, "CONN");
      }
      this._destroy();
    }
    _onEnd() {
      if (this._socket && !this._socket.destroyed) {
        this._socket.destroy();
      }
    }
    _onTimeout() {
      return this._onError(new Error("Timeout"), "ETIMEDOUT", false, "CONN");
    }
    _destroy() {
      if (this._destroyed) {
        return;
      }
      this._destroyed = true;
      this.emit("end");
    }
    _upgradeConnection(callback) {
      this._socket.removeListener("data", this._onSocketData);
      this._socket.removeListener("timeout", this._onSocketTimeout);
      let socketPlain = this._socket;
      let opts = {
        socket: this._socket,
        host: this.host
      };
      Object.keys(this.options.tls || {}).forEach((key) => {
        opts[key] = this.options.tls[key];
      });
      if (this.servername && !opts.servername) {
        opts.servername = this.servername;
      }
      this.upgrading = true;
      try {
        this._socket = tls.connect(opts, () => {
          this.secure = true;
          this.upgrading = false;
          this._socket.on("data", this._onSocketData);
          socketPlain.removeListener("close", this._onSocketClose);
          socketPlain.removeListener("end", this._onSocketEnd);
          return callback(null, true);
        });
      } catch (err) {
        return callback(err);
      }
      this._socket.on("error", this._onSocketError);
      this._socket.once("close", this._onSocketClose);
      this._socket.once("end", this._onSocketEnd);
      this._socket.setTimeout(this.options.socketTimeout || SOCKET_TIMEOUT);
      this._socket.on("timeout", this._onSocketTimeout);
      socketPlain.resume();
    }
    _processResponse() {
      if (!this._responseQueue.length) {
        return false;
      }
      let str = this.lastServerResponse = (this._responseQueue.shift() || "").toString();
      if (/^\d+-/.test(str.split(`
`).pop())) {
        return;
      }
      if (this.options.debug || this.options.transactionLog) {
        this.logger.debug({
          tnx: "server"
        }, str.replace(/\r?\n$/, ""));
      }
      if (!str.trim()) {
        setImmediate(() => this._processResponse());
      }
      let action = this._responseActions.shift();
      if (typeof action === "function") {
        action.call(this, str);
        setImmediate(() => this._processResponse());
      } else {
        return this._onError(new Error("Unexpected Response"), "EPROTOCOL", str, "CONN");
      }
    }
    _sendCommand(str, logStr) {
      if (this._destroyed) {
        return;
      }
      if (this._socket.destroyed) {
        return this.close();
      }
      if (this.options.debug || this.options.transactionLog) {
        this.logger.debug({
          tnx: "client"
        }, (logStr || str || "").toString().replace(/\r?\n$/, ""));
      }
      this._socket.write(Buffer.from(str + `\r
`, "utf-8"));
    }
    _setEnvelope(envelope, callback) {
      let args = [];
      let useSmtpUtf8 = false;
      this._envelope = envelope || {};
      this._envelope.from = (this._envelope.from && this._envelope.from.address || this._envelope.from || "").toString().trim();
      this._envelope.to = [].concat(this._envelope.to || []).map((to) => (to && to.address || to || "").toString().trim());
      if (!this._envelope.to.length) {
        return callback(this._formatError("No recipients defined", "EENVELOPE", false, "API"));
      }
      if (this._envelope.from && /[\r\n<>]/.test(this._envelope.from)) {
        return callback(this._formatError("Invalid sender " + JSON.stringify(this._envelope.from), "EENVELOPE", false, "API"));
      }
      if (/[\x80-\uFFFF]/.test(this._envelope.from)) {
        useSmtpUtf8 = true;
      }
      for (let i = 0, len = this._envelope.to.length;i < len; i++) {
        if (!this._envelope.to[i] || /[\r\n<>]/.test(this._envelope.to[i])) {
          return callback(this._formatError("Invalid recipient " + JSON.stringify(this._envelope.to[i]), "EENVELOPE", false, "API"));
        }
        if (/[\x80-\uFFFF]/.test(this._envelope.to[i])) {
          useSmtpUtf8 = true;
        }
      }
      this._envelope.rcptQueue = JSON.parse(JSON.stringify(this._envelope.to || []));
      this._envelope.rejected = [];
      this._envelope.rejectedErrors = [];
      this._envelope.accepted = [];
      if (this._envelope.dsn) {
        try {
          this._envelope.dsn = this._setDsnEnvelope(this._envelope.dsn);
        } catch (err) {
          return callback(this._formatError("Invalid DSN " + err.message, "EENVELOPE", false, "API"));
        }
      }
      this._responseActions.push((str) => {
        this._actionMAIL(str, callback);
      });
      if (useSmtpUtf8 && this._supportedExtensions.includes("SMTPUTF8")) {
        args.push("SMTPUTF8");
        this._usingSmtpUtf8 = true;
      }
      if (this._envelope.use8BitMime && this._supportedExtensions.includes("8BITMIME")) {
        args.push("BODY=8BITMIME");
        this._using8BitMime = true;
      }
      if (this._envelope.size && this._supportedExtensions.includes("SIZE")) {
        args.push("SIZE=" + this._envelope.size);
      }
      if (this._envelope.dsn && this._supportedExtensions.includes("DSN")) {
        if (this._envelope.dsn.ret) {
          args.push("RET=" + shared.encodeXText(this._envelope.dsn.ret));
        }
        if (this._envelope.dsn.envid) {
          args.push("ENVID=" + shared.encodeXText(this._envelope.dsn.envid));
        }
      }
      this._sendCommand("MAIL FROM:<" + this._envelope.from + ">" + (args.length ? " " + args.join(" ") : ""));
    }
    _setDsnEnvelope(params) {
      let ret = (params.ret || params.return || "").toString().toUpperCase() || null;
      if (ret) {
        switch (ret) {
          case "HDRS":
          case "HEADERS":
            ret = "HDRS";
            break;
          case "FULL":
          case "BODY":
            ret = "FULL";
            break;
        }
      }
      if (ret && !["FULL", "HDRS"].includes(ret)) {
        throw new Error("ret: " + JSON.stringify(ret));
      }
      let envid = (params.envid || params.id || "").toString() || null;
      let notify = params.notify || null;
      if (notify) {
        if (typeof notify === "string") {
          notify = notify.split(",");
        }
        notify = notify.map((n) => n.trim().toUpperCase());
        let validNotify = ["NEVER", "SUCCESS", "FAILURE", "DELAY"];
        let invaliNotify = notify.filter((n) => !validNotify.includes(n));
        if (invaliNotify.length || notify.length > 1 && notify.includes("NEVER")) {
          throw new Error("notify: " + JSON.stringify(notify.join(",")));
        }
        notify = notify.join(",");
      }
      let orcpt = (params.recipient || params.orcpt || "").toString() || null;
      if (orcpt && orcpt.indexOf(";") < 0) {
        orcpt = "rfc822;" + orcpt;
      }
      return {
        ret,
        envid,
        notify,
        orcpt
      };
    }
    _getDsnRcptToArgs() {
      let args = [];
      if (this._envelope.dsn && this._supportedExtensions.includes("DSN")) {
        if (this._envelope.dsn.notify) {
          args.push("NOTIFY=" + shared.encodeXText(this._envelope.dsn.notify));
        }
        if (this._envelope.dsn.orcpt) {
          args.push("ORCPT=" + shared.encodeXText(this._envelope.dsn.orcpt));
        }
      }
      return args.length ? " " + args.join(" ") : "";
    }
    _createSendStream(callback) {
      let dataStream = new DataStream;
      let logStream;
      if (this.options.lmtp) {
        this._envelope.accepted.forEach((recipient, i) => {
          let final = i === this._envelope.accepted.length - 1;
          this._responseActions.push((str) => {
            this._actionLMTPStream(recipient, final, str, callback);
          });
        });
      } else {
        this._responseActions.push((str) => {
          this._actionSMTPStream(str, callback);
        });
      }
      dataStream.pipe(this._socket, {
        end: false
      });
      if (this.options.debug) {
        logStream = new PassThrough;
        logStream.on("readable", () => {
          let chunk;
          while (chunk = logStream.read()) {
            this.logger.debug({
              tnx: "message"
            }, chunk.toString("binary").replace(/\r?\n$/, ""));
          }
        });
        dataStream.pipe(logStream);
      }
      dataStream.once("end", () => {
        this.logger.info({
          tnx: "message",
          inByteCount: dataStream.inByteCount,
          outByteCount: dataStream.outByteCount
        }, "<%s bytes encoded mime message (source size %s bytes)>", dataStream.outByteCount, dataStream.inByteCount);
      });
      return dataStream;
    }
    _actionGreeting(str) {
      clearTimeout(this._greetingTimeout);
      if (str.substr(0, 3) !== "220") {
        this._onError(new Error("Invalid greeting. response=" + str), "EPROTOCOL", str, "CONN");
        return;
      }
      if (this.options.lmtp) {
        this._responseActions.push(this._actionLHLO);
        this._sendCommand("LHLO " + this.name);
      } else {
        this._responseActions.push(this._actionEHLO);
        this._sendCommand("EHLO " + this.name);
      }
    }
    _actionLHLO(str) {
      if (str.charAt(0) !== "2") {
        this._onError(new Error("Invalid LHLO. response=" + str), "EPROTOCOL", str, "LHLO");
        return;
      }
      this._actionEHLO(str);
    }
    _actionEHLO(str) {
      let match;
      if (str.substr(0, 3) === "421") {
        this._onError(new Error("Server terminates connection. response=" + str), "ECONNECTION", str, "EHLO");
        return;
      }
      if (str.charAt(0) !== "2") {
        if (this.options.requireTLS) {
          this._onError(new Error("EHLO failed but HELO does not support required STARTTLS. response=" + str), "ECONNECTION", str, "EHLO");
          return;
        }
        this._responseActions.push(this._actionHELO);
        this._sendCommand("HELO " + this.name);
        return;
      }
      this._ehloLines = str.split(/\r?\n/).map((line) => line.replace(/^\d+[ -]/, "").trim()).filter((line) => line).slice(1);
      if (!this.secure && !this.options.ignoreTLS && (/[ -]STARTTLS\b/im.test(str) || this.options.requireTLS)) {
        this._sendCommand("STARTTLS");
        this._responseActions.push(this._actionSTARTTLS);
        return;
      }
      if (/[ -]SMTPUTF8\b/im.test(str)) {
        this._supportedExtensions.push("SMTPUTF8");
      }
      if (/[ -]DSN\b/im.test(str)) {
        this._supportedExtensions.push("DSN");
      }
      if (/[ -]8BITMIME\b/im.test(str)) {
        this._supportedExtensions.push("8BITMIME");
      }
      if (/[ -]PIPELINING\b/im.test(str)) {
        this._supportedExtensions.push("PIPELINING");
      }
      if (/[ -]AUTH\b/i.test(str)) {
        this.allowsAuth = true;
      }
      if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)PLAIN/i.test(str)) {
        this._supportedAuth.push("PLAIN");
      }
      if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)LOGIN/i.test(str)) {
        this._supportedAuth.push("LOGIN");
      }
      if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)CRAM-MD5/i.test(str)) {
        this._supportedAuth.push("CRAM-MD5");
      }
      if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)XOAUTH2/i.test(str)) {
        this._supportedAuth.push("XOAUTH2");
      }
      if (match = str.match(/[ -]SIZE(?:[ \t]+(\d+))?/im)) {
        this._supportedExtensions.push("SIZE");
        this._maxAllowedSize = Number(match[1]) || 0;
      }
      this.emit("connect");
    }
    _actionHELO(str) {
      if (str.charAt(0) !== "2") {
        this._onError(new Error("Invalid HELO. response=" + str), "EPROTOCOL", str, "HELO");
        return;
      }
      this.allowsAuth = true;
      this.emit("connect");
    }
    _actionSTARTTLS(str) {
      if (str.charAt(0) !== "2") {
        if (this.options.opportunisticTLS) {
          this.logger.info({
            tnx: "smtp"
          }, "Failed STARTTLS upgrade, continuing unencrypted");
          return this.emit("connect");
        }
        this._onError(new Error("Error upgrading connection with STARTTLS"), "ETLS", str, "STARTTLS");
        return;
      }
      this._upgradeConnection((err, secured) => {
        if (err) {
          this._onError(new Error("Error initiating TLS - " + (err.message || err)), "ETLS", false, "STARTTLS");
          return;
        }
        this.logger.info({
          tnx: "smtp"
        }, "Connection upgraded with STARTTLS");
        if (secured) {
          if (this.options.lmtp) {
            this._responseActions.push(this._actionLHLO);
            this._sendCommand("LHLO " + this.name);
          } else {
            this._responseActions.push(this._actionEHLO);
            this._sendCommand("EHLO " + this.name);
          }
        } else {
          this.emit("connect");
        }
      });
    }
    _actionAUTH_LOGIN_USER(str, callback) {
      if (!/^334[ -]/.test(str)) {
        callback(this._formatError('Invalid login sequence while waiting for "334 VXNlcm5hbWU6"', "EAUTH", str, "AUTH LOGIN"));
        return;
      }
      this._responseActions.push((str2) => {
        this._actionAUTH_LOGIN_PASS(str2, callback);
      });
      this._sendCommand(Buffer.from(this._auth.credentials.user + "", "utf-8").toString("base64"));
    }
    _actionAUTH_CRAM_MD5(str, callback) {
      let challengeMatch = str.match(/^334\s+(.+)$/);
      let challengeString = "";
      if (!challengeMatch) {
        return callback(this._formatError("Invalid login sequence while waiting for server challenge string", "EAUTH", str, "AUTH CRAM-MD5"));
      } else {
        challengeString = challengeMatch[1];
      }
      let base64decoded = Buffer.from(challengeString, "base64").toString("ascii"), hmacMD5 = crypto.createHmac("md5", this._auth.credentials.pass);
      hmacMD5.update(base64decoded);
      let prepended = this._auth.credentials.user + " " + hmacMD5.digest("hex");
      this._responseActions.push((str2) => {
        this._actionAUTH_CRAM_MD5_PASS(str2, callback);
      });
      this._sendCommand(Buffer.from(prepended).toString("base64"), Buffer.from(this._auth.credentials.user + " /* secret */").toString("base64"));
    }
    _actionAUTH_CRAM_MD5_PASS(str, callback) {
      if (!str.match(/^235\s+/)) {
        return callback(this._formatError('Invalid login sequence while waiting for "235"', "EAUTH", str, "AUTH CRAM-MD5"));
      }
      this.logger.info({
        tnx: "smtp",
        username: this._auth.user,
        action: "authenticated",
        method: this._authMethod
      }, "User %s authenticated", JSON.stringify(this._auth.user));
      this.authenticated = true;
      callback(null, true);
    }
    _actionAUTH_LOGIN_PASS(str, callback) {
      if (!/^334[ -]/.test(str)) {
        return callback(this._formatError('Invalid login sequence while waiting for "334 UGFzc3dvcmQ6"', "EAUTH", str, "AUTH LOGIN"));
      }
      this._responseActions.push((str2) => {
        this._actionAUTHComplete(str2, callback);
      });
      this._sendCommand(Buffer.from((this._auth.credentials.pass || "").toString(), "utf-8").toString("base64"), Buffer.from("/* secret */", "utf-8").toString("base64"));
    }
    _actionAUTHComplete(str, isRetry, callback) {
      if (!callback && typeof isRetry === "function") {
        callback = isRetry;
        isRetry = false;
      }
      if (str.substr(0, 3) === "334") {
        this._responseActions.push((str2) => {
          if (isRetry || this._authMethod !== "XOAUTH2") {
            this._actionAUTHComplete(str2, true, callback);
          } else {
            setImmediate(() => this._handleXOauth2Token(true, callback));
          }
        });
        this._sendCommand("");
        return;
      }
      if (str.charAt(0) !== "2") {
        this.logger.info({
          tnx: "smtp",
          username: this._auth.user,
          action: "authfail",
          method: this._authMethod
        }, "User %s failed to authenticate", JSON.stringify(this._auth.user));
        return callback(this._formatError("Invalid login", "EAUTH", str, "AUTH " + this._authMethod));
      }
      this.logger.info({
        tnx: "smtp",
        username: this._auth.user,
        action: "authenticated",
        method: this._authMethod
      }, "User %s authenticated", JSON.stringify(this._auth.user));
      this.authenticated = true;
      callback(null, true);
    }
    _actionMAIL(str, callback) {
      let message, curRecipient;
      if (Number(str.charAt(0)) !== 2) {
        if (this._usingSmtpUtf8 && /^550 /.test(str) && /[\x80-\uFFFF]/.test(this._envelope.from)) {
          message = "Internationalized mailbox name not allowed";
        } else {
          message = "Mail command failed";
        }
        return callback(this._formatError(message, "EENVELOPE", str, "MAIL FROM"));
      }
      if (!this._envelope.rcptQueue.length) {
        return callback(this._formatError("Can't send mail - no recipients defined", "EENVELOPE", false, "API"));
      } else {
        this._recipientQueue = [];
        if (this._supportedExtensions.includes("PIPELINING")) {
          while (this._envelope.rcptQueue.length) {
            curRecipient = this._envelope.rcptQueue.shift();
            this._recipientQueue.push(curRecipient);
            this._responseActions.push((str2) => {
              this._actionRCPT(str2, callback);
            });
            this._sendCommand("RCPT TO:<" + curRecipient + ">" + this._getDsnRcptToArgs());
          }
        } else {
          curRecipient = this._envelope.rcptQueue.shift();
          this._recipientQueue.push(curRecipient);
          this._responseActions.push((str2) => {
            this._actionRCPT(str2, callback);
          });
          this._sendCommand("RCPT TO:<" + curRecipient + ">" + this._getDsnRcptToArgs());
        }
      }
    }
    _actionRCPT(str, callback) {
      let message, err, curRecipient = this._recipientQueue.shift();
      if (Number(str.charAt(0)) !== 2) {
        if (this._usingSmtpUtf8 && /^553 /.test(str) && /[\x80-\uFFFF]/.test(curRecipient)) {
          message = "Internationalized mailbox name not allowed";
        } else {
          message = "Recipient command failed";
        }
        this._envelope.rejected.push(curRecipient);
        err = this._formatError(message, "EENVELOPE", str, "RCPT TO");
        err.recipient = curRecipient;
        this._envelope.rejectedErrors.push(err);
      } else {
        this._envelope.accepted.push(curRecipient);
      }
      if (!this._envelope.rcptQueue.length && !this._recipientQueue.length) {
        if (this._envelope.rejected.length < this._envelope.to.length) {
          this._responseActions.push((str2) => {
            this._actionDATA(str2, callback);
          });
          this._sendCommand("DATA");
        } else {
          err = this._formatError("Can't send mail - all recipients were rejected", "EENVELOPE", str, "RCPT TO");
          err.rejected = this._envelope.rejected;
          err.rejectedErrors = this._envelope.rejectedErrors;
          return callback(err);
        }
      } else if (this._envelope.rcptQueue.length) {
        curRecipient = this._envelope.rcptQueue.shift();
        this._recipientQueue.push(curRecipient);
        this._responseActions.push((str2) => {
          this._actionRCPT(str2, callback);
        });
        this._sendCommand("RCPT TO:<" + curRecipient + ">" + this._getDsnRcptToArgs());
      }
    }
    _actionDATA(str, callback) {
      if (!/^[23]/.test(str)) {
        return callback(this._formatError("Data command failed", "EENVELOPE", str, "DATA"));
      }
      let response = {
        accepted: this._envelope.accepted,
        rejected: this._envelope.rejected
      };
      if (this._ehloLines && this._ehloLines.length) {
        response.ehlo = this._ehloLines;
      }
      if (this._envelope.rejectedErrors.length) {
        response.rejectedErrors = this._envelope.rejectedErrors;
      }
      callback(null, response);
    }
    _actionSMTPStream(str, callback) {
      if (Number(str.charAt(0)) !== 2) {
        return callback(this._formatError("Message failed", "EMESSAGE", str, "DATA"));
      } else {
        return callback(null, str);
      }
    }
    _actionLMTPStream(recipient, final, str, callback) {
      let err;
      if (Number(str.charAt(0)) !== 2) {
        err = this._formatError("Message failed for recipient " + recipient, "EMESSAGE", str, "DATA");
        err.recipient = recipient;
        this._envelope.rejected.push(recipient);
        this._envelope.rejectedErrors.push(err);
        for (let i = 0, len = this._envelope.accepted.length;i < len; i++) {
          if (this._envelope.accepted[i] === recipient) {
            this._envelope.accepted.splice(i, 1);
          }
        }
      }
      if (final) {
        return callback(null, str);
      }
    }
    _handleXOauth2Token(isRetry, callback) {
      this._auth.oauth2.getToken(isRetry, (err, accessToken) => {
        if (err) {
          this.logger.info({
            tnx: "smtp",
            username: this._auth.user,
            action: "authfail",
            method: this._authMethod
          }, "User %s failed to authenticate", JSON.stringify(this._auth.user));
          return callback(this._formatError(err, "EAUTH", false, "AUTH XOAUTH2"));
        }
        this._responseActions.push((str) => {
          this._actionAUTHComplete(str, isRetry, callback);
        });
        this._sendCommand("AUTH XOAUTH2 " + this._auth.oauth2.buildXOAuth2Token(accessToken), "AUTH XOAUTH2 " + this._auth.oauth2.buildXOAuth2Token("/* secret */"));
      });
    }
    _isDestroyedMessage(command) {
      if (this._destroyed) {
        return "Cannot " + command + " - smtp connection is already destroyed.";
      }
      if (this._socket) {
        if (this._socket.destroyed) {
          return "Cannot " + command + " - smtp connection socket is already destroyed.";
        }
        if (!this._socket.writable) {
          return "Cannot " + command + " - smtp connection socket is already half-closed.";
        }
      }
    }
    _getHostname() {
      let defaultHostname;
      try {
        defaultHostname = os.hostname() || "";
      } catch (err) {
        defaultHostname = "localhost";
      }
      if (!defaultHostname || defaultHostname.indexOf(".") < 0) {
        defaultHostname = "[127.0.0.1]";
      }
      if (defaultHostname.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
        defaultHostname = "[" + defaultHostname + "]";
      }
      return defaultHostname;
    }
  }
  module.exports = SMTPConnection;
});

// node_modules/nodemailer/lib/xoauth2/index.js
var require_xoauth2 = __commonJS((exports, module) => {
  var Stream = __require("node:stream").Stream;
  var nmfetch = require_fetch();
  var crypto = __require("node:crypto");
  var shared = require_shared();

  class XOAuth2 extends Stream {
    constructor(options, logger2) {
      super();
      this.options = options || {};
      if (options && options.serviceClient) {
        if (!options.privateKey || !options.user) {
          setImmediate(() => this.emit("error", new Error('Options "privateKey" and "user" are required for service account!')));
          return;
        }
        let serviceRequestTimeout = Math.min(Math.max(Number(this.options.serviceRequestTimeout) || 0, 0), 3600);
        this.options.serviceRequestTimeout = serviceRequestTimeout || 5 * 60;
      }
      this.logger = shared.getLogger({
        logger: logger2
      }, {
        component: this.options.component || "OAuth2"
      });
      this.provisionCallback = typeof this.options.provisionCallback === "function" ? this.options.provisionCallback : false;
      this.options.accessUrl = this.options.accessUrl || "https://accounts.google.com/o/oauth2/token";
      this.options.customHeaders = this.options.customHeaders || {};
      this.options.customParams = this.options.customParams || {};
      this.accessToken = this.options.accessToken || false;
      if (this.options.expires && Number(this.options.expires)) {
        this.expires = this.options.expires;
      } else {
        let timeout = Math.max(Number(this.options.timeout) || 0, 0);
        this.expires = timeout && Date.now() + timeout * 1000 || 0;
      }
    }
    getToken(renew, callback) {
      if (!renew && this.accessToken && (!this.expires || this.expires > Date.now())) {
        return callback(null, this.accessToken);
      }
      let generateCallback = (...args) => {
        if (args[0]) {
          this.logger.error({
            err: args[0],
            tnx: "OAUTH2",
            user: this.options.user,
            action: "renew"
          }, "Failed generating new Access Token for %s", this.options.user);
        } else {
          this.logger.info({
            tnx: "OAUTH2",
            user: this.options.user,
            action: "renew"
          }, "Generated new Access Token for %s", this.options.user);
        }
        callback(...args);
      };
      if (this.provisionCallback) {
        this.provisionCallback(this.options.user, !!renew, (err, accessToken, expires) => {
          if (!err && accessToken) {
            this.accessToken = accessToken;
            this.expires = expires || 0;
          }
          generateCallback(err, accessToken);
        });
      } else {
        this.generateToken(generateCallback);
      }
    }
    updateToken(accessToken, timeout) {
      this.accessToken = accessToken;
      timeout = Math.max(Number(timeout) || 0, 0);
      this.expires = timeout && Date.now() + timeout * 1000 || 0;
      this.emit("token", {
        user: this.options.user,
        accessToken: accessToken || "",
        expires: this.expires
      });
    }
    generateToken(callback) {
      let urlOptions;
      let loggedUrlOptions;
      if (this.options.serviceClient) {
        let iat = Math.floor(Date.now() / 1000);
        let tokenData = {
          iss: this.options.serviceClient,
          scope: this.options.scope || "https://mail.google.com/",
          sub: this.options.user,
          aud: this.options.accessUrl,
          iat,
          exp: iat + this.options.serviceRequestTimeout
        };
        let token;
        try {
          token = this.jwtSignRS256(tokenData);
        } catch (err) {
          return callback(new Error("Can't generate token. Check your auth options"));
        }
        urlOptions = {
          grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
          assertion: token
        };
        loggedUrlOptions = {
          grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
          assertion: tokenData
        };
      } else {
        if (!this.options.refreshToken) {
          return callback(new Error("Can't create new access token for user"));
        }
        urlOptions = {
          client_id: this.options.clientId || "",
          client_secret: this.options.clientSecret || "",
          refresh_token: this.options.refreshToken,
          grant_type: "refresh_token"
        };
        loggedUrlOptions = {
          client_id: this.options.clientId || "",
          client_secret: (this.options.clientSecret || "").substr(0, 6) + "...",
          refresh_token: (this.options.refreshToken || "").substr(0, 6) + "...",
          grant_type: "refresh_token"
        };
      }
      Object.keys(this.options.customParams).forEach((key) => {
        urlOptions[key] = this.options.customParams[key];
        loggedUrlOptions[key] = this.options.customParams[key];
      });
      this.logger.debug({
        tnx: "OAUTH2",
        user: this.options.user,
        action: "generate"
      }, "Requesting token using: %s", JSON.stringify(loggedUrlOptions));
      this.postRequest(this.options.accessUrl, urlOptions, this.options, (error, body) => {
        let data;
        if (error) {
          return callback(error);
        }
        try {
          data = JSON.parse(body.toString());
        } catch (E) {
          return callback(E);
        }
        if (!data || typeof data !== "object") {
          this.logger.debug({
            tnx: "OAUTH2",
            user: this.options.user,
            action: "post"
          }, "Response: %s", (body || "").toString());
          return callback(new Error("Invalid authentication response"));
        }
        let logData = {};
        Object.keys(data).forEach((key) => {
          if (key !== "access_token") {
            logData[key] = data[key];
          } else {
            logData[key] = (data[key] || "").toString().substr(0, 6) + "...";
          }
        });
        this.logger.debug({
          tnx: "OAUTH2",
          user: this.options.user,
          action: "post"
        }, "Response: %s", JSON.stringify(logData));
        if (data.error) {
          let errorMessage = data.error;
          if (data.error_description) {
            errorMessage += ": " + data.error_description;
          }
          if (data.error_uri) {
            errorMessage += " (" + data.error_uri + ")";
          }
          return callback(new Error(errorMessage));
        }
        if (data.access_token) {
          this.updateToken(data.access_token, data.expires_in);
          return callback(null, this.accessToken);
        }
        return callback(new Error("No access token"));
      });
    }
    buildXOAuth2Token(accessToken) {
      let authData = ["user=" + (this.options.user || ""), "auth=Bearer " + (accessToken || this.accessToken), "", ""];
      return Buffer.from(authData.join("\x01"), "utf-8").toString("base64");
    }
    postRequest(url, payload, params, callback) {
      let returned = false;
      let chunks = [];
      let chunklen = 0;
      let req = nmfetch(url, {
        method: "post",
        headers: params.customHeaders,
        body: payload,
        allowErrorResponse: true
      });
      req.on("readable", () => {
        let chunk;
        while ((chunk = req.read()) !== null) {
          chunks.push(chunk);
          chunklen += chunk.length;
        }
      });
      req.once("error", (err) => {
        if (returned) {
          return;
        }
        returned = true;
        return callback(err);
      });
      req.once("end", () => {
        if (returned) {
          return;
        }
        returned = true;
        return callback(null, Buffer.concat(chunks, chunklen));
      });
    }
    toBase64URL(data) {
      if (typeof data === "string") {
        data = Buffer.from(data);
      }
      return data.toString("base64").replace(/[=]+/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    jwtSignRS256(payload) {
      payload = ['{"alg":"RS256","typ":"JWT"}', JSON.stringify(payload)].map((val) => this.toBase64URL(val)).join(".");
      let signature = crypto.createSign("RSA-SHA256").update(payload).sign(this.options.privateKey);
      return payload + "." + this.toBase64URL(signature);
    }
  }
  module.exports = XOAuth2;
});

// node_modules/nodemailer/lib/smtp-pool/pool-resource.js
var require_pool_resource = __commonJS((exports, module) => {
  var SMTPConnection = require_smtp_connection();
  var assign = require_shared().assign;
  var XOAuth2 = require_xoauth2();
  var EventEmitter = __require("node:events");

  class PoolResource extends EventEmitter {
    constructor(pool) {
      super();
      this.pool = pool;
      this.options = pool.options;
      this.logger = this.pool.logger;
      if (this.options.auth) {
        switch ((this.options.auth.type || "").toString().toUpperCase()) {
          case "OAUTH2": {
            let oauth2 = new XOAuth2(this.options.auth, this.logger);
            oauth2.provisionCallback = this.pool.mailer && this.pool.mailer.get("oauth2_provision_cb") || oauth2.provisionCallback;
            this.auth = {
              type: "OAUTH2",
              user: this.options.auth.user,
              oauth2,
              method: "XOAUTH2"
            };
            oauth2.on("token", (token) => this.pool.mailer.emit("token", token));
            oauth2.on("error", (err) => this.emit("error", err));
            break;
          }
          default:
            if (!this.options.auth.user && !this.options.auth.pass) {
              break;
            }
            this.auth = {
              type: (this.options.auth.type || "").toString().toUpperCase() || "LOGIN",
              user: this.options.auth.user,
              credentials: {
                user: this.options.auth.user || "",
                pass: this.options.auth.pass,
                options: this.options.auth.options
              },
              method: (this.options.auth.method || "").trim().toUpperCase() || this.options.authMethod || false
            };
        }
      }
      this._connection = false;
      this._connected = false;
      this.messages = 0;
      this.available = true;
    }
    connect(callback) {
      this.pool.getSocket(this.options, (err, socketOptions) => {
        if (err) {
          return callback(err);
        }
        let returned = false;
        let options = this.options;
        if (socketOptions && socketOptions.connection) {
          this.logger.info({
            tnx: "proxy",
            remoteAddress: socketOptions.connection.remoteAddress,
            remotePort: socketOptions.connection.remotePort,
            destHost: options.host || "",
            destPort: options.port || "",
            action: "connected"
          }, "Using proxied socket from %s:%s to %s:%s", socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options.host || "", options.port || "");
          options = assign(false, options);
          Object.keys(socketOptions).forEach((key) => {
            options[key] = socketOptions[key];
          });
        }
        this.connection = new SMTPConnection(options);
        this.connection.once("error", (err2) => {
          this.emit("error", err2);
          if (returned) {
            return;
          }
          returned = true;
          return callback(err2);
        });
        this.connection.once("end", () => {
          this.close();
          if (returned) {
            return;
          }
          returned = true;
          let timer = setTimeout(() => {
            if (returned) {
              return;
            }
            let err2 = new Error("Unexpected socket close");
            if (this.connection && this.connection._socket && this.connection._socket.upgrading) {
              err2.code = "ETLS";
            }
            callback(err2);
          }, 1000);
          try {
            timer.unref();
          } catch (E) {}
        });
        this.connection.connect(() => {
          if (returned) {
            return;
          }
          if (this.auth && (this.connection.allowsAuth || options.forceAuth)) {
            this.connection.login(this.auth, (err2) => {
              if (returned) {
                return;
              }
              returned = true;
              if (err2) {
                this.connection.close();
                this.emit("error", err2);
                return callback(err2);
              }
              this._connected = true;
              callback(null, true);
            });
          } else {
            returned = true;
            this._connected = true;
            return callback(null, true);
          }
        });
      });
    }
    send(mail, callback) {
      if (!this._connected) {
        return this.connect((err) => {
          if (err) {
            return callback(err);
          }
          return this.send(mail, callback);
        });
      }
      let envelope = mail.message.getEnvelope();
      let messageId = mail.message.messageId();
      let recipients = [].concat(envelope.to || []);
      if (recipients.length > 3) {
        recipients.push("...and " + recipients.splice(2).length + " more");
      }
      this.logger.info({
        tnx: "send",
        messageId,
        cid: this.id
      }, "Sending message %s using #%s to <%s>", messageId, this.id, recipients.join(", "));
      if (mail.data.dsn) {
        envelope.dsn = mail.data.dsn;
      }
      this.connection.send(envelope, mail.message.createReadStream(), (err, info) => {
        this.messages++;
        if (err) {
          this.connection.close();
          this.emit("error", err);
          return callback(err);
        }
        info.envelope = {
          from: envelope.from,
          to: envelope.to
        };
        info.messageId = messageId;
        setImmediate(() => {
          let err2;
          if (this.messages >= this.options.maxMessages) {
            err2 = new Error("Resource exhausted");
            err2.code = "EMAXLIMIT";
            this.connection.close();
            this.emit("error", err2);
          } else {
            this.pool._checkRateLimit(() => {
              this.available = true;
              this.emit("available");
            });
          }
        });
        callback(null, info);
      });
    }
    close() {
      this._connected = false;
      if (this.auth && this.auth.oauth2) {
        this.auth.oauth2.removeAllListeners();
      }
      if (this.connection) {
        this.connection.close();
      }
      this.emit("close");
    }
  }
  module.exports = PoolResource;
});

// node_modules/nodemailer/lib/well-known/services.json
var require_services = __commonJS((exports, module) => {
  module.exports = {
    "1und1": {
      host: "smtp.1und1.de",
      port: 465,
      secure: true,
      authMethod: "LOGIN"
    },
    Aliyun: {
      domains: ["aliyun.com"],
      host: "smtp.aliyun.com",
      port: 465,
      secure: true
    },
    AOL: {
      domains: ["aol.com"],
      host: "smtp.aol.com",
      port: 587
    },
    Bluewin: {
      host: "smtpauths.bluewin.ch",
      domains: ["bluewin.ch"],
      port: 465
    },
    DebugMail: {
      host: "debugmail.io",
      port: 25
    },
    DynectEmail: {
      aliases: ["Dynect"],
      host: "smtp.dynect.net",
      port: 25
    },
    Ethereal: {
      aliases: ["ethereal.email"],
      host: "smtp.ethereal.email",
      port: 587
    },
    FastMail: {
      domains: ["fastmail.fm"],
      host: "smtp.fastmail.com",
      port: 465,
      secure: true
    },
    "Forward Email": {
      aliases: ["FE", "ForwardEmail"],
      domains: ["forwardemail.net"],
      host: "smtp.forwardemail.net",
      port: 465,
      secure: true
    },
    "Feishu Mail": {
      aliases: ["Feishu", "FeishuMail"],
      domains: ["www.feishu.cn"],
      host: "smtp.feishu.cn",
      port: 465,
      secure: true
    },
    GandiMail: {
      aliases: ["Gandi", "Gandi Mail"],
      host: "mail.gandi.net",
      port: 587
    },
    Gmail: {
      aliases: ["Google Mail"],
      domains: ["gmail.com", "googlemail.com"],
      host: "smtp.gmail.com",
      port: 465,
      secure: true
    },
    Godaddy: {
      host: "smtpout.secureserver.net",
      port: 25
    },
    GodaddyAsia: {
      host: "smtp.asia.secureserver.net",
      port: 25
    },
    GodaddyEurope: {
      host: "smtp.europe.secureserver.net",
      port: 25
    },
    "hot.ee": {
      host: "mail.hot.ee"
    },
    Hotmail: {
      aliases: ["Outlook", "Outlook.com", "Hotmail.com"],
      domains: ["hotmail.com", "outlook.com"],
      host: "smtp-mail.outlook.com",
      port: 587
    },
    iCloud: {
      aliases: ["Me", "Mac"],
      domains: ["me.com", "mac.com"],
      host: "smtp.mail.me.com",
      port: 587
    },
    Infomaniak: {
      host: "mail.infomaniak.com",
      domains: ["ik.me", "ikmail.com", "etik.com"],
      port: 587
    },
    Loopia: {
      host: "mailcluster.loopia.se",
      port: 465
    },
    "mail.ee": {
      host: "smtp.mail.ee"
    },
    "Mail.ru": {
      host: "smtp.mail.ru",
      port: 465,
      secure: true
    },
    "Mailcatch.app": {
      host: "sandbox-smtp.mailcatch.app",
      port: 2525
    },
    Maildev: {
      port: 1025,
      ignoreTLS: true
    },
    Mailgun: {
      host: "smtp.mailgun.org",
      port: 465,
      secure: true
    },
    Mailjet: {
      host: "in.mailjet.com",
      port: 587
    },
    Mailosaur: {
      host: "mailosaur.io",
      port: 25
    },
    Mailtrap: {
      host: "live.smtp.mailtrap.io",
      port: 587
    },
    Mandrill: {
      host: "smtp.mandrillapp.com",
      port: 587
    },
    Naver: {
      host: "smtp.naver.com",
      port: 587
    },
    One: {
      host: "send.one.com",
      port: 465,
      secure: true
    },
    OpenMailBox: {
      aliases: ["OMB", "openmailbox.org"],
      host: "smtp.openmailbox.org",
      port: 465,
      secure: true
    },
    Outlook365: {
      host: "smtp.office365.com",
      port: 587,
      secure: false
    },
    OhMySMTP: {
      host: "smtp.ohmysmtp.com",
      port: 587,
      secure: false
    },
    Postmark: {
      aliases: ["PostmarkApp"],
      host: "smtp.postmarkapp.com",
      port: 2525
    },
    Proton: {
      aliases: ["ProtonMail", "Proton.me", "Protonmail.com", "Protonmail.ch"],
      domains: ["proton.me", "protonmail.com", "pm.me", "protonmail.ch"],
      host: "smtp.protonmail.ch",
      port: 587,
      requireTLS: true
    },
    "qiye.aliyun": {
      host: "smtp.mxhichina.com",
      port: "465",
      secure: true
    },
    QQ: {
      domains: ["qq.com"],
      host: "smtp.qq.com",
      port: 465,
      secure: true
    },
    QQex: {
      aliases: ["QQ Enterprise"],
      domains: ["exmail.qq.com"],
      host: "smtp.exmail.qq.com",
      port: 465,
      secure: true
    },
    SendCloud: {
      host: "smtp.sendcloud.net",
      port: 2525
    },
    SendGrid: {
      host: "smtp.sendgrid.net",
      port: 587
    },
    SendinBlue: {
      aliases: ["Brevo"],
      host: "smtp-relay.brevo.com",
      port: 587
    },
    SendPulse: {
      host: "smtp-pulse.com",
      port: 465,
      secure: true
    },
    SES: {
      host: "email-smtp.us-east-1.amazonaws.com",
      port: 465,
      secure: true
    },
    "SES-US-EAST-1": {
      host: "email-smtp.us-east-1.amazonaws.com",
      port: 465,
      secure: true
    },
    "SES-US-WEST-2": {
      host: "email-smtp.us-west-2.amazonaws.com",
      port: 465,
      secure: true
    },
    "SES-EU-WEST-1": {
      host: "email-smtp.eu-west-1.amazonaws.com",
      port: 465,
      secure: true
    },
    "SES-AP-SOUTH-1": {
      host: "email-smtp.ap-south-1.amazonaws.com",
      port: 465,
      secure: true
    },
    "SES-AP-NORTHEAST-1": {
      host: "email-smtp.ap-northeast-1.amazonaws.com",
      port: 465,
      secure: true
    },
    "SES-AP-NORTHEAST-2": {
      host: "email-smtp.ap-northeast-2.amazonaws.com",
      port: 465,
      secure: true
    },
    "SES-AP-NORTHEAST-3": {
      host: "email-smtp.ap-northeast-3.amazonaws.com",
      port: 465,
      secure: true
    },
    "SES-AP-SOUTHEAST-1": {
      host: "email-smtp.ap-southeast-1.amazonaws.com",
      port: 465,
      secure: true
    },
    "SES-AP-SOUTHEAST-2": {
      host: "email-smtp.ap-southeast-2.amazonaws.com",
      port: 465,
      secure: true
    },
    Seznam: {
      aliases: ["Seznam Email"],
      domains: ["seznam.cz", "email.cz", "post.cz", "spoluzaci.cz"],
      host: "smtp.seznam.cz",
      port: 465,
      secure: true
    },
    Sparkpost: {
      aliases: ["SparkPost", "SparkPost Mail"],
      domains: ["sparkpost.com"],
      host: "smtp.sparkpostmail.com",
      port: 587,
      secure: false
    },
    Tipimail: {
      host: "smtp.tipimail.com",
      port: 587
    },
    Yahoo: {
      domains: ["yahoo.com"],
      host: "smtp.mail.yahoo.com",
      port: 465,
      secure: true
    },
    Yandex: {
      domains: ["yandex.ru"],
      host: "smtp.yandex.ru",
      port: 465,
      secure: true
    },
    Zoho: {
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      authMethod: "LOGIN"
    },
    "126": {
      host: "smtp.126.com",
      port: 465,
      secure: true
    },
    "163": {
      host: "smtp.163.com",
      port: 465,
      secure: true
    }
  };
});

// node_modules/nodemailer/lib/well-known/index.js
var require_well_known = __commonJS((exports, module) => {
  var services = require_services();
  var normalized = {};
  Object.keys(services).forEach((key) => {
    let service = services[key];
    normalized[normalizeKey(key)] = normalizeService(service);
    [].concat(service.aliases || []).forEach((alias) => {
      normalized[normalizeKey(alias)] = normalizeService(service);
    });
    [].concat(service.domains || []).forEach((domain) => {
      normalized[normalizeKey(domain)] = normalizeService(service);
    });
  });
  function normalizeKey(key) {
    return key.replace(/[^a-zA-Z0-9.-]/g, "").toLowerCase();
  }
  function normalizeService(service) {
    let filter = ["domains", "aliases"];
    let response = {};
    Object.keys(service).forEach((key) => {
      if (filter.indexOf(key) < 0) {
        response[key] = service[key];
      }
    });
    return response;
  }
  module.exports = function(key) {
    key = normalizeKey(key.split("@").pop());
    return normalized[key] || false;
  };
});

// node_modules/nodemailer/lib/smtp-pool/index.js
var require_smtp_pool = __commonJS((exports, module) => {
  var EventEmitter = __require("node:events");
  var PoolResource = require_pool_resource();
  var SMTPConnection = require_smtp_connection();
  var wellKnown = require_well_known();
  var shared = require_shared();
  var packageData = require_package2();

  class SMTPPool extends EventEmitter {
    constructor(options) {
      super();
      options = options || {};
      if (typeof options === "string") {
        options = {
          url: options
        };
      }
      let urlData;
      let service = options.service;
      if (typeof options.getSocket === "function") {
        this.getSocket = options.getSocket;
      }
      if (options.url) {
        urlData = shared.parseConnectionUrl(options.url);
        service = service || urlData.service;
      }
      this.options = shared.assign(false, options, urlData, service && wellKnown(service));
      this.options.maxConnections = this.options.maxConnections || 5;
      this.options.maxMessages = this.options.maxMessages || 100;
      this.logger = shared.getLogger(this.options, {
        component: this.options.component || "smtp-pool"
      });
      let connection = new SMTPConnection(this.options);
      this.name = "SMTP (pool)";
      this.version = packageData.version + "[client:" + connection.version + "]";
      this._rateLimit = {
        counter: 0,
        timeout: null,
        waiting: [],
        checkpoint: false,
        delta: Number(this.options.rateDelta) || 1000,
        limit: Number(this.options.rateLimit) || 0
      };
      this._closed = false;
      this._queue = [];
      this._connections = [];
      this._connectionCounter = 0;
      this.idling = true;
      setImmediate(() => {
        if (this.idling) {
          this.emit("idle");
        }
      });
    }
    getSocket(options, callback) {
      return setImmediate(() => callback(null, false));
    }
    send(mail, callback) {
      if (this._closed) {
        return false;
      }
      this._queue.push({
        mail,
        requeueAttempts: 0,
        callback
      });
      if (this.idling && this._queue.length >= this.options.maxConnections) {
        this.idling = false;
      }
      setImmediate(() => this._processMessages());
      return true;
    }
    close() {
      let connection;
      let len = this._connections.length;
      this._closed = true;
      clearTimeout(this._rateLimit.timeout);
      if (!len && !this._queue.length) {
        return;
      }
      for (let i = len - 1;i >= 0; i--) {
        if (this._connections[i] && this._connections[i].available) {
          connection = this._connections[i];
          connection.close();
          this.logger.info({
            tnx: "connection",
            cid: connection.id,
            action: "removed"
          }, "Connection #%s removed", connection.id);
        }
      }
      if (len && !this._connections.length) {
        this.logger.debug({
          tnx: "connection"
        }, "All connections removed");
      }
      if (!this._queue.length) {
        return;
      }
      let invokeCallbacks = () => {
        if (!this._queue.length) {
          this.logger.debug({
            tnx: "connection"
          }, "Pending queue entries cleared");
          return;
        }
        let entry = this._queue.shift();
        if (entry && typeof entry.callback === "function") {
          try {
            entry.callback(new Error("Connection pool was closed"));
          } catch (E) {
            this.logger.error({
              err: E,
              tnx: "callback",
              cid: connection.id
            }, "Callback error for #%s: %s", connection.id, E.message);
          }
        }
        setImmediate(invokeCallbacks);
      };
      setImmediate(invokeCallbacks);
    }
    _processMessages() {
      let connection;
      let i, len;
      if (this._closed) {
        return;
      }
      if (!this._queue.length) {
        if (!this.idling) {
          this.idling = true;
          this.emit("idle");
        }
        return;
      }
      for (i = 0, len = this._connections.length;i < len; i++) {
        if (this._connections[i].available) {
          connection = this._connections[i];
          break;
        }
      }
      if (!connection && this._connections.length < this.options.maxConnections) {
        connection = this._createConnection();
      }
      if (!connection) {
        this.idling = false;
        return;
      }
      if (!this.idling && this._queue.length < this.options.maxConnections) {
        this.idling = true;
        this.emit("idle");
      }
      let entry = connection.queueEntry = this._queue.shift();
      entry.messageId = (connection.queueEntry.mail.message.getHeader("message-id") || "").replace(/[<>\s]/g, "");
      connection.available = false;
      this.logger.debug({
        tnx: "pool",
        cid: connection.id,
        messageId: entry.messageId,
        action: "assign"
      }, "Assigned message <%s> to #%s (%s)", entry.messageId, connection.id, connection.messages + 1);
      if (this._rateLimit.limit) {
        this._rateLimit.counter++;
        if (!this._rateLimit.checkpoint) {
          this._rateLimit.checkpoint = Date.now();
        }
      }
      connection.send(entry.mail, (err, info) => {
        if (entry === connection.queueEntry) {
          try {
            entry.callback(err, info);
          } catch (E) {
            this.logger.error({
              err: E,
              tnx: "callback",
              cid: connection.id
            }, "Callback error for #%s: %s", connection.id, E.message);
          }
          connection.queueEntry = false;
        }
      });
    }
    _createConnection() {
      let connection = new PoolResource(this);
      connection.id = ++this._connectionCounter;
      this.logger.info({
        tnx: "pool",
        cid: connection.id,
        action: "conection"
      }, "Created new pool resource #%s", connection.id);
      connection.on("available", () => {
        this.logger.debug({
          tnx: "connection",
          cid: connection.id,
          action: "available"
        }, "Connection #%s became available", connection.id);
        if (this._closed) {
          this.close();
        } else {
          this._processMessages();
        }
      });
      connection.once("error", (err) => {
        if (err.code !== "EMAXLIMIT") {
          this.logger.error({
            err,
            tnx: "pool",
            cid: connection.id
          }, "Pool Error for #%s: %s", connection.id, err.message);
        } else {
          this.logger.debug({
            tnx: "pool",
            cid: connection.id,
            action: "maxlimit"
          }, "Max messages limit exchausted for #%s", connection.id);
        }
        if (connection.queueEntry) {
          try {
            connection.queueEntry.callback(err);
          } catch (E) {
            this.logger.error({
              err: E,
              tnx: "callback",
              cid: connection.id
            }, "Callback error for #%s: %s", connection.id, E.message);
          }
          connection.queueEntry = false;
        }
        this._removeConnection(connection);
        this._continueProcessing();
      });
      connection.once("close", () => {
        this.logger.info({
          tnx: "connection",
          cid: connection.id,
          action: "closed"
        }, "Connection #%s was closed", connection.id);
        this._removeConnection(connection);
        if (connection.queueEntry) {
          setTimeout(() => {
            if (connection.queueEntry) {
              if (this._shouldRequeuOnConnectionClose(connection.queueEntry)) {
                this._requeueEntryOnConnectionClose(connection);
              } else {
                this._failDeliveryOnConnectionClose(connection);
              }
            }
            this._continueProcessing();
          }, 50);
        } else {
          this._continueProcessing();
        }
      });
      this._connections.push(connection);
      return connection;
    }
    _shouldRequeuOnConnectionClose(queueEntry) {
      if (this.options.maxRequeues === undefined || this.options.maxRequeues < 0) {
        return true;
      }
      return queueEntry.requeueAttempts < this.options.maxRequeues;
    }
    _failDeliveryOnConnectionClose(connection) {
      if (connection.queueEntry && connection.queueEntry.callback) {
        try {
          connection.queueEntry.callback(new Error("Reached maximum number of retries after connection was closed"));
        } catch (E) {
          this.logger.error({
            err: E,
            tnx: "callback",
            messageId: connection.queueEntry.messageId,
            cid: connection.id
          }, "Callback error for #%s: %s", connection.id, E.message);
        }
        connection.queueEntry = false;
      }
    }
    _requeueEntryOnConnectionClose(connection) {
      connection.queueEntry.requeueAttempts = connection.queueEntry.requeueAttempts + 1;
      this.logger.debug({
        tnx: "pool",
        cid: connection.id,
        messageId: connection.queueEntry.messageId,
        action: "requeue"
      }, "Re-queued message <%s> for #%s. Attempt: #%s", connection.queueEntry.messageId, connection.id, connection.queueEntry.requeueAttempts);
      this._queue.unshift(connection.queueEntry);
      connection.queueEntry = false;
    }
    _continueProcessing() {
      if (this._closed) {
        this.close();
      } else {
        setTimeout(() => this._processMessages(), 100);
      }
    }
    _removeConnection(connection) {
      let index = this._connections.indexOf(connection);
      if (index !== -1) {
        this._connections.splice(index, 1);
      }
    }
    _checkRateLimit(callback) {
      if (!this._rateLimit.limit) {
        return callback();
      }
      let now = Date.now();
      if (this._rateLimit.counter < this._rateLimit.limit) {
        return callback();
      }
      this._rateLimit.waiting.push(callback);
      if (this._rateLimit.checkpoint <= now - this._rateLimit.delta) {
        return this._clearRateLimit();
      } else if (!this._rateLimit.timeout) {
        this._rateLimit.timeout = setTimeout(() => this._clearRateLimit(), this._rateLimit.delta - (now - this._rateLimit.checkpoint));
        this._rateLimit.checkpoint = now;
      }
    }
    _clearRateLimit() {
      clearTimeout(this._rateLimit.timeout);
      this._rateLimit.timeout = null;
      this._rateLimit.counter = 0;
      this._rateLimit.checkpoint = false;
      while (this._rateLimit.waiting.length) {
        let cb = this._rateLimit.waiting.shift();
        setImmediate(cb);
      }
    }
    isIdle() {
      return this.idling;
    }
    verify(callback) {
      let promise;
      if (!callback) {
        promise = new Promise((resolve, reject) => {
          callback = shared.callbackPromise(resolve, reject);
        });
      }
      let auth = new PoolResource(this).auth;
      this.getSocket(this.options, (err, socketOptions) => {
        if (err) {
          return callback(err);
        }
        let options = this.options;
        if (socketOptions && socketOptions.connection) {
          this.logger.info({
            tnx: "proxy",
            remoteAddress: socketOptions.connection.remoteAddress,
            remotePort: socketOptions.connection.remotePort,
            destHost: options.host || "",
            destPort: options.port || "",
            action: "connected"
          }, "Using proxied socket from %s:%s to %s:%s", socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options.host || "", options.port || "");
          options = shared.assign(false, options);
          Object.keys(socketOptions).forEach((key) => {
            options[key] = socketOptions[key];
          });
        }
        let connection = new SMTPConnection(options);
        let returned = false;
        connection.once("error", (err2) => {
          if (returned) {
            return;
          }
          returned = true;
          connection.close();
          return callback(err2);
        });
        connection.once("end", () => {
          if (returned) {
            return;
          }
          returned = true;
          return callback(new Error("Connection closed"));
        });
        let finalize = () => {
          if (returned) {
            return;
          }
          returned = true;
          connection.quit();
          return callback(null, true);
        };
        connection.connect(() => {
          if (returned) {
            return;
          }
          if (auth && (connection.allowsAuth || options.forceAuth)) {
            connection.login(auth, (err2) => {
              if (returned) {
                return;
              }
              if (err2) {
                returned = true;
                connection.close();
                return callback(err2);
              }
              finalize();
            });
          } else if (!auth && connection.allowsAuth && options.forceAuth) {
            let err2 = new Error("Authentication info was not provided");
            err2.code = "NoAuth";
            returned = true;
            connection.close();
            return callback(err2);
          } else {
            finalize();
          }
        });
      });
      return promise;
    }
  }
  module.exports = SMTPPool;
});

// node_modules/nodemailer/lib/smtp-transport/index.js
var require_smtp_transport = __commonJS((exports, module) => {
  var EventEmitter = __require("node:events");
  var SMTPConnection = require_smtp_connection();
  var wellKnown = require_well_known();
  var shared = require_shared();
  var XOAuth2 = require_xoauth2();
  var packageData = require_package2();

  class SMTPTransport extends EventEmitter {
    constructor(options) {
      super();
      options = options || {};
      if (typeof options === "string") {
        options = {
          url: options
        };
      }
      let urlData;
      let service = options.service;
      if (typeof options.getSocket === "function") {
        this.getSocket = options.getSocket;
      }
      if (options.url) {
        urlData = shared.parseConnectionUrl(options.url);
        service = service || urlData.service;
      }
      this.options = shared.assign(false, options, urlData, service && wellKnown(service));
      this.logger = shared.getLogger(this.options, {
        component: this.options.component || "smtp-transport"
      });
      let connection = new SMTPConnection(this.options);
      this.name = "SMTP";
      this.version = packageData.version + "[client:" + connection.version + "]";
      if (this.options.auth) {
        this.auth = this.getAuth({});
      }
    }
    getSocket(options, callback) {
      return setImmediate(() => callback(null, false));
    }
    getAuth(authOpts) {
      if (!authOpts) {
        return this.auth;
      }
      let hasAuth = false;
      let authData = {};
      if (this.options.auth && typeof this.options.auth === "object") {
        Object.keys(this.options.auth).forEach((key) => {
          hasAuth = true;
          authData[key] = this.options.auth[key];
        });
      }
      if (authOpts && typeof authOpts === "object") {
        Object.keys(authOpts).forEach((key) => {
          hasAuth = true;
          authData[key] = authOpts[key];
        });
      }
      if (!hasAuth) {
        return false;
      }
      switch ((authData.type || "").toString().toUpperCase()) {
        case "OAUTH2": {
          if (!authData.service && !authData.user) {
            return false;
          }
          let oauth2 = new XOAuth2(authData, this.logger);
          oauth2.provisionCallback = this.mailer && this.mailer.get("oauth2_provision_cb") || oauth2.provisionCallback;
          oauth2.on("token", (token) => this.mailer.emit("token", token));
          oauth2.on("error", (err) => this.emit("error", err));
          return {
            type: "OAUTH2",
            user: authData.user,
            oauth2,
            method: "XOAUTH2"
          };
        }
        default:
          return {
            type: (authData.type || "").toString().toUpperCase() || "LOGIN",
            user: authData.user,
            credentials: {
              user: authData.user || "",
              pass: authData.pass,
              options: authData.options
            },
            method: (authData.method || "").trim().toUpperCase() || this.options.authMethod || false
          };
      }
    }
    send(mail, callback) {
      this.getSocket(this.options, (err, socketOptions) => {
        if (err) {
          return callback(err);
        }
        let returned = false;
        let options = this.options;
        if (socketOptions && socketOptions.connection) {
          this.logger.info({
            tnx: "proxy",
            remoteAddress: socketOptions.connection.remoteAddress,
            remotePort: socketOptions.connection.remotePort,
            destHost: options.host || "",
            destPort: options.port || "",
            action: "connected"
          }, "Using proxied socket from %s:%s to %s:%s", socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options.host || "", options.port || "");
          options = shared.assign(false, options);
          Object.keys(socketOptions).forEach((key) => {
            options[key] = socketOptions[key];
          });
        }
        let connection = new SMTPConnection(options);
        connection.once("error", (err2) => {
          if (returned) {
            return;
          }
          returned = true;
          connection.close();
          return callback(err2);
        });
        connection.once("end", () => {
          if (returned) {
            return;
          }
          let timer = setTimeout(() => {
            if (returned) {
              return;
            }
            returned = true;
            let err2 = new Error("Unexpected socket close");
            if (connection && connection._socket && connection._socket.upgrading) {
              err2.code = "ETLS";
            }
            callback(err2);
          }, 1000);
          try {
            timer.unref();
          } catch (E) {}
        });
        let sendMessage = () => {
          let envelope = mail.message.getEnvelope();
          let messageId = mail.message.messageId();
          let recipients = [].concat(envelope.to || []);
          if (recipients.length > 3) {
            recipients.push("...and " + recipients.splice(2).length + " more");
          }
          if (mail.data.dsn) {
            envelope.dsn = mail.data.dsn;
          }
          this.logger.info({
            tnx: "send",
            messageId
          }, "Sending message %s to <%s>", messageId, recipients.join(", "));
          connection.send(envelope, mail.message.createReadStream(), (err2, info) => {
            returned = true;
            connection.close();
            if (err2) {
              this.logger.error({
                err: err2,
                tnx: "send"
              }, "Send error for %s: %s", messageId, err2.message);
              return callback(err2);
            }
            info.envelope = {
              from: envelope.from,
              to: envelope.to
            };
            info.messageId = messageId;
            try {
              return callback(null, info);
            } catch (E) {
              this.logger.error({
                err: E,
                tnx: "callback"
              }, "Callback error for %s: %s", messageId, E.message);
            }
          });
        };
        connection.connect(() => {
          if (returned) {
            return;
          }
          let auth = this.getAuth(mail.data.auth);
          if (auth && (connection.allowsAuth || options.forceAuth)) {
            connection.login(auth, (err2) => {
              if (auth && auth !== this.auth && auth.oauth2) {
                auth.oauth2.removeAllListeners();
              }
              if (returned) {
                return;
              }
              if (err2) {
                returned = true;
                connection.close();
                return callback(err2);
              }
              sendMessage();
            });
          } else {
            sendMessage();
          }
        });
      });
    }
    verify(callback) {
      let promise;
      if (!callback) {
        promise = new Promise((resolve, reject) => {
          callback = shared.callbackPromise(resolve, reject);
        });
      }
      this.getSocket(this.options, (err, socketOptions) => {
        if (err) {
          return callback(err);
        }
        let options = this.options;
        if (socketOptions && socketOptions.connection) {
          this.logger.info({
            tnx: "proxy",
            remoteAddress: socketOptions.connection.remoteAddress,
            remotePort: socketOptions.connection.remotePort,
            destHost: options.host || "",
            destPort: options.port || "",
            action: "connected"
          }, "Using proxied socket from %s:%s to %s:%s", socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options.host || "", options.port || "");
          options = shared.assign(false, options);
          Object.keys(socketOptions).forEach((key) => {
            options[key] = socketOptions[key];
          });
        }
        let connection = new SMTPConnection(options);
        let returned = false;
        connection.once("error", (err2) => {
          if (returned) {
            return;
          }
          returned = true;
          connection.close();
          return callback(err2);
        });
        connection.once("end", () => {
          if (returned) {
            return;
          }
          returned = true;
          return callback(new Error("Connection closed"));
        });
        let finalize = () => {
          if (returned) {
            return;
          }
          returned = true;
          connection.quit();
          return callback(null, true);
        };
        connection.connect(() => {
          if (returned) {
            return;
          }
          let authData = this.getAuth({});
          if (authData && (connection.allowsAuth || options.forceAuth)) {
            connection.login(authData, (err2) => {
              if (returned) {
                return;
              }
              if (err2) {
                returned = true;
                connection.close();
                return callback(err2);
              }
              finalize();
            });
          } else if (!authData && connection.allowsAuth && options.forceAuth) {
            let err2 = new Error("Authentication info was not provided");
            err2.code = "NoAuth";
            returned = true;
            connection.close();
            return callback(err2);
          } else {
            finalize();
          }
        });
      });
      return promise;
    }
    close() {
      if (this.auth && this.auth.oauth2) {
        this.auth.oauth2.removeAllListeners();
      }
      this.emit("close");
    }
  }
  module.exports = SMTPTransport;
});

// node_modules/nodemailer/lib/sendmail-transport/index.js
var require_sendmail_transport = __commonJS((exports, module) => {
  var spawn = __require("node:child_process").spawn;
  var packageData = require_package2();
  var shared = require_shared();

  class SendmailTransport {
    constructor(options) {
      options = options || {};
      this._spawn = spawn;
      this.options = options || {};
      this.name = "Sendmail";
      this.version = packageData.version;
      this.path = "sendmail";
      this.args = false;
      this.winbreak = false;
      this.logger = shared.getLogger(this.options, {
        component: this.options.component || "sendmail"
      });
      if (options) {
        if (typeof options === "string") {
          this.path = options;
        } else if (typeof options === "object") {
          if (options.path) {
            this.path = options.path;
          }
          if (Array.isArray(options.args)) {
            this.args = options.args;
          }
          this.winbreak = ["win", "windows", "dos", `\r
`].includes((options.newline || "").toString().toLowerCase());
        }
      }
    }
    send(mail, done) {
      mail.message.keepBcc = true;
      let envelope = mail.data.envelope || mail.message.getEnvelope();
      let messageId = mail.message.messageId();
      let args;
      let sendmail;
      let returned;
      const hasInvalidAddresses = [].concat(envelope.from || []).concat(envelope.to || []).some((addr) => /^-/.test(addr));
      if (hasInvalidAddresses) {
        return done(new Error("Can not send mail. Invalid envelope addresses."));
      }
      if (this.args) {
        args = ["-i"].concat(this.args).concat(envelope.to);
      } else {
        args = ["-i"].concat(envelope.from ? ["-f", envelope.from] : []).concat(envelope.to);
      }
      let callback = (err) => {
        if (returned) {
          return;
        }
        returned = true;
        if (typeof done === "function") {
          if (err) {
            return done(err);
          } else {
            return done(null, {
              envelope: mail.data.envelope || mail.message.getEnvelope(),
              messageId,
              response: "Messages queued for delivery"
            });
          }
        }
      };
      try {
        sendmail = this._spawn(this.path, args);
      } catch (E) {
        this.logger.error({
          err: E,
          tnx: "spawn",
          messageId
        }, "Error occurred while spawning sendmail. %s", E.message);
        return callback(E);
      }
      if (sendmail) {
        sendmail.on("error", (err) => {
          this.logger.error({
            err,
            tnx: "spawn",
            messageId
          }, "Error occurred when sending message %s. %s", messageId, err.message);
          callback(err);
        });
        sendmail.once("exit", (code) => {
          if (!code) {
            return callback();
          }
          let err;
          if (code === 127) {
            err = new Error("Sendmail command not found, process exited with code " + code);
          } else {
            err = new Error("Sendmail exited with code " + code);
          }
          this.logger.error({
            err,
            tnx: "stdin",
            messageId
          }, "Error sending message %s to sendmail. %s", messageId, err.message);
          callback(err);
        });
        sendmail.once("close", callback);
        sendmail.stdin.on("error", (err) => {
          this.logger.error({
            err,
            tnx: "stdin",
            messageId
          }, "Error occurred when piping message %s to sendmail. %s", messageId, err.message);
          callback(err);
        });
        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
          recipients.push("...and " + recipients.splice(2).length + " more");
        }
        this.logger.info({
          tnx: "send",
          messageId
        }, "Sending message %s to <%s>", messageId, recipients.join(", "));
        let sourceStream = mail.message.createReadStream();
        sourceStream.once("error", (err) => {
          this.logger.error({
            err,
            tnx: "stdin",
            messageId
          }, "Error occurred when generating message %s. %s", messageId, err.message);
          sendmail.kill("SIGINT");
          callback(err);
        });
        sourceStream.pipe(sendmail.stdin);
      } else {
        return callback(new Error("sendmail was not found"));
      }
    }
  }
  module.exports = SendmailTransport;
});

// node_modules/nodemailer/lib/stream-transport/index.js
var require_stream_transport = __commonJS((exports, module) => {
  var packageData = require_package2();
  var shared = require_shared();

  class StreamTransport {
    constructor(options) {
      options = options || {};
      this.options = options || {};
      this.name = "StreamTransport";
      this.version = packageData.version;
      this.logger = shared.getLogger(this.options, {
        component: this.options.component || "stream-transport"
      });
      this.winbreak = ["win", "windows", "dos", `\r
`].includes((options.newline || "").toString().toLowerCase());
    }
    send(mail, done) {
      mail.message.keepBcc = true;
      let envelope = mail.data.envelope || mail.message.getEnvelope();
      let messageId = mail.message.messageId();
      let recipients = [].concat(envelope.to || []);
      if (recipients.length > 3) {
        recipients.push("...and " + recipients.splice(2).length + " more");
      }
      this.logger.info({
        tnx: "send",
        messageId
      }, "Sending message %s to <%s> using %s line breaks", messageId, recipients.join(", "), this.winbreak ? "<CR><LF>" : "<LF>");
      setImmediate(() => {
        let stream;
        try {
          stream = mail.message.createReadStream();
        } catch (E) {
          this.logger.error({
            err: E,
            tnx: "send",
            messageId
          }, "Creating send stream failed for %s. %s", messageId, E.message);
          return done(E);
        }
        if (!this.options.buffer) {
          stream.once("error", (err) => {
            this.logger.error({
              err,
              tnx: "send",
              messageId
            }, "Failed creating message for %s. %s", messageId, err.message);
          });
          return done(null, {
            envelope: mail.data.envelope || mail.message.getEnvelope(),
            messageId,
            message: stream
          });
        }
        let chunks = [];
        let chunklen = 0;
        stream.on("readable", () => {
          let chunk;
          while ((chunk = stream.read()) !== null) {
            chunks.push(chunk);
            chunklen += chunk.length;
          }
        });
        stream.once("error", (err) => {
          this.logger.error({
            err,
            tnx: "send",
            messageId
          }, "Failed creating message for %s. %s", messageId, err.message);
          return done(err);
        });
        stream.on("end", () => done(null, {
          envelope: mail.data.envelope || mail.message.getEnvelope(),
          messageId,
          message: Buffer.concat(chunks, chunklen)
        }));
      });
    }
  }
  module.exports = StreamTransport;
});

// node_modules/nodemailer/lib/json-transport/index.js
var require_json_transport = __commonJS((exports, module) => {
  var packageData = require_package2();
  var shared = require_shared();

  class JSONTransport {
    constructor(options) {
      options = options || {};
      this.options = options || {};
      this.name = "JSONTransport";
      this.version = packageData.version;
      this.logger = shared.getLogger(this.options, {
        component: this.options.component || "json-transport"
      });
    }
    send(mail, done) {
      mail.message.keepBcc = true;
      let envelope = mail.data.envelope || mail.message.getEnvelope();
      let messageId = mail.message.messageId();
      let recipients = [].concat(envelope.to || []);
      if (recipients.length > 3) {
        recipients.push("...and " + recipients.splice(2).length + " more");
      }
      this.logger.info({
        tnx: "send",
        messageId
      }, "Composing JSON structure of %s to <%s>", messageId, recipients.join(", "));
      setImmediate(() => {
        mail.normalize((err, data) => {
          if (err) {
            this.logger.error({
              err,
              tnx: "send",
              messageId
            }, "Failed building JSON structure for %s. %s", messageId, err.message);
            return done(err);
          }
          delete data.envelope;
          delete data.normalizedHeaders;
          return done(null, {
            envelope,
            messageId,
            message: this.options.skipEncoding ? data : JSON.stringify(data)
          });
        });
      });
    }
  }
  module.exports = JSONTransport;
});

// node_modules/nodemailer/lib/ses-transport/index.js
var require_ses_transport = __commonJS((exports, module) => {
  var EventEmitter = __require("node:events");
  var packageData = require_package2();
  var shared = require_shared();
  var LeWindows = require_le_windows();

  class SESTransport extends EventEmitter {
    constructor(options) {
      super();
      options = options || {};
      this.options = options || {};
      this.ses = this.options.SES;
      this.name = "SESTransport";
      this.version = packageData.version;
      this.logger = shared.getLogger(this.options, {
        component: this.options.component || "ses-transport"
      });
      this.maxConnections = Number(this.options.maxConnections) || Infinity;
      this.connections = 0;
      this.sendingRate = Number(this.options.sendingRate) || Infinity;
      this.sendingRateTTL = null;
      this.rateInterval = 1000;
      this.rateMessages = [];
      this.pending = [];
      this.idling = true;
      setImmediate(() => {
        if (this.idling) {
          this.emit("idle");
        }
      });
    }
    send(mail, callback) {
      if (this.connections >= this.maxConnections) {
        this.idling = false;
        return this.pending.push({
          mail,
          callback
        });
      }
      if (!this._checkSendingRate()) {
        this.idling = false;
        return this.pending.push({
          mail,
          callback
        });
      }
      this._send(mail, (...args) => {
        setImmediate(() => callback(...args));
        this._sent();
      });
    }
    _checkRatedQueue() {
      if (this.connections >= this.maxConnections || !this._checkSendingRate()) {
        return;
      }
      if (!this.pending.length) {
        if (!this.idling) {
          this.idling = true;
          this.emit("idle");
        }
        return;
      }
      let next = this.pending.shift();
      this._send(next.mail, (...args) => {
        setImmediate(() => next.callback(...args));
        this._sent();
      });
    }
    _checkSendingRate() {
      clearTimeout(this.sendingRateTTL);
      let now = Date.now();
      let oldest = false;
      for (let i = this.rateMessages.length - 1;i >= 0; i--) {
        if (this.rateMessages[i].ts >= now - this.rateInterval && (!oldest || this.rateMessages[i].ts < oldest)) {
          oldest = this.rateMessages[i].ts;
        }
        if (this.rateMessages[i].ts < now - this.rateInterval && !this.rateMessages[i].pending) {
          this.rateMessages.splice(i, 1);
        }
      }
      if (this.rateMessages.length < this.sendingRate) {
        return true;
      }
      let delay = Math.max(oldest + 1001, now + 20);
      this.sendingRateTTL = setTimeout(() => this._checkRatedQueue(), now - delay);
      try {
        this.sendingRateTTL.unref();
      } catch (E) {}
      return false;
    }
    _sent() {
      this.connections--;
      this._checkRatedQueue();
    }
    isIdle() {
      return this.idling;
    }
    _send(mail, callback) {
      let statObject = {
        ts: Date.now(),
        pending: true
      };
      this.connections++;
      this.rateMessages.push(statObject);
      let envelope = mail.data.envelope || mail.message.getEnvelope();
      let messageId = mail.message.messageId();
      let recipients = [].concat(envelope.to || []);
      if (recipients.length > 3) {
        recipients.push("...and " + recipients.splice(2).length + " more");
      }
      this.logger.info({
        tnx: "send",
        messageId
      }, "Sending message %s to <%s>", messageId, recipients.join(", "));
      let getRawMessage = (next) => {
        if (!mail.data._dkim) {
          mail.data._dkim = {};
        }
        if (mail.data._dkim.skipFields && typeof mail.data._dkim.skipFields === "string") {
          mail.data._dkim.skipFields += ":date:message-id";
        } else {
          mail.data._dkim.skipFields = "date:message-id";
        }
        let sourceStream = mail.message.createReadStream();
        let stream = sourceStream.pipe(new LeWindows);
        let chunks = [];
        let chunklen = 0;
        stream.on("readable", () => {
          let chunk;
          while ((chunk = stream.read()) !== null) {
            chunks.push(chunk);
            chunklen += chunk.length;
          }
        });
        sourceStream.once("error", (err) => stream.emit("error", err));
        stream.once("error", (err) => {
          next(err);
        });
        stream.once("end", () => next(null, Buffer.concat(chunks, chunklen)));
      };
      setImmediate(() => getRawMessage((err, raw2) => {
        if (err) {
          this.logger.error({
            err,
            tnx: "send",
            messageId
          }, "Failed creating message for %s. %s", messageId, err.message);
          statObject.pending = false;
          return callback(err);
        }
        let sesMessage = {
          RawMessage: {
            Data: raw2
          },
          Source: envelope.from,
          Destinations: envelope.to
        };
        Object.keys(mail.data.ses || {}).forEach((key) => {
          sesMessage[key] = mail.data.ses[key];
        });
        let ses = (this.ses.aws ? this.ses.ses : this.ses) || {};
        let aws = this.ses.aws || {};
        let getRegion = (cb) => {
          if (ses.config && typeof ses.config.region === "function") {
            return ses.config.region().then((region) => cb(null, region)).catch((err2) => cb(err2));
          }
          return cb(null, ses.config && ses.config.region || "us-east-1");
        };
        getRegion((err2, region) => {
          if (err2 || !region) {
            region = "us-east-1";
          }
          let sendPromise;
          if (typeof ses.send === "function" && aws.SendRawEmailCommand) {
            sendPromise = ses.send(new aws.SendRawEmailCommand(sesMessage));
          } else {
            sendPromise = ses.sendRawEmail(sesMessage).promise();
          }
          sendPromise.then((data) => {
            if (region === "us-east-1") {
              region = "email";
            }
            statObject.pending = false;
            callback(null, {
              envelope: {
                from: envelope.from,
                to: envelope.to
              },
              messageId: "<" + data.MessageId + (!/@/.test(data.MessageId) ? "@" + region + ".amazonses.com" : "") + ">",
              response: data.MessageId,
              raw: raw2
            });
          }).catch((err3) => {
            this.logger.error({
              err: err3,
              tnx: "send"
            }, "Send error for %s: %s", messageId, err3.message);
            statObject.pending = false;
            callback(err3);
          });
        });
      }));
    }
    verify(callback) {
      let promise;
      let ses = (this.ses.aws ? this.ses.ses : this.ses) || {};
      let aws = this.ses.aws || {};
      const sesMessage = {
        RawMessage: {
          Data: `From: invalid@invalid\r
To: invalid@invalid\r
 Subject: Invalid\r
\r
Invalid`
        },
        Source: "invalid@invalid",
        Destinations: ["invalid@invalid"]
      };
      if (!callback) {
        promise = new Promise((resolve, reject) => {
          callback = shared.callbackPromise(resolve, reject);
        });
      }
      const cb = (err) => {
        if (err && (err.code || err.Code) !== "InvalidParameterValue") {
          return callback(err);
        }
        return callback(null, true);
      };
      if (typeof ses.send === "function" && aws.SendRawEmailCommand) {
        sesMessage.RawMessage.Data = Buffer.from(sesMessage.RawMessage.Data);
        ses.send(new aws.SendRawEmailCommand(sesMessage), cb);
      } else {
        ses.sendRawEmail(sesMessage, cb);
      }
      return promise;
    }
  }
  module.exports = SESTransport;
});

// node_modules/hono/dist/compose.js
var compose = (middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || undefined;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
  };
};

// node_modules/hono/dist/utils/body.js
var parseBody = async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
};
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
var handleParsingAllValues = (form, key, value) => {
  if (form[key] !== undefined) {
    if (Array.isArray(form[key])) {
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    form[key] = value;
  }
};
var handleParsingNestedValues = (form, key, value) => {
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
};

// node_modules/hono/dist/utils/url.js
var splitPath = (path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
};
var splitRoutingPath = (routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
};
var extractGroupsFromPath = (path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match, index) => {
    const mark = `@${index}`;
    groups.push([mark, match]);
    return mark;
  });
  return { groups, path };
};
var replaceGroupMarks = (paths, groups) => {
  for (let i = groups.length - 1;i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1;j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
};
var patternCache = {};
var getPattern = (label, next) => {
  if (label === "*") {
    return "*";
  }
  const match = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match[1], new RegExp(`^${match[2]}(?=/${next})`)] : [label, match[1], new RegExp(`^${match[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
};
var tryDecode = (str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match) => {
      try {
        return decoder(match);
      } catch {
        return match;
      }
    });
  }
};
var tryDecodeURI = (str) => tryDecode(str, decodeURI);
var getPath = (request) => {
  const url = request.url;
  const start = url.indexOf("/", 8);
  let i = start;
  for (;i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const path = url.slice(start, queryIndex === -1 ? undefined : queryIndex);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63) {
      break;
    }
  }
  return url.slice(start, i);
};
var getPathNoStrict = (request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
};
var mergePath = (base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
};
var checkOptionalParameter = (path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
};
var _decodeURI = (value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? decodeURIComponent_(value) : value;
};
var _getQueryParam = (url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf(`?${key}`, 8);
    if (keyIndex2 === -1) {
      keyIndex2 = url.indexOf(`&${key}`, 8);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? undefined : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(keyIndex + 1, valueIndex === -1 ? nextKeyIndex === -1 ? undefined : nextKeyIndex : valueIndex);
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? undefined : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
  return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var tryDecodeURIComponent = (str) => tryDecode(str, decodeURIComponent_);
var HonoRequest = class {
  raw;
  #validatedData;
  #matchResult;
  routeIndex = 0;
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param ? /\%/.test(param) ? tryDecodeURIComponent(param) : param : undefined;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value && typeof value === "string") {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? undefined;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return this.bodyCache.parsedBody ??= await parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw[key]();
  };
  json() {
    return this.#cachedBody("json");
  }
  text() {
    return this.#cachedBody("text");
  }
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  blob() {
    return this.#cachedBody("blob");
  }
  formData() {
    return this.#cachedBody("formData");
  }
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = (value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
};
var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then((res) => Promise.all(res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))).then(() => buffer[0]));
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
};

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setHeaders = (headers, map = {}) => {
  for (const key of Object.keys(map)) {
    headers.set(key, map[key]);
  }
  return headers;
};
var Context = class {
  #rawRequest;
  #req;
  env = {};
  #var;
  finalized = false;
  error;
  #status = 200;
  #executionCtx;
  #headers;
  #preparedHeaders;
  #res;
  #isFresh = true;
  #layout;
  #renderer;
  #notFoundHandler;
  #matchResult;
  #path;
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  get res() {
    this.#isFresh = false;
    return this.#res ||= new Response("404 Not Found", { status: 404 });
  }
  set res(_res) {
    this.#isFresh = false;
    if (this.#res && _res) {
      try {
        for (const [k, v] of this.#res.headers.entries()) {
          if (k === "content-type") {
            continue;
          }
          if (k === "set-cookie") {
            const cookies = this.#res.headers.getSetCookie();
            _res.headers.delete("set-cookie");
            for (const cookie of cookies) {
              _res.headers.append("set-cookie", cookie);
            }
          } else {
            _res.headers.set(k, v);
          }
        }
      } catch (e) {
        if (e instanceof TypeError && e.message.includes("immutable")) {
          this.res = new Response(_res.body, {
            headers: _res.headers,
            status: _res.status
          });
          return;
        } else {
          throw e;
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  setLayout = (layout) => this.#layout = layout;
  getLayout = () => this.#layout;
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  header = (name, value, options) => {
    if (value === undefined) {
      if (this.#headers) {
        this.#headers.delete(name);
      } else if (this.#preparedHeaders) {
        delete this.#preparedHeaders[name.toLocaleLowerCase()];
      }
      if (this.finalized) {
        this.res.headers.delete(name);
      }
      return;
    }
    if (options?.append) {
      if (!this.#headers) {
        this.#isFresh = false;
        this.#headers = new Headers(this.#preparedHeaders);
        this.#preparedHeaders = {};
      }
      this.#headers.append(name, value);
    } else {
      if (this.#headers) {
        this.#headers.set(name, value);
      } else {
        this.#preparedHeaders ??= {};
        this.#preparedHeaders[name.toLowerCase()] = value;
      }
    }
    if (this.finalized) {
      if (options?.append) {
        this.res.headers.append(name, value);
      } else {
        this.res.headers.set(name, value);
      }
    }
  };
  status = (status) => {
    this.#isFresh = false;
    this.#status = status;
  };
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map;
    this.#var.set(key, value);
  };
  get = (key) => {
    return this.#var ? this.#var.get(key) : undefined;
  };
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    if (this.#isFresh && !headers && !arg && this.#status === 200) {
      return new Response(data, {
        headers: this.#preparedHeaders
      });
    }
    if (arg && typeof arg !== "number") {
      const header = new Headers(arg.headers);
      if (this.#headers) {
        this.#headers.forEach((v, k) => {
          if (k === "set-cookie") {
            header.append(k, v);
          } else {
            header.set(k, v);
          }
        });
      }
      const headers2 = setHeaders(header, this.#preparedHeaders);
      return new Response(data, {
        headers: headers2,
        status: arg.status ?? this.#status
      });
    }
    const status = typeof arg === "number" ? arg : this.#status;
    this.#preparedHeaders ??= {};
    this.#headers ??= new Headers;
    setHeaders(this.#headers, this.#preparedHeaders);
    if (this.#res) {
      this.#res.headers.forEach((v, k) => {
        if (k === "set-cookie") {
          this.#headers?.append(k, v);
        } else {
          this.#headers?.set(k, v);
        }
      });
      setHeaders(this.#headers, this.#preparedHeaders);
    }
    headers ??= {};
    for (const [k, v] of Object.entries(headers)) {
      if (typeof v === "string") {
        this.#headers.set(k, v);
      } else {
        this.#headers.delete(k);
        for (const v2 of v) {
          this.#headers.append(k, v2);
        }
      }
    }
    return new Response(data, {
      status,
      headers: this.#headers
    });
  }
  newResponse = (...args) => this.#newResponse(...args);
  body = (data, arg, headers) => {
    return typeof arg === "number" ? this.#newResponse(data, arg, headers) : this.#newResponse(data, arg);
  };
  text = (text, arg, headers) => {
    if (!this.#preparedHeaders) {
      if (this.#isFresh && !headers && !arg) {
        return new Response(text);
      }
      this.#preparedHeaders = {};
    }
    this.#preparedHeaders["content-type"] = TEXT_PLAIN;
    if (typeof arg === "number") {
      return this.#newResponse(text, arg, headers);
    }
    return this.#newResponse(text, arg);
  };
  json = (object, arg, headers) => {
    const body = JSON.stringify(object);
    this.#preparedHeaders ??= {};
    this.#preparedHeaders["content-type"] = "application/json";
    return typeof arg === "number" ? this.#newResponse(body, arg, headers) : this.#newResponse(body, arg);
  };
  html = (html, arg, headers) => {
    this.#preparedHeaders ??= {};
    this.#preparedHeaders["content-type"] = "text/html; charset=UTF-8";
    if (typeof html === "object") {
      return resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then((html2) => {
        return typeof arg === "number" ? this.#newResponse(html2, arg, headers) : this.#newResponse(html2, arg);
      });
    }
    return typeof arg === "number" ? this.#newResponse(html, arg, headers) : this.#newResponse(html, arg);
  };
  redirect = (location, status) => {
    this.#headers ??= new Headers;
    this.#headers.set("Location", String(location));
    return this.newResponse(null, status ?? 302);
  };
  notFound = () => {
    this.#notFoundHandler ??= () => new Response;
    return this.#notFoundHandler(this);
  };
};

// node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
};

// node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = (c) => {
  return c.text("404 Not Found", 404);
};
var errorHandler = (err, c) => {
  if ("getResponse" in err) {
    return err.getResponse();
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
};
var Hono = class {
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  router;
  getPath;
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  errorHandler = errorHandler;
  route(path, app) {
    const subApp = this.basePath(path);
    app.routes.map((r) => {
      let handler;
      if (app.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = async (c, next) => (await compose([], app.errorHandler)(c, () => r.handler(c, next))).res;
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler);
    });
    return this;
  }
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        replaceRequest = options.replaceRequest;
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = undefined;
      try {
        executionContext = c.executionCtx;
      } catch {}
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    };
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request, { env });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then((resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(new Request(/^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`, requestInit), Env, executionCtx);
  };
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, undefined, event.request.method));
    });
  };
};

// node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
var Node = class {
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== undefined) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some((k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR)) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new Node;
        if (name !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some((k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR)) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new Node;
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = class {
  #context = { varIndex: 0 };
  #root = new Node;
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0;; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1;i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1;j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== undefined) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== undefined) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/hono/dist/router/reg-exp-router/router.js
var emptyParam = [];
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(path === "*" ? "" : `^${path.replace(/\/\*$|([.\\+*[^\]$()])/g, (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)")}$`);
}
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie;
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map((route) => [!/\*|\/:/.test(route[0]), ...route]).sort(([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length);
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length;i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (;paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length;i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length;j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length;k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
function findMiddleware(middleware, path) {
  if (!middleware) {
    return;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return;
}
var RegExpRouter = class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach((p) => re.test(p) && routes[m][p].push([handler, paramCount]));
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length;i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match(method, path) {
    clearWildcardRegExpCache();
    const matchers = this.#buildAllMatchers();
    this.match = (method2, path2) => {
      const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
      const staticMatch = matcher[2][path2];
      if (staticMatch) {
        return staticMatch;
      }
      const match = path2.match(matcher[0]);
      if (!match) {
        return [[], emptyParam];
      }
      const index = match.indexOf("", 1);
      return [matcher[1][index], match];
    };
    return this.match(method, path);
  }
  #buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = undefined;
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]]));
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (;i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length;i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = undefined;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// node_modules/hono/dist/router/trie-router/node.js
var emptyParams = /* @__PURE__ */ Object.create(null);
var Node2 = class {
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length;i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (Object.keys(curNode.#children).includes(key)) {
        curNode = curNode.#children[key];
        const pattern2 = getPattern(p, nextP);
        if (pattern2) {
          possibleKeys.push(pattern2[1]);
        }
        continue;
      }
      curNode.#children[key] = new Node2;
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    const m = /* @__PURE__ */ Object.create(null);
    const handlerSet = {
      handler,
      possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
      score: this.#order
    };
    m[method] = handlerSet;
    curNode.#methods.push(m);
    return curNode;
  }
  #getHandlerSets(node, method, nodeParams, params) {
    const handlerSets = [];
    for (let i = 0, len = node.#methods.length;i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== undefined) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length;i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
    return handlerSets;
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    for (let i = 0, len = parts.length;i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length;j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              handlerSets.push(...this.#getHandlerSets(nextNode.#children["*"], method, node.#params));
            }
            handlerSets.push(...this.#getHandlerSets(nextNode, method, node.#params));
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length;k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              handlerSets.push(...this.#getHandlerSets(astNode, method, node.#params));
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          if (part === "") {
            continue;
          }
          const [key, name, matcher] = pattern;
          const child = node.#children[key];
          const restPathString = parts.slice(i).join("/");
          if (matcher instanceof RegExp) {
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              handlerSets.push(...this.#getHandlerSets(child, method, node.#params, params));
              if (Object.keys(child.#children).length) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              handlerSets.push(...this.#getHandlerSets(child, method, params, node.#params));
              if (child.#children["*"]) {
                handlerSets.push(...this.#getHandlerSets(child.#children["*"], method, params, node.#params));
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      curNodes = tempNodes.concat(curNodesQueue.shift() ?? []);
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2;
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length;i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};

// node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter, new TrieRouter]
    });
  }
};

// src/index.ts
var import_redis = __toESM(require_dist7(), 1);

// node_modules/hono/dist/utils/color.js
function getColorEnabled() {
  const { process: process2, Deno } = globalThis;
  const isNoColor = typeof Deno?.noColor === "boolean" ? Deno.noColor : process2 !== undefined ? "NO_COLOR" in process2?.env : false;
  return !isNoColor;
}

// node_modules/hono/dist/middleware/logger/index.js
var humanize = (times) => {
  const [delimiter, separator] = [",", "."];
  const orderTimes = times.map((v) => v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delimiter));
  return orderTimes.join(separator);
};
var time = (start) => {
  const delta = Date.now() - start;
  return humanize([delta < 1000 ? delta + "ms" : Math.round(delta / 1000) + "s"]);
};
var colorStatus = (status) => {
  const colorEnabled = getColorEnabled();
  if (colorEnabled) {
    switch (status / 100 | 0) {
      case 5:
        return `\x1B[31m${status}\x1B[0m`;
      case 4:
        return `\x1B[33m${status}\x1B[0m`;
      case 3:
        return `\x1B[36m${status}\x1B[0m`;
      case 2:
        return `\x1B[32m${status}\x1B[0m`;
    }
  }
  return `${status}`;
};
function log(fn, prefix, method, path, status = 0, elapsed) {
  const out = prefix === "<--" ? `${prefix} ${method} ${path}` : `${prefix} ${method} ${path} ${colorStatus(status)} ${elapsed}`;
  fn(out);
}
var logger = (fn = console.log) => {
  return async function logger2(c, next) {
    const { method, url } = c.req;
    const path = url.slice(url.indexOf("/", 8));
    log(fn, "<--", method, path);
    const start = Date.now();
    await next();
    log(fn, "-->", method, path, c.res.status, time(start));
  };
};

// node_modules/hono/dist/middleware/cors/index.js
var cors = (options) => {
  const defaults = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    allowHeaders: [],
    exposeHeaders: []
  };
  const opts = {
    ...defaults,
    ...options
  };
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  return async function cors2(c, next) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    const allowOrigin = findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.origin !== "*") {
      const existingVary = c.req.header("Vary");
      if (existingVary) {
        set("Vary", existingVary);
      } else {
        set("Vary", "Origin");
      }
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (opts.exposeHeaders?.length) {
      set("Access-Control-Expose-Headers", opts.exposeHeaders.join(","));
    }
    if (c.req.method === "OPTIONS") {
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      if (opts.allowMethods?.length) {
        set("Access-Control-Allow-Methods", opts.allowMethods.join(","));
      }
      let headers = opts.allowHeaders;
      if (!headers?.length) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headers = requestHeaders.split(/\s*,\s*/);
        }
      }
      if (headers?.length) {
        set("Access-Control-Allow-Headers", headers.join(","));
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c.res.headers.delete("Content-Length");
      c.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
  };
};

// node_modules/nodemailer/lib/nodemailer.js
var Mailer = require_mailer();
var shared = require_shared();
var SMTPPool = require_smtp_pool();
var SMTPTransport = require_smtp_transport();
var SendmailTransport = require_sendmail_transport();
var StreamTransport = require_stream_transport();
var JSONTransport = require_json_transport();
var SESTransport = require_ses_transport();
var nmfetch = require_fetch();
var packageData = require_package2();
var ETHEREAL_API = (process.env.ETHEREAL_API || "https://api.nodemailer.com").replace(/\/+$/, "");
var ETHEREAL_WEB = (process.env.ETHEREAL_WEB || "https://ethereal.email").replace(/\/+$/, "");
var ETHEREAL_API_KEY = (process.env.ETHEREAL_API_KEY || "").replace(/\s*/g, "") || null;
var ETHEREAL_CACHE = ["true", "yes", "y", "1"].includes((process.env.ETHEREAL_CACHE || "yes").toString().trim().toLowerCase());
var $createTransport = function(transporter, defaults) {
  let urlConfig;
  let options;
  let mailer;
  if (typeof transporter === "object" && typeof transporter.send !== "function" || typeof transporter === "string" && /^(smtps?|direct):/i.test(transporter)) {
    if (urlConfig = typeof transporter === "string" ? transporter : transporter.url) {
      options = shared.parseConnectionUrl(urlConfig);
    } else {
      options = transporter;
    }
    if (options.pool) {
      transporter = new SMTPPool(options);
    } else if (options.sendmail) {
      transporter = new SendmailTransport(options);
    } else if (options.streamTransport) {
      transporter = new StreamTransport(options);
    } else if (options.jsonTransport) {
      transporter = new JSONTransport(options);
    } else if (options.SES) {
      transporter = new SESTransport(options);
    } else {
      transporter = new SMTPTransport(options);
    }
  }
  mailer = new Mailer(transporter, options, defaults);
  return mailer;
};

// src/controllers/sendEmail.ts
var transporter = $createTransport({
  host: process.env.BREVO_HOST,
  port: process.env.BREVO_POST,
  auth: {
    user: process.env.BREVO_LOGIN,
    pass: process.env.BREVO_PASS
  }
});

// src/index.ts
var app = new Hono2;
var redis = import_redis.createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASS,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT)
  }
});
redis.on("error", (err) => console.error("Redis Client Error", err));
redis.on("connect", () => console.log("Connected to Redis"));
redis.on("ready", () => console.log("Redis is ready to accept commands"));
redis.on("reconnecting", () => console.log("Reconnecting to Redis..."));
var connectRedis = async () => {
  try {
    await redis.connect();
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
    setTimeout(connectRedis, 5000);
  }
};
connectRedis();
app.use("*", logger());
app.use("*", cors());
app.get("/", (c) => {
  return c.json({
    message: "Welcome to Hono API with Bun and Redis Cloud!",
    status: "running"
  });
});
app.get("/api/redis/health", async (c) => {
  try {
    const ping = await redis.ping();
    return c.json({ status: "connected", ping });
  } catch (error) {
    return c.json({ status: "disconnected", error: error.message }, 500);
  }
});
app.post("/api/request", async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;
    if (email === undefined) {
      return c.json({ error: "Email is required" }, 400);
    }
    const otp = Math.floor(1e4 + Math.random() * 90000);
    const email_exist = await redis.exists(email);
    if (email_exist === 0) {
      await transporter.sendMail({
        from: '"Memora" <dabresharian@gmail.com>',
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is: ${otp}`
      });
      await redis.set(email, otp, { EX: 60 });
      return c.json({ result: true, error: null }, 200);
    }
    return c.json({ result: false, error: "otp already sent!" }, 200);
  } catch (error) {
    return c.json({ result: false, error: error.message }, 500);
  }
});
app.post("/api/validate", async (c) => {
  try {
    const body = await c.req.json();
    const { email, otp } = body;
    if (email === undefined) {
      return c.json({ error: "Email is required" }, 400);
    }
    const val_otp = await redis.get(email);
    if (parseInt(val_otp) !== parseInt(otp)) {
      return c.json({ result: false, error: "otp is invalid" }, 200);
    }
    await redis.del(email);
    return c.json({ result: true, error: null }, 200);
  } catch (error) {
    return c.json({ result: false, error: error.message }, 500);
  }
});
process.on("SIGINT", async () => {
  console.log("Closing Redis connection...");
  try {
    if (redis.isOpen) {
      await redis.quit();
    }
  } catch (err) {
    console.error("Error during Redis shutdown:", err.message);
  } finally {
    process.exit(0);
  }
});
var port = process.env.PORT || 3000;
console.log(`Server is running on http://localhost:${port}`);
var src_default = app;
export {
  src_default as default
};
