/* ==========================================================================
   감자 마켓 (Gamza Market) - 화면 1: 초기 상품 데이터 & 목록/필터 컨트롤러
   ========================================================================== */

(function () {
  'use strict';

  /**
   * 상품 카테고리별 커스텀 일러스트 SVG Data URI 생성기
   * 외부 네트워크 없이도 100% 깨지지 않는 고해상도 따뜻한 일러스트 카드 이미지 제공
   */
  function createProductSvgDataUri(config) {
    var bg1 = config.bg1 || '#F5EBE1';
    var bg2 = config.bg2 || '#E8D5C4';
    var accent = config.accent || '#8D5B4C';
    var subTitle = config.subTitle || 'GAMZA PICK';
    var label = config.label || '감자 마켓 추천';
    var artSvg = config.artSvg || '';

    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="640" height="480">' +
      '<defs>' +
      '<linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="' + bg1 + '"/>' +
      '<stop offset="100%" stop-color="' + bg2 + '"/>' +
      '</linearGradient>' +
      '<filter id="softShadow" x="-15%" y="-15%" width="130%" height="130%">' +
      '<feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#2C221E" flood-opacity="0.12"/>' +
      '</filter>' +
      '</defs>' +
      '<rect width="640" height="480" fill="url(#bgGrad)"/>' +
      '<circle cx="540" cy="80" r="110" fill="#FFFFFF" fill-opacity="0.32"/>' +
      '<circle cx="95" cy="400" r="130" fill="#FFFFFF" fill-opacity="0.25"/>' +
      '<g filter="url(#softShadow)">' +
      artSvg +
      '</g>' +
      '<rect x="28" y="412" width="160" height="36" rx="18" fill="#FFFFFF" fill-opacity="0.78"/>' +
      '<text x="108" y="435" font-family="Pretendard, Malgun Gothic, sans-serif" font-size="14" font-weight="700" fill="' + accent + '" text-anchor="middle">' +
      label +
      '</text>' +
      '<text x="610" y="436" font-family="Pretendard, Malgun Gothic, sans-serif" font-size="12" font-weight="700" fill="#6E5D54" fill-opacity="0.65" text-anchor="end">' +
      subTitle +
      '</text>' +
      '</svg>';

    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  /**
   * 판매자 프로필 아바타 SVG Data URI 생성기
   */
  function createAvatarSvgDataUri(nickname, bgHex, potatoTone) {
    var firstChar = (nickname || '감').charAt(0);
    var bg = bgHex || '#F3E9E4';
    var tone = potatoTone || '#C89D7C';

    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">' +
      '<rect width="120" height="120" rx="60" fill="' + bg + '"/>' +
      '<ellipse cx="60" cy="64" rx="34" ry="29" fill="' + tone + '"/>' +
      '<circle cx="48" cy="58" r="3.5" fill="#2C221E"/>' +
      '<circle cx="72" cy="58" r="3.5" fill="#2C221E"/>' +
      '<ellipse cx="42" cy="65" rx="5" ry="3" fill="#E57373" fill-opacity="0.55"/>' +
      '<ellipse cx="78" cy="65" rx="5" ry="3" fill="#E57373" fill-opacity="0.55"/>' +
      '<path d="M54 67 Q60 73 66 67" stroke="#2C221E" stroke-width="3" stroke-linecap="round" fill="none"/>' +
      '<circle cx="88" cy="30" r="16" fill="#FBC02D" stroke="#F5B82E" stroke-width="1.5"/>' +
      '<text x="88" y="35" font-family="Pretendard, Malgun Gothic, sans-serif" font-size="13" font-weight="800" fill="#2C221E" text-anchor="middle">' +
      firstChar +
      '</text>' +
      '</svg>';

    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  /* ------------------------------------------------------------------------
     1. 초기 가짜 중고 상품 6개 (window.GAMZA_INITIAL_PRODUCTS)
     - 상태 구성: 판매중 4개, 예약중 1개, 거래 완료 1개
     - 카테고리 구성: 디지털기기, 가구/인테리어, 생활가전, 의류, 도서/티켓, 기타
     ------------------------------------------------------------------------ */
  window.GAMZA_INITIAL_PRODUCTS = [
    {
      id: 'gamza-item-1',
      title: '키크론 K8 Pro 저소음 적축 무선 기계식 키보드 (풀박스)',
      category: '디지털기기',
      location: '서울 마포구 연남동',
      timeAgo: '12분 전',
      price: 95000,
      status: '판매중',
      description:
        '재택근무용으로 구매했다가 사무실 출근으로 전환되어 내놓습니다.\n\n' +
        '• 스위치: 저소음 적축 (윤활 완료, 도각도각 조용하고 구분감 좋습니다)\n' +
        '• 구성품: 본품, 정품 박스, 꼬임 방지 C타입 케이블, 키캡 리무버 모두 포함\n' +
        '• 상태: 키캡 번들거림 전혀 없고 배터리 효율 최상입니다.\n\n' +
        '연남동 경의선숲길 공원 인근에서 직거래 희망합니다!',
      image: createProductSvgDataUri({
        bg1: '#F3ECE3',
        bg2: '#DFCBB5',
        accent: '#6D4C41',
        label: '기계식 키보드',
        subTitle: 'KEYCHRON K8 PRO',
        artSvg:
          '<rect x="130" y="160" width="380" height="165" rx="22" fill="#3E3532" stroke="#2C221E" stroke-width="4"/>' +
          '<rect x="148" y="178" width="344" height="129" rx="12" fill="#2A2321"/>' +
          '<g fill="#F4EFE6">' +
          '<rect x="160" y="190" width="28" height="24" rx="5" fill="#FBC02D"/>' +
          '<rect x="194" y="190" width="28" height="24" rx="5"/>' +
          '<rect x="228" y="190" width="28" height="24" rx="5"/>' +
          '<rect x="262" y="190" width="28" height="24" rx="5"/>' +
          '<rect x="296" y="190" width="28" height="24" rx="5"/>' +
          '<rect x="330" y="190" width="28" height="24" rx="5"/>' +
          '<rect x="364" y="190" width="28" height="24" rx="5"/>' +
          '<rect x="398" y="190" width="28" height="24" rx="5"/>' +
          '<rect x="432" y="190" width="46" height="24" rx="5" fill="#8D5B4C"/>' +
          '<rect x="160" y="222" width="40" height="24" rx="5" fill="#A1887F"/>' +
          '<rect x="206" y="222" width="28" height="24" rx="5"/>' +
          '<rect x="240" y="222" width="28" height="24" rx="5"/>' +
          '<rect x="274" y="222" width="28" height="24" rx="5"/>' +
          '<rect x="308" y="222" width="28" height="24" rx="5"/>' +
          '<rect x="342" y="222" width="28" height="24" rx="5"/>' +
          '<rect x="376" y="222" width="28" height="24" rx="5"/>' +
          '<rect x="410" y="222" width="68" height="24" rx="5" fill="#FBC02D"/>' +
          '<rect x="160" y="254" width="52" height="24" rx="5" fill="#8D5B4C"/>' +
          '<rect x="218" y="254" width="188" height="24" rx="5" fill="#EADBC8"/>' +
          '<rect x="412" y="254" width="66" height="24" rx="5" fill="#8D5B4C"/>' +
          '</g>' +
          '<path d="M320 160 C320 125, 370 125, 370 95" stroke="#8D5B4C" stroke-width="6" stroke-linecap="round" fill="none"/>'
      }),
      seller: {
        nickname: '구운감자칩',
        avatar: createAvatarSvgDataUri('구운감자칩', '#F3E9E4', '#C6956E'),
        region: '마포구 연남동 · 매너온도 41.2°C'
      }
    },
    {
      id: 'gamza-item-2',
      title: '우드톤 원목 미니 협탁 & 북유럽 패브릭 단스탠드 조명 세트',
      category: '가구/인테리어',
      location: '서울 성동구 성수동1가',
      timeAgo: '38분 전',
      price: 42000,
      status: '판매중',
      description:
        '침대 옆에 두고 따뜻하게 사용하던 원목 미니 협탁과 단스탠드 조명 세트로 판매합니다.\n\n' +
        '• 소재: 고무나무 원목 + 린넨 패브릭 갓 조명\n' +
        '• 주백색 LED 전구(E26) 2개 같이 드려요.\n' +
        '• 스크래치나 찍힘 없이 아주 깨끗한 상태입니다.\n\n' +
        '성수역 3번 출구 앞이나 서울숲 인근에서 직거래 가능합니다.',
      image: createProductSvgDataUri({
        bg1: '#FBF4E9',
        bg2: '#E9D6BD',
        accent: '#8D5B4C',
        label: '원목 협탁 & 조명',
        subTitle: 'COZY HOME INTERIOR',
        artSvg:
          '<ellipse cx="320" cy="180" rx="115" ry="85" fill="#FFE082" fill-opacity="0.45"/>' +
          '<polygon points="260,115 380,115 410,205 230,205" fill="#FFFDF9" stroke="#8D5B4C" stroke-width="5" stroke-linejoin="round"/>' +
          '<rect x="312" y="205" width="16" height="58" fill="#8D5B4C"/>' +
          '<rect x="280" y="256" width="80" height="14" rx="7" fill="#6D4C41"/>' +
          '<rect x="210" y="270" width="220" height="84" rx="12" fill="#B68059" stroke="#6D4C41" stroke-width="4"/>' +
          '<rect x="228" y="286" width="184" height="52" rx="6" fill="#CCA07B" stroke="#6D4C41" stroke-width="3"/>' +
          '<circle cx="320" cy="312" r="7" fill="#5D4037"/>' +
          '<line x1="238" y1="354" x2="224" y2="405" stroke="#6D4C41" stroke-width="10" stroke-linecap="round"/>' +
          '<line x1="402" y1="354" x2="416" y2="405" stroke="#6D4C41" stroke-width="10" stroke-linecap="round"/>'
      }),
      seller: {
        nickname: '포슬포슬햇감자',
        avatar: createAvatarSvgDataUri('포슬포슬햇감자', '#FFF3E0', '#D7A97C'),
        region: '성동구 성수동 · 매너온도 39.8°C'
      }
    },
    {
      id: 'gamza-item-3',
      title: '발뮤다 더 토스터 크림화이트 (스팀컵 포함, 작동 완벽)',
      category: '생활가전',
      location: '경기 성남시 분당구 정자동',
      timeAgo: '1시간 전',
      price: 110000,
      status: '예약중',
      description:
        '주말 브런치용으로 아껴 쓰던 발뮤다 더 토스터 크림화이트 색상입니다.\n\n' +
        '• 색상: 감자 속살처럼 포근한 크림화이트 + 골드 다이얼\n' +
        '• 구성: 토스터 본품, 정품 5cc 스팀 급수컵, 가이드북\n' +
        '• 내부 베이킹 트레이까지 구연산 세척 완료해두었습니다.\n\n' +
        '현재 오늘 저녁 7시 직거래 예약중입니다. 불발 시 순차 연락드릴게요!',
      image: createProductSvgDataUri({
        bg1: '#F7EFE6',
        bg2: '#E5D3C2',
        accent: '#A1623B',
        label: '스팀 토스터',
        subTitle: 'CREAM WHITE EDITION',
        artSvg:
          '<rect x="165" y="135" width="310" height="215" rx="26" fill="#FCF9F2" stroke="#8D5B4C" stroke-width="5"/>' +
          '<rect x="195" y="172" width="185" height="125" rx="14" fill="#3E322C" stroke="#D49B35" stroke-width="4"/>' +
          '<path d="M235 255 Q287 205 340 255" stroke="#FFB74D" stroke-width="6" stroke-linecap="round" fill="none"/>' +
          '<rect x="248" y="218" width="80" height="52" rx="10" fill="#E6A15C"/>' +
          '<circle cx="425" cy="205" r="22" fill="#D49B35" stroke="#8D5B4C" stroke-width="3"/>' +
          '<circle cx="425" cy="268" r="14" fill="#8D5B4C"/>' +
          '<rect x="200" y="350" width="22" height="16" rx="4" fill="#6D4C41"/>' +
          '<rect x="418" y="350" width="22" height="16" rx="4" fill="#6D4C41"/>'
      }),
      seller: {
        nickname: '버터통감자',
        avatar: createAvatarSvgDataUri('버터통감자', '#EFEBE9', '#BC8F6F'),
        region: '분당구 정자동 · 매너온도 44.5°C'
      }
    },
    {
      id: 'gamza-item-4',
      title: '코듀로이 오트밀 베이지 오버핏 셔켓 자켓 (남녀공용 L)',
      category: '의류',
      location: '서울 송파구 잠실동',
      timeAgo: '2시간 전',
      price: 28000,
      status: '판매중',
      description:
        '가을·봄 간절기에 툭 걸치기 좋은 코듀로이 오트밀 베이지 셔켓입니다.\n\n' +
        '• 사이즈: 남녀공용 L (여성분은 루즈핏, 남성분은 100~105 세미오버핏)\n' +
        '• 실착 횟수: 2회 착용 후 드라이클리닝 완료하여 새상품 컨디션입니다.\n' +
        '• 우드 버튼 디테일이 감성적이고 포켓 수납도 넉넉합니다.',
      image: createProductSvgDataUri({
        bg1: '#F4EDE2',
        bg2: '#DFCDAE',
        accent: '#734638',
        label: '코듀로이 셔켓',
        subTitle: 'OATMEAL CORDUROY',
        artSvg:
          '<path d="M245 120 L285 105 L355 105 L395 120 L460 185 L425 225 L395 195 L395 355 L245 355 L245 195 L215 225 L180 185 Z" fill="#EFE6D8" stroke="#734638" stroke-width="5" stroke-linejoin="round"/>' +
          '<polygon points="285,105 320,150 355,105" fill="#D7C4AA" stroke="#734638" stroke-width="4" stroke-linejoin="round"/>' +
          '<line x1="320" y1="150" x2="320" y2="355" stroke="#734638" stroke-width="4"/>' +
          '<circle cx="320" cy="185" r="5" fill="#8D5B4C"/>' +
          '<circle cx="320" cy="225" r="5" fill="#8D5B4C"/>' +
          '<circle cx="320" cy="265" r="5" fill="#8D5B4C"/>' +
          '<circle cx="320" cy="305" r="5" fill="#8D5B4C"/>' +
          '<rect x="262" y="195" width="38" height="42" rx="5" fill="#E3D3BE" stroke="#734638" stroke-width="3"/>' +
          '<rect x="340" y="195" width="38" height="42" rx="5" fill="#E3D3BE" stroke="#734638" stroke-width="3"/>'
      }),
      seller: {
        nickname: '감자밭산책러',
        avatar: createAvatarSvgDataUri('감자밭산책러', '#E8F5E9', '#BA8E68'),
        region: '송파구 잠실동 · 매너온도 38.2°C'
      }
    },
    {
      id: 'gamza-item-5',
      title: '모던 자바스크립트 Deep Dive + 클린 코드 전공서 2권 일괄',
      category: '도서/티켓',
      location: '서울 강남구 역삼동',
      timeAgo: '3시간 전',
      price: 30000,
      status: '판매중',
      description:
        '프론트엔드 스터디하면서 깨끗하게 읽은 개발 필독서 2권 일괄 판매합니다.\n\n' +
        '1. 모던 자바스크립트 Deep Dive (정가 45,000원)\n' +
        '2. Clean Code 클린 코드 (정가 33,000원)\n\n' +
        '밑줄이나 필기, 이름 기입 전혀 없고 책 모서리 구김도 없습니다. 역삼역 직거래 또는 반값택배 가능합니다!',
      image: createProductSvgDataUri({
        bg1: '#F5EFE6',
        bg2: '#DECBB4',
        accent: '#8D5B4C',
        label: 'IT 개발 도서 세트',
        subTitle: 'JS DEEP DIVE & CLEAN CODE',
        artSvg:
          '<g transform="translate(175, 115)">' +
          '<rect x="0" y="20" width="145" height="210" rx="10" fill="#8D5B4C" stroke="#2C221E" stroke-width="4"/>' +
          '<rect x="14" y="20" width="131" height="210" rx="8" fill="#FAF6F0" stroke="#2C221E" stroke-width="4"/>' +
          '<rect x="32" y="52" width="95" height="28" rx="6" fill="#D49B35"/>' +
          '<text x="80" y="71" font-family="Pretendard, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" text-anchor="middle">JS DEEP</text>' +
          '<line x1="36" y1="108" x2="118" y2="108" stroke="#9E8E85" stroke-width="5" stroke-linecap="round"/>' +
          '<line x1="36" y1="128" x2="104" y2="128" stroke="#9E8E85" stroke-width="5" stroke-linecap="round"/>' +
          '<rect x="140" y="0" width="145" height="210" rx="10" fill="#5D4037" stroke="#2C221E" stroke-width="4"/>' +
          '<rect x="154" y="0" width="131" height="210" rx="8" fill="#FFFDF9" stroke="#2C221E" stroke-width="4"/>' +
          '<rect x="172" y="34" width="95" height="28" rx="6" fill="#8D5B4C"/>' +
          '<text x="220" y="53" font-family="Pretendard, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">CLEAN CODE</text>' +
          '<line x1="176" y1="90" x2="258" y2="90" stroke="#9E8E85" stroke-width="5" stroke-linecap="round"/>' +
          '<line x1="176" y1="110" x2="242" y2="110" stroke="#9E8E85" stroke-width="5" stroke-linecap="round"/>' +
          '</g>'
      }),
      seller: {
        nickname: '코딩하는감자',
        avatar: createAvatarSvgDataUri('코딩하는감자', '#EDE7F6', '#C99A72'),
        region: '강남구 역삼동 · 매너온도 42.0°C'
      }
    },
    {
      id: 'gamza-item-6',
      title: '감성 피크닉 라탄 바구니 & 방수 체크 매트 풀세트',
      category: '기타',
      location: '서울 용산구 이태원동',
      timeAgo: '어제',
      price: 19000,
      status: '거래 완료',
      description:
        '한강 피크닉 갈 때 사진 찍기 정말 예쁜 천연 라탄 바구니와 방수 체크 매트 세트입니다.\n\n' +
        '• 바구니 내부에 패브릭 안감이 있어 과일이나 샌드위치 넣기 좋아요.\n' +
        '• 방수 매트는 성인 2~3명이 넉넉하게 앉을 수 있는 크기(150x200cm)입니다.\n' +
        '• 좋은 분께 기분 좋게 거래 완료되었습니다. 감사합니다!',
      image: createProductSvgDataUri({
        bg1: '#EFEAE1',
        bg2: '#D8CFC2',
        accent: '#607D8B',
        label: '피크닉 바구니 세트',
        subTitle: 'PICNIC RATTAN SET',
        artSvg:
          '<path d="M245 200 C245 115, 395 115, 395 200" stroke="#795548" stroke-width="12" stroke-linecap="round" fill="none"/>' +
          '<polygon points="185,205 455,205 420,340 220,340" fill="#C89666" stroke="#5D4037" stroke-width="5" stroke-linejoin="round"/>' +
          '<rect x="175" y="192" width="290" height="24" rx="10" fill="#FFE0B2" stroke="#5D4037" stroke-width="4"/>' +
          '<line x1="230" y1="245" x2="410" y2="245" stroke="#8D5B4C" stroke-width="4" stroke-dasharray="12 10"/>' +
          '<line x1="238" y1="285" x2="402" y2="285" stroke="#8D5B4C" stroke-width="4" stroke-dasharray="12 10"/>' +
          '<line x1="245" y1="320" x2="395" y2="320" stroke="#8D5B4C" stroke-width="4" stroke-dasharray="12 10"/>'
      }),
      seller: {
        nickname: '알감자피크닉',
        avatar: createAvatarSvgDataUri('알감자피크닉', '#ECEFF1', '#B68964'),
        region: '용산구 이태원동 · 매너온도 37.5°C'
      }
    }
  ];

  /* ------------------------------------------------------------------------
     2. 화면 1 컨트롤러 (window.GamzaListView)
     ------------------------------------------------------------------------ */
  var CATEGORIES = ['전체', '디지털기기', '가구/인테리어', '의류', '생활가전', '도서/티켓', '반려동물 용품', '기타'];

  var GamzaListView = {
    products: window.GAMZA_INITIAL_PRODUCTS.slice(),
    state: {
      searchQuery: '',
      selectedCategory: '전체',
      availableOnly: false
    },
    _initialized: false,
    _toastTimer: null,

    /**
     * 가격 숫자 포맷팅 (예: 95000 -> "95,000원")
     */
    formatPrice: function (price) {
      var num = Number(price);
      if (isNaN(num) || num <= 0) {
        return '무료나눔';
      }
      return num.toLocaleString('ko-KR') + '원';
    },

    /**
     * 상태 문자열에 따른 배지 클래스 및 라벨 반환
     */
    getStatusBadgeInfo: function (status) {
      if (status === '예약중') {
        return { className: 'status-badge status-reserved', label: '예약중' };
      }
      if (status === '거래 완료') {
        return { className: 'status-badge status-sold', label: '거래 완료' };
      }
      return { className: 'status-badge status-sale', label: '판매중' };
    },

    /**
     * HTML 이스케이프 유틸리티
     */
    escapeHtml: function (str) {
      return String(str == null ? '' : str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    },

    /**
     * 외부(글쓰기 화면 등)에서 사용할 기본 상품 일러스트 Data URI 생성기
     */
    createProductSvgDataUri: createProductSvgDataUri,
    createAvatarSvgDataUri: createAvatarSvgDataUri,

    /**
     * 초기화 및 이벤트 바인딩
     */
    init: function () {
      var self = this;

      // window.GAMZA_INITIAL_PRODUCTS와 동기화
      if (Array.isArray(window.GAMZA_INITIAL_PRODUCTS)) {
        this.products = window.GAMZA_INITIAL_PRODUCTS;
      }

      this._ensureStructure();
      this._bindEvents();
      this.renderCategories();
      this.render();
      this._initialized = true;

      return this;
    },

    /**
     * index.html에 기본 컨테이너가 비어있거나 일부 요소만 있을 때도 안전하게 동작하도록 보장
     */
    _ensureStructure: function () {
      var categoryListEl = document.querySelector('.category-list') || document.getElementById('categoryList');
      if (categoryListEl && categoryListEl.children.length === 0) {
        this.renderCategories();
      }
    },

    /**
     * 카테고리 버튼 목록 렌더링 및 활성 상태 업데이트
     */
    renderCategories: function () {
      var categoryListEl = document.querySelector('.category-list') || document.getElementById('categoryList');
      if (!categoryListEl) return;

      var existingButtons = categoryListEl.querySelectorAll('.category-btn');
      if (existingButtons.length > 0) {
        for (var i = 0; i < existingButtons.length; i++) {
          var btn = existingButtons[i];
          var cat = btn.getAttribute('data-category') || btn.textContent.trim();
          btn.setAttribute('data-category', cat);
          if (cat === this.state.selectedCategory) {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
          } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
          }
        }
        return;
      }

      var html = '';
      for (var j = 0; j < CATEGORIES.length; j++) {
        var categoryName = CATEGORIES[j];
        var isActive = categoryName === this.state.selectedCategory;
        html +=
          '<button type="button" class="category-btn' +
          (isActive ? ' active' : '') +
          '" data-category="' +
          this.escapeHtml(categoryName) +
          '" aria-pressed="' +
          (isActive ? 'true' : 'false') +
          '">' +
          this.escapeHtml(categoryName) +
          '</button>';
      }
      categoryListEl.innerHTML = html;
    },

    /**
     * 상단 검색창, 카테고리, 토글, 글쓰기/로그인 버튼 이벤트 연결
     */
    _bindEvents: function () {
      if (this._initialized) return;
      var self = this;

      // 1) 검색창 입력
      var searchInput = document.getElementById('searchInput');
      var clearBtn = document.getElementById('searchClearBtn') || document.querySelector('.search-clear-btn');
      if (searchInput) {
        searchInput.addEventListener('input', function (e) {
          self.state.searchQuery = e.target.value || '';
          if (clearBtn) {
            clearBtn.classList.toggle('hidden', !self.state.searchQuery.trim());
          }
          self.render();
        });
      }

      if (clearBtn && searchInput) {
        clearBtn.addEventListener('click', function () {
          searchInput.value = '';
          self.state.searchQuery = '';
          clearBtn.classList.add('hidden');
          searchInput.focus();
          self.render();
        });
      }

      // 2) 카테고리 버튼 클릭 (이벤트 위임)
      var categoryContainer = document.querySelector('.category-list') || document.getElementById('categoryList') || document.querySelector('.filter-bar');
      if (categoryContainer) {
        categoryContainer.addEventListener('click', function (e) {
          var targetBtn = e.target.closest('.category-btn');
          if (!targetBtn) return;
          var selected = targetBtn.getAttribute('data-category') || targetBtn.textContent.trim();
          self.setCategory(selected);
        });
      }

      // 3) '거래 가능만 보기' 토글 스위치 (#availableOnlyToggle)
      var availableToggle = document.getElementById('availableOnlyToggle');
      if (availableToggle) {
        if (availableToggle.tagName === 'INPUT' && availableToggle.type === 'checkbox') {
          availableToggle.addEventListener('change', function (e) {
            self.setAvailableOnly(Boolean(e.target.checked));
          });
        } else {
          availableToggle.addEventListener('click', function (e) {
            e.preventDefault();
            self.setAvailableOnly(!self.state.availableOnly);
          });
        }
      }

      // 4) [글쓰기] 버튼 (#openWriteBtn) - 비로그인 시 로그인 모달 먼저 표시, 로그인 성공 시 글쓰기 창 오픈
      var openWriteBtn = document.getElementById('openWriteBtn');
      if (openWriteBtn) {
        openWriteBtn.addEventListener('click', function () {
          if (window.GamzaAuth && typeof window.GamzaAuth.isLoggedIn === 'function' && !window.GamzaAuth.isLoggedIn()) {
            window.GamzaAuth.openModal({
              mode: 'signin',
              onSuccessOpenWrite: true,
              notice: '글쓰기는 로그인 후 이용할 수 있어요. 로그인하면 바로 글쓰기 창이 열립니다! 🥔'
            });
            return;
          }
          if (window.GamzaWriteView && typeof window.GamzaWriteView.open === 'function') {
            window.GamzaWriteView.open();
          } else {
            self.showToast('글쓰기 화면을 불러오는 중입니다.');
          }
        });
      }

      // 5) [로그인] 버튼 (#loginBtn) - 클릭 시 로그인/회원가입 모달 오픈
      var loginBtn = document.getElementById('loginBtn');
      if (loginBtn) {
        loginBtn.addEventListener('click', function () {
          if (window.GamzaAuth && typeof window.GamzaAuth.openModal === 'function') {
            window.GamzaAuth.openModal({
              mode: 'signin',
              onSuccessOpenWrite: false
            });
          }
        });
      }

      // 6) 로고 클릭 시 필터 초기화 및 목록 홈으로 이동
      var logoEl = document.querySelector('.site-logo');
      if (logoEl) {
        logoEl.addEventListener('click', function () {
          if (window.GamzaWriteView && typeof window.GamzaWriteView.close === 'function') {
            window.GamzaWriteView.close();
          }
          self.resetFilters();
        });
      }

      // 7) 상품 카드 그리드 클릭 & 키보드 접근성 (이벤트 위임)
      var gridEl = this._getGridElement();
      if (gridEl) {
        gridEl.addEventListener('click', function (e) {
          var resetBtn = e.target.closest('[data-action="reset-filters"]');
          if (resetBtn) {
            self.resetFilters();
            return;
          }

          var cardEl = e.target.closest('.product-card');
          if (!cardEl) return;

          var productId = cardEl.getAttribute('data-product-id');
          var product = self.getProductById(productId);
          if (product) {
            self.openProductDetail(product);
          }
        });

        gridEl.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            var cardEl = e.target.closest('.product-card');
            if (!cardEl) return;
            e.preventDefault();
            var productId = cardEl.getAttribute('data-product-id');
            var product = self.getProductById(productId);
            if (product) {
              self.openProductDetail(product);
            }
          }
        });
      }
    },

    _getGridElement: function () {
      return document.getElementById('productGrid') || document.querySelector('.product-grid');
    },

    /**
     * 현재 필터 조건에 맞는 상품 배열 반환
     */
    getFilteredProducts: function () {
      var query = (this.state.searchQuery || '').trim().toLowerCase();
      var category = this.state.selectedCategory || '전체';
      var availableOnly = Boolean(this.state.availableOnly);

      return this.products.filter(function (item) {
        // 1) 카테고리 필터
        if (category !== '전체' && item.category !== category) {
          return false;
        }
        // 2) 거래 가능만 보기 (판매중만 표시)
        if (availableOnly && item.status !== '판매중') {
          return false;
        }
        // 3) 검색어 필터 (상품명, 카테고리, 지역, 설명, 판매자 닉네임)
        if (query) {
          var haystack = [
            item.title,
            item.category,
            item.location,
            item.description,
            item.seller && item.seller.nickname
          ]
            .join(' ')
            .toLowerCase();

          if (haystack.indexOf(query) === -1) {
            return false;
          }
        }
        return true;
      });
    },

    /**
     * ID로 상품 객체 조회
     */
    getProductById: function (productId) {
      for (var i = 0; i < this.products.length; i++) {
        if (String(this.products[i].id) === String(productId)) {
          return this.products[i];
        }
      }
      return null;
    },

    /**
     * 상세 팝업 모달 호출 (화면 2 연동)
     */
    openProductDetail: function (product) {
      if (!product) return;
      if (window.GamzaDetailModal && typeof window.GamzaDetailModal.open === 'function') {
        window.GamzaDetailModal.open(product);
      } else {
        this.showToast('선택한 상품: ' + product.title);
      }
    },

    /**
     * 카테고리 변경
     */
    setCategory: function (category) {
      this.state.selectedCategory = category || '전체';
      this.renderCategories();
      this.render();
    },

    /**
     * 검색어 변경
     */
    setSearchQuery: function (query) {
      this.state.searchQuery = query || '';
      var searchInput = document.getElementById('searchInput');
      if (searchInput && searchInput.value !== this.state.searchQuery) {
        searchInput.value = this.state.searchQuery;
      }
      this.render();
    },

    /**
     * '거래 가능만 보기' 설정 변경
     */
    setAvailableOnly: function (flag) {
      this.state.availableOnly = Boolean(flag);

      var availableToggle = document.getElementById('availableOnlyToggle');
      if (availableToggle) {
        if (availableToggle.tagName === 'INPUT' && availableToggle.type === 'checkbox') {
          availableToggle.checked = this.state.availableOnly;
        } else {
          availableToggle.classList.toggle('active', this.state.availableOnly);
          availableToggle.setAttribute('aria-pressed', this.state.availableOnly ? 'true' : 'false');
        }
      }

      var switchVisual = document.querySelector('.toggle-switch');
      if (switchVisual && (!availableToggle || availableToggle.tagName !== 'INPUT')) {
        switchVisual.classList.toggle('active', this.state.availableOnly);
      }

      this.render();
    },

    /**
     * 모든 검색/필터 초기화
     */
    resetFilters: function () {
      this.state.searchQuery = '';
      this.state.selectedCategory = '전체';
      this.state.availableOnly = false;

      var searchInput = document.getElementById('searchInput');
      if (searchInput) {
        searchInput.value = '';
      }
      var clearBtn = document.getElementById('searchClearBtn') || document.querySelector('.search-clear-btn');
      if (clearBtn) {
        clearBtn.classList.add('hidden');
      }

      this.setAvailableOnly(false);
      this.renderCategories();
      this.render();
    },

    /**
     * 신규 상품 등록 (화면 3 글쓰기 완료 시 호출)
     */
    addProduct: function (newProductData) {
      if (!newProductData) return null;

      var category = newProductData.category || '기타';
      var title = newProductData.title || '이름 없는 감자 상품';
      var defaultImage = createProductSvgDataUri({
        bg1: '#F6EFE6',
        bg2: '#E3D0BA',
        accent: '#8D5B4C',
        label: category,
        subTitle: 'NEW GAMZA ITEM',
        artSvg:
          '<ellipse cx="320" cy="235" rx="95" ry="75" fill="#D7A97C" stroke="#6D4C41" stroke-width="5"/>' +
          '<circle cx="290" cy="220" r="7" fill="#2C221E"/>' +
          '<circle cx="350" cy="220" r="7" fill="#2C221E"/>' +
          '<path d="M303 245 Q320 260 337 245" stroke="#2C221E" stroke-width="5" stroke-linecap="round" fill="none"/>'
      });

      var product = {
        id: newProductData.id || 'gamza-item-' + Date.now(),
        title: title,
        category: category,
        location: newProductData.location || '서울 마포구 연남동',
        timeAgo: newProductData.timeAgo || '방금 전',
        price: Number(newProductData.price) || 0,
        status: newProductData.status || '판매중',
        description: newProductData.description || '',
        image: newProductData.image || defaultImage,
        seller: newProductData.seller || {
          nickname: '포슬감자',
          avatar: createAvatarSvgDataUri('포슬감자', '#F3E9E4', '#C6956E'),
          region: (newProductData.location || '마포구 연남동') + ' · 매너온도 40.0°C'
        }
      };

      this.products.unshift(product);
      this.resetFilters();
      this.show();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.showToast('🥔 새 상품이 감자 마켓에 등록되었어요!');
      return product;
    },

    /**
     * 상품 판매 상태 변경 및 재렌더링
     */
    updateProductStatus: function (productId, newStatus) {
      var item = this.getProductById(productId);
      if (!item) return null;
      item.status = newStatus;
      this.render();
      return item;
    },

    /**
     * 화면 1 표시 / 숨김 제어
     */
    show: function () {
      var listViewEl = document.getElementById('listView') || document.getElementById('screen1List');
      if (listViewEl) {
        listViewEl.hidden = false;
        listViewEl.classList.remove('hidden');
      }
      var writeViewEl =
        document.getElementById('writeView') ||
        document.getElementById('writeViewSection') ||
        document.getElementById('screen3Write') ||
        document.querySelector('.write-view-section');
      if (writeViewEl) {
        writeViewEl.hidden = true;
        writeViewEl.classList.add('hidden');
      }
    },

    hide: function () {
      var listViewEl = document.getElementById('listView') || document.getElementById('screen1List');
      if (listViewEl) {
        listViewEl.hidden = true;
        listViewEl.classList.add('hidden');
      }
    },

    /**
     * 토스트 메시지 표시
     */
    showToast: function (message) {
      var toastEl = document.getElementById('gamzaToast');
      if (!toastEl) {
        toastEl = document.createElement('div');
        toastEl.id = 'gamzaToast';
        toastEl.className = 'gamza-toast';
        toastEl.setAttribute('role', 'status');
        toastEl.setAttribute('aria-live', 'polite');
        document.body.appendChild(toastEl);
      }

      toastEl.textContent = message;
      toastEl.classList.add('show');

      if (this._toastTimer) {
        clearTimeout(this._toastTimer);
      }
      this._toastTimer = setTimeout(function () {
        toastEl.classList.remove('show');
      }, 2600);
    },

    /**
     * 상품 그리드 및 개수 요약 렌더링
     */
    render: function () {
      var gridEl = this._getGridElement();
      if (!gridEl) return;

      var filtered = this.getFilteredProducts();

      // 상품 총 개수 텍스트 업데이트
      var countEl = document.getElementById('productCountText');
      if (countEl) {
        countEl.innerHTML =
          '총 <strong>' + filtered.length + '개</strong>의 포근한 중고 물품이 있어요';
      }

      // 조건에 맞는 상품이 없을 때 빈 화면 렌더링
      if (filtered.length === 0) {
        gridEl.innerHTML =
          '<div class="empty-state">' +
          '<div class="empty-state-icon" aria-hidden="true">🥔</div>' +
          '<h3 class="empty-state-title">찾으시는 감자 물품이 아직 없어요</h3>' +
          '<p class="empty-state-desc">검색어나 카테고리 필터를 변경하거나 전체 목록을 확인해 보세요.</p>' +
          '<button type="button" class="btn btn-outline" data-action="reset-filters">필터 초기화하기</button>' +
          '</div>';
        return;
      }

      var cardsHtml = '';
      for (var i = 0; i < filtered.length; i++) {
        var item = filtered[i];
        var badge = this.getStatusBadgeInfo(item.status);
        var isSoldClass = item.status === '거래 완료' ? ' is-sold' : '';
        var sellerNickname = (item.seller && item.seller.nickname) || '감자이웃';
        var sellerAvatar =
          (item.seller && item.seller.avatar) ||
          createAvatarSvgDataUri(sellerNickname, '#F3E9E4', '#C6956E');

        cardsHtml +=
          '<article class="product-card' +
          isSoldClass +
          '" data-product-id="' +
          this.escapeHtml(item.id) +
          '" tabindex="0" role="button" aria-label="' +
          this.escapeHtml(item.title) +
          ' 상세 보기">' +
          '<div class="card-img-wrap">' +
          '<span class="' +
          badge.className +
          ' card-badge-pos">' +
          this.escapeHtml(badge.label) +
          '</span>' +
          '<img class="card-img" src="' +
          item.image +
          '" alt="' +
          this.escapeHtml(item.title) +
          '" loading="lazy" />' +
          '<span class="card-category-tag">' +
          this.escapeHtml(item.category) +
          '</span>' +
          '</div>' +
          '<div class="card-body">' +
          '<h3 class="card-title">' +
          this.escapeHtml(item.title) +
          '</h3>' +
          '<div class="card-meta">' +
          '<span>📍 ' +
          this.escapeHtml(item.location) +
          '</span>' +
          '<span class="card-meta-dot" aria-hidden="true">•</span>' +
          '<span>' +
          this.escapeHtml(item.timeAgo) +
          '</span>' +
          '</div>' +
          '<div class="card-footer">' +
          '<strong class="card-price">' +
          this.escapeHtml(this.formatPrice(item.price)) +
          '</strong>' +
          '<span class="card-seller-mini">' +
          '<img src="' +
          sellerAvatar +
          '" alt="" aria-hidden="true" />' +
          this.escapeHtml(sellerNickname) +
          '</span>' +
          '</div>' +
          '</div>' +
          '</article>';
      }

      gridEl.innerHTML = cardsHtml;
    }
  };

  window.GamzaListView = GamzaListView;

  // DOM 로드 시 자동 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      window.GamzaListView.init();
    });
  } else {
    window.GamzaListView.init();
  }
})();
