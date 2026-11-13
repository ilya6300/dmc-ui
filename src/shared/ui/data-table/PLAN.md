MarkupTable + DataTable: архитектура и план реализации
Два независимых слоя, единая модель состояния и явная семантика grouped, group и дерева. План для новой реализации с сохранением сильных сторон dmc и устранением ошибок, найденных в исследовании.
On this page
1. Цели и границы
2. Слои и зависимости
3. MarkupTable: контракт дизайна
4. DataTable: публичный API
5. grouped, group и уровни
6. Древовидные данные
7. Автоматическая фильтрация
8. Пайплайн и колонки
9. Состояние и сервер
10. Адаптация
11. Редактирование
12. Действия, выбор и переключения
Show all 17
1. Цели и границы
Основное решение
MarkupTable отвечает за то, как таблица выглядит. DataTable отвечает за то, что показывается и как пользователь работает с данными. grouped, group, tree и detail — разные механизмы, а не имена одного флага.
1.
Построить новый контракт, а не переносить большой TableData целиком: стабильный rowKey, иммутабельные узлы, чистый пайплайн и единый onChange.
2.
Сохранить ресайз, drag-порядок, скрытие и сохранение колонок, действия и адаптацию из dmc; добавить интегрированные фильтры, дерево и типизированные detail-панели.
3.
Предоставить MarkupTable отдельно для ручной разметки; DataTable обязан использовать его в табличном представлении и передавать визуальные настройки без потерь.
4.
Сначала корректность и доступность, затем оптимизация по измерениям. Виртуализация — отдельный последующий этап, но шов renderer/body предусмотрен сразу.
Это проект архитектуры и API, а не описание уже реализованного компонента. Исходный код и репозитории на этом шаге не меняются. Вопросы, требующие продуктового выбора, собраны в конце; для остальных предложены конкретные значения по умолчанию.
2. Слои и зависимости
Приложение
dataSource, columns, state, onChange
DataTable / model
filter → sort → grouped → paginate
DataTable / features
tree, group, detail, selection, edit, actions
Представление
TableView / CardsView / ListView
MarkupTable
DOM, CSS, slots, sticky / fixed
Семантический DOM
table, thead, tbody, th, td
TableView

| Слой                 | Знает                                       | Не знает                             |
| -------------------- | ------------------------------------------- | ------------------------------------ |
| MarkupTable          | Разметка, размеры, геометрия, CSS-состояния | Записи, rowKey, фильтры, выбор, edit |
| DataTable model      | Записи, узлы, состояние и запрос            | Цвета, отступы, конкретный UI-kit    |
| DataTable renderers  | Модель видимых строк и контролы             | Сетевой протокол приложения          |
| Приложение / adapter | Запросы, права, сохранение записей          | Внутренний DOM таблицы               |

Зависимости направлены вниз. MarkupTable не импортирует DataTable. Измерение ширин и sticky-offset — допустимая геометрия нижнего слоя, но решения о порядке, скрытии и сохранении колонок остаются в DataTable. Карточки и список используют те же селекторы модели, а не второй набор бизнес-правил.
3. MarkupTable: контракт дизайна

| Prop                | Предлагаемый контракт                          | Назначение                                            |
| ------------------- | ---------------------------------------------- | ----------------------------------------------------- |
| size / dense        | 'sm' \| 'md' \| 'lg'; dense?: boolean          | md по умолчанию; dense уменьшает вертикальный padding |
| striped / hover     | boolean                                        | Зебра и подсветка; без обработчиков данных            |
| borders             | 'none' \| 'rows' \| 'columns' \| 'all'         | Единый API границ вместо конфликтующих флагов         |
| layout              | 'auto' \| 'fixed'                              | CSS table-layout; fixed по умолчанию в DataTable      |
| showTitle           | boolean                                        | Показывает переданные подписи внутри ячеек            |
| presentation        | 'table' \| 'cards' \| 'list'                   | Только визуальная проекция ручной разметки            |
| stickyHeader        | boolean \| { top: number }                     | Sticky относительно ближайшего scroll-container       |
| scroll              | { x?: number \| string; y?: number \| string } | Контейнер overflow; y ограничивает высоту             |
| className / style   | DOM attributes                                 | Класс и переменные корня без потери props             |
| classNames / styles | Частичная карта parts                          | Настройка container, table, head, body, row, cell…    |
| components          | Частичная карта DOM-компонентов                | Подмена частей с обязательным ref и DOM-контрактом    |
| children / ref      | ReactNode / HTMLTableElement                   | Ручная разметка; ref контейнера задаётся отдельно     |

Подкомпоненты: MarkupTable.Container, .Caption, .Colgroup, .Col, .Thead, .Tbody, .Tfoot, .Tr, .Th, .Td, .CellTitle. Все DOM-части пробрасывают ref, className, style, aria- и data-атрибуты. Th/Td поддерживают colSpan, rowSpan, align, fixed="start|end" и stickyOffset; Col — width. MarkupTable не принимает dataSource или columns: геометрию можно измерить по Col/ячейкам, но не анализировать записи.
Слоты components подменяют разметку, а children задают содержимое. Подмена table на div не должна незаметно ломать семантику: произвольный as у всей иерархии не вводить в первой версии; для grid-рендера нужен отдельный проверенный adapter. Sticky-колонки рассчитываются с логическими start/end, работают в RTL и имеют непрозрачный фон и заданный порядок z-index.

| CSS-контракт                  | Имена                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------ |
| Базовые классы                | mt-container, mt-table, mt-head, mt-body, mt-row, mt-cell, mt-cell-title                   |
| Модификаторы                  | mt-table--striped, --hover, --dense, --size-sm/md/lg, --borders-rows/columns/all           |
| Разметка                      | data-layout, data-presentation, data-fixed="start\|end", data-sticky                       |
| Состояния от вызывающего кода | data-selected, data-expanded, data-editing, data-disabled; только оформление               |
| Размеры                       | --mt-cell-px, --mt-cell-py, --mt-row-min-height, --mt-font-size, --mt-indent-size          |
| Тема                          | --mt-bg, --mt-head-bg, --mt-border-color, --mt-hover-bg, --mt-striped-bg, --mt-selected-bg |
| Геометрия                     | --mt-sticky-top, --mt-fixed-start, --mt-fixed-end, --mt-z-header, --mt-z-fixed             |

