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
      image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?auto=format&fit=crop&w=800&q=80',
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
  var CATEGORIES = ['전체', '디지털기기', '가구/인테리어', '의류', '생활가전', '도서/티켓', '기타'];

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
      var self = this;
      var query = (this.state.searchQuery || '').trim().toLowerCase();
      var category = this.state.selectedCategory || '전체';
      var availableOnly = Boolean(this.state.availableOnly);

      return this.products.filter(function (item) {
        // 1) 카테고리 필터
        if (category !== '전체' && item.category !== category) {
          return false;
        }
        // 2) 거래 가능만 보기 켜짐 시 '거래 완료' 및 비판매중 글 제외
        if (availableOnly) {
          var badgeInfo = self.getStatusBadgeInfo(item.status);
          if (badgeInfo.label === '거래 완료' || badgeInfo.label !== '판매중') {
            return false;
          }
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
      var defaultImage = 'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?auto=format&fit=crop&w=800&q=80';

      var sellerId =
        newProductData.sellerId ||
        (newProductData.seller && newProductData.seller.id) ||
        null;

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
        sellerId: sellerId,
        seller: newProductData.seller || {
          id: sellerId,
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
     * 기존 상품 정보 전체 수정 반영 및 재렌더링
     */
    updateProduct: function (updatedProductData) {
      if (!updatedProductData || !updatedProductData.id) return null;
      var targetId = String(updatedProductData.id);
      for (var i = 0; i < this.products.length; i++) {
        if (String(this.products[i].id) === targetId) {
          this.products[i] = Object.assign({}, this.products[i], updatedProductData);
          this.render();
          this.show();
          this.showToast('✏️ 게시글이 수정되었어요!');
          return this.products[i];
        }
      }
      return null;
    },

    /**
     * 상품 삭제 및 재렌더링
     */
    removeProduct: function (productId) {
      var targetId = String(productId);
      this.products = this.products.filter(function (item) {
        return String(item.id) !== targetId;
      });
      this.render();
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
        var isSoldClass = badge.label === '거래 완료' ? ' is-sold' : '';
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
          '" loading="lazy" onerror="this.onerror=null;this.src=\'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?auto=format&fit=crop&w=800&q=80\';" />' +
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


/**
 * [화면 2: 상품 상세 팝업(모달)] - screen2_modal.js
 * 중고 거래 웹 서비스 '감자(Gamza)' 상세 모달 제어 모듈
 */
(function () {
  'use strict';

  const DEFAULT_PRODUCT_IMAGE =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">
        <rect width="600" height="450" fill="#F4EFE6"/>
        <circle cx="300" cy="200" r="68" fill="#E6DEC8"/>
        <ellipse cx="300" cy="200" rx="52" ry="40" fill="#D9A05B" opacity="0.65"/>
        <text x="300" y="305" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="600" fill="#6E5D54">감자 마켓 상품 이미지</text>
      </svg>`
    );

  const DEFAULT_AVATAR_IMAGE =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
        <rect width="80" height="80" rx="40" fill="#F4EFE6"/>
        <circle cx="40" cy="31" r="14" fill="#8D5B4C" opacity="0.85"/>
        <path d="M18 68c4-14 14-21 22-21s18 7 22 21" fill="#8D5B4C" opacity="0.85"/>
      </svg>`
    );

  const GamzaDetailModal = {
    dialog: null,
    currentProduct: null,
    wishedProductIds: new Set(),
    _initialized: false,
    _toastTimer: null,

    /**
     * 모달 초기화: DOM 구조 확인/보강 및 이벤트 바인딩
     */
    init() {
      const dialog = this._ensureDialogDOM();
      if (!dialog) return;

      this.dialog = dialog;

      if (this._initialized && dialog.dataset.gamzaModalBound === 'true') {
        return;
      }

      // closedby="any" 및 접근성 속성 보장
      if (!dialog.hasAttribute('closedby')) {
        dialog.setAttribute('closedby', 'any');
      }
      if (!dialog.hasAttribute('aria-labelledby')) {
        dialog.setAttribute('aria-labelledby', 'modalProductTitle');
      }

      // 닫기 버튼 이벤트 연결
      const closeBtn = dialog.querySelector('#closeModalBtn, .modal-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          this.close();
        });
      }

      // Modern Web Guidance 필수 폴백: <dialog closedby="any"> 미지원 브라우저용 Light-dismiss
      if (!('closedBy' in HTMLDialogElement.prototype)) {
        dialog.addEventListener('click', (event) => {
          if (event.target !== dialog) return;
          const rect = dialog.getBoundingClientRect();
          const isDialogContent = (
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width
          );
          if (isDialogContent) return;
          dialog.close();
        });
      }

      // 하단 [관심 추가] 버튼 피드백 이벤트
      const wishBtn = dialog.querySelector('#modalWishBtn, .modal-wish-btn');
      if (wishBtn) {
        wishBtn.addEventListener('click', () => {
          this._handleToggleWish(wishBtn);
        });
      }

      // 하단 [채팅 시작하기] 버튼 피드백 이벤트
      const chatBtn = dialog.querySelector('#modalChatBtn, .modal-chat-btn');
      if (chatBtn) {
        chatBtn.addEventListener('click', () => {
          this._handleStartChat();
        });
      }

      // 작성자 전용 컨트롤 바 이벤트 (상태 변경: 판매중/예약중/거래 완료 + 수정/삭제)
      const ownerControls = dialog.querySelector('#modalOwnerControls, .modal-owner-controls');
      if (ownerControls) {
        ownerControls.addEventListener('click', (e) => {
          const statusBtn = e.target.closest('.owner-status-btn');
          if (statusBtn) {
            const newStatus = statusBtn.getAttribute('data-status-value');
            if (newStatus) {
              this._handleChangeStatus(newStatus);
            }
            return;
          }

          const editBtn = e.target.closest('#modalEditPostBtn, .owner-edit-btn');
          if (editBtn) {
            this._handleEditPost();
            return;
          }

          const deleteBtn = e.target.closest('#modalDeletePostBtn, .owner-delete-btn');
          if (deleteBtn) {
            this._handleDeletePost(deleteBtn);
          }
        });
      }

      dialog.dataset.gamzaModalBound = 'true';
      this._initialized = true;
    },

    /**
     * 전달받은 상품 데이터를 모달 DOM에 렌더링하고 showModal()로 오픈
     * @param {Object} product - 상품 객체 (id, title, category, location, timeAgo, price, status, description, image, seller)
     */
    open(product) {
      if (!product) return;
      this.init();
      if (!this.dialog) return;

      this.currentProduct = product;
      const dialog = this.dialog;

      // 1. 상단 상품 이미지 렌더링
      const imgSection = dialog.querySelector('.modal-image-section');
      let imgEl = dialog.querySelector('#modalProductImage, .modal-product-image, .modal-image-section img');
      if (!imgEl && imgSection) {
        imgEl = document.createElement('img');
        imgEl.id = 'modalProductImage';
        imgEl.className = 'modal-product-image';
        imgSection.prepend(imgEl);
      }
      if (imgEl) {
        const imgSrc = product.image || product.imageUrl || product.thumbnail || DEFAULT_PRODUCT_IMAGE;
        imgEl.onerror = () => {
          imgEl.onerror = null;
          imgEl.src = DEFAULT_PRODUCT_IMAGE;
        };
        imgEl.src = imgSrc;
        imgEl.alt = product.title ? `${product.title} 상품 이미지` : '상품 이미지';
      }

      // 2. 판매자 정보 박스 렌더링 (.seller-profile-box)
      const sellerData = this._extractSellerInfo(product);
      const avatarEl = dialog.querySelector('#modalSellerAvatar, .seller-avatar');
      if (avatarEl) {
        if (avatarEl.tagName === 'IMG') {
          avatarEl.onerror = () => {
            avatarEl.onerror = null;
            avatarEl.src = DEFAULT_AVATAR_IMAGE;
          };
          avatarEl.src = sellerData.avatar || DEFAULT_AVATAR_IMAGE;
          avatarEl.alt = `${sellerData.nickname} 프로필`;
        } else {
          // div 또는 span 요소인 경우
          if (sellerData.avatar && (sellerData.avatar.startsWith('http') || sellerData.avatar.startsWith('data:') || sellerData.avatar.startsWith('/') || sellerData.avatar.startsWith('.'))) {
            avatarEl.innerHTML = `<img src="${this._escapeAttr(sellerData.avatar)}" alt="${this._escapeAttr(sellerData.nickname)} 프로필" />`;
            const innerImg = avatarEl.querySelector('img');
            if (innerImg) {
              innerImg.onerror = () => {
                innerImg.onerror = null;
                innerImg.src = DEFAULT_AVATAR_IMAGE;
              };
            }
          } else {
            avatarEl.textContent = sellerData.emoji || '🥔';
          }
        }
      }

      const nicknameEl = dialog.querySelector('#modalSellerNickname, #modalSellerName, .seller-nickname');
      if (nicknameEl) {
        nicknameEl.textContent = sellerData.nickname;
      }

      const regionEl = dialog.querySelector('#modalSellerRegion, #modalSellerLocation, .seller-region');
      if (regionEl) {
        regionEl.textContent = sellerData.region;
      }

      // 3. 상품 핵심 정보 7가지 (순서 엄수: 상태 배지 -> 카테고리 -> 상품명 -> 판매 위치 -> 업로드 시간 -> 가격 -> 상품 설명)
      // (1) 판매 상태 배지 (.status-badge)
      const statusEl = dialog.querySelector('#modalStatusBadge, .modal-body-section .status-badge, .status-badge');
      const statusMeta = this._resolveStatus(product.status);
      if (statusEl) {
        statusEl.textContent = statusMeta.label;
        statusEl.classList.remove('status-sale', 'status-reserved', 'status-sold');
        statusEl.classList.add('status-badge', statusMeta.className);
      }

      // (2) 카테고리 (.modal-category)
      const categoryEl = dialog.querySelector('#modalCategory, .modal-category');
      if (categoryEl) {
        categoryEl.textContent = product.category || '기타 중고물품';
      }

      // (3) 상품명 (#modalProductTitle, .modal-title)
      const titleEl = dialog.querySelector('#modalProductTitle, .modal-title');
      if (titleEl) {
        titleEl.textContent = product.title || '상품명이 없습니다';
      }

      // (4) 판매 위치 (.modal-location)
      const locationEl = dialog.querySelector('#modalLocation, .modal-location');
      if (locationEl) {
        locationEl.textContent = product.location || sellerData.region || '동네 정보 없음';
      }

      // (5) 업로드 시간 (.modal-time)
      const timeEl = dialog.querySelector('#modalTime, .modal-time');
      if (timeEl) {
        timeEl.textContent = product.timeAgo || product.createdAt || product.time || '방금 전';
      }

      // (6) 가격 (.modal-price)
      const priceEl = dialog.querySelector('#modalPrice, .modal-price');
      if (priceEl) {
        priceEl.textContent = this._formatPrice(product.price);
      }

      // (7) 상품 설명 (.modal-description)
      const descEl = dialog.querySelector('#modalDescription, .modal-description');
      if (descEl) {
        descEl.textContent =
          product.description ||
          '판매자가 등록한 상세 설명이 없습니다. 채팅을 통해 상품 상태를 문의해 보세요.';
      }

      // 4. 작성자 전용 컨트롤(수정/삭제 + 판매중/예약중/거래 완료 상태 변경) 및 하단 버튼 동기화
      this._syncOwnerControls(product, statusMeta);
      this._syncFooterButtons(product, statusMeta);

      // 스크롤 최상단 초기화
      const bodySection = dialog.querySelector('.modal-body-section');
      if (bodySection) {
        bodySection.scrollTop = 0;
      }

      // 모달 오픈
      if (!dialog.open) {
        dialog.showModal();
      }
    },

    /**
     * 모달 닫기
     */
    close() {
      if (!this.dialog) {
        this.dialog = document.getElementById('detailDialog');
      }
      if (this.dialog && this.dialog.open) {
        this.dialog.close();
      }
    },

    /**
     * #detailDialog 요소와 내부 필수 마크업이 없을 경우 자동 생성/보강
     */
    _ensureDialogDOM() {
      let dialog = document.getElementById('detailDialog') || document.querySelector('dialog.detail-dialog');

      if (!dialog) {
        dialog = document.createElement('dialog');
        dialog.id = 'detailDialog';
        dialog.className = 'detail-dialog';
        dialog.setAttribute('closedby', 'any');
        dialog.setAttribute('aria-labelledby', 'modalProductTitle');
        document.body.appendChild(dialog);
      }

      // 내부 필수 섹션(.modal-body-section 등)이 비어 있으면 표준 템플릿 주입
      const hasBodySection = Boolean(dialog.querySelector('.modal-body-section'));
      if (!hasBodySection) {
        dialog.innerHTML = `
          <button type="button" id="closeModalBtn" class="modal-close-btn" aria-label="상세 창 닫기">✕</button>

          <div class="modal-image-section">
            <img id="modalProductImage" class="modal-product-image" src="${DEFAULT_PRODUCT_IMAGE}" alt="상품 이미지" />
          </div>

          <div class="modal-body-section">
            <!-- 1. 판매자 정보 박스 -->
            <div class="seller-profile-box">
              <div id="modalSellerAvatar" class="seller-avatar" aria-hidden="true">🥔</div>
              <div class="seller-info-text">
                <span id="modalSellerNickname" class="seller-nickname">감자이웃</span>
                <span id="modalSellerRegion" class="seller-region">온의동</span>
              </div>
            </div>

            <!-- 2. 상품 핵심 정보 (순서 엄수: 상태 배지 -> 카테고리 -> 상품명 -> 판매 위치 -> 업로드 시간 -> 가격 -> 상품 설명) -->
            <span id="modalStatusBadge" class="status-badge status-sale">판매중</span>
            <span id="modalCategory" class="modal-category">생활가전</span>
            <h2 id="modalProductTitle" class="modal-title">상품 제목</h2>
            <div id="modalLocation" class="modal-location">강원도 춘천시 온의동</div>
            <div id="modalTime" class="modal-time">10분 전</div>
            <div id="modalPrice" class="modal-price">15,000원</div>
            <p id="modalDescription" class="modal-description">상품 상세 설명입니다.</p>
          </div>

          <!-- 3. 맨 아래 하단 고정 바 -->
          <div class="modal-footer-actions">
            <button type="button" id="modalWishBtn" class="modal-wish-btn" aria-pressed="false">
              🤍 관심 추가
            </button>
            <button type="button" id="modalChatBtn" class="modal-chat-btn">
              💬 채팅 시작하기
            </button>
          </div>

          <div id="modalFeedbackToast" class="modal-feedback-toast" role="status" aria-live="polite"></div>
        `;
      } else if (!dialog.querySelector('.modal-feedback-toast')) {
        const toast = document.createElement('div');
        toast.id = 'modalFeedbackToast';
        toast.className = 'modal-feedback-toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        dialog.appendChild(toast);
      }

      return dialog;
    },

    /**
     * 판매자 정보 정규화 추출
     */
    _extractSellerInfo(product) {
      const seller = product.seller;
      if (seller && typeof seller === 'object') {
        return {
          nickname: seller.nickname || seller.name || product.sellerNickname || '따뜻한 감자이웃',
          region: seller.region || seller.location || product.location || '우리 동네',
          avatar: seller.avatar || seller.profileImage || seller.image || '',
          emoji: seller.emoji || '🥔'
        };
      }
      return {
        nickname:
          (typeof seller === 'string' && seller) ||
          product.sellerNickname ||
          product.sellerName ||
          '따뜻한 감자이웃',
        region: product.sellerRegion || product.location || '우리 동네',
        avatar: product.sellerAvatar || '',
        emoji: '🥔'
      };
    },

    /**
     * 판매 상태 값에 따른 라벨 및 스타일 클래스 반환
     */
    _resolveStatus(rawStatus) {
      const normalized = String(rawStatus || '판매중').trim().toLowerCase();

      if (
        normalized === '예약중' ||
        normalized === 'reserved' ||
        normalized === 'reserving'
      ) {
        return { label: '예약중', className: 'status-reserved', isSold: false };
      }

      if (
        normalized === '거래 완료' ||
        normalized === '거래완료' ||
        normalized === '판매완료' ||
        normalized === '판매 완료' ||
        normalized === 'sold' ||
        normalized === 'completed'
      ) {
        return { label: '거래 완료', className: 'status-sold', isSold: true };
      }

      return { label: '판매중', className: 'status-sale', isSold: false };
    },

    /**
     * 가격 포맷팅 (예: 15,000원 또는 무료나눔)
     */
    _formatPrice(price) {
      if (price === 0 || price === '0' || price === '무료나눔' || price === '무료') {
        return '무료나눔';
      }
      if (price === null || price === undefined || price === '') {
        return '가격 문의';
      }
      if (typeof price === 'number' && !Number.isNaN(price)) {
        return `${price.toLocaleString('ko-KR')}원`;
      }
      const strPrice = String(price).trim();
      const numericOnly = strPrice.replace(/[,원\s]/g, '');
      if (/^\d+$/.test(numericOnly)) {
        const num = Number(numericOnly);
        return num === 0 ? '무료나눔' : `${num.toLocaleString('ko-KR')}원`;
      }
      return strPrice;
    },

    /**
     * 하단 관심 추가 / 채팅 시작하기 버튼 상태 업데이트
     */
    _syncFooterButtons(product, statusMeta) {
      if (!this.dialog) return;

      const wishBtn = this.dialog.querySelector('#modalWishBtn, .modal-wish-btn');
      if (wishBtn) {
        const productKey = product.id ?? product.title;
        const isWished = Boolean(product.isWished) || this.wishedProductIds.has(productKey);
        wishBtn.classList.toggle('is-wished', isWished);
        wishBtn.setAttribute('aria-pressed', String(isWished));
        wishBtn.innerHTML = isWished ? '❤️ 관심 등록됨' : '🤍 관심 추가';
      }

      const chatBtn = this.dialog.querySelector('#modalChatBtn, .modal-chat-btn');
      if (chatBtn) {
        if (statusMeta.isSold) {
          chatBtn.disabled = true;
          chatBtn.textContent = '거래가 완료된 상품입니다';
        } else {
          chatBtn.disabled = false;
          chatBtn.innerHTML = '💬 채팅 시작하기';
        }
      }
    },

    /**
     * 현재 로그인한 회원이 해당 게시글의 작성자인지 판별
     */
    _isProductOwner(product) {
      if (!product || !window.GamzaAuth || typeof window.GamzaAuth.getCurrentUser !== 'function') {
        return false;
      }
      const user = window.GamzaAuth.getCurrentUser();
      if (!user || !user.id) return false;

      const productSellerId =
        product.sellerId || (product.seller && product.seller.id) || null;
      if (productSellerId && String(productSellerId) === String(user.id)) {
        return true;
      }

      const productNickname =
        (product.seller && product.seller.nickname) || product.sellerNickname || '';
      if (user.nickname && productNickname && String(user.nickname) === String(productNickname)) {
        return true;
      }

      return false;
    },

    /**
     * 작성자 전용 컨트롤 영역(#modalOwnerControls) 표시 여부 및 현재 상태 버튼 활성화 동기화
     */
    _syncOwnerControls(product, statusMeta) {
      if (!this.dialog) return;
      const ownerBox = this.dialog.querySelector('#modalOwnerControls, .modal-owner-controls');
      if (!ownerBox) return;

      const isOwner = this._isProductOwner(product);
      if (!isOwner) {
        ownerBox.classList.add('hidden');
        ownerBox.hidden = true;
        return;
      }

      ownerBox.classList.remove('hidden');
      ownerBox.hidden = false;

      const currentLabel = (statusMeta && statusMeta.label) || '판매중';
      const statusBtns = ownerBox.querySelectorAll('.owner-status-btn');
      statusBtns.forEach((btn) => {
        const val = btn.getAttribute('data-status-value');
        const active = val === currentLabel;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', String(active));
      });
    },

    /**
     * 작성자가 모달에서 [판매중 / 예약중 / 거래 완료] 버튼을 클릭했을 때 처리
     */
    async _handleChangeStatus(newStatus) {
      if (!this.currentProduct) return;
      const product = this.currentProduct;
      if (product.status === newStatus) return;

      product.status = newStatus;
      const statusMeta = this._resolveStatus(newStatus);

      // 모달 내 배지 & 버튼 즉시 업데이트
      if (this.dialog) {
        const statusEl = this.dialog.querySelector('#modalStatusBadge, .modal-body-section .status-badge, .status-badge');
        if (statusEl) {
          statusEl.textContent = statusMeta.label;
          statusEl.classList.remove('status-sale', 'status-reserved', 'status-sold');
          statusEl.classList.add('status-badge', statusMeta.className);
        }
      }
      this._syncOwnerControls(product, statusMeta);
      this._syncFooterButtons(product, statusMeta);

      // 화면 1 목록 카드 상태 배지 및 거래 완료 흐림 효과 즉시 갱신
      if (window.GamzaListView && typeof window.GamzaListView.updateProductStatus === 'function') {
        window.GamzaListView.updateProductStatus(product.id, newStatus);
      }

      // Supabase DB에 변경된 판매 상태 영구 저장
      if (window.GamzaSupabase && typeof window.GamzaSupabase.updateProductStatus === 'function') {
        try {
          await window.GamzaSupabase.updateProductStatus(product.id, newStatus);
          this._showToast(`상태가 '${newStatus}'(으)로 변경되어 수파베이스에 저장되었습니다 🥔`);
        } catch (err) {
          console.error('[GamzaDetailModal] 상태 변경 저장 오류:', err);
          this._showToast(`상태 변경 중 오류가 발생했습니다: ${err.message || 'DB 오류'}`);
        }
      } else {
        this._showToast(`판매 상태가 '${newStatus}'(으)로 변경되었습니다.`);
      }
    },

    /**
     * 작성자가 [✏️ 수정] 버튼 클릭 시 글쓰기 화면을 수정 모드로 오픈
     */
    _handleEditPost() {
      if (!this.currentProduct) return;
      const targetProduct = this.currentProduct;
      this.close();
      if (window.GamzaWriteView && typeof window.GamzaWriteView.openForEdit === 'function') {
        window.GamzaWriteView.openForEdit(targetProduct);
      }
    },

    /**
     * 작성자가 [🗑️ 삭제] 버튼 클릭 시 Supabase DB 및 화면 목록에서 삭제
     */
    async _handleDeletePost(deleteBtn) {
      if (!this.currentProduct) return;
      const targetProduct = this.currentProduct;

      if (deleteBtn) {
        deleteBtn.disabled = true;
        deleteBtn.textContent = '삭제 중...';
      }

      try {
        if (window.GamzaSupabase && typeof window.GamzaSupabase.deleteProduct === 'function') {
          await window.GamzaSupabase.deleteProduct(targetProduct.id);
        }
        if (window.GamzaListView && typeof window.GamzaListView.removeProduct === 'function') {
          window.GamzaListView.removeProduct(targetProduct.id);
        }
        this.close();
        if (window.GamzaListView && typeof window.GamzaListView.showToast === 'function') {
          window.GamzaListView.showToast('🗑️ 게시글이 수파베이스에서 삭제되었습니다.');
        }
      } catch (err) {
        console.error('[GamzaDetailModal] 게시글 삭제 오류:', err);
        this._showToast(`삭제 실패: ${err.message || '권한 또는 네트워크 오류'}`);
      } finally {
        if (deleteBtn) {
          deleteBtn.disabled = false;
          deleteBtn.textContent = '🗑️ 삭제';
        }
      }
    },

    /**
     * [관심 추가] 클릭 피드백 처리
     */
    _handleToggleWish(wishBtn) {
      if (!this.currentProduct) return;
      const productKey = this.currentProduct.id ?? this.currentProduct.title;
      const willWish = !this.wishedProductIds.has(productKey);

      if (willWish) {
        this.wishedProductIds.add(productKey);
        this.currentProduct.isWished = true;
        wishBtn.classList.add('is-wished');
        wishBtn.setAttribute('aria-pressed', 'true');
        wishBtn.innerHTML = '❤️ 관심 등록됨';
        this._showToast('관심 목록에 추가했어요 🥔');
      } else {
        this.wishedProductIds.delete(productKey);
        this.currentProduct.isWished = false;
        wishBtn.classList.remove('is-wished');
        wishBtn.setAttribute('aria-pressed', 'false');
        wishBtn.innerHTML = '🤍 관심 추가';
        this._showToast('관심 목록에서 해제했어요');
      }
    },

    /**
     * [채팅 시작하기] 클릭 피드백 처리
     */
    _handleStartChat() {
      if (!this.currentProduct) return;
      const seller = this._extractSellerInfo(this.currentProduct);
      this._showToast(`'${seller.nickname}'님과의 감자톡 채팅방을 준비 중입니다 💬`);
    },

    /**
     * 모달 내 가벼운 토스트 피드백 표시
     */
    _showToast(message) {
      if (!this.dialog) return;
      const toast = this.dialog.querySelector('#modalFeedbackToast, .modal-feedback-toast');
      if (!toast) return;

      toast.textContent = message;
      toast.classList.add('show');

      if (this._toastTimer) {
        clearTimeout(this._toastTimer);
      }
      this._toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, 2200);
    },

    _escapeAttr(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }
  };

  // 전역 객체 노출
  window.GamzaDetailModal = GamzaDetailModal;

  // DOM 로드 시 자동 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => GamzaDetailModal.init());
  } else {
    GamzaDetailModal.init();
  }
})();


