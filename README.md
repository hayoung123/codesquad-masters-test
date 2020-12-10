# Code Squad Masters Test

# step-1 단어 밀어내기

### 해결 방법

모든 경우를 오른쪽으로 미는 형식으로 바꿔서 해결했다.

1. 움직이는 칸의 수가 음수인지 양수인지 판단한다.

   양수일 경우는 계속 진행

   음수일 경우 `횟수 * -1` 을해서 양수로 바꿔주고 진행 방향을 반대로 바꿔준다.

2. 과도한 반복을 방지하기 위해 문자열의 길이를 나눈 나머지 값을 `count`에 다시 저장한다.

   - 방향이 L인경우는 나눈 값을 문자열 길이에서 빼주어서 R방향으로 가는 count만큼으로 바꾸어준다.

3. `moveList()`: `moveOneIndex()`를 count만큼 실행해 움직여준다..
   - `moveOneIndex()` : 배열을 `pop()` -> `unshift()`로 한칸 미뤄준다.

---

# step-2 평면 큐브

### 해결방법

평면 큐브를 2차원 배열로 만들어서 표현했다.

U,U',R... 각각의 이동 방법의 특성을 데이터로 저장해놓는다.

index가 커지는 쪽으로 옮겨지는 것(L,U'..)들은 `reverse: false` 반대는`reverse: true` 로 해놨다.

ex ) U : 맨 윗줄을 왼쪽으로 한칸 밀기

- `fixer:row`: row가 고정된채로 이동
- `fixIndex:0`: row가 고정되는 index가 0번
- `reverse:true`: 인덱스가 작아지는 방향으로 이동

위의 데이터를 이용해서 cube를 조작한다.

1. `splitString()`: 입력받은 문자열을 각각의 타입에 맞게 변경 시킨다.
2. `moveCube()`: 입력받은 타입의 순서대로 큐브를 이동시킨다.

   - `makeNewArr()`: 변경해야되는 부분만 새로운 배열로 만든다.
   - `moveIndex()`: 새로만든 배열을 타입에 맞게 변경시킨다.(step-1에서 사용한 `moveOnedIndex()`와 `reverseOneIndex()`활용)
   - `setCubeData()`: 원래 큐브에 변경되는 곳에 새로만든 배열의 데이터를 저장시킨다.

3. `printCube()`: 큐브 출력
4. 실행하며 Q가 입력되면 종료한다.

---

# step-3 루빅스 큐브

## class

3개의 클래스로 나누어서 진행

### 1. RubiksCube

큐브 회전을 다루는 클래스

### 2. Timer

타이머 클래스

### 3. CubeGame

랜덤 배열, 정답체크를 포함해 루빅스 큐브를 플레이 하는 클래스

## 해결방법

step-2와 같은 방법으로 해결

### class RubiksCube

`DIR_TYPE`: 큐브의 한면에서 윗줄,아래줄, 왼쪽줄, 오른쪽 줄을 저장

ex) `DIR_TYPE.UP`: 큐브 한면의 맨 윗줄

- `fixer: 'row'`: 맨 윗줄이기 때문에 row가 고정
- `fixIndex: 0`: 0번 index의 row가 고정

`MOVE_TYPE`: F,R,U,B,L,D 각각의 특성을 저장. (Quote가 붙은 것들은 반대방향이기 때문에 함수에서 처리)

ex ) `MOVE_TYPE[F]`: 앞면을 시계방향으로 돌리기

- `data: cube.front`: 90도로 돌아가는 면
- `linked: [{ plainCube: this.cube.up, direction: this.DIR_TYPE.DOWN }, { plainCube: this.cube.right, direction: this.DIR_TYPE.LEFT } ...]` :

  plainCube: F가 실행될 때 함께 변경되는 인접한 면 (시계방향 순서대로 저장)

  direction: 그 면에서 변경되는 방향을 저장해놨다.

위의 `MOVE_TYPE` 데이터를 이용해서 루빅스 큐브를 조작한다.

1. `splitString()`: 입력받은 문자열을 설정해놓은 타입에 맞게 변경 시킨다.
2. `moveCube()`: 입력받은 타입의 순서대로 큐브를 이동시킨다.

   2-1. **'** 이 붙어있는지 확인해 **reverse**값을 정해준다.
   2-2. `rotateCube()`: 회전 시키는 면을 회전 시켜준다.
   2-3. `makeNewArr()`: linked.plainCube의 linked.direction에 있는 배열을 새로운 배열(newArr)에 저장한다.
   2-4. `moveIndex()`: newArr을 이동시킨다.
   2-5. `setCubeData()`: 이동시킨 newArr을 기존 cube에 저장해 업데이트한다.

3. `printView()`: 전개도 모양으로 출력한다.

### class CubeGame
