const data = [
	13432, 99527, 85422, 64009, 79131, 11256, 27674, 82211, 65599, 57936, 12692,
	67107, 29421, 44641, 48876, 12545, 62591, 59319, 16202, 93012, 79559, 55075,
	94998, 31881, 25693, 82211, 52122, 67853, 83135, 32381, 84557, 40058, 61238,
	44061, 72435, 52740, 59279, 23428, 18703, 72008, 50247, 36776, 11306, 56492,
	10350, 82003, 69212, 82211, 78100, 21578, 60167, 72847, 95799, 17736, 22375,
	23292, 90963, 65732, 79196, 64622, 58537, 82973, 94917, 88760, 50441, 55255,
	77874, 17547, 78766, 92231, 46958, 30263, 33887, 59152, 33021, 93897, 21512,
	35803, 39541, 54642, 19220, 63597, 41545, 46831, 46917, 64673, 88861, 45232,
	74609, 73456, 73596, 29069, 68739, 63863, 66470, 20360, 83898, 44641, 12343,
	19024, 67180, 10217, 24972, 24476, 13013, 46789, 32969, 19404, 69446, 41339,
	31787, 69378, 96689, 52740, 83052, 61780, 36110, 95194, 35374, 53244, 76156,
	98062, 47145, 67664, 94841, 78262, 53215, 32392, 24537, 52368, 74746, 72008,
	10244, 93897, 47947, 83113, 10482, 82210, 89891, 24001, 45511, 46831, 85258,
	63996, 45827, 59962, 52515, 54609, 70095, 33767, 83631, 56802, 65323, 71823,
	83671, 54263, 61458, 82747, 50228, 82211, 76836, 72950, 56656, 20979, 19249,
	36220, 85157, 77953, 91087, 76700, 25467, 91960, 29637, 76455, 57739, 96969,
	74182, 72008, 68519, 44641, 86094, 36392, 21926, 57838, 57636, 51561, 25002,
	21578, 34590, 33948, 43184, 51180, 36647, 18450, 90529, 22323, 29621, 76514,
	58182, 33464, 69143, 14309, 23940, 22307, 89794, 72637, 66362, 76700, 18670,
	16184, 11811, 59962, 80168, 88760, 78328, 18512, 73415, 93796, 70242, 97060,
	26374, 89280, 73437, 59962, 37906, 35082, 86349, 40920, 71061, 93897, 71151,
	19348, 36207, 55075, 48593, 76700, 23652, 80944, 27696, 52062, 71761, 16295,
	99106, 87359, 91645, 45569, 68290, 87416, 91199, 11395, 39730, 87238, 54026,
	10231, 46505, 82211, 11725, 45421, 89320, 19884, 17129, 85416, 23213, 47258,
	78989, 17321, 75989, 51561, 33062, 96562, 90350, 16306, 25744, 72637, 14796,
	44845, 40596, 22998, 71208, 29107, 53310, 72008, 55075, 51561, 82130, 90937,
	71863, 66561, 22747, 56903, 26129, 66822, 76023, 57465, 45809, 17965, 67441,
	72637, 61018, 53372, 68966, 93661, 42742, 37050, 50700, 51561, 12624, 89160,
	10025, 10610, 37884, 37252, 15620, 72764, 94124, 42865, 84791, 92073, 34471,
	21578, 48469, 82035, 60448, 93017, 43437, 56492, 28153, 22553, 24189, 88760,
	32448, 20539, 35563, 23321, 30935, 45582, 78223, 97870, 63492, 24178, 29793,
	43545, 74161, 63685, 52857, 72637, 20539, 87390, 43385, 12545, 33767, 20539,
	17369, 44753, 19650, 16929, 61944, 82211, 73597, 45421, 72586, 92371, 34118,
	93897, 90403, 38307, 12766, 63863, 12107, 59704, 21110, 70709, 33715, 44641,
	37843, 67347, 24385, 99774, 52162, 58891, 68243, 20339, 16290, 84251, 70931,
	36888, 59469, 51075, 64333, 51561, 15751, 48494, 82033, 75526, 36217, 52738,
	61314, 85268, 76700, 56470, 52163, 63863, 28963, 81385, 29645, 67704, 90345,
	77413, 13483, 89195, 92303, 72008, 89591, 72950, 82520, 42641, 32358, 68830,
	23592, 91970, 31132, 52740, 86869, 82211, 10384, 81245, 48635, 57010, 81215,
	45599, 92627, 65250, 31028, 42723, 72399, 72950, 79353, 47227, 40720, 75923,
	95185, 45421, 30646, 61893, 72637, 88749, 71603, 72637, 78988, 75660, 96153,
	23495, 15762, 20539, 26748, 18635, 89285, 57838, 38979, 24826, 41705, 90065,
	67856, 63113, 61310, 83415, 70802, 99374, 57572, 63863, 60197, 36040, 94465,
	20539, 37877, 72342, 39034, 12545, 39988, 53040, 23682, 60704, 16360, 82078,
	85037, 74396, 97997, 44641, 33311, 19977, 48205, 83795, 85260, 59962, 42966,
	12978, 17483, 37183, 35272, 33767, 62596, 11545, 32379, 93897, 68736, 51379,
	88424, 93897, 63000, 76028, 53984, 44641, 52961, 55744, 23529, 10568, 86642,
	44641, 94285, 55708, 75526, 36130, 42357, 25637, 80589, 39300, 82211, 62853,
	46831, 57838, 69512, 21578, 93456, 49352, 29214, 63362, 72950, 74474, 15945,
	78492, 72148, 43901, 34231, 37020, 45421, 81194, 35917, 93458, 91841, 46831,
	79869, 19071, 86188, 99748, 78675, 51561, 11235, 70510, 88677, 21578, 22503,
	56492, 70563, 65151, 44070, 84670, 77193, 69309, 74544, 88760, 85699, 54609,
	72531, 94696, 80242, 67828, 99768, 78498, 86932, 25083, 23287, 73367, 69537,
	86546, 73309, 75526, 62449, 88760, 49470, 54425, 14289, 96254, 69644, 59003,
	52275, 98219, 18766, 72008, 97348, 52042, 32022, 72637, 75430, 88760, 50320,
	10641, 29166, 69523, 72534, 87091, 49739, 44052, 31630, 44444, 74468, 91931,
	37430, 16117, 31154, 72008, 86960, 37248, 14772, 59322, 54932, 37274, 27500,
	55708, 96275, 63863, 41107, 82756, 36886, 10384, 55615, 49652, 65056, 13451,
	12961, 82211, 61530, 85416, 52911, 67361, 72231, 93897, 39890, 12545, 79762,
	32752, 94691, 52740, 25722, 39391, 29227, 75526, 91291, 12545, 25223, 12566,
	97607, 54609, 70882, 72008, 55249, 72637, 46079, 56492, 44571, 35771, 59198,
	81049, 65779, 46831, 71491, 35244, 42130, 49154, 61945, 48421, 17672, 33489,
	56972, 18877, 10344, 46770, 73322, 59506, 69718, 20539, 27392, 13771, 82680,
	20539, 82882, 85416, 33696, 10384, 99557, 28322, 91194, 16960, 26814, 88303,
	62942, 63286, 57876, 63118, 55590, 49639, 65425, 56492, 40295, 31513, 65519,
	12680, 54674, 28291, 93854, 24478, 57200, 94343, 86692, 52816, 94202, 72950,
	98202, 95205, 31356, 93483, 26084, 66096, 50893, 10384, 28751, 50845, 24283,
	59462, 37229, 11509, 82511, 74415, 59437, 68058, 25794, 58545, 40711, 41583,
	70010, 12545, 49870, 53668, 98802, 74902, 16751, 85416, 63863, 44641, 35164,
	15938, 31987, 63676, 87918, 51561, 50113, 67549, 25266, 85416, 36535, 38780,
	55708, 93601, 84728, 85099, 59385, 79623, 81136, 72950, 89219, 13888, 48683,
	30116, 30069, 52954, 46412, 48012, 62799, 23294, 79619, 51561, 57077, 82211,
	42994, 47011, 98018, 25306, 45535, 54247, 27989, 93897, 54212, 81800, 62628,
	43545, 73120, 88028, 80436, 12545, 81455, 59962, 17608, 51561, 53813, 93897,
	66722, 63863, 43224, 78772, 36306, 15309, 64327, 54837, 32264, 70090, 43720,
	12793, 45937, 86105, 20304, 48853, 70038, 57838, 95022, 76700, 70940, 59767,
	59237, 52860, 24269, 79404, 88281, 20539, 39473, 82211, 16804, 59962, 96118,
	52515, 19564, 44641, 37290, 88420, 24778, 85266, 74639, 88274, 48846, 58191,
	36682, 44641, 99498, 53127, 54539, 18057, 10574, 43464, 28871, 56492, 97324,
	67999, 95007, 34963, 89688, 75526, 13045, 44641, 23072, 72928, 56771, 81743,
	60851, 94468, 17449, 10947, 75491, 23934, 59056, 35644, 73419, 45269, 62939,
	59015, 46869, 76700, 94888, 55708, 74781, 83839, 96195, 66207, 12873, 93897,
	57720, 72950, 42146, 82211, 38645, 15774, 36857, 72008, 84146, 97303, 11304,
	80010, 56077, 31770, 54643, 72950, 23453, 43545, 47965, 13771, 72120, 12535,
	97191, 13771, 45569, 97001, 52663, 98410, 18852, 37989, 50586, 21578, 60286,
	54609, 79343, 73824, 17144, 68797, 59110, 50773, 36301, 63863, 24969, 43545,
	61904, 34329, 20971, 63154, 34116, 22200, 49395, 10384, 49551, 55540, 53921,
	10384, 43029, 77888, 51738, 29117, 50596, 20539, 62585, 42941, 10554, 75526,
	66105, 39469, 45623, 13771, 99434, 75526, 70608, 71561, 20660, 65539, 21557,
	42805, 34260, 78505, 93681, 76951, 89155, 20294, 85633, 72008, 18269, 19099,
	31814, 44872, 30078, 59962, 86831, 51955, 66826, 56492, 61112, 87891, 75282,
	27989, 56624, 78651, 37506, 72950, 62966, 11748, 30546, 81181, 26599, 76700,
	33693, 70594, 54609, 50552, 35670, 69194, 96205, 22980, 90210, 51561, 40824,
	28878, 21694, 10789, 36985, 82211, 17606, 55967, 13442, 72008, 76228, 30016,
	73726, 65139, 92838, 37197, 97988, 11320, 73793, 75384, 68822, 60811, 73386,
	82211, 88568, 13771, 43296, 69358, 55052, 71421, 44661, 12545, 12318, 87139,
	73227, 44366, 75921, 21578, 67881, 63863, 97699, 92371, 48402, 84695, 26206,
	91450, 32658, 77738, 63201, 24875, 78436, 40010, 58519, 92371, 34061, 82859,
	67153, 56492, 93348, 63897, 52173, 59962, 70793, 86910, 47174, 74161, 97065,
	58220, 98521, 38134, 18656, 76700, 79940, 55708, 12268, 81103, 44119, 27487,
	28878, 69348, 21877, 28144, 51561, 33767, 24353, 20405, 93708, 27989, 37944,
	10384, 59783, 92371, 46742, 88760, 14132, 34945, 32535, 46328, 52069, 92205,
	10825, 76763, 79161, 13771, 52492, 49076, 66795, 72008, 77531, 14030, 41460,
	50021, 15707, 24151, 32266, 63863, 13771, 24594, 13638, 45908, 72636, 72637,
	45765, 51914, 12037, 85416, 56492, 20539, 13270, 69987, 61750, 10384, 50793,
	55723, 87473, 76700, 76593, 75813, 80522, 54251, 86245, 35228, 14775, 65287,
	55701, 87885, 49060, 40866, 72608, 17935, 40950, 20539, 52590, 12895, 87107,
	90856, 26193, 41826, 99240, 96432, 70451, 71764, 40695, 14446, 98457, 38880,
	57447, 75526, 37953, 28634, 41594, 12545, 78106, 45421, 62810, 11157, 77366,
	51561, 60188, 72950, 86955, 51561, 93965, 29333, 41522, 45421, 39722, 78077,
	77519, 16548, 48604, 55075, 11847, 41162, 17806, 64555, 21884, 55708, 85416,
	21578, 27429, 24470, 65006, 56492, 28300, 93897, 41243, 51561, 34356, 76327,
	30475, 34047, 13415, 96793, 71407, 51561, 51669, 88760, 74663, 90696, 27951,
	12545, 71178, 72950, 27145, 66608, 49801, 72008, 40777, 85416, 32375, 59962,
	98357, 45439, 22830, 63421, 40569, 70236, 69470, 86984, 22303, 91976, 68732,
	10875, 75288, 10985, 50429, 93897, 90175, 53681, 63905, 99136, 36807, 27989,
	94060, 82211, 31334, 20435, 22091, 98489, 14991, 19881, 20990, 97434, 27359,
	74753, 40468, 96114, 73221, 27400, 80404, 63863, 99517, 72637, 76324, 20356,
	86303, 23006, 22615, 55708, 88760, 56636, 19593, 26174, 20183, 69483, 73936,
	72008, 81704, 97653, 82496, 71259, 44609, 72950, 29454, 72950, 92960, 63863,
	22078, 16047, 15689, 19794, 25209, 55708, 65713, 94158, 19640, 88220, 38430,
	93897, 28512, 19519, 16788, 58578, 84143, 55075, 22354, 92585, 87715, 68743,
	72008, 29830, 42338, 38810, 49403, 83789, 40647, 75399, 32669, 21104, 32735,
	11033, 16981, 41120, 50963, 82211, 86942, 76700, 55957, 28878, 72470, 18102,
	66149, 82912, 87815, 60442, 53057, 72950, 81353, 88760, 25521, 19717, 27419,
	15456, 64237, 45976, 79861, 41758, 21048, 37506, 71529, 36476, 86012, 31340,
	38814, 93897, 87038, 94922, 31456, 68008, 34879, 93560, 54466, 98669, 57838,
	86519, 69889, 93897, 37982, 63863, 20531, 72008, 40067, 73436, 36881, 18750,
	69842, 75526, 39635, 32238, 73670, 92143, 98888, 83368, 85977, 51545, 47076,
	59962, 23560, 76424, 11473, 48538, 90525, 44014, 50946, 82223, 65151, 33756,
	98432, 82789, 22092, 28493, 47806, 59949, 31911, 76700, 55578, 63863, 94462,
	54115, 95595, 13771, 20791, 55708, 47090, 70868, 41802, 55210, 43323, 72950,
	46465, 40541, 66496, 11878, 44565, 97472, 21208, 55708, 40986, 96992, 89074,
	27989, 94377, 70880, 91404, 46149, 31736, 25380, 20540, 36786, 23955, 27989,
	83375, 20539, 21275, 45569, 77920, 13908, 90423, 43545, 66260, 43726, 84346,
	20539, 43528, 72348, 52409, 17241, 73291, 56492, 76391, 27989, 42269, 31050,
	62311, 60352, 69023, 76292, 52350, 95874, 50499, 63863, 16646, 55708, 18624,
	97896, 52201, 79740, 17990, 50297, 69178, 72637, 94819, 44641, 81872, 51561,
	35694, 23638, 94457, 56492, 13115, 84635, 75261, 77120, 83107, 21578, 38302,
	37771, 46217, 63863, 22665, 25925, 36810, 96268, 11460, 25797, 72941, 12585,
	91311, 43545, 82673, 10038, 42123, 70321, 97540, 70498, 47052, 62870, 16582,
	59962, 36031, 18019, 65476, 76795, 87249, 69269, 97645, 72637, 90911, 50254,
	15966, 84332, 68048, 43148, 32418, 91756, 60794, 15860, 87086, 69310, 30064,
	13771, 53411, 72008, 45974, 52740, 74034, 21578, 89847, 44848, 57487, 69953,
	24918, 20539, 38215, 33767, 21578, 10370, 59962, 44701, 10876, 72950, 65146,
	89093, 69232, 67671, 88488, 19656, 11942, 61981, 90957, 32106, 68144, 71429,
	20235, 69411, 42155, 99592, 23863, 24912, 20520, 93897, 94487, 97535, 90649,
	72637, 12545, 56492, 64617, 72008, 67898, 82211, 52147, 42732, 95995, 19329,
	90476, 10264, 56149, 44641, 64417, 57838, 75712, 72008, 10093, 20539, 63903,
	20539, 62017, 23234, 45031, 43545, 45087, 47035, 88930, 72950, 20192, 14432,
	89187, 74913, 40276, 43670, 94291, 73196, 43931, 75526, 56424, 96957, 27903,
	78335, 84295, 44772, 77809, 21578, 13301, 82211, 69041, 29091, 14013, 55075,
	42990, 76675, 11127, 94788, 34313, 44641, 54757, 76700, 15440, 67638, 52016,
	61590, 79390, 72008, 38416, 20539, 53868, 52740, 82171, 75147, 13902, 46831,
	82778, 45421, 60444, 37175, 93897, 48934, 91010, 27007, 37523, 15548, 22754,
	64776, 64526, 75526, 39126, 10384, 39951, 81597, 93129, 82761, 15303, 37506,
	52456, 72950, 73439, 73183, 42439, 18727, 12745, 46831, 11879, 76700, 37599,
	15359, 78467, 22052, 54997, 71422, 60834, 10828, 43545, 51248, 95490, 83175,
	31677, 89605, 14741, 12088, 90765, 85416, 80642, 43137, 74410, 33716, 62010,
	59967, 89820, 59962, 15259, 72637, 73202, 21136, 91723, 59962, 99770, 82268,
	20610, 28887, 82283, 51561, 75962, 28321, 45040, 14376, 27291, 72950, 29535,
	72950, 30023, 82211, 90410, 72008, 96584, 92371, 50326, 44641, 76715, 42957,
	67392, 46831, 50413, 22464, 35838, 53271, 75012, 82211, 26547, 77007, 32568,
	13362, 84375, 10384, 93141, 83187, 80381, 82314, 86407, 55708, 61852, 65151,
	42112, 85416, 91393, 24708, 21479, 54609, 95278, 71404, 90197, 51333, 89396,
	19940, 30280, 86653, 58696, 73448, 24031, 51561, 45632, 38791, 30315, 63370,
	12482, 55075, 17309, 38204, 78560, 75526, 42094, 75987, 22816, 20539, 15728,
	21499, 79750, 47624, 48856, 74487, 99952, 49059, 70343, 55708, 52172, 17973,
	85592, 23748, 37134, 89133, 14103, 78476, 49324, 45569, 52740, 12441, 31848,
	90327, 35123, 13771, 20160, 32361, 57341, 44641, 77959, 31901, 22218, 12113,
	94565, 84207, 20446, 88508, 20220, 32694, 62283, 77246, 44641, 79805, 42152,
	71317, 10108, 88351, 96163, 97332, 92371, 97921, 61565, 81484, 45443, 40227,
	73249, 59668, 20450, 88120, 55156, 10384, 47946, 86342, 67396, 86926, 43982,
	46831, 66522, 21578, 26295, 20539, 45340, 34094, 46117, 76700, 81752, 29473,
	60567, 52740, 57747, 55747, 59773, 21578, 15693, 85416, 44390, 17210, 72894,
	43545, 52651, 93462, 56796, 60906, 57559, 93897, 84881, 12545, 70105, 21176,
	86357, 43545, 18275, 85416, 77617, 17452, 80861, 94447, 22679, 44641, 66171,
	51561, 26912, 36714, 39134, 12545, 65750, 49794, 15753, 37506, 65419, 43681,
	85612, 72637, 49244, 53329, 20017, 63863, 35412, 36362, 85655, 44641, 48508,
	28781, 83689, 67873, 44081, 55075, 87453, 67466, 79064, 76700, 23865, 35249,
	19484, 79809, 84905, 55708, 96681, 20539, 28337, 27989, 41089, 76700, 63959,
	42986, 84366, 23751, 82366, 20539, 73748, 82211, 32593, 18922,
];

// const data = [3, 4, 4, 3, 2, 5, 1, 3, 3, 9, 3, 3];

const l1 = data.filter((n, index) => index % 2 === 0).sort();
const l2 = data.filter((n, index) => index % 2 !== 0).sort();

const result = l1.reduce((acc, value1) => {
	const timesInL2 = l2.filter((value2) => value2 === value1).length;

	return acc + value1 * timesInL2;
}, 0);

console.log(result);