/**
 * [화면 3: 글쓰기 화면] 동작 스크립트 (screen3_write.js)
 * - window.GamzaWriteView 객체 제공: init(onProductCreated, onCancel), open(), close()
 * - 이미지 파일 업로드(FileReader) 실시간 미리보기 및 감자 마켓 테마 기본 SVG 일러스트 자동 적용
 * - 폼 제출 시 새 상품 객체 생성 후 콜백(onProductCreated) 및 window.GamzaListView.addProduct 호출
 */

(function () {
  'use strict';

  /**
   * 감자 마켓 테마의 귀여운 SVG Data URI 생성 헬퍼
   */
  function createSvgDataUri(svgString) {
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svgString.trim());
  }

  // 기본 판매자(햇감자농부) 아바타 SVG Data URI
  const DEFAULT_SELLER_AVATAR = createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <rect width="120" height="120" rx="60" fill="#F4EFE6"/>
      <ellipse cx="60" cy="66" rx="34" ry="30" fill="#D4A373" stroke="#8D5B4C" stroke-width="4"/>
      <circle cx="48" cy="60" r="4" fill="#2C221E"/>
      <circle cx="72" cy="60" r="4" fill="#2C221E"/>
      <ellipse cx="42" cy="68" rx="5" ry="3" fill="#E5989B" opacity="0.7"/>
      <ellipse cx="78" cy="68" rx="5" ry="3" fill="#E5989B" opacity="0.7"/>
      <path d="M53 70 Q60 76 67 70" fill="none" stroke="#2C221E" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M60 36 C60 24, 74 22, 72 32 C70 22, 48 22, 60 36 Z" fill="#52B788" stroke="#2D6A4F" stroke-width="2.5"/>
    </svg>
  `);

  // 카테고리/샘플별 실사 상품 사진 프리셋
  const SAMPLE_PRESETS = {
    default: {
      label: '기본 감성 소품',
      svg: 'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?auto=format&fit=crop&w=800&q=80'
    },
    digital: {
      label: '디지털/가전',
      svg: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'
    },
    living: {
      label: '가구/인테리어',
      svg: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
    },
    fashion: {
      label: '의류/잡화',
      svg: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80'
    }
  };

  // 카테고리별 기본 이미지 매핑
  const CATEGORY_TO_PRESET_KEY = {
    '디지털기기': 'digital',
    '생활가전': 'digital',
    '가구/인테리어': 'living',
    '의류': 'fashion',
    '도서/티켓': 'default',
    '기타': 'default'
  };

  const CATEGORIES = [
    '디지털기기',
    '가구/인테리어',
    '의류',
    '생활가전',
    '도서/티켓',
    '기타'
  ];

  const GamzaWriteView = {
    _onProductCreated: null,
    _onCancel: null,
    _currentImageDataUrl: SAMPLE_PRESETS.default.svg,
    _isCustomFileUploaded: false,
    _selectedPresetKey: 'default',
    _initialized: false,

    /**
     * 글쓰기 화면 초기화
     * @param {Function} onProductCreated - 새 상품 등록 시 호출될 콜백 (newProduct 전달)
     * @param {Function} onCancel - 취소/뒤로가기 버튼 클릭 시 호출될 콜백
     */
    init: function (onProductCreated, onCancel) {
      if (typeof onProductCreated === 'function') {
        this._onProductCreated = onProductCreated;
      }
      if (typeof onCancel === 'function') {
        this._onCancel = onCancel;
      }

      this._ensureDomStructure();
      this._bindEvents();
      this._resetForm();
      this._initialized = true;
    },

    /**
     * 페이지 내 .write-view-section 또는 #writeViewSection 컨테이너를 찾아
     * 내부에 #writeForm이 없으면 표준 7개 필수 입력 폼 DOM을 렌더링합니다.
     */
    _ensureDomStructure: function () {
      let section =
        document.querySelector('.write-view-section') ||
        document.getElementById('writeViewSection') ||
        document.getElementById('screen3Write') ||
        document.getElementById('write-section');

      if (!section) {
        section = document.createElement('section');
        section.id = 'writeViewSection';
        section.className = 'write-view-section';
        section.hidden = true;
        const mainContainer =
          document.querySelector('main') ||
          document.getElementById('app') ||
          document.body;
        mainContainer.appendChild(section);
      } else if (!section.classList.contains('write-view-section')) {
        section.classList.add('write-view-section');
      }

      this._sectionEl = section;

      // 내부에 #writeForm이 아직 없다면 마크업 생성
      if (!section.querySelector('#writeForm')) {
        section.innerHTML = `
          <div class="write-header">
            <div class="write-header-left">
              <button type="button" id="cancelWriteBtn" class="btn-cancel-write" aria-label="목록으로 돌아가기">
                <span>←</span>
                <span>취소 / 목록으로</span>
              </button>
              <h2 class="write-header-title">내 물건 팔기 / 글쓰기</h2>
            </div>
            <span class="write-header-badge">🥔 감자마켓 동네거래</span>
          </div>

          <form id="writeForm" class="write-form-card" novalidate>
            <!-- 1. 상품 이미지 업로드 및 미리보기 -->
            <div class="form-group">
              <div class="form-label">
                <span class="form-label-left">1. 상품 이미지 <span class="required-dot">*</span></span>
                <span class="form-hint">미첨부 시 귀여운 감자 일러스트가 자동 적용됩니다</span>
              </div>
              <div class="image-upload-wrapper">
                <label class="image-upload-box" for="inputImage">
                  <input type="file" id="inputImage" accept="image/*" />
                  <span class="image-upload-icon">📷</span>
                  <span class="image-upload-text">내 PC에서<br/>사진 올리기</span>
                </label>

                <div class="image-preview-card" id="imagePreviewCard">
                  <img id="imagePreviewImg" src="${SAMPLE_PRESETS.default.svg}" alt="상품 이미지 미리보기" />
                  <span class="image-preview-badge" id="imagePreviewBadge">기본 샘플</span>
                  <button type="button" class="btn-reset-image" id="resetImageBtn" title="기본 이미지로 되돌리기" aria-label="이미지 초기화">✕</button>
                </div>

                <div class="sample-preset-panel">
                  <p class="sample-preset-title">사진이 없나요? 샘플 일러스트를 골라보세요</p>
                  <div class="sample-preset-list" id="samplePresetList">
                    <button type="button" class="btn-sample-preset active" data-preset="default">🥔 포근 감자박스</button>
                    <button type="button" class="btn-sample-preset" data-preset="digital">💻 디지털/가전</button>
                    <button type="button" class="btn-sample-preset" data-preset="living">🛋️ 인테리어 소품</button>
                    <button type="button" class="btn-sample-preset" data-preset="fashion">👕 의류/잡화</button>
                  </div>
                  <p class="sample-preset-notice">※ 사진을 직접 올리지 않아도 바로 등록을 테스트할 수 있어요.</p>
                </div>
              </div>
            </div>

            <!-- 2. 상품명 -->
            <div class="form-group">
              <label class="form-label" for="inputTitle">
                <span class="form-label-left">2. 상품명 <span class="required-dot">*</span></span>
                <span class="form-hint">무엇을 판매하시나요?</span>
              </label>
              <input
                type="text"
                id="inputTitle"
                class="form-input"
                placeholder="예) 아이패드 에어 5세대 64GB 스페이스 그레이 풀박스"
                maxlength="60"
                required
              />
            </div>

            <!-- 3. 카테고리 & 4. 가격 (2열 배치) -->
            <div class="form-row-2col">
              <div class="form-group">
                <label class="form-label" for="inputCategory">
                  <span class="form-label-left">3. 카테고리 <span class="required-dot">*</span></span>
                </label>
                <select id="inputCategory" class="form-select" required>
                  ${CATEGORIES.map((cat) => `<option value="${cat}">${cat}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="inputPrice">
                  <span class="form-label-left">4. 가격 <span class="required-dot">*</span></span>
                  <span class="form-hint">0원 입력 시 나눔</span>
                </label>
                <div class="price-input-wrapper">
                  <input
                    type="number"
                    id="inputPrice"
                    class="form-input"
                    placeholder="가격을 입력해 주세요"
                    min="0"
                    step="100"
                    required
                  />
                  <span class="price-unit-suffix">원</span>
                </div>
              </div>
            </div>

            <!-- 5. 자세한 설명 -->
            <div class="form-group">
              <label class="form-label" for="inputDescription">
                <span class="form-label-left">5. 자세한 설명 <span class="required-dot">*</span></span>
                <span class="form-hint">구매 시기, 사용감, 직거래 가능 시간 등을 적어주세요 (최대 500자)</span>
              </label>
              <textarea
                id="inputDescription"
                class="form-textarea"
                placeholder="동네 이웃이 안심하고 거래할 수 있도록 상품 상태(미개봉, 생활기스 여부 등)와 희망 거래 방식을 자세히 적어주세요. (최대 500자)"
                maxlength="500"
                aria-describedby="descCharCount"
                required
              ></textarea>
              <div id="descCharCount" class="form-char-count" aria-live="polite">
                <span id="descCurrentLength">0</span> / 500자
              </div>
            </div>

            <!-- 6. 거래 동네 -->
            <div class="form-group">
              <label class="form-label" for="inputLocation">
                <span class="form-label-left">6. 거래 동네 <span class="required-dot">*</span></span>
                <span class="form-hint">직거래를 희망하는 동네 이름</span>
              </label>
              <input
                type="text"
                id="inputLocation"
                class="form-input"
                placeholder="예) 감자구 알감자동"
                value="감자구 알감자동"
                required
              />
              <div class="location-quick-chips" id="locationQuickChips">
                <button type="button" class="btn-location-chip" data-location="감자구 알감자동">📍 감자구 알감자동</button>
                <button type="button" class="btn-location-chip" data-location="감자구 햇감자동">📍 감자구 햇감자동</button>
                <button type="button" class="btn-location-chip" data-location="감자구 통감자동">📍 감자구 통감자동</button>
                <button type="button" class="btn-location-chip" data-location="감자구 포슬동">📍 감자구 포슬동</button>
              </div>
            </div>

            <!-- 7. 판매 상태 -->
            <div class="form-group">
              <div class="form-label">
                <span class="form-label-left">7. 판매 상태 <span class="required-dot">*</span></span>
                <span class="form-hint">등록 시점의 상품 거래 상태를 선택해 주세요</span>
              </div>
              <div class="status-radio-group" role="radiogroup" aria-label="판매 상태 선택">
                <label class="status-radio-option">
                  <input type="radio" name="inputStatus" value="판매중" checked />
                  <span class="status-radio-label">
                    <span class="status-dot sale"></span>
                    <span>판매중</span>
                  </span>
                </label>
                <label class="status-radio-option">
                  <input type="radio" name="inputStatus" value="예약중" />
                  <span class="status-radio-label">
                    <span class="status-dot reserved"></span>
                    <span>예약중</span>
                  </span>
                </label>
                <label class="status-radio-option">
                  <input type="radio" name="inputStatus" value="거래 완료" />
                  <span class="status-radio-label">
                    <span class="status-dot sold"></span>
                    <span>거래 완료</span>
                  </span>
                </label>
              </div>
            </div>

            <div id="writeFormError" class="write-form-error" role="alert"></div>

            <!-- 하단 작성 완료 버튼 -->
            <div class="write-submit-area">
              <button type="submit" id="submitWriteBtn" class="btn-submit-write">
                작성 완료
              </button>
              <p class="write-memory-notice">
                🟢 등록된 상품은 Supabase 데이터베이스(products) 및 스토리지(product-images)에 영구 저장됩니다.
              </p>
            </div>
          </form>
        `;
      }
    },

    /**
     * 이벤트 리스너 바인딩 (중복 바인딩 방지)
     */
    _bindEvents: function () {
      const section = this._sectionEl;
      if (!section || section.dataset.writeBound === 'true') {
        return;
      }
      section.dataset.writeBound = 'true';

      const form = section.querySelector('#writeForm');
      const cancelBtn = section.querySelector('#cancelWriteBtn');
      const fileInput = section.querySelector('#inputImage') || section.querySelector('input[type="file"]');
      const resetImageBtn = section.querySelector('#resetImageBtn');
      const presetList = section.querySelector('#samplePresetList');
      const categorySelect = section.querySelector('#inputCategory');
      const locationChips = section.querySelector('#locationQuickChips');

      // 취소 / 뒤로가기 버튼
      if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
          this.close();
          if (typeof this._onCancel === 'function') {
            this._onCancel();
          }
        });
      }

      // 파일 업로드 시 FileReader로 즉시 미리보기 표시
      if (fileInput) {
        fileInput.addEventListener('change', (e) => {
          const file = e.target.files && e.target.files[0];
          if (!file) return;

          if (!file.type.startsWith('image/')) {
            this._showError('이미지 파일(JPG, PNG, GIF, WEBP 등)만 업로드할 수 있습니다.');
            fileInput.value = '';
            return;
          }

          const reader = new FileReader();
          reader.onload = (loadEvent) => {
            const resultUrl = loadEvent.target && loadEvent.target.result;
            if (typeof resultUrl === 'string') {
              this._currentImageDataUrl = resultUrl;
              this._isCustomFileUploaded = true;
              this._uploadedFile = file;
              this._updateImagePreviewUI(resultUrl, '업로드 사진');
              this._highlightPresetButton(null);
            }
          };
          reader.readAsDataURL(file);
        });
      }

      // 이미지 초기화 버튼
      if (resetImageBtn) {
        resetImageBtn.addEventListener('click', () => {
          if (fileInput) fileInput.value = '';
          this._isCustomFileUploaded = false;
          this._uploadedFile = null;
          this._applyPresetImage(this._selectedPresetKey || 'default');
        });
      }

      // 샘플 일러스트 프리셋 버튼 클릭
      if (presetList) {
        presetList.addEventListener('click', (e) => {
          const btn = e.target.closest('.btn-sample-preset');
          if (!btn) return;
          const presetKey = btn.getAttribute('data-preset') || 'default';
          if (fileInput) fileInput.value = '';
          this._isCustomFileUploaded = false;
          this._uploadedFile = null;
          this._applyPresetImage(presetKey);
        });
      }

      // 카테고리 변경 시 사용자가 별도 파일 업로드를 안 했다면 어울리는 기본 일러스트로 자동 전환
      if (categorySelect) {
        categorySelect.addEventListener('change', () => {
          if (!this._isCustomFileUploaded) {
            const matchedKey = CATEGORY_TO_PRESET_KEY[categorySelect.value] || 'default';
            this._applyPresetImage(matchedKey);
          }
        });
      }

      // 거래 동네 빠른 입력 칩
      if (locationChips) {
        locationChips.addEventListener('click', (e) => {
          const chip = e.target.closest('.btn-location-chip');
          if (!chip) return;
          const locationInput = section.querySelector('#inputLocation');
          if (locationInput) {
            locationInput.value = chip.getAttribute('data-location') || '';
            locationInput.focus();
          }
        });
      }

      // 자세한 설명 최대 500자 제한 및 실시간 글자 수 카운터
      const descInput = section.querySelector('#inputDescription');
      if (descInput) {
        descInput.addEventListener('input', () => {
          if (descInput.value.length > 500) {
            descInput.value = descInput.value.slice(0, 500);
          }
          descInput.setCustomValidity('');
          this._updateDescCounter(descInput.value.length);
        });
      }

      // 폼 제출 ([작성 완료])
      if (form) {
        form.addEventListener('submit', (event) => {
          event.preventDefault();
          this._handleSubmit();
        });
      }
    },

    /**
     * 자세한 설명 글자 수 카운터 UI 갱신 (최대 500자)
     */
    _updateDescCounter: function (length) {
      if (!this._sectionEl) return;
      const countEl = this._sectionEl.querySelector('#descCurrentLength');
      const wrapEl = this._sectionEl.querySelector('#descCharCount');
      const safeLen = Math.min(Math.max(0, Number(length) || 0), 500);
      if (countEl) {
        countEl.textContent = String(safeLen);
      }
      if (wrapEl) {
        wrapEl.classList.toggle('is-limit', safeLen >= 500);
      }
    },

    /**
     * 프리셋 샘플 이미지를 적용하고 UI를 갱신합니다.
     */
    _applyPresetImage: function (presetKey) {
      const preset = SAMPLE_PRESETS[presetKey] || SAMPLE_PRESETS.default;
      this._selectedPresetKey = SAMPLE_PRESETS[presetKey] ? presetKey : 'default';
      this._currentImageDataUrl = preset.svg;
      this._updateImagePreviewUI(preset.svg, preset.label);
      this._highlightPresetButton(this._selectedPresetKey);
    },

    /**
     * 미리보기 이미지 DOM 업데이트
     */
    _updateImagePreviewUI: function (src, badgeText) {
      if (!this._sectionEl) return;
      const previewImg = this._sectionEl.querySelector('#imagePreviewImg');
      const previewBadge = this._sectionEl.querySelector('#imagePreviewBadge');

      if (previewImg) {
        previewImg.src = src;
      }
      if (previewBadge && badgeText) {
        previewBadge.textContent = badgeText;
      }
    },

    /**
     * 활성화된 프리셋 버튼 스타일 표시
     */
    _highlightPresetButton: function (activeKey) {
      if (!this._sectionEl) return;
      const buttons = this._sectionEl.querySelectorAll('.btn-sample-preset');
      buttons.forEach((btn) => {
        if (activeKey && btn.getAttribute('data-preset') === activeKey) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    },

    /**
     * 에러 메시지 표시 / 숨김
     */
    _showError: function (message) {
      if (!this._sectionEl) return;
      const errorEl = this._sectionEl.querySelector('#writeFormError');
      if (!errorEl) return;

      if (message) {
        errorEl.textContent = '⚠️ ' + message;
        errorEl.classList.add('visible');
      } else {
        errorEl.textContent = '';
        errorEl.classList.remove('visible');
      }
    },

    /**
     * 폼 제출 처리 및 새 상품 객체 생성
     */
    _handleSubmit: function () {
      const section = this._sectionEl;
      if (!section) return;

      const titleEl = section.querySelector('#inputTitle');
      const categoryEl = section.querySelector('#inputCategory');
      const priceEl = section.querySelector('#inputPrice');
      const descEl = section.querySelector('#inputDescription');
      const locationEl = section.querySelector('#inputLocation');
      const statusRadio = section.querySelector('input[name="inputStatus"]:checked');
      const statusSelect = section.querySelector('#inputStatus');

      const title = titleEl ? titleEl.value.trim() : '';
      const category = categoryEl ? categoryEl.value.trim() : '기타';
      const rawPrice = priceEl ? priceEl.value.trim() : '';
      const description = descEl ? descEl.value.trim() : '';
      const location = locationEl ? locationEl.value.trim() : '';
      const status = statusRadio
        ? statusRadio.value
        : statusSelect
        ? statusSelect.value
        : '판매중';

      // 필수 입력 검증
      if (!title) {
        this._showError('상품명을 입력해 주세요.');
        if (titleEl) titleEl.focus();
        return;
      }

      if (rawPrice === '' || isNaN(Number(rawPrice)) || Number(rawPrice) < 0) {
        this._showError('올바른 가격(0원 이상 숫자)을 입력해 주세요.');
        if (priceEl) priceEl.focus();
        return;
      }

      if (!description) {
        this._showError('상품에 대한 자세한 설명을 입력해 주세요.');
        if (descEl) descEl.focus();
        return;
      }

      if (description.length > 500) {
        this._showError('자세한 설명은 최대 500자까지 입력할 수 있습니다.');
        if (descEl) descEl.focus();
        return;
      }

      if (!location) {
        this._showError('거래 희망 동네를 입력해 주세요. (예: 감자구 알감자동)');
        if (locationEl) locationEl.focus();
        return;
      }

      this._showError('');

      const priceNumber = Math.floor(Number(rawPrice));
      const finalImage = this._currentImageDataUrl || SAMPLE_PRESETS.default.svg;
      const currentUser =
        window.GamzaAuth && typeof window.GamzaAuth.getCurrentUser === 'function'
          ? window.GamzaAuth.getCurrentUser()
          : null;
      const currentSellerId = currentUser && currentUser.id ? currentUser.id : null;
      const currentSellerNickname =
        currentUser && currentUser.nickname ? currentUser.nickname : '햇감자농부';
      const currentSellerAvatar =
        (currentUser && currentUser.avatar) ||
        (window.GamzaListView && typeof window.GamzaListView.createAvatarSvgDataUri === 'function'
          ? window.GamzaListView.createAvatarSvgDataUri(currentSellerNickname, '#F3E9E4', '#C6956E')
          : DEFAULT_SELLER_AVATAR);

      // 새 상품 객체 생성 (화면 1, 화면 2와 완벽히 호환되는 필드 구성)
      const newProduct = {
        id: Date.now(),
        title: title,
        category: category,
        price: priceNumber,
        description: description,
        location: location,
        region: location,
        status: status,
        image: finalImage,
        imageUrl: finalImage,
        thumbnail: finalImage,
        rawFile: this._isCustomFileUploaded ? this._uploadedFile : null,
        presetKey: this._isCustomFileUploaded ? null : (this._selectedPresetKey || 'default'),
        timeAgo: '방금 전',
        createdAt: '방금 전',
        likes: 0,
        chats: 0,
        views: 1,
        sellerId: currentSellerId,
        seller: {
          id: currentSellerId,
          nickname: currentSellerNickname,
          avatar: currentSellerAvatar,
          region: location,
          mannerTemp: '39.5°C'
        }
      };

      const submitBtn = section.querySelector('#submitWriteBtn');
      const isEditing = Boolean(this._editingProduct && this._editingProduct.id);

      if (isEditing) {
        const editingId = this._editingProduct.id;
        newProduct.id = editingId;

        if (window.GamzaSupabase && typeof window.GamzaSupabase.updateProduct === 'function') {
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = '🥔 수정 내용 저장 중...';
          }
          window.GamzaSupabase.updateProduct(editingId, newProduct)
            .then((savedProduct) => {
              const productToRender = savedProduct || newProduct;
              if (window.GamzaListView && typeof window.GamzaListView.updateProduct === 'function') {
                window.GamzaListView.updateProduct(productToRender);
              }
              this._resetForm();
              this.close();
            })
            .catch((err) => {
              console.error('[GamzaSupabase] 상품 수정 실패:', err);
              this._showError('게시글 수정 중 오류가 발생했습니다: ' + (err.message || '네트워크 오류'));
            })
            .finally(() => {
              if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = this._editingProduct ? '수정 완료' : '작성 완료';
              }
            });
          return;
        }

        if (window.GamzaListView && typeof window.GamzaListView.updateProduct === 'function') {
          window.GamzaListView.updateProduct(newProduct);
        }
        this._resetForm();
        this.close();
        return;
      }

      if (window.GamzaSupabase && typeof window.GamzaSupabase.createProduct === 'function') {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = '🥔 수파베이스에 저장 중...';
        }
        window.GamzaSupabase.createProduct(newProduct)
          .then((savedProduct) => {
            const productToRender = savedProduct || newProduct;
            if (typeof this._onProductCreated === 'function') {
              this._onProductCreated(productToRender);
            } else if (
              window.GamzaListView &&
              typeof window.GamzaListView.addProduct === 'function'
            ) {
              window.GamzaListView.addProduct(productToRender);
            }
            this._resetForm();
            this.close();
          })
          .catch((err) => {
            console.error('[GamzaSupabase] 상품 등록 실패:', err);
            this._showError('수파베이스 저장 중 오류가 발생했습니다: ' + (err.message || '네트워크 오류'));
          })
          .finally(() => {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = '작성 완료';
            }
          });
        return;
      }

      // 콜백 또는 window.GamzaListView.addProduct 호출 (중복 추가 방지)
      if (typeof this._onProductCreated === 'function') {
        this._onProductCreated(newProduct);
      } else if (
        window.GamzaListView &&
        typeof window.GamzaListView.addProduct === 'function'
      ) {
        window.GamzaListView.addProduct(newProduct);
      }

      // 폼 초기화 및 화면 닫기 (목록 화면으로 복귀)
      this._resetForm();
      this.close();
    },

    /**
     * 입력 폼을 초기 상태로 리셋
     */
    _resetForm: function () {
      if (!this._sectionEl) return;
      const form = this._sectionEl.querySelector('#writeForm');
      if (form) {
        form.reset();
      }

      this._editingProduct = null;

      const headerTitleEl = this._sectionEl.querySelector('.write-header-title');
      if (headerTitleEl) {
        headerTitleEl.textContent = '내 물건 팔기 / 글쓰기';
      }
      const submitBtn = this._sectionEl.querySelector('#submitWriteBtn');
      if (submitBtn) {
        submitBtn.textContent = '작성 완료';
      }

      const locationEl = this._sectionEl.querySelector('#inputLocation');
      if (locationEl && !locationEl.value) {
        locationEl.value = '감자구 알감자동';
      }

      const defaultStatusRadio = this._sectionEl.querySelector(
        'input[name="inputStatus"][value="판매중"]'
      );
      if (defaultStatusRadio) {
        defaultStatusRadio.checked = true;
      }

      this._isCustomFileUploaded = false;
      this._uploadedFile = null;
      this._applyPresetImage('default');
      this._updateDescCounter(0);
      this._showError('');
    },

    /**
     * 글쓰기 화면 열기 (신규 작성 모드)
     */
    open: function () {
      if (!this._initialized) {
        this.init(this._onProductCreated, this._onCancel);
      }
      this._resetForm();
      if (window.GamzaListView && typeof window.GamzaListView.hide === 'function') {
        window.GamzaListView.hide();
      } else {
        const listViewEl = document.getElementById('listView') || document.getElementById('screen1List');
        if (listViewEl) listViewEl.classList.add('hidden');
      }
      if (this._sectionEl) {
        this._sectionEl.hidden = false;
        this._sectionEl.classList.remove('hidden');
        this._sectionEl.style.display = '';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });

      const titleInput = this._sectionEl && this._sectionEl.querySelector('#inputTitle');
      if (titleInput) {
        setTimeout(() => titleInput.focus(), 80);
      }
    },

    /**
     * 기존 게시글 수정 모드로 글쓰기 화면 열기
     */
    openForEdit: function (product) {
      if (!product) return;
      if (!this._initialized) {
        this.init(this._onProductCreated, this._onCancel);
      }
      this._resetForm();
      this._editingProduct = product;

      const section = this._sectionEl;
      if (!section) return;

      const headerTitleEl = section.querySelector('.write-header-title');
      if (headerTitleEl) {
        headerTitleEl.textContent = '내 게시글 수정하기';
      }
      const submitBtn = section.querySelector('#submitWriteBtn');
      if (submitBtn) {
        submitBtn.textContent = '수정 완료';
      }

      const titleEl = section.querySelector('#inputTitle');
      const categoryEl = section.querySelector('#inputCategory');
      const priceEl = section.querySelector('#inputPrice');
      const descEl = section.querySelector('#inputDescription');
      const locationEl = section.querySelector('#inputLocation');

      if (titleEl) titleEl.value = product.title || '';
      if (categoryEl && product.category) categoryEl.value = product.category;
      if (priceEl) priceEl.value = Number(product.price) || 0;
      if (descEl) {
        descEl.value = product.description || '';
        this._updateDescCounter(descEl.value.length);
      }
      if (locationEl) locationEl.value = product.location || '감자구 알감자동';

      const statusRadio = section.querySelector(
        `input[name="inputStatus"][value="${product.status || '판매중'}"]`
      );
      if (statusRadio) {
        statusRadio.checked = true;
      }

      if (product.image) {
        this._currentImageDataUrl = product.image;
        this._updateImagePreviewUI(product.image, '현재 상품 사진');
      }

      if (window.GamzaListView && typeof window.GamzaListView.hide === 'function') {
        window.GamzaListView.hide();
      } else {
        const listViewEl = document.getElementById('listView') || document.getElementById('screen1List');
        if (listViewEl) listViewEl.classList.add('hidden');
      }

      section.hidden = false;
      section.classList.remove('hidden');
      section.style.display = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (titleEl) {
        setTimeout(() => titleEl.focus(), 80);
      }
    },

    /**
     * 글쓰기 화면 닫기
     */
    close: function () {
      if (this._sectionEl) {
        this._sectionEl.hidden = true;
        this._sectionEl.classList.add('hidden');
      }
      if (window.GamzaListView && typeof window.GamzaListView.show === 'function') {
        window.GamzaListView.show();
      } else {
        const listViewEl = document.getElementById('listView') || document.getElementById('screen1List');
        if (listViewEl) listViewEl.classList.remove('hidden');
      }
    }
  };

  window.GamzaWriteView = GamzaWriteView;
})();

