"use client";

import { useState } from "react";

type DialogueLine = {
  speaker: "A" | "B";
  en: string;
  ko: string;
};

type ExpressionItem = {
  num: string;
  expr: string;
  meaning: string;
};

type RoutineTheme = {
  id: string;
  chipLabel: string;
  step1Title: string;
  dialogues: DialogueLine[];
  essayKo: string;
  essayEn: string;
  expressions: ExpressionItem[];
  missionEn: string;
};

const PRESET_THEMES: Record<string, RoutineTheme> = {
  coffee: {
    id: "coffee",
    chipLabel: "☕ 커피 한 잔과 아침 산책",
    step1Title: "A Cup of Coffee and a Morning Walk - 커피 한 잔과 아침 산책",
    dialogues: [
      {
        speaker: "A",
        en: "Are you ready for our morning walk?",
        ko: "(아침 산책 갈 준비 됐어?)",
      },
      {
        speaker: "B",
        en: "Almost! Let me grab my tumbler first.",
        ko: "(거의 다 됐어! 텀블러 먼저 챙길게.)",
      },
      {
        speaker: "A",
        en: "It feels so refreshing outside today.",
        ko: "(오늘 밖에 나오니 정말 상쾌하다.)",
      },
      {
        speaker: "B",
        en: "Exactly! It's a perfect day for a quiet stroll.",
        ko: "(그러게! 조용히 산책하기 딱 좋은 날이야.)",
      },
    ],
    essayKo:
      "따뜻한 커피 한 잔과 짧은 산책이 나의 하루를 완성합니다. 소소한 순간도 특별한 이야기가 됩니다.",
    essayEn:
      "A warm cup of coffee and a short walk make my day complete. Even small moments become special stories.",
    expressions: [
      {
        num: "1)",
        expr: "Let me grab ~",
        meaning: "~을 얼른 챙길게 / 집어 들다",
      },
      {
        num: "2)",
        expr: "It feels refreshing.",
        meaning: "기분이 상쾌해 (날씨·공기가 상쾌할 때)",
      },
      {
        num: "3)",
        expr: "It's a perfect day for ~",
        meaning: "~하기에 딱 좋은 날이야 (a quiet stroll: 한적한 산책)",
      },
    ],
    missionEn:
      "It's a perfect day for a quiet walk with a warm cup of coffee.",
  },
  birthday: {
    id: "birthday",
    chipLabel: "🎂 남편/가족 생일 파티",
    step1Title: "A Special Birthday Dinner - 남편/가족 생일 파티",
    dialogues: [
      {
        speaker: "A",
        en: "Happy birthday! I made hot seaweed soup for you.",
        ko: "(생일 축하해! 따뜻하게 미역국을 끓였어.)",
      },
      {
        speaker: "B",
        en: "Wow, it smells amazing! You really didn't have to.",
        ko: "(와, 냄새 정말 좋다! 뭘 이런 걸 다 준비했어.)",
      },
      {
        speaker: "A",
        en: "Make a wish before you blow out the candles.",
        ko: "(촛불 끄기 전에 소원부터 빌어봐.)",
      },
      {
        speaker: "B",
        en: "Thank you for making my birthday so special.",
        ko: "(내 생일을 이렇게 특별하게 만들어 줘서 고마워.)",
      },
    ],
    essayKo:
      "정성껏 끓인 미역국 한 그릇과 작은 케이크로 따뜻한 생일 저녁을 보냈습니다. 가족의 웃음소리가 집 안을 가득 채웁니다.",
    essayEn:
      "We had a warm birthday dinner with a bowl of seaweed soup and a small cake. Our family's laughter filled the house.",
    expressions: [
      {
        num: "1)",
        expr: "Happy birthday!",
        meaning: "생일 축하해!",
      },
      {
        num: "2)",
        expr: "You really didn't have to.",
        meaning: "이러지 않아도 되는데 / 뭘 이런 걸 다 준비했어",
      },
      {
        num: "3)",
        expr: "seaweed soup",
        meaning: "미역국 (make seaweed soup: 미역국을 끓이다)",
      },
    ],
    missionEn:
      "Thank you for making my birthday so warm and special today.",
  },
  brunch: {
    id: "brunch",
    chipLabel: "🍳 주말 아침 메뉴 정하기",
    step1Title: "Choosing Our Weekend Brunch - 주말 아침 메뉴 정하기",
    dialogues: [
      {
        speaker: "A",
        en: "What are you in the mood for this morning?",
        ko: "(오늘 아침에는 뭐 먹고 싶어?)",
      },
      {
        speaker: "B",
        en: "How about making some fluffy pancakes and scrambled eggs?",
        ko: "(폭신한 팬케이크랑 스크램블드에그 만들어 먹는 거 어때?)",
      },
      {
        speaker: "A",
        en: "Sounds delicious! I'll brew some fresh coffee right now.",
        ko: "(맛있겠다! 내가 지금 바로 신선한 커피 내릴게.)",
      },
      {
        speaker: "B",
        en: "Lazy weekend mornings like this are the best.",
        ko: "(이렇게 여유로운 주말 아침이 제일 좋아.)",
      },
    ],
    essayKo:
      "느긋하게 일어난 주말 아침, 함께 메뉴를 고르고 브런치를 준비하는 시간이 참 행복합니다. 향긋한 커피 향이 주방에 퍼집니다.",
    essayEn:
      "On a slow weekend morning, choosing a menu and making brunch together makes me happy. The aroma of fresh coffee fills the kitchen.",
    expressions: [
      {
        num: "1)",
        expr: "What are you in the mood for?",
        meaning: "뭐 먹고 싶어? / 무엇이 끌려?",
      },
      {
        num: "2)",
        expr: "How about + -ing ~?",
        meaning: "~하는 게 어때? (가볍게 제안할 때)",
      },
      {
        num: "3)",
        expr: "brew some fresh coffee",
        meaning: "신선한 커피를 내리다",
      },
    ],
    missionEn:
      "Lazy weekend mornings with homemade brunch and coffee are the best.",
  },
  dog: {
    id: "dog",
    chipLabel: "🐕 강아지 산책과 공원",
    step1Title: "Walking the Dog in the Park - 강아지 산책과 공원",
    dialogues: [
      {
        speaker: "A",
        en: "Look how excited Coco is to go to the park!",
        ko: "(코코가 공원 간다고 신난 것 좀 봐!)",
      },
      {
        speaker: "B",
        en: "Did you bring the leash and some dog treats?",
        ko: "(목줄이랑 강아지 간식은 챙겼어?)",
      },
      {
        speaker: "A",
        en: "Of course! She loves running around on the grass.",
        ko: "(그럼! 잔디밭에서 뛰어노는 걸 정말 좋아하잖아.)",
      },
      {
        speaker: "B",
        en: "Watching her run makes me smile every time.",
        ko: "(신나게 뛰는 모습을 보면 볼 때마다 미소가 지어져.)",
      },
    ],
    essayKo:
      "강아지와 함께 초록빛 공원을 걸으면 하루의 피로가 눈 녹듯 사라집니다. 꼬리를 흔들며 반겨주는 작은 친구 덕분에 마음이 따뜻해집니다.",
    essayEn:
      "Walking in the green park with my dog melts away all the stress of the day. My heart feels warm thanks to my little friend wagging her tail.",
    expressions: [
      {
        num: "1)",
        expr: "walk the dog",
        meaning: "강아지를 산책시키다",
      },
      {
        num: "2)",
        expr: "leash / dog treats",
        meaning: "목줄 / 강아지 간식",
      },
      {
        num: "3)",
        expr: "run around on the grass",
        meaning: "잔디밭에서 신나게 뛰어놀다",
      },
    ],
    missionEn:
      "Walking in the park with my dog always puts a big smile on my face.",
  },
  library: {
    id: "library",
    chipLabel: "📚 도서관과 조용한 공부",
    step1Title: "Quiet Study Time at the Library - 도서관과 조용한 공부",
    dialogues: [
      {
        speaker: "A",
        en: "Let's find a quiet seat by the window.",
        ko: "(창가 쪽에 조용한 자리를 찾아보자.)",
      },
      {
        speaker: "B",
        en: "Great idea. The natural light here helps me focus.",
        ko: "(좋은 생각이야. 여긴 햇살이 잘 들어서 집중이 잘 돼.)",
      },
      {
        speaker: "A",
        en: "I'm going to read two chapters of this English book today.",
        ko: "(오늘은 이 영어책 두 챕터를 읽어보려고 해.)",
      },
      {
        speaker: "B",
        en: "Little by little, our daily study habit is paying off.",
        ko: "(조금씩이지만, 매일 공부하는 습관이 빛을 발하고 있어.)",
      },
    ],
    essayKo:
      "창가로 햇살이 들어오는 조용한 도서관에 앉아 영어 노트를 펼쳤습니다. 매일 조금씩 쌓이는 노력이 나를 더 넓은 세상으로 이끌어 줍니다.",
    essayEn:
      "Sitting in a quiet library with sunlight streaming through the window, I opened my English notebook. Small daily efforts lead me to a wider world.",
    expressions: [
      {
        num: "1)",
        expr: "a seat by the window",
        meaning: "창가 쪽 자리",
      },
      {
        num: "2)",
        expr: "help me focus",
        meaning: "집중하는 데 도움이 되다",
      },
      {
        num: "3)",
        expr: "pay off",
        meaning: "(노력·습관이) 결실을 맺다, 보람이 있다",
      },
    ],
    missionEn:
      "Little by little, my daily English study habit is really paying off.",
  },
  rain: {
    id: "rain",
    chipLabel: "🌧️ 차분한 빗소리와 차 한 잔",
    step1Title: "Rainy Morning: 차분한 빗소리와 따뜻한 차 한 잔",
    dialogues: [
      {
        speaker: "A",
        en: "Listen to the rain tapping on the window.",
        ko: "(창문을 두드리는 빗소리 좀 들어봐.)",
      },
      {
        speaker: "B",
        en: "It's so calming. I think I'll make a warm cup of herbal tea.",
        ko: "(정말 마음이 차분해진다. 따뜻한 허브차 한 잔 끓여 마셔야겠어.)",
      },
      {
        speaker: "A",
        en: "Good idea. Don't forget your umbrella if you step outside later.",
        ko: "(좋은 생각이야. 이따 밖에 나갈 때 우산 챙기는 거 잊지 마.)",
      },
      {
        speaker: "B",
        en: "I might just stay cozy indoors all morning.",
        ko: "(아침 내내 집에서 아늑하게 있으려고 해.)",
      },
    ],
    essayKo:
      "창밖으로 내리는 빗소리를 들으며 따뜻한 차를 마십니다. 흐린 날씨가 주는 특유의 아늑함이 마음에 여유를 채워줍니다.",
    essayEn:
      "Listening to the sound of rain outside with a warm cup of tea brings quiet comfort to my morning.",
    expressions: [
      {
        num: "1)",
        expr: "tap on the window",
        meaning: "창문을 톡톡 두드리다",
      },
      {
        num: "2)",
        expr: "calming",
        meaning: "마음을 차분하게 해주는",
      },
      {
        num: "3)",
        expr: "stay cozy indoors",
        meaning: "실내에서 아늑하게 머물다",
      },
    ],
    missionEn: "Listening to the rain brings quiet comfort to my morning.",
  },
  snow: {
    id: "snow",
    chipLabel: "❄️ 설레는 첫눈의 순간",
    step1Title: "The First Snow: 설레는 첫눈의 순간",
    dialogues: [
      {
        speaker: "A",
        en: "Look outside! The first snow of the year is falling.",
        ko: "(밖을 봐! 올해 첫눈이 내리고 있어.)",
      },
      {
        speaker: "B",
        en: "Oh, wow! It looks like a winter fairy tale out there.",
        ko: "(와, 세상에! 밖이 꼭 겨울 동화 속 같아.)",
      },
      {
        speaker: "A",
        en: "Bundle up warm if you're heading out today.",
        ko: "(오늘 외출할 거면 따뜻하게 챙겨 입어.)",
      },
      {
        speaker: "B",
        en: "Absolutely, I'll put on my thickest coat and gloves.",
        ko: "(그럼, 제일 두꺼운 코트랑 장갑 챙겨 입어야지.)",
      },
    ],
    essayKo:
      "하얗게 내리는 첫눈을 바라보며 겨울의 시작을 느낍니다. 차가운 공기 속에서도 마음 한구석은 설렘으로 따뜻해집니다.",
    essayEn:
      "Watching the pure white first snow fall gently makes me welcome the peaceful start of winter.",
    expressions: [
      {
        num: "1)",
        expr: "the first snow",
        meaning: "첫눈",
      },
      {
        num: "2)",
        expr: "bundle up warm",
        meaning: "따뜻하게 챙겨 입다",
      },
      {
        num: "3)",
        expr: "fairy tale",
        meaning: "동화 같은 풍경",
      },
    ],
    missionEn: "Bundle up warm if you're heading out today.",
  },
  barre: {
    id: "barre",
    chipLabel: "🩰 바른 자세와 코어의 힘",
    step1Title: "Barre Fitness: 바른 자세와 코어의 힘",
    dialogues: [
      {
        speaker: "A",
        en: "Are you going to your Barre class this morning?",
        ko: "(오늘 아침에 바레 수업 가?)",
      },
      {
        speaker: "B",
        en: "Yes, focusing on my posture and core gives me so much energy.",
        ko: "(응, 자세 정렬이랑 코어에 집중하고 나면 활력이 정말 넘쳐.)",
      },
      {
        speaker: "A",
        en: "It looks graceful, but I hear it burns a lot of energy.",
        ko: "(우아해 보이는데, 운동량이 꽤 많다면서?)",
      },
      {
        speaker: "B",
        en: "Definitely! My muscles shake during the pulses, but it feels wonderful.",
        ko: "(맞아! 펄스 동작 할 때 다리가 후들거리지만 정말 개운해.)",
      },
    ],
    essayKo:
      "내 몸의 바른 정렬에 집중하며 땀을 흘립니다. 작은 근육 하나하나를 깨우는 시간은 나를 돌보는 가장 건강한 루틴입니다.",
    essayEn:
      "Focusing on my posture and balance helps me feel centered, strong, and refreshed.",
    expressions: [
      {
        num: "1)",
        expr: "focus on posture",
        meaning: "자세 정렬에 집중하다",
      },
      {
        num: "2)",
        expr: "feel centered",
        meaning: "중심이 잡히고 차분해지다",
      },
      {
        num: "3)",
        expr: "refreshing workout",
        meaning: "개운한 운동",
      },
    ],
    missionEn: "Focusing on my posture and core gives me so much energy.",
  },
  bakery: {
    id: "bakery",
    chipLabel: "🥐 향긋한 빵 냄새와 주말 브런치",
    step1Title: "Weekend Drive & Bakery Cafe: 향긋한 빵 냄새와 주말 브런치",
    dialogues: [
      {
        speaker: "A",
        en: "Let's drive out to that new bakery cafe by the river.",
        ko: "(강변에 새로 생긴 베이커리 카페로 드라이브 갈까?)",
      },
      {
        speaker: "B",
        en: "Great idea! I can already smell the freshly baked bread.",
        ko: "(좋은 생각이야! 벌써 갓 구운 빵 냄새가 나는 것 같아.)",
      },
      {
        speaker: "A",
        en: "We should grab a window seat with a nice view.",
        ko: "(경치 좋은 창가 자리로 잡자.)",
      },
      {
        speaker: "B",
        en: "Perfect. A warm latte and a crisp pastry will make my day.",
        ko: "(완벽해. 따뜻한 라떼랑 바삭한 페이스트리면 오늘 하루 최고지.)",
      },
    ],
    essayKo:
      "한적한 도로를 달려 도착한 베이커리 카페에서 갓 구운 빵과 커피를 즐깁니다. 소소한 드라이브가 주말의 풍경을 환하게 밝힙니다.",
    essayEn:
      "Enjoying freshly baked pastries and warm coffee at a scenic cafe makes the weekend feel special.",
    expressions: [
      {
        num: "1)",
        expr: "freshly baked bread",
        meaning: "갓 구운 빵",
      },
      {
        num: "2)",
        expr: "grab a window seat",
        meaning: "창가 자리를 잡다",
      },
      {
        num: "3)",
        expr: "scenic cafe",
        meaning: "전망 좋은 카페",
      },
    ],
    missionEn: "A warm latte and a crisp pastry will make my day.",
  },
  japan: {
    id: "japan",
    chipLabel: "✈️ 골목길 탐방과 현지 맛집",
    step1Title: "A Trip to Japan: 골목길 탐방과 현지 맛집",
    dialogues: [
      {
        speaker: "A",
        en: "Are you ready to explore the local alleys and try some authentic ramen?",
        ko: "(골목길 구경하고 현지 라멘 먹으러 갈 준비 됐어?)",
      },
      {
        speaker: "B",
        en: "Absolutely! I can't wait to soak in the atmosphere.",
        ko: "(물론이지! 현지 분위기를 온전히 느껴보고 싶어.)",
      },
      {
        speaker: "A",
        en: "Let's take the subway first. It's much easier to get around.",
        ko: "(먼저 지하철 타자. 돌아다니기 훨씬 편할 거야.)",
      },
      {
        speaker: "B",
        en: "Sounds like a plan. Don't forget your transit card!",
        ko: "(좋은 생각이야. 교통카드 챙기는 거 잊지 마!)",
      },
    ],
    essayKo:
      "낯선 골목을 걷고 따뜻한 한 그릇을 마주할 때, 여행의 설렘은 일상의 모든 피로를 잊게 만듭니다.",
    essayEn:
      "Walking down unfamiliar quiet alleys and tasting local food makes every moment of travel unforgettable.",
    expressions: [
      {
        num: "1)",
        expr: "soak in the atmosphere",
        meaning: "분위기를 만끽하다",
      },
      {
        num: "2)",
        expr: "get around",
        meaning: "이곳저곳 이동하다",
      },
      {
        num: "3)",
        expr: "authentic local food",
        meaning: "현지 정통 음식",
      },
    ],
    missionEn: "I can't wait to soak in the atmosphere!",
  },
  momTrip: {
    id: "momTrip",
    chipLabel: "🚂 엄마, 언니와 함께하는 여행",
    step1Title: "Three Generations Trip: 엄마, 언니와 함께하는 따뜻한 여행",
    dialogues: [
      {
        speaker: "A",
        en: "I'm so excited for our weekend trip with Mom and my sister.",
        ko: "(엄마랑 언니랑 같이 가는 주말여행 너무 기대돼.)",
      },
      {
        speaker: "B",
        en: "That's wonderful. Did you pack comfortable walking shoes for Mom?",
        ko: "(정말 좋겠다. 엄마 편한 운동화는 챙겼어?)",
      },
      {
        speaker: "A",
        en: "Yes, and we planned a relaxed itinerary without rushing.",
        ko: "(응, 서두르지 않고 여유롭게 둘러보는 코스로 짰어.)",
      },
      {
        speaker: "B",
        en: "Taking family photos along the way will leave such beautiful memories.",
        ko: "(가면서 가족사진 많이 찍어두면 예쁜 추억이 되겠네.)",
      },
    ],
    essayKo:
      "엄마의 손을 잡고 언니와 도란도란 이야기를 나누며 걷는 길. 가족과 함께 나누는 시간은 삶의 가장 큰 선물입니다.",
    essayEn:
      "Traveling slowly with my mother and sister creates precious memories that warm our hearts forever.",
    expressions: [
      {
        num: "1)",
        expr: "relaxed itinerary",
        meaning: "여유로운 여행 일정",
      },
      {
        num: "2)",
        expr: "without rushing",
        meaning: "서두르지 않고",
      },
      {
        num: "3)",
        expr: "precious memories",
        meaning: "소중한 추억들",
      },
    ],
    missionEn: "We planned a relaxed itinerary without rushing.",
  },
  friends: {
    id: "friends",
    chipLabel: "💬 오랜 친구들과의 반가운 수다",
    step1Title: "Day Out with Friends: 오랜 친구들과의 반가운 수다",
    dialogues: [
      {
        speaker: "A",
        en: "It's been too long since we all had lunch together.",
        ko: "(우리 다 같이 점심 먹은 지 정말 오래됐다.)",
      },
      {
        speaker: "B",
        en: "I know! We have so much catching up to do.",
        ko: "(그러게 말이야! 그동안 밀린 이야기가 너무 많아.)",
      },
      {
        speaker: "A",
        en: "Time always flies when we're laughing and talking.",
        ko: "(우리 웃고 떠들다 보면 시간 진짜 금방 가.)",
      },
      {
        speaker: "B",
        en: "That's the best part of meeting lifelong friends.",
        ko: "(그게 바로 오랜 친구를 만나는 최고의 즐거움이지.)",
      },
    ],
    essayKo:
      "오랜 친구들과 마주 앉아 편안하게 웃고 대화하는 오후. 마음 터놓을 친구가 있다는 것만으로도 하루가 충만해집니다.",
    essayEn:
      "Catching up with close friends brings pure joy and fills my day with warm laughter.",
    expressions: [
      {
        num: "1)",
        expr: "catch up with ~",
        meaning: "(밀린 이야기를 나누며) 안부를 주고받다",
      },
      {
        num: "2)",
        expr: "time flies",
        meaning: "시간이 쏜살같이 흐르다",
      },
      {
        num: "3)",
        expr: "lifelong friends",
        meaning: "평생의 친구들",
      },
    ],
    missionEn: "Time always flies when we're laughing and talking.",
  },
  delivery: {
    id: "delivery",
    chipLabel: "📦 신선한 식재료로 채우는 냉장고",
    step1Title: "Early Morning Delivery: 신선한 식재료로 채우는 냉장고",
    dialogues: [
      {
        speaker: "A",
        en: "Did the early morning grocery delivery arrive safely?",
        ko: "(새벽 배송 식료품 잘 도착했어?)",
      },
      {
        speaker: "B",
        en: "Yes, the box was outside by 6 AM. The vegetables are super fresh.",
        ko: "(응, 아침 6시에 문 앞에 와 있더라. 야채가 진짜 싱싱해.)",
      },
      {
        speaker: "A",
        en: "Perfect! What about the fresh meat and milk?",
        ko: "(다행이다! 고기랑 우유도 잘 왔어?)",
      },
      {
        speaker: "B",
        en: "Everything is packed neatly with ice packs. I'll unpack and put them in the fridge right away.",
        ko: "(아이스팩이랑 깔끔하게 포장되어 있어. 바로 정리해서 냉장고에 넣을게.)",
      },
    ],
    essayKo:
      "이른 아침 문 앞에 도착한 신선한 식재료를 정리합니다. 가족을 위해 건강하고 맛있는 식사를 준비하는 기분 좋은 시작입니다.",
    essayEn:
      "Unpacking fresh groceries in the quiet morning feels like the beginning of a wholesome, healthy day.",
    expressions: [
      {
        num: "1)",
        expr: "early morning delivery",
        meaning: "새벽 배송",
      },
      {
        num: "2)",
        expr: "super fresh",
        meaning: "정말 신선한",
      },
      {
        num: "3)",
        expr: "unpack groceries",
        meaning: "장본 식재료를 정리하다",
      },
    ],
    missionEn: "I'll unpack and put them in the fridge right away.",
  },
  familyGathering: {
    id: "familyGathering",
    chipLabel: "🍽️ 온 가족이 둘러앉은 풍성한 저녁",
    step1Title: "Family Gathering: 온 가족이 둘러앉은 풍성한 저녁",
    dialogues: [
      {
        speaker: "A",
        en: "Everyone is gathering at our place for dinner tonight.",
        ko: "(오늘 저녁에 다들 우리 집에 모이기로 했어.)",
      },
      {
        speaker: "B",
        en: "Sounds exciting! Do we have enough seats and dishes ready?",
        ko: "(신난다! 자리랑 그릇은 넉넉하게 준비됐어?)",
      },
      {
        speaker: "A",
        en: "Yes, I set the dining table and prepared a hearty meal.",
        ko: "(응, 식탁 세팅해 두고 든든하게 요리도 준비해 뒀어.)",
      },
      {
        speaker: "B",
        en: "Having the whole family around the table is always the happiest time.",
        ko: "(온 가족이 식탁에 둘러앉는 시간이 제일 행복해.)",
      },
    ],
    essayKo:
      "도란도란 둘러앉아 맛있는 음식을 나누는 식탁. 가족의 웃음소리가 집안 가득 온기를 채워줍니다.",
    essayEn:
      "Sharing a delicious homemade meal with the whole family fills the house with laughter and love.",
    expressions: [
      {
        num: "1)",
        expr: "family gathering",
        meaning: "가족 모임",
      },
      {
        num: "2)",
        expr: "hearty meal",
        meaning: "푸짐하고 든든한 식사",
      },
      {
        num: "3)",
        expr: "set the dining table",
        meaning: "식탁을 차리다",
      },
    ],
    missionEn:
      "Having the whole family around the table is always the happiest time.",
  },
};