Значения переменных берутся из дизайн-токенов. Не использовать transition-all на всех потомках: только конкретные безопасные свойства и prefers-reduced-motion. CSS не определяет, выбрана ли запись или раскрыта ли группа; DataTable передаёт соответствующий data-атрибут. colSpan detail-панели всегда равен числу видимых листовых колонок, включая служебные.
4. DataTable: публичный API
Массив columns — основная форма. JSX — синтаксический сахар без регистрации эффектами и модульных счётчиков. Column.children описывает только многоуровневую шапку; дерево записей задаётся отдельно через tree. Сортировка и значения фильтров хранятся на уровне таблицы, а не внутри объектов колонок.
Колонка, фильтр и редактор
type Key = string | number;
type Path = string | readonly (string | number)[];
type FilterType = 'string' | 'number' | 'date' | 'enum' | 'boolean';
type FilterValue =
| { op: 'contains' | 'eq'; value: string | number | boolean }
| { op: 'in'; values: readonly Key[] }
| { op: 'range'; from?: number | string; to?: number | string }
| { op: 'empty' | 'notEmpty' }
| { op: 'custom'; value: unknown };

type FilterConfig<T> = {
type?: FilterType; // иначе консервативное определение по данным
options?: readonly { value: Key; label: ReactNode }[];
normalize?: (value: unknown) => unknown;
predicate?: (filter: FilterValue, record: T) => boolean;
render?: (ctx: {
value?: FilterValue;
setValue: (next?: FilterValue) => void; // черновик
apply: () => void;
reset: () => void;
options: readonly { value: Key; label: ReactNode }[];
}) => ReactNode;
};

type EditorConfig<T> = {
render: (value: unknown, record: T, index: number, ctx: {
setValue: (value: unknown) => void;
errors: readonly string[];
commit: () => Promise<void>;
cancel: () => void;
}) => ReactNode;
parse?: (value: unknown) => unknown;
validate?: (value: unknown, draft: T) =>
readonly string[] | Promise<readonly string[]>;
};

type Column<T> = {
key: string; // обязателен и стабилен; не индекс
dataIndex?: Path;
valueGetter?: (record: T) => unknown;
title: ReactNode;
adaptiveLabel?: ReactNode; // если title — интерактивный узел
children?: readonly Column<T>[]; // только группы шапки
render?: (value: unknown, record: T, index: number) => ReactNode;
onCell?: (record: T, index: number) =>
TdHTMLAttributes<HTMLTableCellElement>;
onHeaderCell?: () => ThHTMLAttributes<HTMLTableCellElement>;
shouldCellUpdate?: (record: T, previous: T) => boolean;
align?: 'start' | 'center' | 'end';
width?: number; minWidth?: number; maxWidth?: number;
fixed?: 'start' | 'end';
ellipsis?: boolean;
sortable?: boolean | {
compare?: (a: T, b: T) => number;
priority?: number;
nulls?: 'first' | 'last';
};
filter?: false | 'auto' | FilterConfig<T>;
grouped?: boolean | { getKey?: (record: T) => Key | null };
/** Раскрытие массива из ячейки field → вложенная таблица (колонки родителя по умолчанию). */
group?: boolean;
editor?: EditorConfig<T>;
resizable?: boolean;
draggable?: boolean;
toggleable?: boolean;
};
// ReactNode / DOM-атрибуты — стандартные типы React в библиотеке.
// JSX Column — лишь синхронный convertChildrenToColumns → Column[].
// Нельзя одновременно передать columns и JSX-колонки.
Состояние и единый onChange
type SortRule = { columnKey: string; order: 'asc' | 'desc' };
type GroupRule = { columnKey: string };
type ExpansionKey = string; // opaque: namespace + channel + identity

type Selection =
| { kind: 'keys'; keys: ReadonlySet<Key> }
| { kind: 'allMatching'; queryKey: string; excluded: ReadonlySet<Key> };

type Pagination =
| { kind: 'page'; current: number; pageSize: number; total?: number }
| { kind: 'cursor'; cursor?: string; pageSize: number;
nextCursor?: string; previousCursor?: string };

type EditSession<T> = {
rowKey: Key; columnKey?: string; original: T; draft: T;
status: 'editing' | 'validating' | 'saving' | 'error';
errors: Readonly<Record<string, readonly string[]>>;
};

type TableState<T> = {
filters: Readonly<Record<string, FilterValue | undefined>>;
sort: readonly SortRule[];
grouped: readonly GroupRule[];
pagination: false | Pagination;
expandedKeys: ReadonlySet<ExpansionKey>;
selection: Selection;
columnOrder: readonly string[];
hiddenColumns: ReadonlySet<string>;
columnWidths: Readonly<Record<string, number>>;
editing: readonly EditSession<T>[];
};

type ChangeAction = 'filter' | 'sort' | 'paginate' | 'grouped'
| 'expand' | 'select' | 'column-visibility' | 'column-order'
| 'column-resize' | 'edit-start' | 'edit-draft' | 'edit-cancel'
| 'edit-commit' | 'edit-error' | 'reset';

type ChangeMeta<T> = {
action: ChangeAction;
changed: readonly (keyof TableState<T>)[];
source: 'user' | 'api';
queryChanged: boolean;
queryKey: string; // нормализованные filter/sort/grouped + scope
currentDataSource: readonly T[]; // клиент: после filter/sort, до page
pageRecords: readonly T[]; // только реальные записи, без групп/detail
affectedRowKeys?: readonly Key[];
affectedColumnKeys?: readonly string[];
};

