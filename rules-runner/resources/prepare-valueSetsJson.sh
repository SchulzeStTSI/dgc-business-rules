# TODO  check whether ../../ehn-dcc-schema/valuesets/*.json exists, and is non-empty
# TODO  check whether jq is installed
VALUESETS_PATH=../../../ehn-dcc-schema/valuesets
if [[ -d "$VALUESETS_PATH" ]]
then
  jq --slurp 'map( { (.valueSetId): .valueSetValues|keys }) | add' $VALUESETS_PATH/*.json > valueSets.json
else
  echo "expected $VALUESETS_PATH to exist"
fi