/* ==========================================================================
   [Supabase 연동 모듈] window.GamzaSupabase
   - Project URL: https://sbsgcdymvorawadqmoir.supabase.co
   - public.products 테이블 조회/등록 및 storage(product-images 버킷) 이미지 업로드
   - 개인 식별 정보(PII)를 일절 사용하지 않고 익명/닉네임 기반으로 동작
   ========================================================================== */
(function () {
  'use strict';

  var SUPABASE_URL = 'https://sbsgcdymvorawadqmoir.supabase.co';
  var SUPABASE_ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNic2djZHltdm9yYXdhZHFtb2lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0MDc1OTIsImV4cCI6MjEwNzk4MzU5Mn0.U1eWnOa7VO-E4k0Uv22tcRGSiYqtND79xs6_nReMl7g';
  var STORAGE_BUCKET = 'product-images';

  var supabaseClient = null;
  if (window.supabase && typeof window.supabase.createClient === 'function') {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  /**
   * ISO 시간 문자열을 한국어 상대 시간(방금 전, N분 전, N시간 전, 어제, N일 전)으로 변환
   */
  function formatTimeAgo(isoString) {
    if (!isoString) return '방금 전';
    var createdDate = new Date(isoString);
    if (isNaN(createdDate.getTime())) {
      return String(isoString);
    }
    var diffSec = Math.max(0, Math.floor((Date.now() - createdDate.getTime()) / 1000));
    if (diffSec < 60) return '방금 전';
    var diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return diffMin + '분 전';
    var diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return diffHour + '시간 전';
    var diffDay = Math.floor(diffHour / 24);
    if (diffDay === 1) return '어제';
    if (diffDay < 30) return diffDay + '일 전';
    return createdDate.toLocaleDateString('ko-KR');
  }

  var CATEGORY_DEFAULT_PHOTOS = {
    '디지털기기': 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80',
    '가구/인테리어': 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    '생활가전': 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80',
    '의류': 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
    '도서/티켓': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    '기타': 'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?auto=format&fit=crop&w=800&q=80'
  };

  /**
   * DB의 image_url(프리셋 키, HTTP URL, Data URI)을 화면 표시용 실사 이미지 주소로 변환
   */
  function resolveProductImage(row) {
    var rawUrl = (row && row.image_url) ? String(row.image_url).trim() : '';

    // 1) 초기 시드 상품 6종과 제목이 일치하면 실사 상품 사진 매칭
    if (Array.isArray(window.GAMZA_INITIAL_PRODUCTS) && row && row.title) {
      for (var i = 0; i < window.GAMZA_INITIAL_PRODUCTS.length; i++) {
        var seed = window.GAMZA_INITIAL_PRODUCTS[i];
        if (seed.title === row.title && (!rawUrl || rawUrl.indexOf('preset:') === 0 || rawUrl.indexOf('data:image/svg') === 0)) {
          return seed.image;
        }
      }
    }

    // 2) Storage 공개 URL 또는 업로드된 이미지 Data URI인 경우 그대로 반환
    if (
      rawUrl.indexOf('http://') === 0 ||
      rawUrl.indexOf('https://') === 0 ||
      (rawUrl.indexOf('data:image/') === 0 && rawUrl.indexOf('data:image/svg') !== 0)
    ) {
      return rawUrl;
    }

    // 3) 카테고리별 기본 실사 사진 반환
    var cat = (row && row.category) || '기타';
    return CATEGORY_DEFAULT_PHOTOS[cat] || CATEGORY_DEFAULT_PHOTOS['기타'];
  }

  /**
   * DB 행(row)을 프론트엔드(화면 1, 화면 2) 상품 객체 규격으로 매핑
   */
  function mapRowToProduct(row) {
    var profileObj = row && row.profiles
      ? (Array.isArray(row.profiles) ? row.profiles[0] : row.profiles)
      : null;
    var nickname =
      (profileObj && profileObj.nickname) ||
      row.seller_nickname ||
      '햇감자농부';
    var avatar =
      (profileObj && profileObj.avatar_url) ||
      row.seller_avatar;
    if (
      !avatar &&
      window.GamzaListView &&
      typeof window.GamzaListView.createAvatarSvgDataUri === 'function'
    ) {
      avatar = window.GamzaListView.createAvatarSvgDataUri(nickname, '#F3E9E4', '#C6956E');
    }

    var resolvedImg = resolveProductImage(row);
    var timeText = formatTimeAgo(row.created_at);

    return {
      id: row.id,
      title: row.title,
      category: row.category || '기타',
      price: Number(row.price) || 0,
      description: row.description || '',
      location: row.location || '감자구 알감자동',
      region: row.location || '감자구 알감자동',
      status: row.status || '판매중',
      image: resolvedImg,
      imageUrl: resolvedImg,
      thumbnail: resolvedImg,
      timeAgo: timeText,
      createdAt: row.created_at,
      sellerId: row.seller_id || null,
      seller: {
        id: row.seller_id || null,
        nickname: nickname,
        avatar: avatar,
        region: row.location || '감자구 알감자동'
      }
    };
  }

  var GamzaSupabase = {
    client: supabaseClient,

    /**
     * Supabase public.products 테이블에서 전체 상품 목록 조회 (작성자 프로필 조인 + 최신순)
     */
    fetchProducts: async function () {
      if (!this.client) return null;
      var result = await this.client
        .from('products')
        .select('*, profiles:seller_id(nickname, avatar_url, region)')
        .order('created_at', { ascending: false });

      if (result.error) {
        // 조인 실패 시 단일 테이블 폴백 조회
        var fallbackRes = await this.client
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        if (fallbackRes.error) {
          throw fallbackRes.error;
        }
        return (fallbackRes.data || []).map(mapRowToProduct);
      }
      var rows = Array.isArray(result.data) ? result.data : [];
      return rows.map(mapRowToProduct);
    },

    /**
     * 이미지 파일을 Supabase Storage (product-images 버킷)에 업로드하고 공개 URL 반환
     */
    uploadProductImage: async function (file) {
      if (!this.client || !file) return null;
      var ext = (file.name && file.name.indexOf('.') !== -1)
        ? file.name.split('.').pop().toLowerCase().replace(/[^a-z0-9]/g, '')
        : 'png';
      var filePath = 'items/' + Date.now() + '_' + Math.random().toString(36).slice(2, 8) + '.' + (ext || 'png');

      var uploadRes = await this.client.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type || 'image/png'
        });

      if (uploadRes.error) {
        console.warn('[GamzaSupabase] Storage 업로드 폴백(Data URI 사용):', uploadRes.error.message);
        return null;
      }

      var publicUrlData = this.client.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);
      return publicUrlData && publicUrlData.data && publicUrlData.data.publicUrl
        ? publicUrlData.data.publicUrl
        : null;
    },

    /**
     * 새 상품을 Supabase Storage 및 public.products 테이블에 작성자 정보와 함께 저장
     */
    createProduct: async function (newProductInput) {
      if (!this.client) return newProductInput;

      var imageUrlToSave = newProductInput.image;
      if (newProductInput.rawFile) {
        var uploadedUrl = await this.uploadProductImage(newProductInput.rawFile);
        if (uploadedUrl) {
          imageUrlToSave = uploadedUrl;
        }
      }

      var currentUser =
        window.GamzaAuth && typeof window.GamzaAuth.getCurrentUser === 'function'
          ? window.GamzaAuth.getCurrentUser()
          : null;

      var sellerId =
        newProductInput.sellerId ||
        (newProductInput.seller && newProductInput.seller.id) ||
        (currentUser && currentUser.id) ||
        null;
      var sellerNickname =
        (currentUser && currentUser.nickname) ||
        (newProductInput.seller && newProductInput.seller.nickname) ||
        '햇감자농부';
      var sellerAvatar =
        (currentUser && currentUser.avatar) ||
        (newProductInput.seller && newProductInput.seller.avatar) ||
        null;

      // 로그인된 작성자인 경우 public.profiles 행 보장 (FK 무결성 및 닉네임 동기화)
      if (sellerId) {
        await this.client.from('profiles').upsert(
          [
            {
              id: sellerId,
              nickname: sellerNickname,
              avatar_url: sellerAvatar,
              region: newProductInput.location || '감자구 알감자동'
            }
          ],
          { onConflict: 'id' }
        );
      }

      var payload = {
        title: String(newProductInput.title || '').slice(0, 60),
        category: newProductInput.category || '기타',
        price: Math.max(0, Math.floor(Number(newProductInput.price) || 0)),
        description: String(newProductInput.description || '').slice(0, 500),
        location: newProductInput.location || '감자구 알감자동',
        status: newProductInput.status || '판매중',
        image_url: imageUrlToSave,
        seller_id: sellerId,
        seller_nickname: sellerNickname,
        seller_avatar: sellerAvatar
      };

      var insertRes = await this.client
        .from('products')
        .insert([payload])
        .select('*, profiles:seller_id(nickname, avatar_url, region)')
        .single();

      if (insertRes.error) {
        throw insertRes.error;
      }

      return mapRowToProduct(insertRes.data);
    },

    /**
     * 게시글 판매 상태(판매중 / 예약중 / 거래 완료)를 Supabase public.products에 업데이트
     */
    updateProductStatus: async function (productId, newStatus) {
      if (!this.client || !productId) return null;
      var updateRes = await this.client
        .from('products')
        .update({ status: newStatus })
        .eq('id', productId)
        .select('*, profiles:seller_id(nickname, avatar_url, region)')
        .maybeSingle();

      if (updateRes.error) {
        throw updateRes.error;
      }
      return updateRes.data ? mapRowToProduct(updateRes.data) : null;
    },

    /**
     * 게시글 전체 내용을 Supabase public.products에 수정 저장
     */
    updateProduct: async function (productId, productInput) {
      if (!this.client || !productId) return productInput;

      var imageUrlToSave = productInput.image;
      if (productInput.rawFile) {
        var uploadedUrl = await this.uploadProductImage(productInput.rawFile);
        if (uploadedUrl) {
          imageUrlToSave = uploadedUrl;
        }
      }

      var updatePayload = {
        title: String(productInput.title || '').slice(0, 60),
        category: productInput.category || '기타',
        price: Math.max(0, Math.floor(Number(productInput.price) || 0)),
        description: String(productInput.description || '').slice(0, 500),
        location: productInput.location || '감자구 알감자동',
        status: productInput.status || '판매중',
        image_url: imageUrlToSave
      };

      var updateRes = await this.client
        .from('products')
        .update(updatePayload)
        .eq('id', productId)
        .select('*, profiles:seller_id(nickname, avatar_url, region)')
        .single();

      if (updateRes.error) {
        throw updateRes.error;
      }
      return mapRowToProduct(updateRes.data);
    },

    /**
     * 게시글을 Supabase public.products에서 삭제
     */
    deleteProduct: async function (productId) {
      if (!this.client || !productId) return false;
      var deleteRes = await this.client
        .from('products')
        .delete()
        .eq('id', productId);

      if (deleteRes.error) {
        throw deleteRes.error;
      }
      return true;
    }
  };

  window.GamzaSupabase = GamzaSupabase;
})();

