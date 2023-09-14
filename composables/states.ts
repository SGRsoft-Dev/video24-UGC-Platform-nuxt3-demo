
//유니크 아이디
export const useUuid = ()=> useState('UUID',()=>null);
export const useLoading = ()=> useState('loading',()=>true);
export const useIsMobile = ()=> useState('isMobile',()=>false);
export const useOsIOS = ()=> useState('osIOS',()=>false);
export const useLeftMenu = ()=> useState('leftMenu',()=>false);
export const useLeftMenuOpen = ()=> useState('leftMenuOpen',()=>false);
export const useLeftMenuPopover = ()=> useState('leftMenuPopover',()=>false);
export const useWatchMode = ()=> useState('watchMode',()=>false);
export const useActiveTmp = ()=> useState('activeTmp',()=>false);
export const useLastRouterPath = ()=> useState('lastRouterPath',()=>false);



//시작됨 플래그
export const useStartFlag = ()=> useState('startFlag',()=>false);

export const useWindowSize = ()=> useState('windowSize',()=> {
    return {
        width:0,
        height:0,
        scroll:0,
        lastScroll:0,
    }
});

export const useScrollState = ()=> useState('scrollState',()=>'up');

//////////////////
//플레이어 몰입 모드
export const useFullMode = ()=> useState('fullMode',()=>false);

//플레이어 다음영상 자동 재생 모드
export const useAutoPlayMode = ()=> useState('autoPlayMode',()=>false);

//플로팅 플레이어 모드
export const useFloatPlayer = ()=> useState('floatPlayer',()=>false);


///////////////////////////////////////

//로드된 VOD 리스트
export const useVod = ()=> useState('VOD',()=>[]);

//VOD 리스트 개수
export const useTotal = ()=> useState('TOTAL',()=>0);

//시청중인 VIDEO
export const useVideo = ()=> useState('VIDEO',()=>0);

////////////////////////////////////////

//로드된 shorts 리스트
export const useShortsInitLoad = ()=> useState('shortsInitLoad',()=>false);
export const useShortMode = ()=> useState('shortMode',()=>false);
export const useShorts = ()=> useState('SHORTS',()=>[]);

//시청중인 SHORTS
export const useShortVideo = ()=> useState('SHORTS_VIDEO',()=>[]);

//정책에 맞춰 리스팅된 쇼츠 목록
export const useShortsList = ()=> useState('ShortsList',()=>[]);
export const useShortPlayList = ()=> useState('ShortPlayList',()=>[]);

//현재 보고 있는 SHORTS 인덱스
export const useShortIdx = ()=> useState('SHORTS_IDX',()=>0);