type TableChange<T> = (
nextState: TableState<T>,
meta: ChangeMeta<T>
) => void;
// Один атомарный callback: filter + сброс page — одно событие.
// В server-режиме currentDataSource — только загруженные записи;
// это не весь серверный набор. queryChanged управляет перезапросом.
Props таблицы
type RowAction<T> = {
key: string; label: ReactNode;
visible?: (record: T) => boolean;
disabled?: (record: T) => boolean;
run: (record: T) => void | Promise<void>;
};

type DataTableProps<T> = {
rowKey: keyof T | ((record: T) => Key); // обязателен
dataSource: readonly T[] | undefined;
columns: readonly Column<T>[];
mode?: 'client' | 'server'; // default client; НЕ выводится из total
state?: Partial<TableState<T>>; // controlled по отдельным срезам
defaultState?: Partial<TableState<T>>; // только при mount
onChange?: TableChange<T>;
markup?: MarkupTableProps; // визуальные пропсы нижнего слоя
defaultColumn?: Partial<Column<T>>;
filter?: { auto?: boolean; enumThreshold?: number;
facetMode?: 'all' | 'exclude-self' };
grouped?: { by?: readonly GroupRule[];
scope?: 'roots' | 'siblings';
order?: 'appearance' | 'asc' | 'desc';
defaultExpandedDepth?: number;
renderHeader?: (ctx: GroupHeaderContext<T>) => ReactNode };
/** Произвольная detail-панель (не путать с Column.group). */
detail?: Detail<T>;
tree?: { childrenColumnName?: string;
getChildren?: (record: T) => readonly T[] | undefined;
hasChildren?: (record: T) => boolean;
loadChildren?: (record: T, signal: AbortSignal) => Promise<readonly T[]>;
filterMode?: 'keep-ancestors' | 'strict'; indentSize?: number };
selection?: { type: 'checkbox' | 'radio';
scope?: 'page' | 'filtered'; treeMode?: 'independent' | 'cascade';
isSelectable?: (record: T) => boolean; preserveKeys?: boolean };
adaptive?: { breakpoint: number; layout: 'cards' | 'list';
renderItem?: (record: T, ctx: AdaptiveContext<T>) => ReactNode };
editing?: { mode: 'cell' | 'row';
canEdit?: (record: T, columnKey?: string) => boolean;
validateRow?: (draft: T) => Promise<Record<string, readonly string[]>>;
onCommit: (ctx: { key: Key; original: T; draft: T;
patch: Partial<T> }) => Promise<T | void>;
leavePolicy?: 'block' | 'cancel' | 'commit' };
actions?: { items: readonly RowAction<T>[];
display: 'column' | 'menu' | 'hover-panel';
position?: 'start' | 'end';
bulk?: readonly BulkAction<T>[] };
persistence?: { key: string; version: number;
storage?: TableStorage; slices?: readonly PersistableSlice[] };
transformColumns?: readonly ColumnTransformer<T>[];
loading?: boolean;
error?: unknown;
slots?: { loading?: ReactNode; empty?: ReactNode;
noResults?: ReactNode; error?: (error: unknown) => ReactNode;
toolbar?: ReactNode; footer?: ReactNode };
onRetry?: () => void;
};
// GroupHeaderContext: path, level, value, recordCount, records.
// AdaptiveContext: key, visibleColumns, renderField, selection,
// expand, actions и edit-контролы из ТОГО ЖЕ состояния.
// BulkAction получает Selection + queryKey, не только массив T.
// PersistableSlice: sort/filters/grouped/columnOrder/hiddenColumns/columnWidths.
// ColumnTransformer: (readonly Column<T>[], context) => readonly Column<T>[].
// Конфиги — проект API; точные вспомогательные DOM-типы уточняются на этапе 0.
index в render — индекс строки текущего представления, только для вывода. Для selection, edit, expand, async-кэша и React key он не используется. render возвращает только ReactNode; атрибуты и объединение ячеек задаются через onCell. Скрытая колонка может продолжать участвовать в фильтрации, сортировке и группировке; это явно видно в панели активных условий.
5. grouped, group и уровни

Канон флагов колонки (источник правды):

| Режим | Данные | Раскрытие |
| ----- | ------ | --------- |
| только `grouped` | группировка существующих строк по значению поля | остаются в **той же** таблице; смещение/отступ **только в колонке уровня** |
| только `group` | массив из значения ячейки `field` | вставляется **вложенная таблица**; колонки по умолчанию — схема родителя |
| `group` + `grouped` (на одной колонке) | группировка как у `grouped` | раскрытие — **вложенная таблица** с колонками родителя (не inline-смещение) |

На **разных** колонках механизмы независимы: `grouped`-колонки → режим 1, `group`-колонки → режим 2.

| Механизм | Что делает | Идентичность |
| -------- | ---------- | ------------ |
| grouped | Собирает имеющиеся записи по значению; создаёт синтетического родителя | Путь parent + columnKey + типизированное значение |
| group | Подставляет массив из ячейки `field` во вложенную таблицу (колонки родителя по умолчанию) | rowKey родителя + field |
| tree | Показывает настоящих детей записи | rowKey настоящей записи; namespace таблицы |
| detail | Произвольная/async detail-панель (не флаг колонки `group`) | rowKey + стабильный key detail-канала |