/* ==========================================================================
   [Supabase Auth 인증 & 모달 컨트롤러] window.GamzaAuth
   - 이메일/비밀번호 회원가입(닉네임 필수) 및 로그인 모달 제어
   - 상단 헤더 버튼 전환:
     * 로그인 전: [로그인] 버튼만 표시
     * 로그인 후: [로그인] 버튼 숨김, [닉네임] + [로그아웃] 버튼만 표시
   - 비로그인 상태에서 [글쓰기] 클릭 시 로그인 모달 선행 -> 로그인 성공 시 글쓰기 창 자동 오픈
   ========================================================================== */
(function () {
  'use strict';

  var GamzaAuth = {
    currentUser: null,
    dialog: null,
    _mode: 'signin',
    _onSuccessOpenWrite: false,
    _initialized: false,

    init: function () {
      var self = this;
      this.dialog = document.getElementById('authDialog');
      this._bindEvents();
      this._syncHeaderUI();

      var client = window.GamzaSupabase && window.GamzaSupabase.client;
      if (!client) return;

      // 초기 세션 복원
      client.auth.getSession().then(function (res) {
        var session = res && res.data && res.data.session;
        if (session && session.user) {
          self._loadUserProfile(session.user).then(function () {
            self._syncHeaderUI();
          });
        } else {
          self.currentUser = null;
          self._syncHeaderUI();
        }
      });

      // 실시간 인증 상태 변경 구독
      client.auth.onAuthStateChange(function (event, session) {
        if (session && session.user) {
          self._loadUserProfile(session.user).then(function () {
            self._syncHeaderUI();
          });
        } else {
          self.currentUser = null;
          self._syncHeaderUI();
        }
      });

      this._initialized = true;
    },

    isLoggedIn: function () {
      return Boolean(this.currentUser && this.currentUser.id);
    },

    getCurrentUser: function () {
      return this.currentUser;
    },

    /**
     * auth.users 정보와 public.profiles 테이블의 닉네임을 결합하여 currentUser 설정
     */
    _loadUserProfile: async function (authUser) {
      if (!authUser) {
        this.currentUser = null;
        return null;
      }

      var client = window.GamzaSupabase && window.GamzaSupabase.client;
      var metaNickname =
        authUser.user_metadata && authUser.user_metadata.nickname
          ? String(authUser.user_metadata.nickname).trim()
          : '';
      var nickname = metaNickname || ('감자이웃_' + String(authUser.id).slice(0, 4));
      var region = '감자구 알감자동';
      var avatar = null;

      if (client) {
        try {
          var profRes = await client
            .from('profiles')
            .select('nickname, avatar_url, region')
            .eq('id', authUser.id)
            .maybeSingle();

          if (profRes && profRes.data) {
            if (profRes.data.nickname) nickname = profRes.data.nickname;
            if (profRes.data.region) region = profRes.data.region;
            if (profRes.data.avatar_url) avatar = profRes.data.avatar_url;
          } else if (metaNickname) {
            // 프로필 행이 아직 없으면 생성
            await client.from('profiles').upsert(
              [
                {
                  id: authUser.id,
                  nickname: metaNickname,
                  region: region
                }
              ],
              { onConflict: 'id' }
            );
          }
        } catch (e) {
          console.warn('[GamzaAuth] 프로필 조회 폴백:', e);
        }
      }

      if (
        !avatar &&
        window.GamzaListView &&
        typeof window.GamzaListView.createAvatarSvgDataUri === 'function'
      ) {
        avatar = window.GamzaListView.createAvatarSvgDataUri(nickname, '#F3E9E4', '#C6956E');
      }

      this.currentUser = {
        id: authUser.id,
        nickname: nickname,
        avatar: avatar,
        region: region
      };

      return this.currentUser;
    },

    /**
     * 로그인 상태에 따른 오른쪽 상단 헤더 버튼 전환
     * - 로그인 전: [로그인] 버튼만 표시 ([닉네임], [로그아웃] 숨김)
     * - 로그인 후: [로그인] 버튼 숨김, [닉네임]과 [로그아웃] 버튼만 표시
     */
    _syncHeaderUI: function () {
      var loginBtn = document.getElementById('loginBtn');
      var nicknameBtn = document.getElementById('userNicknameBtn');
      var nicknameText = document.getElementById('headerNicknameText');
      var logoutBtn = document.getElementById('logoutBtn');

      var loggedIn = this.isLoggedIn();

      if (loggedIn) {
        var displayNickname = (this.currentUser && this.currentUser.nickname) || '감자이웃';

        if (loginBtn) {
          loginBtn.classList.add('hidden');
          loginBtn.hidden = true;
          loginBtn.setAttribute('data-logged-in', 'true');
        }
        if (nicknameText) {
          nicknameText.textContent = displayNickname;
        }
        if (nicknameBtn) {
          nicknameBtn.classList.remove('hidden');
          nicknameBtn.hidden = false;
        }
        if (logoutBtn) {
          logoutBtn.classList.remove('hidden');
          logoutBtn.hidden = false;
        }
      } else {
        if (loginBtn) {
          loginBtn.classList.remove('hidden');
          loginBtn.hidden = false;
          loginBtn.setAttribute('data-logged-in', 'false');
          loginBtn.innerHTML = '<span>로그인</span>';
        }
        if (nicknameBtn) {
          nicknameBtn.classList.add('hidden');
          nicknameBtn.hidden = true;
        }
        if (logoutBtn) {
          logoutBtn.classList.add('hidden');
          logoutBtn.hidden = true;
        }
      }
    },

    _bindEvents: function () {
      var self = this;
      var dialog = this.dialog;

      // 상단 [로그아웃] 버튼 이벤트
      var logoutBtn = document.getElementById('logoutBtn');
      if (logoutBtn && !logoutBtn.dataset.authBound) {
        logoutBtn.dataset.authBound = 'true';
        logoutBtn.addEventListener('click', function () {
          self.signOut();
        });
      }

      if (!dialog || dialog.dataset.authModalBound === 'true') return;
      dialog.dataset.authModalBound = 'true';

      // 닫기 버튼
      var closeBtn = document.getElementById('closeAuthModalBtn');
      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          self.closeModal();
        });
      }

      // Modern Web Guidance 필수 폴백: <dialog closedby="any"> 미지원 브라우저용 Light-dismiss
      if (!('closedBy' in HTMLDialogElement.prototype)) {
        dialog.addEventListener('click', function (event) {
          if (event.target !== dialog) return;
          var rect = dialog.getBoundingClientRect();
          var isDialogContent =
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width;
          if (isDialogContent) return;
          dialog.close();
        });
      }

      // 탭 전환 버튼 ([로그인] / [회원가입])
      var tabSignInBtn = document.getElementById('tabSignInBtn');
      var tabSignUpBtn = document.getElementById('tabSignUpBtn');
      if (tabSignInBtn) {
        tabSignInBtn.addEventListener('click', function () {
          self.switchTab('signin');
        });
      }
      if (tabSignUpBtn) {
        tabSignUpBtn.addEventListener('click', function () {
          self.switchTab('signup');
        });
      }

      // 로그인 폼 제출
      var signInForm = document.getElementById('signInForm');
      if (signInForm) {
        signInForm.addEventListener('submit', function (e) {
          e.preventDefault();
          self._handleSignIn();
        });
      }

      // 회원가입 폼 제출
      var signUpForm = document.getElementById('signUpForm');
      if (signUpForm) {
        signUpForm.addEventListener('submit', function (e) {
          e.preventDefault();
          self._handleSignUp();
        });
      }
    },

    /**
     * 로그인 / 회원가입 탭 전환
     */
    switchTab: function (mode) {
      this._mode = mode === 'signup' ? 'signup' : 'signin';
      this._showError('');

      var tabSignInBtn = document.getElementById('tabSignInBtn');
      var tabSignUpBtn = document.getElementById('tabSignUpBtn');
      var signInForm = document.getElementById('signInForm');
      var signUpForm = document.getElementById('signUpForm');
      var titleEl = document.getElementById('authDialogTitle');
      var subEl = document.getElementById('authDialogSubtitle');

      if (this._mode === 'signup') {
        if (tabSignInBtn) {
          tabSignInBtn.classList.remove('active');
          tabSignInBtn.setAttribute('aria-selected', 'false');
        }
        if (tabSignUpBtn) {
          tabSignUpBtn.classList.add('active');
          tabSignUpBtn.setAttribute('aria-selected', 'true');
        }
        if (signInForm) {
          signInForm.classList.add('hidden');
          signInForm.hidden = true;
        }
        if (signUpForm) {
          signUpForm.classList.remove('hidden');
          signUpForm.hidden = false;
        }
        if (titleEl) titleEl.textContent = '감자 마켓 회원가입';
        if (subEl) subEl.textContent = '동네에서 사용할 닉네임과 이메일로 간편하게 가입해 보세요.';

        var nickInput = document.getElementById('signup-nickname');
        if (nickInput) setTimeout(function () { nickInput.focus(); }, 50);
      } else {
        if (tabSignInBtn) {
          tabSignInBtn.classList.add('active');
          tabSignInBtn.setAttribute('aria-selected', 'true');
        }
        if (tabSignUpBtn) {
          tabSignUpBtn.classList.remove('active');
          tabSignUpBtn.setAttribute('aria-selected', 'false');
        }
        if (signInForm) {
          signInForm.classList.remove('hidden');
          signInForm.hidden = false;
        }
        if (signUpForm) {
          signUpForm.classList.add('hidden');
          signUpForm.hidden = true;
        }
        if (titleEl) titleEl.textContent = '감자 마켓 로그인';
        if (subEl) subEl.textContent = '이메일과 비밀번호로 포근한 우리 동네 거래를 시작해 보세요.';

        var emailInput = document.getElementById('signin-email');
        if (emailInput) setTimeout(function () { emailInput.focus(); }, 50);
      }
    },

    /**
     * 로그인/회원가입 모달 열기
     */
    openModal: function (options) {
      var opts = options || {};
      this.dialog = document.getElementById('authDialog');
      if (!this.dialog) return;

      this._onSuccessOpenWrite = Boolean(opts.onSuccessOpenWrite);
      this._showNotice(opts.notice || '');
      this._showError('');
      this.switchTab(opts.mode || 'signin');

      if (!this.dialog.open) {
        this.dialog.showModal();
      }
    },

    /**
     * 모달 닫기
     */
    closeModal: function () {
      if (this.dialog && this.dialog.open) {
        this.dialog.close();
      }
    },

    _showNotice: function (msg) {
      var banner = document.getElementById('authNoticeBanner');
      if (!banner) return;
      if (msg) {
        banner.textContent = msg;
        banner.classList.remove('hidden');
        banner.hidden = false;
      } else {
        banner.textContent = '';
        banner.classList.add('hidden');
        banner.hidden = true;
      }
    },

    _showError: function (msg) {
      var errBox = document.getElementById('authErrorBox');
      if (!errBox) return;
      if (msg) {
        errBox.textContent = '⚠️ ' + msg;
        errBox.classList.remove('hidden');
        errBox.hidden = false;
      } else {
        errBox.textContent = '';
        errBox.classList.add('hidden');
        errBox.hidden = true;
      }
    },

    /**
     * 이메일 · 비밀번호 로그인 처리
     */
    _handleSignIn: async function () {
      var emailEl = document.getElementById('signin-email');
      var pwEl = document.getElementById('current-password');
      var submitBtn = document.getElementById('signInSubmitBtn');

      var email = emailEl ? emailEl.value.trim() : '';
      var password = pwEl ? pwEl.value : '';

      if (!email) {
        this._showError('이메일 주소를 입력해 주세요.');
        if (emailEl) emailEl.focus();
        return;
      }
      if (!password) {
        this._showError('비밀번호를 입력해 주세요.');
        if (pwEl) pwEl.focus();
        return;
      }

      var client = window.GamzaSupabase && window.GamzaSupabase.client;
      if (!client) {
        this._showError('Supabase 클라이언트가 초기화되지 않았습니다.');
        return;
      }

      this._showError('');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '로그인 중...';
      }

      try {
        var res = await client.auth.signInWithPassword({
          email: email,
          password: password
        });

        if (res.error) {
          throw res.error;
        }

        await this._loadUserProfile(res.data.user);
        this._syncHeaderUI();

        var signInForm = document.getElementById('signInForm');
        if (signInForm) signInForm.reset();

        var shouldOpenWrite = this._onSuccessOpenWrite;
        this._onSuccessOpenWrite = false;
        this.closeModal();

        var nick = (this.currentUser && this.currentUser.nickname) || '감자이웃';
        if (window.GamzaListView && typeof window.GamzaListView.showToast === 'function') {
          window.GamzaListView.showToast('🥔 ' + nick + '님, 환영합니다!');
        }

        if (shouldOpenWrite && window.GamzaWriteView && typeof window.GamzaWriteView.open === 'function') {
          window.GamzaWriteView.open();
        }
      } catch (err) {
        console.error('[GamzaAuth] 로그인 실패:', err);
        var friendlyMsg = '이메일 또는 비밀번호가 올바르지 않습니다. 다시 확인해 주세요.';
        if (err && err.message && err.message.indexOf('Email not confirmed') !== -1) {
          friendlyMsg = '이메일 인증이 완료되지 않은 계정입니다.';
        }
        this._showError(friendlyMsg);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = '로그인';
        }
      }
    },

    /**
     * 회원가입 처리 (닉네임 필수 입력 + 이메일 + 비밀번호)
     */
    _handleSignUp: async function () {
      var nickEl = document.getElementById('signup-nickname');
      var emailEl = document.getElementById('signup-email');
      var pwEl = document.getElementById('new-password');
      var submitBtn = document.getElementById('signUpSubmitBtn');

      var nickname = nickEl ? nickEl.value.trim() : '';
      var email = emailEl ? emailEl.value.trim() : '';
      var password = pwEl ? pwEl.value : '';

      if (!nickname) {
        this._showError('회원가입 시 사용할 닉네임을 필수로 입력해 주세요.');
        if (nickEl) nickEl.focus();
        return;
      }
      if (nickname.length > 30) {
        this._showError('닉네임은 최대 30자까지 입력할 수 있습니다.');
        if (nickEl) nickEl.focus();
        return;
      }
      if (!email || email.indexOf('@') === -1) {
        this._showError('올바른 이메일 주소를 입력해 주세요.');
        if (emailEl) emailEl.focus();
        return;
      }
      if (!password || password.length < 6) {
        this._showError('비밀번호는 6자 이상으로 입력해 주세요.');
        if (pwEl) pwEl.focus();
        return;
      }

      var client = window.GamzaSupabase && window.GamzaSupabase.client;
      if (!client) {
        this._showError('Supabase 클라이언트가 초기화되지 않았습니다.');
        return;
      }

      this._showError('');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '회원가입 처리 중...';
      }

      try {
        var avatarUri =
          window.GamzaListView && typeof window.GamzaListView.createAvatarSvgDataUri === 'function'
            ? window.GamzaListView.createAvatarSvgDataUri(nickname, '#F3E9E4', '#C6956E')
            : null;

        var signUpRes = await client.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              nickname: nickname,
              avatar_url: avatarUri
            }
          }
        });

        if (signUpRes.error) {
          throw signUpRes.error;
        }

        var sessionUser = signUpRes.data && signUpRes.data.user;
        var activeSession = signUpRes.data && signUpRes.data.session;

        // DB 트리거에서 이메일 자동 확인이 처리된 직후 즉시 세션 활성화
        if (!activeSession) {
          var signInRes = await client.auth.signInWithPassword({
            email: email,
            password: password
          });
          if (!signInRes.error && signInRes.data && signInRes.data.user) {
            sessionUser = signInRes.data.user;
          }
        }

        if (sessionUser) {
          await client.from('profiles').upsert(
            [
              {
                id: sessionUser.id,
                nickname: nickname,
                avatar_url: avatarUri,
                region: '감자구 알감자동'
              }
            ],
            { onConflict: 'id' }
          );

          this.currentUser = {
            id: sessionUser.id,
            nickname: nickname,
            avatar: avatarUri,
            region: '감자구 알감자동'
          };
        }

        this._syncHeaderUI();

        var signUpForm = document.getElementById('signUpForm');
        if (signUpForm) signUpForm.reset();

        var shouldOpenWrite = this._onSuccessOpenWrite;
        this._onSuccessOpenWrite = false;
        this.closeModal();

        if (window.GamzaListView && typeof window.GamzaListView.showToast === 'function') {
          window.GamzaListView.showToast('🎉 회원가입 완료! ' + nickname + '님 반가워요!');
        }

        if (shouldOpenWrite && window.GamzaWriteView && typeof window.GamzaWriteView.open === 'function') {
          window.GamzaWriteView.open();
        }
      } catch (err) {
        console.error('[GamzaAuth] 회원가입 실패:', err);
        var msg = (err && err.message) || '회원가입 중 오류가 발생했습니다.';
        if (msg.indexOf('User already registered') !== -1 || msg.indexOf('already been registered') !== -1) {
          msg = '이미 가입된 이메일 주소입니다. [로그인] 탭에서 로그인해 주세요.';
        }
        this._showError(msg);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = '회원가입 완료하고 시작하기';
        }
      }
    },

    /**
     * 로그아웃 처리
     */
    signOut: async function () {
      var client = window.GamzaSupabase && window.GamzaSupabase.client;
      if (client) {
        try {
          await client.auth.signOut();
        } catch (e) {
          console.warn('[GamzaAuth] 로그아웃 오류:', e);
        }
      }
      this.currentUser = null;
      this._syncHeaderUI();

      // 글쓰기 화면이 열려 있었다면 목록으로 복귀
      if (window.GamzaWriteView && typeof window.GamzaWriteView.close === 'function') {
        window.GamzaWriteView.close();
      }
      if (window.GamzaListView && typeof window.GamzaListView.showToast === 'function') {
        window.GamzaListView.showToast('로그아웃되었습니다. 다음에 또 만나요! 🥔');
      }
    }
  };

  window.GamzaAuth = GamzaAuth;
})();