const CHIP_ORDER = ["coffee", "birthday", "brunch", "dog", "library"] as const;

function buildRoutineFromKeyword(rawKeyword: string): RoutineTheme {
  const kw = rawKeyword.trim();
  if (!kw) return PRESET_THEMES.coffee;

  // 1. 비, 비 오는 날, 우산, 빗소리
  if (
    kw.includes("비 오는 날") ||
    kw.includes("비오는날") ||
    kw.includes("비 오는") ||
    kw.includes("비오는") ||
    kw.includes("우산") ||
    kw.includes("빗소리") ||
    kw === "비" ||
    /(^|\s)비($|\s|가|올|오|내)/.test(kw)
  ) {
    return PRESET_THEMES.rain;
  }

  // 2. 첫눈, 눈, 겨울, 하얀 눈
  if (
    kw.includes("첫눈") ||
    kw.includes("하얀 눈") ||
    kw.includes("하얀눈") ||
    kw.includes("겨울") ||
    kw.includes("함박눈") ||
    kw.includes("눈사람") ||
    kw === "눈" ||
    /(^|\s)눈($|\s|이|오|내)/.test(kw)
  ) {
    return PRESET_THEMES.snow;
  }

  // 3. 바레, 운동, 스트레칭, 자세
  if (
    kw.includes("바레") ||
    kw.includes("운동") ||
    kw.includes("스트레칭") ||
    kw.includes("자세")
  ) {
    return PRESET_THEMES.barre;
  }

  // 5. 일본, 일본여행, 도쿄, 오사카, 삿포로, 라멘
  if (
    kw.includes("일본") ||
    kw.includes("도쿄") ||
    kw.includes("오사카") ||
    kw.includes("삿포로") ||
    kw.includes("라멘")
  ) {
    return PRESET_THEMES.japan;
  }

  // 6. 엄마, 언니, 모녀여행, 가족여행, 국내여행, 기차
  if (
    kw.includes("엄마") ||
    kw.includes("언니") ||
    kw.includes("모녀여행") ||
    kw.includes("모녀 여행") ||
    kw.includes("가족여행") ||
    kw.includes("가족 여행") ||
    kw.includes("국내여행") ||
    kw.includes("국내 여행") ||
    kw.includes("기차")
  ) {
    return PRESET_THEMES.momTrip;
  }

  // 8. 새벽배송, 장보기, 고기, 야채, 우유, 계란, 장바구니
  if (
    kw.includes("새벽배송") ||
    kw.includes("새벽 배송") ||
    kw.includes("장보기") ||
    kw.includes("고기") ||
    kw.includes("야채") ||
    kw.includes("우유") ||
    kw.includes("계란") ||
    kw.includes("장바구니")
  ) {
    return PRESET_THEMES.delivery;
  }

  // 기존 칩 테마: 남편/가족 생일 파티
  if (
    kw.includes("생일") ||
    kw.includes("남편") ||
    kw.includes("파티") ||
    kw.includes("미역국")
  ) {
    return PRESET_THEMES.birthday;
  }

  // 4. 드라이브, 베이커리, 카페, 브런치, 빵
  if (
    kw.includes("드라이브") ||
    kw.includes("베이커리") ||
    kw.includes("카페") ||
    kw.includes("브런치") ||
    kw.includes("빵")
  ) {
    return PRESET_THEMES.bakery;
  }

  // 기존 칩 테마: 주말 아침 메뉴 정하기
  if (
    kw.includes("아침 메뉴") ||
    kw.includes("메뉴") ||
    kw.includes("팬케이크")
  ) {
    return PRESET_THEMES.brunch;
  }

  // 9. 가족모임, 저녁, 외식, 식사
  if (
    kw.includes("가족모임") ||
    kw.includes("가족 모임") ||
    kw.includes("저녁") ||
    kw.includes("외식") ||
    kw.includes("식사")
  ) {
    return PRESET_THEMES.familyGathering;
  }

  // 7. 친구, 데이트, 수다, 모임, 점심
  if (
    kw.includes("친구") ||
    kw.includes("데이트") ||
    kw.includes("수다") ||
    kw.includes("모임") ||
    kw.includes("점심")
  ) {
    return PRESET_THEMES.friends;
  }

  // 기존 칩 테마: 강아지 산책과 공원
  if (
    kw.includes("강아지") ||
    kw.includes("반려견") ||
    kw.includes("공원") ||
    kw.includes("멍멍")
  ) {
    return PRESET_THEMES.dog;
  }

  // 기존 칩 테마: 도서관과 조용한 공부
  if (
    kw.includes("도서관") ||
    kw.includes("공부") ||
    kw.includes("독서") ||
    kw.includes("책")
  ) {
    return PRESET_THEMES.library;
  }

  // 10. 커피, 산책 (기본 테마)
  if (kw.includes("커피") || kw.includes("산책")) {
    return PRESET_THEMES.coffee;
  }

  return PRESET_THEMES.coffee;
}