grouped: группировка имеющихся данных
Порядок уровней задаёт state.grouped; grouped.by — начальная конфигурация, а Column.grouped разрешает поле и задаёт getKey. grouped=true у колонок без явного by даёт начальные уровни в порядке объявления колонок. После инициализации единственный источник истины — состояние таблицы. Родитель группы никогда не становится первой исходной записью.
Внутренний узел kind="grouped" содержит key, columnKey, value, path, level, children и recordCount. Он не приводится к T, не редактируется и не получает действия записи. renderHeader получает контекст группы. Счётчик — число оставшихся после фильтра реальных записей; агрегаты при необходимости вычисляются отдельным reducer по этим же записям.
Ключи строятся через codec с типом и длиной сегмента, не конкатенацией через двоеточие: 1 и "1" различаются, 0, false, пустая строка и null не теряются. По умолчанию null/undefined нормализуются в отдельную корзину «Не задано»; для объектов обязателен getKey, иначе предупреждение и отказ от группировки этого поля. Сорт групп — appearance по первой записи после sort; asc/desc задаётся явно.
При только `grouped` дети рендерятся строками той же `<table>`; визуальный отступ — только в ячейке колонки текущего уровня (`groupAt` start/end у expander). Схема колонок не срезается.
group: массив из ячейки → вложенная таблица
Column.group=true: expander при непустом массиве в `field`. Раскрытие вставляет строку-контейнер с вложенной `<table>` (тот же markup/классы). Данные — элементы массива; колонки по умолчанию — leaf-колонки родителя (полный набор). Переопределение схемы вложенной таблицы — отдельное расширение API, не часть канона v1.
group + grouped на одной колонке
`grouped` формирует `node.nodes`; `group` задаёт presentation: раскрытие — вложенная таблица с колонками родителя и строками из `node.nodes` (не inline-смещение).
detail: свой контент и другой тип данных (не Column.group)
type Detail<T> = {
key: string; // стабильный id detail-канала
expandable?: (record: T) => boolean;
render: (record: T, ctx: {
expanded: boolean; depth: number; signal: AbortSignal;
}) => ReactNode;
layout?: 'panel' | 'inline' | 'replace-children';
placement?: 'before-children' | 'after-children';
cache?: 'none' | 'until-record-change';
};

const orders = defineAsyncDetail<Customer, Order[]>({
key: 'orders',
load: (customer, signal) => api.orders(customer.id, { signal }),
render: (orders, customer) => (
<DataTable<Order> rowKey="id" dataSource={orders}
columns={orderColumns} />
),
loading: <OrdersSkeleton />,
error: (error, retry) => <OrdersError error={error} retry={retry} />,
cache: 'until-record-change',
});

const profile: Detail<Customer> = {
key: 'profile',
render: (customer) => <CustomerProfile value={customer} />,
};

// grouped по region, tree по children, detail по orders — независимы от Column.group.
<DataTable<Customer> rowKey="id" dataSource={customers}
columns={columns} grouped={{ by: [{ columnKey: 'region' }],
scope: 'siblings' }}
tree={{ childrenColumnName: 'children' }} detail={orders} />
detail создаёт панель, а не синтетическую запись T. Фабрика defineAsyncDetail изолирует состояния loading/error/retry/cache. Несколько detail-каналов имеют разные key.
Раскрытие detail запускает загрузку один раз для пары rowKey + channel + версии записи. Закрытие/смена query/unmount отменяет запрос через AbortSignal.
Сочетания, layout и глубина
1.
Базовый порядок: grouped-контейнер → настоящая строка → дети tree, Column.group-вложенная таблица и detail. scope=roots группирует только корни; scope=siblings повторяет группировку внутри каждого списка детей.
2.
Presentation раскрытия grouped определяется флагами колонки: только `grouped` → та же таблица + отступ в колонке уровня; `group`+`grouped` → вложенная таблица с колонками родителя. Отдельный `grouped.layout=inline|nested` не подменяет эти флаги.
3.
detail.layout=panel показывает полную строку colspan; inline — контент внутри области. placement относительно дерева; default — after-children.
4.
replace-children временно подменяет область дочерних строк detail-компонентом. При наличии tree требуется явно выбрать replace-children.
5.
defaultExpandedDepth относится только к grouped-уровням; дерево и detail автоматически не загружаются.
6.
На одной записи tree, Column.group и detail раскрываются независимо; «раскрыть всё» по умолчанию не вызывает async-загрузки.
Комбинированный пример: grouped по региону → grouped по отделу → запись сотрудника → tree подчинённых; рядом detail «Назначения» показывает DataTable<Assignment>. Смена grouped.by пересоздаёт только пути синтетических групп, не rowKey записей.
6. Древовидные данные
tree.childrenColumnName="children" или getChildren(record) задаёт реальное дерево. rowKey должен быть уникален во всём дереве одного экземпляра DataTable, а не только среди соседей. Повторяющиеся id, цикл и повторная вставка одного узла проверяются в development. Для вложенных таблиц namespace содержит ключ родителя и detail-канал, поэтому одинаковые id разных сущностей не конфликтуют.
Модель узлов — discriminated union: record { key, record: T, children }, grouped { key, value, children }, detail { key, ownerKey, channel }. children исходной записи не сортируются и не обрезаются по месту: модель хранит свои readonly-массивы. Никаких хуков внутри map или convertNodes.

| Сценарий             | Правило                                                                               |
| -------------------- | ------------------------------------------------------------------------------------- |
| Сортировка           | Стабильная сортировка каждого sibling-списка; ветки не распадаются                    |
| Фильтр               | keep-ancestors сохраняет путь к совпавшему потомку; strict отсекает несовпавшую ветвь |
| Пагинация            | По корневым узлам после grouped; все дети корня остаются на его странице              |
| Раскрытие            | Независимые каналы tree / grouped / Column.group / detail; Set opaque ExpansionKey    |
| Lazy children        | hasChildren + loadChildren; отдельно loaded/loading/error, retry и abort              |
| Фильтр по lazy-детям | Только загруженные данные; глобальный поиск требует server mode                       |
| Смена группировки    | Не влияет на key реальных записей; синтетические пути пересчитываются                 |

При фильтре ветки к найденным потомкам временно видимы через derived forcedOpenKeys; пользовательский expandedKeys не перезаписывается. Снятие фильтра возвращает прежнее раскрытие. Включённые в путь, но не совпавшие предки отмечаются в модели; они не увеличивают счётчик совпадений. После скрытия ветки фокус перемещается на её родителя.
7. Автоматическая фильтрация