/* ==========================================================================
   [통합 부트스트랩] 화면 1(상품 목록) + 화면 2(상세 팝업) + 화면 3(글쓰기) + Supabase 연동
   ========================================================================== */
(function () {
  function bootGamzaApp() {
    if (window.GamzaAuth && typeof window.GamzaAuth.init === 'function') {
      window.GamzaAuth.init();
    }
    if (window.GamzaDetailModal && typeof window.GamzaDetailModal.init === 'function') {
      window.GamzaDetailModal.init();
    }
    if (window.GamzaListView && typeof window.GamzaListView.init === 'function') {
      window.GamzaListView.init();
    }
    if (window.GamzaWriteView && typeof window.GamzaWriteView.init === 'function') {
      window.GamzaWriteView.init(
        function onProductCreated(newProduct) {
          if (window.GamzaListView && typeof window.GamzaListView.addProduct === 'function') {
            window.GamzaListView.addProduct(newProduct);
          }
        },
        function onCancel() {
          if (window.GamzaListView && typeof window.GamzaListView.show === 'function') {
            window.GamzaListView.show();
          }
        }
      );
    }

    // Supabase DB에서 실시간 상품 목록 불러오기
    if (window.GamzaSupabase && typeof window.GamzaSupabase.fetchProducts === 'function') {
      var syncBadge = document.getElementById('dbSyncStatusText');
      window.GamzaSupabase.fetchProducts()
        .then(function (dbProducts) {
          if (Array.isArray(dbProducts) && dbProducts.length > 0 && window.GamzaListView) {
            window.GamzaListView.products = dbProducts;
            window.GamzaListView.render();
          }
          if (syncBadge) {
            syncBadge.textContent = '🟢 Supabase DB 연동 완료 (등록한 글이 영구 저장됩니다)';
          }
        })
        .catch(function (err) {
          console.error('[GamzaSupabase] 목록 조회 오류:', err);
          if (syncBadge) {
            syncBadge.textContent = '⚠️ 오프라인 모드 (기본 상품 표시 중)';
          }
        });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootGamzaApp);
  } else {
    bootGamzaApp();
  }
})();