export default function DailyRoutine() {
  const [currentTheme, setCurrentTheme] = useState<RoutineTheme>(
    PRESET_THEMES.coffee
  );
  const [keywordInput, setKeywordInput] = useState("");
  const [openSteps, setOpenSteps] = useState<Record<number, boolean>>({});
  const [writingText, setWritingText] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleStep = (step: number) => {
    setOpenSteps((prev) => ({
      ...prev,
      [step]: !prev[step],
    }));
  };

  const applyTheme = (theme: RoutineTheme) => {
    setCurrentTheme(theme);
    setShowAnswer(false);
    setWritingText("");
  };

  const handleChipClick = (themeKey: string) => {
    const theme = PRESET_THEMES[themeKey] ?? PRESET_THEMES.coffee;
    setKeywordInput(
      themeKey === "coffee" ? "" : theme.chipLabel.replace(/^[^\s]+\s/, "")
    );
    applyTheme(theme);
  };

  const handleGenerateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextTheme = buildRoutineFromKeyword(keywordInput);
    applyTheme(nextTheme);
    setOpenSteps({ 1: true, 2: true, 3: true });
  };

  const handleSpeak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Keyword Input & Recommended Chips Section */}
      <section className="p-5 sm:p-6 rounded-2xl border border-[#D5CABD] dark:border-[#4A3B32] bg-white/60 dark:bg-[#3E2723]/30 backdrop-blur-sm shadow-sm text-left space-y-4">
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-base sm:text-lg font-bold text-[#3E2723] dark:text-[#EFEBE9]">
            오늘의 일상 키워드를 들려주세요
          </h2>
          <p className="text-xs sm:text-sm text-[#795548] dark:text-[#BCAAA4]">
            나만의 소소한 하루가 맞춤형 영어 회화 루틴으로 바뀝니다.
          </p>
        </div>

        <form
          onSubmit={handleGenerateSubmit}
          className="flex flex-col sm:flex-row gap-2.5"
        >
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            placeholder="예: 남편 생일 저녁 준비, 주말 브런치 카페, 강아지 산책..."
            aria-label="일상 키워드 입력"
            className="flex-1 rounded-xl border border-[#D5CABD] dark:border-[#4A3B32] bg-white/80 dark:bg-[#1A1614]/60 px-4 py-2.5 text-sm text-[#3E2723] dark:text-[#EFEBE9] placeholder:text-[#A1887F] shadow-xs outline-none transition focus:border-[#1B4D3E] dark:focus:border-[#2D6A4F] focus:ring-3 focus:ring-[#1B4D3E]/15 dark:focus:ring-[#2D6A4F]/25"
          />
          <button
            type="submit"
            className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#1B4D3E] dark:bg-[#2D6A4F] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#153D31] active:scale-[0.99] cursor-pointer"
          >
            <span>30분 루틴 생성</span>
            <span>🪄</span>
          </button>
        </form>

        <div className="flex flex-wrap gap-2 pt-0.5">
          {CHIP_ORDER.map((key) => {
            const item = PRESET_THEMES[key];
            const isSelected = currentTheme.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleChipClick(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition cursor-pointer ${
                  isSelected
                    ? "bg-[#1B4D3E] dark:bg-[#2D6A4F] text-white border-[#1B4D3E] dark:border-[#2D6A4F] shadow-xs"
                    : "bg-[#F5F1E7]/80 dark:bg-[#1A1614]/50 text-[#5D4037] dark:text-[#D7CCC8] border-[#D5CABD] dark:border-[#4A3B32] hover:border-[#8D6E63] dark:hover:border-[#8D6E63]"
                }`}
              >
                {item.chipLabel}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3-Step Accordion Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
        {/* Card 1 Trigger */}
        <button
          type="button"
          onClick={() => toggleStep(1)}
          aria-expanded={!!openSteps[1]}
          className={`sm:order-1 w-full p-4 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
            openSteps[1]
              ? "border-[#1B4D3E] dark:border-[#2D6A4F] bg-white/80 dark:bg-[#3E2723]/50 shadow-md"
              : "border-[#D5CABD] dark:border-[#4A3B32] bg-white/50 dark:bg-[#3E2723]/30 shadow-sm hover:border-[#8D6E63] dark:hover:border-[#8D6E63]"
          }`}
        >
          <div className="flex items-start justify-between gap-2 w-full">
            <p className="text-sm font-bold text-[#3E2723] dark:text-[#EFEBE9]">
              Step 1. Speaking (15분)
            </p>
            <span
              className={`text-xs text-[#795548] dark:text-[#BCAAA4] transition-transform duration-200 shrink-0 mt-0.5 ${
                openSteps[1]
                  ? "rotate-180 text-[#1B4D3E] dark:text-[#52B788]"
                  : ""
              }`}
            >
              ▼
            </span>
          </div>
          <p className="text-xs text-[#795548] dark:text-[#BCAAA4] mt-1">
            일상 대화 티키타카
          </p>
        </button>

        {/* Card 1 Content */}
        <div
          className={`${
            openSteps[1] ? "block" : "hidden"
          } sm:order-4 sm:col-span-3 p-5 rounded-xl border border-[#D5CABD] dark:border-[#4A3B32] bg-white/75 dark:bg-[#3E2723]/40 shadow-sm space-y-4`}
        >
          <div className="border-b border-[#D5CABD]/70 dark:border-[#4A3B32] pb-2.5">
            <span className="text-[11px] font-bold text-[#1B4D3E] dark:text-[#52B788] uppercase tracking-wider">
              STEP 1 · SPEAKING
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#3E2723] dark:text-[#EFEBE9] mt-0.5">
              {currentTheme.step1Title}
            </h3>
          </div>

          <div className="space-y-3">
            {currentTheme.dialogues.map((line, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-[#F5F1E7]/70 dark:bg-[#1A1614]/50 border border-[#D5CABD]/60 dark:border-[#4A3B32]/60 space-y-1"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm sm:text-base font-semibold text-[#3E2723] dark:text-[#EFEBE9]">
                    <span className="text-[#1B4D3E] dark:text-[#52B788] font-bold mr-1.5">
                      {line.speaker}:
                    </span>
                    {line.en}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleSpeak(line.en)}
                    className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1B4D3E] dark:bg-[#2D6A4F] text-white text-xs font-semibold shadow-xs hover:bg-[#153D31] active:scale-95 transition cursor-pointer"
                  >
                    듣기 🔊
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-[#795548] dark:text-[#BCAAA4]">
                  {line.ko}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2 Trigger */}
        <button
          type="button"
          onClick={() => toggleStep(2)}
          aria-expanded={!!openSteps[2]}
          className={`sm:order-2 w-full p-4 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
            openSteps[2]
              ? "border-[#1B4D3E] dark:border-[#2D6A4F] bg-white/80 dark:bg-[#3E2723]/50 shadow-md"
              : "border-[#D5CABD] dark:border-[#4A3B32] bg-white/50 dark:bg-[#3E2723]/30 shadow-sm hover:border-[#8D6E63] dark:hover:border-[#8D6E63]"
          }`}
        >
          <div className="flex items-start justify-between gap-2 w-full">
            <p className="text-sm font-bold text-[#3E2723] dark:text-[#EFEBE9]">
              Step 2. Reading &amp; Writing (7분)
            </p>
            <span
              className={`text-xs text-[#795548] dark:text-[#BCAAA4] transition-transform duration-200 shrink-0 mt-0.5 ${
                openSteps[2]
                  ? "rotate-180 text-[#1B4D3E] dark:text-[#52B788]"
                  : ""
              }`}
            >
              ▼
            </span>
          </div>
          <p className="text-xs text-[#795548] dark:text-[#BCAAA4] mt-1">
            오늘의 1분 미니 에세이
          </p>
        </button>

        {/* Card 2 Content (Writing Challenge Mode) */}
        <div
          className={`${
            openSteps[2] ? "block" : "hidden"
          } sm:order-5 sm:col-span-3 p-5 rounded-xl border border-[#D5CABD] dark:border-[#4A3B32] bg-white/75 dark:bg-[#3E2723]/40 shadow-sm space-y-4`}
        >
          <div className="border-b border-[#D5CABD]/70 dark:border-[#4A3B32] pb-2">
            <span className="text-[11px] font-bold text-[#1B4D3E] dark:text-[#52B788] uppercase tracking-wider">
              STEP 2 · READING &amp; WRITING
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#3E2723] dark:text-[#EFEBE9] mt-0.5">
              오늘의 1분 미니 에세이
            </h3>
          </div>

          {/* 1. Korean Prompt First */}
          <div className="p-3.5 rounded-lg bg-[#F5F1E7]/70 dark:bg-[#1A1614]/50 border border-[#D5CABD]/60 dark:border-[#4A3B32]/60 space-y-1">
            <span className="text-[11px] font-semibold text-[#795548] dark:text-[#BCAAA4]">
              오늘의 한글 문장
            </span>
            <p className="text-sm sm:text-base font-semibold leading-relaxed text-[#3E2723] dark:text-[#EFEBE9] break-keep">
              &ldquo;{currentTheme.essayKo}&rdquo;
            </p>
          </div>

          {/* 2. User English Writing Textarea */}
          <div className="space-y-2">
            <textarea
              rows={3}
              value={writingText}
              onChange={(e) => setWritingText(e.target.value)}
              placeholder="한글을 보고 영어로 먼저 써보세요. (생각만 해보고 정답을 열어보셔도 좋아요!)"
              aria-label="영작 연습 입력란"
              className="w-full rounded-xl border border-[#D5CABD] dark:border-[#4A3B32] bg-white/80 dark:bg-[#1A1614]/60 px-3.5 py-2.5 text-sm text-[#3E2723] dark:text-[#EFEBE9] placeholder:text-[#A1887F] shadow-xs outline-none transition focus:border-[#1B4D3E] dark:focus:border-[#2D6A4F] focus:ring-3 focus:ring-[#1B4D3E]/15 dark:focus:ring-[#2D6A4F]/25 resize-y"
            />

            {/* 3. Toggle Answer Button */}
            <div>
              <button
                type="button"
                onClick={() => setShowAnswer((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#1B4D3E] dark:bg-[#2D6A4F] px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-xs transition hover:bg-[#153D31] active:scale-[0.99] cursor-pointer"
              >
                <span>정답 영문 확인하기 👁️</span>
              </button>
            </div>
          </div>

          {/* Answer Box */}
          <div
            className={`${
              showAnswer ? "block" : "hidden"
            } p-4 rounded-xl bg-[#F5F1E7] dark:bg-[#1A1614]/70 border border-[#1B4D3E]/30 dark:border-[#2D6A4F]/50 space-y-2.5 transition-all`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#1B4D3E] dark:text-[#52B788]">
                추천 영문 정답
              </span>
              <button
                type="button"
                onClick={() => handleSpeak(currentTheme.essayEn)}
                className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1B4D3E] dark:bg-[#2D6A4F] text-white text-xs font-semibold shadow-xs hover:bg-[#153D31] active:scale-95 transition cursor-pointer"
              >
                듣기 🔊
              </button>
            </div>
            <p className="text-sm sm:text-base font-semibold leading-relaxed text-[#3E2723] dark:text-[#EFEBE9]">
              &ldquo;{currentTheme.essayEn}&rdquo;
            </p>
          </div>
        </div>

        {/* Card 3 Trigger */}
        <button
          type="button"
          onClick={() => toggleStep(3)}
          aria-expanded={!!openSteps[3]}
          className={`sm:order-3 w-full p-4 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
            openSteps[3]
              ? "border-[#1B4D3E] dark:border-[#2D6A4F] bg-white/80 dark:bg-[#3E2723]/50 shadow-md"
              : "border-[#D5CABD] dark:border-[#4A3B32] bg-white/50 dark:bg-[#3E2723]/30 shadow-sm hover:border-[#8D6E63] dark:hover:border-[#8D6E63]"
          }`}
        >
          <div className="flex items-start justify-between gap-2 w-full">
            <p className="text-sm font-bold text-[#3E2723] dark:text-[#EFEBE9]">
              Step 3. Vocab &amp; Expression (8분)
            </p>
            <span
              className={`text-xs text-[#795548] dark:text-[#BCAAA4] transition-transform duration-200 shrink-0 mt-0.5 ${
                openSteps[3]
                  ? "rotate-180 text-[#1B4D3E] dark:text-[#52B788]"
                  : ""
              }`}
            >
              ▼
            </span>
          </div>
          <p className="text-xs text-[#795548] dark:text-[#BCAAA4] mt-1">
            오늘의 핵심 표현
          </p>
        </button>

        {/* Card 3 Content */}
        <div
          className={`${
            openSteps[3] ? "block" : "hidden"
          } sm:order-6 sm:col-span-3 p-5 rounded-xl border border-[#D5CABD] dark:border-[#4A3B32] bg-white/75 dark:bg-[#3E2723]/40 shadow-sm space-y-3`}
        >
          <div className="border-b border-[#D5CABD]/70 dark:border-[#4A3B32] pb-2">
            <span className="text-[11px] font-bold text-[#1B4D3E] dark:text-[#52B788] uppercase tracking-wider">
              STEP 3 · VOCAB &amp; EXPRESSION
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#3E2723] dark:text-[#EFEBE9] mt-0.5">
              오늘의 핵심 표현
            </h3>
          </div>
          <ul className="space-y-2.5">
            {currentTheme.expressions.map((item, idx) => (
              <li
                key={idx}
                className="p-3 rounded-lg bg-[#F5F1E7]/70 dark:bg-[#1A1614]/50 border border-[#D5CABD]/60 dark:border-[#4A3B32]/60 text-xs sm:text-sm text-[#3E2723] dark:text-[#EFEBE9]"
              >
                <span className="font-bold text-[#1B4D3E] dark:text-[#52B788] mr-1.5">
                  {item.num} {item.expr}
                </span>
                <span className="text-[#795548] dark:text-[#BCAAA4]">
                  : {item.meaning}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Today's Speaking Mission */}
      <div className="p-4 rounded-xl bg-[#3E2723] text-[#EFEBE9] dark:bg-[#1A1614] dark:border dark:border-[#3E2723] text-left font-mono text-xs sm:text-sm space-y-2 shadow-md">
        <div className="flex items-center justify-between text-[#BCAAA4] border-b border-[#5D4037] pb-2">
          <span className="font-bold text-[#EFEBE9]">
            Today&apos;s Speaking Mission
          </span>
          <span className="text-[11px] text-[#A1887F]">
            오늘의 한 줄 스피킹 미션
          </span>
        </div>
        <p className="text-amber-400 font-semibold text-sm sm:text-base select-all">
          &ldquo;{currentTheme.missionEn}&rdquo;
        </p>
        <p className="text-xs text-[#D7CCC8] font-sans">
          (소리 내어 3번 읽어보세요! 입술 근육이 기억합니다.)
        </p>
      </div>
    </div>
  );
}