| Тип     | Стандартный UI            | Предикат                                                           |
| ------- | ------------------------- | ------------------------------------------------------------------ |
| string  | Поиск + contains / equals | Нормализация регистра и локали, отдельное пустое                   |
| number  | Минимум / максимум        | Числовой диапазон с включёнными границами                          |
| date    | Дата / диапазон           | Нормализованный ISO/date-only контракт; не локальный парсинг строк |
| enum    | Мультивыбор + поиск       | in; отдельные уникальные типизированные значения                   |
| boolean | Все / да / нет / пусто    | Строгое сравнение true/false                                       |
| custom  | Свой render фильтра       | Своя predicate; серверный codec в adapter                          |

Включение: filter.auto=true на таблице или column.filter="auto". Приоритет: custom-конфиг → явный type → автоопределение. Числовые строки остаются строками; ISO-похожие строки автоматически датами не считаются. Date-объекты распознаются, сериализованные даты требуют type="date" и нормализатор. Все null → строковый fallback с пустым состоянием, смешанные типы → string и development-предупреждение. Enum выводится для низкой кардинальности: default threshold=20, настраивается; более крупные словари используют поиск.
Профиль строится по всему доступному сырому набору реальных записей до пагинации, включая загруженные children. Фильтр самой колонки не должен уничтожать собственные варианты: facetMode=exclude-self пересчитывает опции с учётом остальных фильтров; all берёт исходный набор. Значения активного фильтра не исчезают из UI при смене данных. Индекс опций кэшируется по данным/версии/колонке; большие наборы профилируются отдельно, а не на каждом нажатии.
Между колонками — AND; внутри enum — OR; range — одна операция. Пусто и notEmpty определены отдельно от 0/false. Поиск вводится в черновик; Apply коммитит состояние, стандартный string-filter может применять debounce 250 мс. Reset снимает только фильтр колонки. Применение любого фильтра атомарно сбрасывает номер страницы или cursor-history.
Client: predicate выполняется локально. Server: onChange отдаёт сериализуемый FilterValue, локальная фильтрация отключена; тип и опции приходят из column config или server facets. По текущей странице нельзя объявлять enum полным. Для custom value обязателен codec/validator адаптера, если фильтр передаётся серверу или сохраняется. Часовой пояс дат задаётся приложением: интервалы календарных дней переводятся в границы этого пояса, а не трактуются как локальный UTC автоматически.
8. Пайплайн и колонки
Normalize
readonly records, rowKey map, дерево
Filter
условия + сохранение предков
Sort
стабильно в sibling-списках
Grouped
синтетические родители без мутаций
Paginate
корневые узлы; дети не режутся
Visible projection
expand tree/grouped + Column.group nested tables + detail panels
Render
table / cards / list
Нормативный порядок новой реализации: filter → sort → grouped → paginate. Исходный отчёт описывает у antd sort → filter → page; здесь порядок намеренно уточнён и закрепляется тестами. Критичное общее правило: сортировать весь клиентский набор до страницы. Column.group и detail не участвуют в сортировке родительского T: это проекции после пагинации.
Единица страницы в первой версии — корневой узел результата: без групп это запись, при grouped — верхняя группа. Не разрываем группу/ветку между страницами. UI подписывает «групп на странице», если это группы, и отдельно показывает число записей. total у page — число единиц пагинации, не число строк DOM; server contract обязан возвращать оба счётчика при группировке. Вариант пагинации по leaf-записям с повтором заголовков — отдельное расширение, не скрытое поведение.
Пайплайн колонок: normalize → defaults → stable order → visibility → expand/grouped controls → selection → actions → sorter/filter header decorators → geometry/header-grid. Внутренние ключи служебных колонок зарезервированы. Пользовательские transformColumns исполняются в документированном шве до финального расчёта геометрии; результат проверяется на дубликаты ключей, пустые группы и несовместимые fixed-сегменты.
colSpan/rowSpan шапки пересчитываются после скрытия и drag, пустая группа колонок удаляется. Resize/drag не меняют идентичность колонок. Все преобразования чистые; сорт использует копии и stable tie-break по исходному порядку, а не по rowKey. Memo-кэш сырых узлов отделён от кэша страницы; useMemo не пишет в state или refs как побочный эффект.
9. Состояние и сервер

| Срез            | Начальное значение            | Сброс / сохранение                                                      |
| --------------- | ----------------------------- | ----------------------------------------------------------------------- |
| filters / sort  | {} / []                       | Фильтр и sort сбрасывают page/cursor; выбор по явным ключам сохраняется |
| grouped         | by или флаги колонок          | Сброс страницы; устаревшие synthetic expand keys удаляются              |
| pagination      | false либо page/cursor config | Только один режим; cursor не участвует в offset-арифметике              |
| expandedKeys    | Пустой Set + default depth    | Не сбрасывается на sort/page; очистка по политике данных                |
| selection       | keys: пустой Set              | Удалённые записи — preserveKeys; query-wide selection привязан к query  |
| column settings | Схема → сохранённые настройки | Валидация по ключам и версии схемы                                      |
| editing         | []                            | Черновики отдельно от dataSource; смена query по leavePolicy            |

state контролирует переданные срезы; остальные живут в reducer. Проверка — наличие свойства, не truthy-значение. Для controlled-среза пользовательский жест вычисляет nextState и обязательно вызывает onChange, но не меняет источник истины до новых props. defaultState читается один раз. Программное обновление props не вызывает ответный onChange и не создаёт цикл.
Одна пользовательская транзакция даёт один onChange: например, filter одновременно меняет filters, pagination и инвалидирует allMatching selection. nextState — полный предложенный снимок с учётом всех зависимых срезов. Внутри — ReadonlySet/Map с новой ссылкой при изменении; для storage/запросов используется отдельная JSON-сериализация. Узкие контексты и селекторы не будят все ячейки при раскрытии одного узла.
Server mode задаётся явно; ни length < total, ни наличие total не переключают алгоритм. Приложение получает onChange, сериализует query и запрашивает данные; таблица не делает второй скрытый fetch. Не выполняет локальные filter/sort/grouped/paginate над уже обработанной страницей. Серверная группировка возвращает envelope с явными kind/groupPath/children/counts, который adapter переводит во внутренние узлы; Column.group / detail может грузиться отдельно.
queryKey идентифицирует состав выборки: filters, sort, grouped, scope и версию схемы, но не номер страницы. requestKey дополнительно включает page/cursor; оба участвуют в защите от гонок. Cursor-history хранится в adapter, сбрасывается при смене запроса; нет неизвестных «номеров страниц» и total, если сервер их не знает. Смешанный локальный/серверный режим в v1 запрещён без явного adapter.
Persistence по умолчанию хранит только пользовательские настройки колонок, sort/filter/grouped, но не записи, edit-черновики и selection. Формат содержит version и schema signature; функции и ReactNode не сериализуются. Controlled props выше storage по приоритету; отсутствующие колонкам ключи удаляются. Ошибки localStorage, SSR и disabled storage не ломают таблицу; запись debounce после commit, а не на каждое движение мыши.
10. Адаптация
adaptive.breakpoint сравнивается с шириной контейнера, а не всего окна; ниже порога TableView переключается на CardsView или ListView. Предпочтителен ResizeObserver с SSR-safe начальным представлением. Переключение не меняет state, фильтры, selection, edit или expandedKeys; меняется только renderer. MarkupTable.showTitle — визуальная возможность, DataTable сам передаёт title/adaptiveLabel в поля.
1.
Стандартная карточка строится по тем же видимым листовым колонкам: подпись → render(value, record, index). Сортировка/фильтры остаются в доступной панели, а не исчезают вместе с thead.
2.
В карточках сохраняются checkbox/radio, раскрытие дерева и grouped, Column.group и detail, действия и редактирование. Синтетическая группа отображается заголовком секции; дерево — отступом и отдельной кнопкой.
3.
При custom renderItem контекст предоставляет готовые контролы и renderField; приложение отвечает за их размещение. Sticky/fixed в карточках отключаются как табличная геометрия, размеры/порядок колонок сохраняются.
4.
Смена ширины во время edit не теряет draft и ошибки; фокус восстанавливается по rowKey + columnKey. Режим только hover не допускается на touch; меню действий доступно постоянно.
11. Редактирование
editing.mode="cell" открывает одну ячейку; row открывает редакторы доступных колонок строки. Вход — явная кнопка/Enter; double-click можно включить как дополнительный путь, но не единственный. canEdit и column.editor проверяются отдельно. Синтетические группы и произвольные detail-компоненты не редактируются редактором родительского T.

| Шаг      | Поведение                                                             |
| -------- | --------------------------------------------------------------------- |
| Start    | Снимок original + immutable draft по rowKey; edit-start               |
| Change   | parse → обновление draft; edit-draft без сетевого запроса             |
| Validate | Column validate, затем validateRow; async-ответы защищены revision-id |
| Commit   | Блок повторной отправки; await onCommit; pending-статус               |
| Success  | Приложение обновляет dataSource, сессия закрывается; edit-commit      |
| Failure  | Draft остаётся, ошибки у полей/строки; edit-error и повтор            |
| Cancel   | Draft удаляется без изменения исходной записи; edit-cancel            |

По умолчанию сохранение пессимистическое: пока Promise не выполнен, запись не считается сохранённой. onCommit — команда предметного сохранения, onChange — единое уведомление об изменении состояния UI; приложение не должно повторно сохранять по edit-commit. Полностью controlled editing задаётся state.editing, предложения сессии приходят через onChange. DataSource остаётся собственностью приложения даже в uncontrolled UI-режиме.
Переход страницы, фильтра, режима или закрытие ветки при незавершённом edit подчиняется leavePolicy, default=block с явным решением «сохранить / отменить». Enter коммитит, Escape отменяет, Tab переводит фокус без скрытой потери данных. Изменение rowKey в редакторе запрещено; конкурентное обновление исходной записи выявляется по версии/снимку, требует merge или повторного открытия, а не молчаливого overwrite. Редактирование поля группировки перемещает строку только после успешного обновления dataSource.
12. Действия, выбор и переключения
Действия над записью
Один descriptor действия используется в колонке, меню и hover-панели; display меняет только представление. visible/disabled вычисляются по настоящей записи. Позиция start/end реализуется служебной колонкой через transformer. Hover-панель доступна и по focus-within, а на touch заменяется кнопкой меню. run может быть async; pending блокирует повторный запуск и не замораживает остальные строки.
Bulk-действия получают либо набор ключей, либо allMatching + queryKey + excluded; не массив только текущей страницы. Подтверждения удаления и права остаются в приложении. Группа может иметь отдельные group actions через renderHeader, но никогда не выдаётся за первую запись группы. Клик по действию/checkbox/edit не вызывает одновременно row-click и expand.
Выделение и выбор всех
checkbox поддерживает несколько записей, radio — одну и не показывает select-all. Заголовок считает checked/indeterminate через пересечение выбранных и доступных ключей текущего scope, а не через равенство длин массивов. Disabled-записи исключаются из базы расчёта. Синтетические grouped-узлы не выбираются как T; их checkbox, если включён, переключает реальные доступные листья внутри группы.
scope=page выбирает записи текущих корневых единиц страницы, включая загруженных детей независимо от раскрытия. scope=filtered выбирает весь отфильтрованный клиентский набор, не одну страницу. На сервере «все соответствующие запросу» — selection.kind=allMatching, queryKey и excluded; нельзя материализовать неизвестные id или возвращать их как будто они загружены. Смена filter/sort/grouped инвалидирует allMatching с уведомлением и явным новым выбором.
treeMode=independent не каскадирует; cascade выбирает разрешённых потомков и считает indeterminate снизу вверх. Disabled-узел не меняется сам, его доступные потомки обрабатываются независимо. В lazy/server-дереве каскад на неизвестных потомков требует серверного subtree-token; без него поддерживаются только загруженные потомки с явной подписью области. Выбор не должен запускать сеть для «раскрыть всё».
Переключения и настройки колонок
Expand-контролы именованы по каналу: дерево, grouped, Column.group field, конкретный detail key. «Свернуть всё» очищает разрешённые каналы, «раскрыть всё» действует на доступный уровень/страницу, без неограниченных async-запросов. Меню видимости — отдельная кнопка настроек, не HoverCard на всём thead.
Resizing: min/max, pointer capture, preview через CSS, один column-resize на commit; доступна клавиатурная регулировка. Drag: порядок по стабильным columnKey, перенос группы целиком, запрет разрыва fixed start/end без явного разрешения. Hidden не удаляет колонку из схемы; служебные обязательные контролы не скрываются случайно. Порядок, ширины и видимость сохраняются версионированно.
13. Состояния интерфейса и доступность

| Условие                            | Отображение                                           |
| ---------------------------------- | ----------------------------------------------------- |
| undefined + loading                | Первичная загрузка, без ложного empty                 |
| [] + не loading                    | Нет записей; отдельный empty slot                     |
| Исходные данные есть, фильтр дал 0 | Нет совпадений + кнопка сброса фильтров               |
| Данные есть + loading              | Текущие строки остаются, overlay/индикатор обновления |
| error + данных нет                 | Ошибка и retry вместо empty                           |
| error + данные есть                | Последние строки + неблокирующая ошибка обновления    |
| Ошибка detail/children             | Локальная ошибка панели/ветки и retry                 |

MarkupTable только оформляет переданное содержимое; выбор loading/empty/error делает DataTable. Ошибки render не проглатываются как null: локальная error boundary показывает диагностируемый fallback. Нельзя считать undefined без loading завершённой пустой выборкой: adapter обязан определить initial/ready состояние.
Нативные caption, scope у th, aria-sort, aria-expanded, aria-controls и label у icon-кнопок обязательны. Выбор отмечается aria-selected там, где семантически уместно; checkbox имеет собственный label. В простом режиме сохраняется table-семантика; treegrid и полноценная grid-навигация вводятся только вместе с соответствующей клавиатурной моделью. Для карточек используются корректные list/section semantics, подписи не дублируются скринридером.
Обязательные проверки: keyboard-only, focus после сортировки/сворачивания/смены layout, контраст, touch, RTL, reduced motion и SSR hydration. shouldCellUpdate — оптимизация только после корректной иммутабельности; edit/selection/expand должны оставаться зависимостями ячейки, чтобы оптимизация не скрывала изменения UI.
14. Структура модулей
shared/ui/
markup-table/
MarkupTable.tsx           // DOM, ref, визуальный контекст
parts.tsx                // Container, Thead, Tbody, Tr, Th, Td…
geometry/                // widths, sticky offsets, ResizeObserver
styles.css
types.ts
index.ts
__tests__/               // DOM, CSS contracts, geometry
data-table/
DataTable.tsx            // только композиция хуков и renderer
types/                   // public API, nodes, query, state
columns/
normalize.ts           // массив / JSX → единая схема
header-grid.ts         // colSpan/rowSpan
transforms/            // sort, filter, expand, select, actions
model/
normalize-rows.ts      // rowKey, immutable record nodes
filter.ts
sort.ts
grouped.ts
paginate.ts
flatten-visible.ts
key-codec.ts
query.ts               // сериализация, queryKey, server contract
state/
reducer.ts
useTableState.ts       // controlled slices + onChange
selectors.ts           // узкие подписки
features/
filtering/ grouping/ tree/ expansion/
selection/ editing/ actions/ column-settings/ persistence/
renderers/
TableView.tsx          // собирает MarkupTable
CardsView.tsx
ListView.tsx
Row.tsx Cell.tsx DetailPanel.tsx
adapters/
async-detail.tsx       // typed detail payload, cache, abort, retry
server.ts              // внешний запрос, без скрытого fetch
legacy-xos.ts legacy-dmc.ts
__tests__/               // unit, integration, type tests
stories/                 // сценарии и комбинации
index.ts
Публично экспортируются MarkupTable, DataTable, типы колонок/состояния/фильтров и typed factories для detail. Внутренние узлы и контексты не становятся публичной зависимостью приложения. Нормализация, key-codec, filter/sort/grouped/page — чистые функции, пригодные для unit/property-based тестов без DOM.
15. Этапы и критерии готовности
Порядок ниже — зависимостный, не календарная оценка. Каждый этап заканчивается работающими историями и проверяемым контрактом; следующий не заменяет тесты предыдущего.

| Этап                       | Результат                                                                 | Критерий / тесты                                                                       |
| -------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 0. Контракт                | ADR: group/grouped/tree/detail, ключи, page unit, controlled, server envelope | Type tests: Parent/Child не смешиваются; round-trip key codec; JSON query schema   |
| 1. MarkupTable             | DOM-части, токены, sizes, borders, showTitle, sticky/fixed                | Refs/DOM attrs; visual matrix; RTL, sticky+scroll+resize; SSR                          |
| 2. DataTable core          | Колонки, rowKey, reducer, filter/sort/page, onChange, empty/loading/error | Сорт всего набора до page; controlled клики; StrictMode; отсутствие мутаций            |
| 3. grouped + tree + group + detail | Синтетические уровни, Column.group nested table, typed detail/async | Комбинации механизмов; abort/race/retry; ключи после reorder; lazy children          |
| 4. Автофильтры + server    | Профили, UI типов, facets, custom, query adapter/cursor                   | 0/false/null; даты; mixed types; filter→page reset; без двойной обработки server page  |
| 5. Selection + actions     | Checkbox/radio, bulk, tree cascade, column/menu/hover                     | Ключи с других страниц; allMatching/excluded; disabled; keyboard/touch                 |
| 6. Editing + adaptive      | Cell/row edit, validation/commit/cancel; cards/list                       | Reject/late validation; controlled draft; смена breakpoint без потери фокуса/черновика |
| 7. Column UX + persistence | Resize, drag, hide, storage migrations                                    | Min/max; fixed segments; nested headers; storage failure/SSR; schema migration         |
| 8. Интеграция и выпуск     | Legacy adapters, документация, performance baseline                       | Регрессии примеров xos/dmc; E2E cross-feature; a11y; React Profiler                    |
| 9. После v1                | Виртуализация и крупные наборы по измерениям                              | Dynamic height/detail; sticky; edit focus; scroll anchoring без потери состояния       |

Контрольные вехи
1. M1 после этапа 2: самостоятельный MarkupTable и простая DataTable без групп уже пригодны для обычных списков. Нельзя выпускать с индексными ключами или сортировкой текущей страницы.
2. M2 после этапа 4: архитектурно сложная часть подтверждена — grouped + Column.group + detail + дерево + фильтры + сервер. Есть демонстрация трёх режимов group/grouped и минимум двумя уровнями группировки.
3. M3 после этапа 7: функциональная замена dmc с выбором, действиями, edit, адаптацией, resize/drag/hidden/storage. Все взаимодействия доступны без мыши.
4. M4 после этапа 8: готовность к миграции. Старые props маппятся adapter-слоем с предупреждениями; новый API не обрастает скрытыми legacy-ветками.
Сквозные сценарии приёмки
1. Глубоко заморозить исходные данные; filter/sort/grouped/expand/edit-draft не меняют их. Переставить и удалить строки — выбор и раскрытие остаются у правильных rowKey.
2. Взять значения групп 0, false, пустую строку, null, 1 и "1", несколько родителей и одинаковые leaf-id в разных nested tables — никаких коллизий или потерь.
3. На нескольких страницах изменить сортировку, затем фильтр: проверяется весь набор, правильный total, атомарный onChange и предсказуемый сброс страницы.
4. Развернуть дерево внутри grouped, открыть async detail другого типа, быстро сменить query и закрыть панель — старый ответ не применяется, остальная таблица остаётся рабочей.
5. Выбрать всё по query, исключить одну запись, сменить страницу и запустить bulk: команда содержит query + excluded, а не только загруженные строки.
6. Открыть row edit, получить async-ошибку, переключить карточный layout, исправить и сохранить: draft, ошибки и идентичность строки не теряются.
7. Скрыть дочернюю колонку, перетащить группу шапки, изменить ширину fixed-колонки и восстановить storage после смены схемы: header spans и sticky-offset корректны.
Матрица производительности фиксируется на выбранном стенде для 1 000 и 10 000 строк, широких колонок и вложенных групп: время пайплайна, число рендеров при одном expand/edit и задержка resize. Числовые бюджеты согласовать после baseline; не обещать производительность на неограниченном количестве DOM-строк без виртуализации.
16. Риски и решения

| Риск                                 | Предлагаемое решение                                                                   |
| ------------------------------------ | -------------------------------------------------------------------------------------- |
| Взрыв сочетаний group/grouped/tree/detail | Разные kind узлов и expand-каналы; нормативная таблица сочетаний и integration stories |
| Слишком большой API / оркестратор    | Конфиги по features, чистая модель и transformers; DataTable только композиция         |
| Неверные автофильтры                 | Консервативная inference, явный type, server facets, пустые/смешанные данные в тестах  |
| Чрезмерная группа на одной странице  | Явная единица pagination; лимит глубины/размеров и позднее virtual                     |
| Controlled рассинхронизация          | Единая транзакция reducer, callback всегда, source of truth только props               |
| Редактирование устаревшей записи     | Revision/optimistic lock в приложении; не перезаписывать конфликт молча                |
| Sticky + custom markup + virtual     | Контракт refs/widths; поэтапная матрица совместимости, не скрытые обещания             |
| Persisted мусор или приватные данные | Версионированная схема, whitelist срезов, без records/drafts/selection по умолчанию    |

Что подтвердить до реализации
1. Единица пагинации: принять корневые группы/ветки в v1 или нужен обязательный режим по leaf-записям? Рекомендация — корневые единицы с явной подписью.
2. Column.group «подставляет данные» из field во вложенную таблицу; detail — отдельный канал. Родительская строка и её идентичность сохраняются.
3. Дерево: гарантируется ли глобальная уникальность rowKey и нужны ли lazy/server subtree-selection? Без гарантии ключей приложение должно дать составной стабильный id.
4. Дизайн-основа: использовать токены xos или общую новую тему? Не связывать DataTable с Mantine/antd; стили нижнего слоя на CSS variables.
5. Адаптация: согласовать breakpoint и обязательные поля карточки; пока это конфигурация контейнера, не зашитый mobile-width.
6. Даты и сервер: выбрать timezone/date-only правила, формат facets и server group envelope; custom-фильтры обязаны иметь сериализуемый контракт.
7. Миграция: делать ли временный совместимый XColumn/DataColumn adapter? Рекомендация — да, но отдельно от нового core, с явными deprecated-предупреждениями.
17. Основания и источники
План основан на полностью прочитанном tables-report.md, прежде всего разделах 8–9. Ревизии исследования: xos.ui d2fedb6; dmc-prototype 90955a1; ant-design 0572a24; rc-table b1ef288. Это привязка к исследованному коду, не утверждение о текущем состоянии всех веток.
Отчёт обосновывает отказ от хуков на каждую строку, эффектной регистрации колонок, ref-only sort, мутаций groupBy и пагинации до sort. Заимствуются устройство transformColumns, render + onCell, rowKey и единая точка onChange; сохраняются преимущества dmc в настройках колонок, действиях, edit и адаптации. Канон Column.group / Column.grouped зафиксирован отдельно от typed detail.
xos.ui — MarkupTable
xos.ui — XTable
dmc-prototype — TableData
Ant Design — Table
rc-table — ядро отображения
Агент исследования